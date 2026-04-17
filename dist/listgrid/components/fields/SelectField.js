import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { hexHash } from "../../utils/hash";
import { CheckBoxChip } from "../../ui";
import { MultiSelectBox } from "../../ui";
import { RadioChip } from "../../ui";
import { RadioInput } from "../../ui";
import { SelectBox } from "../../ui";
import { OptionalField, renderListOptionalField } from './abstract';
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
import { SelectFieldRenderer } from './SelectFieldRenderer';
import { Badge } from "../../ui";
import { DynamicSelectFieldView } from "./view/DynamicSelectFieldView";
// SelectField loadOptions 캐시 (fieldName 기반, 동일 페이지 내에서 공유)
const selectFieldOptionsCache = new Map();
// 진행 중인 loadOptions Promise 추적 (중복 호출 방지)
const selectFieldOptionsPending = new Map();
// Checkbox 그룹으로 표시할 최대 옵션 수 (10개 미만이면 Checkbox, 10개 이상이면 MultiSelectBox)
const CHECKBOX_THRESHOLD = 10;
export class SelectField extends OptionalField {
    constructor(name, order, options, reason, validateStatusChange) {
        super(name, order, 'select');
        this.options = options ?? [];
        this.reason = reason;
        this.validateStatusChange = validateStatusChange;
    }
    /**
     * SelectField 핵심 렌더링 로직
     * - loadOptions가 설정되면 DynamicSelectFieldView 사용 (동적 옵션 로드)
     * - enableImmediateChange가 true이면 SelectFieldRenderer 사용 (즉시 변경 기능)
     * - combo 설정이 있으면 RadioInput 사용
     * - useChip(true)이고 조건 충족 시 RadioChip 사용
     * - 그 외에는 SelectBox 사용
     */
    renderInstance(params) {
        // 동적 옵션 로드가 설정된 경우 DynamicSelectFieldView 사용
        if (this.loadOptions) {
            return (async () => {
                const inputParams = await getInputRendererParameters(this, params);
                let renderType = 'select';
                if (this.combo !== undefined && this.combo.direction !== undefined) {
                    renderType = 'radio';
                }
                else if (this.shouldRenderAsChip()) {
                    renderType = 'chip';
                }
                return (_jsx(DynamicSelectFieldView, { name: this.getName(), fieldName: this.getName(), entityForm: params.entityForm, loadOptions: this.loadOptions, staticOptions: this.options, renderType: renderType, combo: this.combo, value: inputParams.value, onChange: inputParams.onChange, readonly: inputParams.readonly, required: inputParams.required, placeHolder: inputParams.placeHolder }));
            })();
        }
        // 즉시 변경 기능이 활성화된 경우 SelectFieldRenderer 사용
        if (this.enableImmediateChange) {
            return (async () => {
                const currentValue = await this.getCurrentValue();
                const fetchedValue = await this.getFetchedValue();
                const cacheKey = this.createStatusCacheKey(currentValue);
                return (_jsx(SelectFieldRenderer, { name: this.getName(), value: currentValue, fetchedValue: fetchedValue, options: this.options, onChange: params.onChange, entityForm: params.entityForm, reason: this.reason, validateStatusChange: this.validateStatusChange, immediateChangeProps: this.immediateChangeProps, disabled: params.readonly }, cacheKey));
            })();
        }
        const cacheKey = this.createCacheKey();
        return (async () => {
            // combo 설정이 있으면 RadioInput 우선
            if (this.combo !== undefined && this.combo.direction !== undefined) {
                return _jsx(RadioInput, { options: this.options, combo: this.combo, ...await getInputRendererParameters(this, params) }, cacheKey);
            }
            // Chip UI 조건 충족 시 RadioChip 사용
            if (this.shouldRenderAsChip()) {
                return _jsx(RadioChip, { options: this.options, combo: { direction: 'row' }, ...await getInputRendererParameters(this, params) }, cacheKey);
            }
            return _jsx(SelectBox, { options: this.options, ...await getInputRendererParameters(this, params) }, cacheKey);
        })();
    }
    /**
     * 즉시 변경 기능용 캐시 키 생성
     */
    createStatusCacheKey(value) {
        let key = `status_`;
        for (const option of this.options) {
            key += `_${option.value}`;
        }
        return `${this.getName()}_${value}_${key}`;
    }
    /**
     * SelectField 핵심 리스트 필터 렌더링 로직
     * - loadOptions가 설정된 경우: 옵션을 먼저 로드한 후 렌더링
     * - 옵션 1-9개: Checkbox 그룹으로 모든 옵션을 한눈에 표시
     * - 옵션 10개 이상: MultiSelectBox(드롭다운)로 표시
     */
    renderListFilterInstance(params) {
        return (async () => {
            // 동적 옵션이 설정되고 아직 옵션이 로드되지 않은 경우
            if (this.loadOptions && (!this.options || this.options.length === 0)) {
                const options = await this.loadOptions(params.entityForm);
                this.options = options;
            }
            const cacheKey = this.createCacheKey();
            const optionsCount = this.options?.length ?? 0;
            // singleFilter가 true이면 RadioChip 사용 (단일 선택만 허용)
            if (this.singleFilter) {
                return _jsx(RadioChip, { options: this.options, combo: { direction: 'row' }, ...await getInputRendererParameters(this, {
                        ...params,
                        required: false,
                        onChange: (value) => params.onChange(value)
                    }) }, cacheKey);
            }
            // 옵션이 10개 이상이면 MultiSelectBox 사용
            if (optionsCount >= CHECKBOX_THRESHOLD) {
                return _jsx(MultiSelectBox, { options: this.options, ...await getInputRendererParameters(this, {
                        ...params,
                        required: false,
                        onChange: (value) => params.onChange(value)
                    }) }, cacheKey);
            }
            // 옵션이 10개 미만이면 Chip 스타일 Checkbox 그룹 사용 (모든 옵션을 한눈에 볼 수 있음)
            return _jsx(CheckBoxChip, { options: this.options, combo: { direction: 'row' }, ...await getInputRendererParameters(this, {
                    ...params,
                    required: false,
                    onChange: (value) => params.onChange(value)
                }) }, cacheKey);
        })();
    }
    /**
     * SelectField 핵심 리스트 아이템 렌더링 로직
     * loadOptions가 설정된 경우 캐시에서 옵션을 가져오거나 로드 후 renderListOptionalField 사용
     * N+1 문제 방지를 위해 prefetchSelectFieldOptions가 미리 호출되어야 함
     */
    renderListItemInstance(props) {
        // 동적 옵션이 설정되고 아직 옵션이 로드되지 않은 경우
        if (this.loadOptions && (!this.options || this.options.length === 0)) {
            return (async () => {
                // 캐시에서 먼저 확인
                const cacheKey = this.getLoadOptionsCacheKey();
                if (selectFieldOptionsCache.has(cacheKey)) {
                    this.options = selectFieldOptionsCache.get(cacheKey);
                    return renderListOptionalField(this, props);
                }
                // 진행 중인 요청이 있으면 대기
                if (selectFieldOptionsPending.has(cacheKey)) {
                    this.options = await selectFieldOptionsPending.get(cacheKey);
                    return renderListOptionalField(this, props);
                }
                // 새로운 요청 시작 (prefetch가 호출되지 않은 경우 fallback)
                const loadPromise = this.loadOptions(props.entityForm);
                selectFieldOptionsPending.set(cacheKey, loadPromise);
                try {
                    const options = await loadPromise;
                    this.options = options;
                    selectFieldOptionsCache.set(cacheKey, options);
                    return renderListOptionalField(this, props);
                }
                finally {
                    selectFieldOptionsPending.delete(cacheKey);
                }
            })();
        }
        return renderListOptionalField(this, props);
    }
    /**
     * loadOptions 캐시 키 생성
     * 필드명 기반으로 캐시 키 생성 (동일 필드는 동일한 옵션을 반환한다고 가정)
     */
    getLoadOptionsCacheKey() {
        return `selectField_${this.getName()}`;
    }
    /**
     * SelectField View 모드 렌더링 - Badge 컴포넌트로 상태 표시
     * options에서 value에 해당하는 label을 찾아 Badge로 렌더링
     * cardIcon이 설정된 경우 아이콘과 함께 표시
     */
    async renderViewInstance(props) {
        const value = props.item[this.name];
        // null, undefined, 빈 문자열 처리
        if (value === null || value === undefined || value === '') {
            return { result: null };
        }
        // options에서 해당 value의 label 찾기
        const option = this.options?.find(opt => opt.value === value);
        const displayLabel = option?.label ?? String(value);
        // 상태값에 따른 색상 매핑 (ColorType 사용)
        const colorMap = {
            // 활성/성공 상태
            ACTIVE: 'success',
            ENROLLED: 'success',
            PAID: 'success',
            COMPLETED: 'success',
            APPROVED: 'success',
            GRADUATED: 'info',
            // 대기/경고 상태
            PENDING: 'warning',
            ON_LEAVE: 'warning',
            PARTIAL: 'warning',
            // 비활성/취소/위험 상태
            INACTIVE: 'secondary',
            CANCELLED: 'danger',
            GIVE_UP: 'danger',
            EXPELLED: 'danger',
            UNPAID: 'danger',
            DISCARDED: 'secondary',
            // 기본 상태
            ENTERED: 'primary',
        };
        const color = colorMap[String(value).toUpperCase()] ?? 'secondary';
        // cardIcon이 있으면 아이콘과 함께 Badge 표시
        if (this.cardIcon) {
            const IconComponent = this.cardIcon;
            return {
                result: (_jsxs("span", { className: "rcm-bool-wrap", children: [_jsx("span", { className: "rcm-bool-icon-frame rcm-bool-icon-frame-neutral", children: _jsx(IconComponent, { className: "rcm-bool-icon rcm-bool-icon-neutral", stroke: 1.75 }) }), _jsx(Badge, { color: color, children: displayLabel })] }))
            };
        }
        return {
            result: _jsx(Badge, { color: color, children: displayLabel })
        };
    }
    /**
     * SelectField 인스턴스 생성
     */
    createInstance(name, order) {
        const instance = new SelectField(name, order, this.options ?? [], this.reason, this.validateStatusChange);
        instance.enableImmediateChange = this.enableImmediateChange;
        instance.immediateChangeProps = this.immediateChangeProps;
        instance.loadOptions = this.loadOptions;
        return instance;
    }
    createCacheKey(renderType) {
        let key = ``;
        for (const option of this.options) {
            key += `_${option.value}`;
        }
        return hexHash(`${this.getName()}_${this.getCurrentValue(renderType)}_${key}`);
    }
    static create(props) {
        const field = new SelectField(props.name, props.order, props.options ?? [], props.reason, props.validateStatusChange);
        field.enableImmediateChange = props.enableImmediateChange;
        field.immediateChangeProps = props.immediateChangeProps;
        field.loadOptions = props.loadOptions;
        return field.copyFields(props, true);
    }
    /**
     * 옵션을 동적으로 로드하는 함수 설정.
     * 설정하면 options 대신 이 함수를 통해 옵션을 비동기로 로드합니다.
     *
     * @example
     * ```tsx
     * new SelectField('country', 100)
     *   .withLabel('국가')
     *   .withLoadOptions(async (entityForm) => {
     *     const response = await fetch('/api/countries');
     *     const data = await response.json();
     *     return data.map((item: any) => ({
     *       label: item.name,
     *       value: item.code,
     *     }));
     *   })
     * ```
     */
    withLoadOptions(loader) {
        this.loadOptions = loader;
        return this;
    }
    /**
     * 즉시 변경 기능 활성화.
     * 옵션을 선택하면 즉시 API를 호출하여 상태를 변경합니다.
     *
     * @param propsOrEnable
     *   - boolean: 활성화 여부 (하위호환, 기본값: true)
     *   - ImmediateChangeProps: 확장 설정 (requiredFields, onSubmit)
     *
     * @example
     * // 기존 방식 (하위호환)
     * .withImmediateChange()
     * .withImmediateChange(true)
     *
     * @example
     * // 확장 방식: 변경 버튼 클릭 시 rejectReason 필드도 함께 검증/전송
     * .withImmediateChange({
     *   requiredFields: ['rejectReason'],
     *   onSubmit: async (entityForm, { targetValue, formData }) => {
     *     // 커스텀 전처리 로직
     *     // return false; // 취소
     *     // return { additionalField: 'value' }; // 추가 데이터 병합
     *   }
     * })
     */
    withImmediateChange(propsOrEnable) {
        if (typeof propsOrEnable === 'object' && propsOrEnable !== null) {
            this.enableImmediateChange = true;
            this.immediateChangeProps = propsOrEnable;
        }
        else {
            this.enableImmediateChange = propsOrEnable ?? true;
        }
        return this;
    }
    /**
     * 상태 변경 시 사유 입력 설정.
     * 특정 상태로 변경할 때 사유 입력을 요구합니다.
     * @param reason 사유 입력 설정 배열
     */
    withReason(reason) {
        this.reason = reason;
        return this;
    }
    /**
     * 상태 변경 시 검증 로직 설정.
     * 상태 변경 전에 추가적인 검증을 수행합니다.
     * @param validateStatusChange 검증 로직 설정
     */
    withValidateStatusChange(validateStatusChange) {
        this.validateStatusChange = validateStatusChange;
        return this;
    }
    useListField(props) {
        if (typeof props === 'number') {
            props = { order: props };
        }
        this.listConfig = { ...this.listConfig, support: true, sortable: false, order: props?.order }; // Select 필드는 Sort 를 지원하지 않는다.
        this.listConfig.filterable = props?.filterable ?? true;
        return this;
    }
}
/**
 * 여러 SelectField의 loadOptions를 일괄 실행하여 캐시에 저장
 * ViewListGrid에서 목록 렌더링 전에 호출하여 N+1 문제 방지
 *
 * @param fields loadOptions가 설정된 SelectField 배열
 * @param entityForm 옵션 로드에 사용할 EntityForm
 */
export async function prefetchSelectFieldOptions(fields, entityForm) {
    const fieldsToLoad = fields.filter(field => {
        if (!field.loadOptions)
            return false;
        const cacheKey = field.getLoadOptionsCacheKey();
        // 이미 캐시에 있거나 로딩 중이면 제외
        return !selectFieldOptionsCache.has(cacheKey) && !selectFieldOptionsPending.has(cacheKey);
    });
    if (fieldsToLoad.length === 0) {
        return;
    }
    // 모든 loadOptions를 병렬로 실행
    const loadPromises = fieldsToLoad.map(async (field) => {
        const cacheKey = field.getLoadOptionsCacheKey();
        const loadPromise = field.loadOptions(entityForm);
        selectFieldOptionsPending.set(cacheKey, loadPromise);
        try {
            const options = await loadPromise;
            selectFieldOptionsCache.set(cacheKey, options);
            field.options = options;
        }
        finally {
            selectFieldOptionsPending.delete(cacheKey);
        }
    });
    await Promise.all(loadPromises);
}
/**
 * SelectField 옵션 캐시 초기화
 */
export function clearSelectFieldOptionsCache() {
    selectFieldOptionsCache.clear();
}
//# sourceMappingURL=SelectField.js.map