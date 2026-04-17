import React from "react";
import { SelectOption } from "../../form/Type";
import { FieldValue } from '../../config/Config';
import { FieldRenderParameters, FilterRenderParameters } from '../../config/EntityField';
import { OptionalField, OptionalFieldProps, UserListFieldProps as ListFieldProps, ViewListProps, ViewListResult, ViewRenderProps, ViewRenderResult } from './abstract';
import { EntityForm } from '../../config/EntityForm';
import { ValidateResult } from '../../validations/Validation';
/**
 * 상태 변경 사유 입력 필드 설정
 */
export interface StatusReason {
    /** 상태 변경 사유 입력 필드의 안내 메시지 */
    message: string;
    /** 상태 변경 사유가 저장될 필드명 (entityForm.getField로 찾을 수 있음) */
    fieldName: string;
    /** 상태 변경 사유 입력 필수 여부 */
    required?: boolean;
}
/**
 * 특정 상태로 변경 시 적용할 사유 입력 설정
 */
export interface StatusChangeReason {
    /**
     * 어떤 상태로 변경할 때 이 설정을 적용할지 지정.
     * 이 값이 없으면 모든 상태 변경에 대해 사유를 입력하게 함
     */
    targets?: string[];
    /** 사유 입력 설정 */
    config: StatusReason;
}
/**
 * 상태 변경 시 수행할 검증 로직
 */
export interface StatusChangeValidation {
    /** 상태 변경 시 실행할 검증 함수 */
    validate: (entityForm: EntityForm, value: FieldValue) => Promise<ValidateResult>;
    /** 검증 실패 시 표시할 에러 메시지 */
    message?: string;
    /** 검증 성공 후 실행할 콜백 */
    success?: (entityForm: EntityForm) => Promise<void>;
    /** 검증 실패 후 실행할 콜백 */
    fail?: (entityForm: EntityForm) => Promise<void>;
}
/**
 * 옵션 로드 함수 타입
 * EntityForm을 받아서 SelectOption 배열을 반환하는 async 함수
 */
export type OptionsLoader = (entityForm: EntityForm) => Promise<SelectOption[]>;
/**
 * 즉시 변경(withImmediateChange) 확장 설정.
 * "변경" 버튼 클릭 시 상태 필드 외에 추가 필드를 함께 전송하거나,
 * 커스텀 전처리 로직을 실행할 수 있습니다.
 */
export interface ImmediateChangeProps {
    /**
     * 즉시 변경 시 함께 전송할 필드명 목록.
     * EntityForm.validate({ fieldNames })로 표준 검증을 수행하고,
     * field.isDirty()인 필드의 값을 수집하여 API 요청에 포함합니다.
     */
    requiredFields?: string[];
    /**
     * 즉시 변경 전 커스텀 전처리 콜백.
     * requiredFields 검증/수집 및 withReason 사유 추가 이후에 호출됩니다.
     * - false 반환: 변경 취소
     * - Record 반환: 추가 데이터를 formData에 병합
     * - void 반환: 기본 동작 진행
     */
    onSubmit?: (entityForm: EntityForm, submitData: {
        targetValue: FieldValue;
        formData: Record<string, any>;
    }) => Promise<false | Record<string, any> | void>;
}
export interface SelectFieldProps extends OptionalFieldProps {
    /**
     * 즉시 변경 기능 활성화 여부.
     * true로 설정하면 옵션 선택 즉시 API를 호출하여 상태를 변경합니다.
     */
    enableImmediateChange?: boolean;
    /**
     * 즉시 변경 확장 설정 (requiredFields, onSubmit 등).
     */
    immediateChangeProps?: ImmediateChangeProps;
    /**
     * 상태 변경 시 사유 입력 설정.
     * 특정 상태로 변경 시 사유 입력을 요구할 수 있습니다.
     */
    reason?: StatusChangeReason[];
    /**
     * 상태 변경 시 검증 로직 설정.
     * 상태 변경 전에 추가적인 검증을 수행할 수 있습니다.
     */
    validateStatusChange?: StatusChangeValidation;
    /**
     * 옵션을 동적으로 로드하는 함수.
     * 설정하면 options 대신 이 함수를 통해 옵션을 비동기로 로드합니다.
     */
    loadOptions?: OptionsLoader;
}
export declare class SelectField extends OptionalField<SelectField> {
    /** 즉시 변경 기능 활성화 여부 */
    enableImmediateChange?: boolean;
    /** 즉시 변경 확장 설정 */
    immediateChangeProps?: ImmediateChangeProps;
    /** 상태 변경 시 사유 입력 설정 */
    reason?: StatusChangeReason[];
    /** 상태 변경 시 검증 로직 */
    validateStatusChange?: StatusChangeValidation;
    /** 옵션을 동적으로 로드하는 함수 */
    loadOptions?: OptionsLoader;
    constructor(name: string, order: number, options?: SelectOption[], reason?: StatusChangeReason[], validateStatusChange?: StatusChangeValidation);
    /**
     * SelectField 핵심 렌더링 로직
     * - loadOptions가 설정되면 DynamicSelectFieldView 사용 (동적 옵션 로드)
     * - enableImmediateChange가 true이면 SelectFieldRenderer 사용 (즉시 변경 기능)
     * - combo 설정이 있으면 RadioInput 사용
     * - useChip(true)이고 조건 충족 시 RadioChip 사용
     * - 그 외에는 SelectBox 사용
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * 즉시 변경 기능용 캐시 키 생성
     */
    private createStatusCacheKey;
    /**
     * SelectField 핵심 리스트 필터 렌더링 로직
     * - loadOptions가 설정된 경우: 옵션을 먼저 로드한 후 렌더링
     * - 옵션 1-9개: Checkbox 그룹으로 모든 옵션을 한눈에 표시
     * - 옵션 10개 이상: MultiSelectBox(드롭다운)로 표시
     */
    protected renderListFilterInstance(params: FilterRenderParameters): Promise<React.ReactNode | null>;
    /**
     * SelectField 핵심 리스트 아이템 렌더링 로직
     * loadOptions가 설정된 경우 캐시에서 옵션을 가져오거나 로드 후 renderListOptionalField 사용
     * N+1 문제 방지를 위해 prefetchSelectFieldOptions가 미리 호출되어야 함
     */
    protected renderListItemInstance(props: ViewListProps): Promise<ViewListResult>;
    /**
     * loadOptions 캐시 키 생성
     * 필드명 기반으로 캐시 키 생성 (동일 필드는 동일한 옵션을 반환한다고 가정)
     */
    getLoadOptionsCacheKey(): string;
    /**
     * SelectField View 모드 렌더링 - Badge 컴포넌트로 상태 표시
     * options에서 value에 해당하는 label을 찾아 Badge로 렌더링
     * cardIcon이 설정된 경우 아이콘과 함께 표시
     */
    protected renderViewInstance(props: ViewRenderProps): Promise<ViewRenderResult>;
    /**
     * SelectField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): SelectField;
    private createCacheKey;
    static create(props: SelectFieldProps): SelectField;
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
    withLoadOptions(loader: OptionsLoader): this;
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
    withImmediateChange(propsOrEnable?: boolean | ImmediateChangeProps): this;
    /**
     * 상태 변경 시 사유 입력 설정.
     * 특정 상태로 변경할 때 사유 입력을 요구합니다.
     * @param reason 사유 입력 설정 배열
     */
    withReason(reason?: StatusChangeReason[]): this;
    /**
     * 상태 변경 시 검증 로직 설정.
     * 상태 변경 전에 추가적인 검증을 수행합니다.
     * @param validateStatusChange 검증 로직 설정
     */
    withValidateStatusChange(validateStatusChange?: StatusChangeValidation): this;
    useListField(props?: number | ListFieldProps): this;
}
/**
 * 여러 SelectField의 loadOptions를 일괄 실행하여 캐시에 저장
 * ViewListGrid에서 목록 렌더링 전에 호출하여 N+1 문제 방지
 *
 * @param fields loadOptions가 설정된 SelectField 배열
 * @param entityForm 옵션 로드에 사용할 EntityForm
 */
export declare function prefetchSelectFieldOptions(fields: SelectField[], entityForm: EntityForm): Promise<void>;
/**
 * SelectField 옵션 캐시 초기화
 */
export declare function clearSelectFieldOptionsCache(): void;
//# sourceMappingURL=SelectField.d.ts.map