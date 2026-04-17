import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { getNestedValue, ListableFormField } from "./ListableFormField";
import { ValidateResult } from '../../../validations/Validation';
import { hexHash } from "../../../utils/hash";
import { isEquals } from "../../../misc";
import { isTrue } from '../../../utils/BooleanUtil';
import { Badge } from "../../../ui";
import { isBlank } from '../../../utils/StringUtil';
function isEqualOptions(a, b) {
    if (a === undefined && b === undefined) {
        return true;
    }
    if (a === undefined || b === undefined) {
        return false;
    }
    return isEquals(a, b);
}
// Chip UI 기본 설정값
const DEFAULT_CHIP_MAX_OPTIONS = 10;
const DEFAULT_CHIP_MAX_LABEL_LENGTH = 8;
export class OptionalField extends ListableFormField {
    /**
     * 목록 필터에서 단일 선택만 허용하도록 설정합니다.
     * true로 설정하면 필터가 EQUAL 조건으로 동작하고, RadioChip으로 렌더링됩니다.
     * @param enabled 단일 선택 여부 (기본값: true)
     */
    withSingleFilter(enabled = true) {
        this.singleFilter = enabled;
        return this;
    }
    /**
     * 이 필드를 라디오 버튼이나 Checkbox 타입으로 표시하는 경우 이 메소드를 호출한다.
     * @param props direction 설정
     */
    withComboType(props) {
        this.combo = props;
        return this;
    }
    withOptions(options) {
        this.options = options ? [...options] : undefined;
        return this;
    }
    withPreservedOptions(options) {
        this.preservedOptions = options ? [...options] : undefined;
        return this;
    }
    /**
     * Chip UI를 사용하도록 설정
     * @param enabled Chip UI 활성화 여부 (기본값: true)
     * @param config 추가 설정 (maxOptions, maxLabelLength)
     */
    useChip(enabled = true, config) {
        this.chipConfig = {
            enabled,
            maxOptions: config?.maxOptions ?? DEFAULT_CHIP_MAX_OPTIONS,
            maxLabelLength: config?.maxLabelLength ?? DEFAULT_CHIP_MAX_LABEL_LENGTH
        };
        return this;
    }
    /**
     * Chip UI로 렌더링할 조건을 충족하는지 확인
     * - chipConfig가 undefined: 옵션 수/라벨 길이 조건 자동 체크
     * - useChip(true): 강제 Chip 사용
     * - useChip(false): 강제 Chip 사용 안 함
     */
    shouldRenderAsChip() {
        // useChip(false)로 명시적 비활성화
        if (this.chipConfig?.enabled === false) {
            return false;
        }
        const maxOptions = this.chipConfig?.maxOptions ?? DEFAULT_CHIP_MAX_OPTIONS;
        const maxLabelLength = this.chipConfig?.maxLabelLength ?? DEFAULT_CHIP_MAX_LABEL_LENGTH;
        // 옵션이 없으면 Chip 불가
        if (!this.options || this.options.length === 0) {
            return false;
        }
        // useChip(true)로 명시적 활성화 시 조건 체크 생략
        if (this.chipConfig?.enabled === true) {
            return true;
        }
        // chipConfig가 undefined일 때: 자동 조건 체크
        // 옵션 수 체크
        if (this.options.length > maxOptions) {
            return false;
        }
        // 모든 옵션의 라벨 길이 체크
        for (const option of this.options) {
            const label = option.label ?? option.value;
            if (label.length > maxLabelLength) {
                return false;
            }
        }
        return true;
    }
    changeOptions(options, defaultValue) {
        if (this.preservedOptions === undefined || !isEqualOptions(this.options, options)) {
            this.preservedOptions = this.options ? [...this.options] : undefined;
            this.options = [...options];
            if (defaultValue !== undefined) {
                this.withDefaultValue(defaultValue);
            }
            return true;
        }
        return false;
    }
    revertOptions(renderType) {
        if (this.preservedOptions !== undefined) {
            if (!isEqualOptions(this.preservedOptions, this.options)) {
                this.resetValue(renderType);
                this.options = [...this.preservedOptions];
                this.preservedOptions = undefined;
                return true;
            }
        }
        return false;
    }
    copyFields(origin, includeValue = true) {
        const result = super.copyFields(origin, includeValue).withComboType(origin.combo).withOptions(origin.options)
            .withPreservedOptions(origin.preservedOptions);
        if (origin.chipConfig) {
            result.chipConfig = { ...origin.chipConfig };
        }
        if (origin.singleFilter !== undefined) {
            result.singleFilter = origin.singleFilter;
        }
        return result;
    }
}
export class MultipleOptionalField extends OptionalField {
    /**
     * 복수 선택할 수 있는 최소, 최대 개수 설정
     * 설정된 최소값이 있다면 해당 개수 미만을 선택하면 에러
     * 설정된 최대값이 있다면 해당 개수를 초과하면 에러
     * @param limit
     */
    withLimit(limit) {
        this.limit = limit;
        return this;
    }
    /**
     * 복수 선택할 수 있는 최소 개수만 설정
     * @param min
     */
    withMin(min) {
        this.limit = { min: min, max: this.limit?.max };
        return this;
    }
    /**
     * 복수 선택할 수 있는 최대 개수 설정
     * @param max
     */
    withMax(max) {
        this.limit = { min: this.limit?.min, max: max };
        return this;
    }
    createCacheKey(renderType) {
        let key = ``;
        for (const option of this.options) {
            key += `_${option.value}`;
        }
        return hexHash(`${this.getName()}_${this.getCurrentValue(renderType)}_${key}`);
    }
    constructor(name, order, type, options, limit) {
        super(name, order, type);
        this.options = options;
        this.limit = limit;
    }
    copyFields(origin, includeValue = true) {
        return super.copyFields(origin, includeValue)
            .withLimit(this.limit);
    }
    async validate(entityForm, session) {
        return await this.validateWithLimit({
            previousResult: await super.validate(entityForm, session),
            entityForm: entityForm,
            required: await this.isRequired({ entityForm, session }),
            limit: this.limit,
            value: this.getCurrentValue(entityForm.getRenderType())
        });
    }
    async validateWithLimit(props) {
        const result = props.previousResult;
        let errored = false;
        if (Array.isArray(result)) {
            if (result.length > 0) {
                for (const validateResult of result) {
                    if (validateResult.error) {
                        errored = true;
                        break;
                    }
                }
            }
        }
        else {
            // 단수일 때
            errored = result.error;
        }
        if (!errored) {
            // 에러가 안 난 경우에만 limit 에 대한 체크 에러를 시작한다.
            if (props.limit !== undefined) {
                const value = props.value;
                if (value !== undefined) {
                    if (Array.isArray(value)) {
                        // value 가 array 타입인 경우
                        const selected = value.length;
                        if (props.limit.min !== undefined && selected < props.limit.min) {
                            return ValidateResult.fail(`최소 ${props.limit.min}개 이상을 선택해야 합니다.`);
                        }
                        else if (props.limit.max !== undefined && selected > props.limit.max) {
                            return ValidateResult.fail(`최대 ${props.limit.max}개까지 선택할 수 있습니다.`);
                        }
                    }
                    else {
                        if (props.limit.min !== undefined) {
                            return ValidateResult.fail(`최소 ${props.limit.min}개 이상을 선택해야 합니다.`);
                        }
                    }
                }
            }
        }
        return result;
    }
}
export function renderListOptionalField(field, props) {
    // 중첩 객체 접근 지원 (예: score.student.name)
    const value = String(getNestedValue(props.item, field.name) ?? '');
    if (isBlank(value)) {
        return Promise.resolve({ result: '' });
    }
    const option = field.options?.find(option => option.value === value);
    if (option) {
        const color = option.color ?? (field.type === 'boolean' ? (isTrue(value) ? 'info' : 'secondary') : 'primary');
        const label = option.listLabel ?? (option.label ?? option.value);
        return Promise.resolve({
            result: _jsx(Badge, { color: color, variant: 'outline', children: label }),
            linkOnCell: true
        });
    }
    const color = field.type === 'boolean' ? isTrue(value) ? 'info' : 'dark' : undefined;
    const label = field.type === 'boolean' ? isTrue(value) ? '예' : '아니오' : value;
    return Promise.resolve({ result: _jsx(Badge, { color: color, variant: 'outline', children: label }), linkOnCell: true });
}
export function renderListMultipleOptionalField(field, props) {
    // 중첩 객체 접근 지원 (예: score.student.name)
    const value = getNestedValue(props.item, field.name);
    if (isBlank(value) || (Array.isArray(value) && value.length === 0)) {
        return Promise.resolve({ result: '' });
    }
    function getDisplayValue(value) {
        if (field.options) {
            for (const option of field.options) {
                if (option.value === value) {
                    return option.listLabel ?? (option.label ?? option.value);
                }
            }
        }
        return value;
    }
    if (Array.isArray(value)) {
        return Promise.resolve({
            result: _jsx("span", { className: 'space-x-0.5', children: value.map((v, index) => _jsx(Badge, { color: v.color ?? 'secondary', variant: 'outline', children: getDisplayValue(v) }, `${field.name}_${index}`)) })
        }); // 여러개 선택시 배열로 반환한다.
    }
    const option = field.options?.find(option => option.value === value);
    if (option) {
        return Promise.resolve({ result: _jsx(Badge, { color: option.color ?? undefined, children: option.label }), linkOnCell: false });
    }
    return Promise.resolve({ result: _jsx(Badge, { children: value }), linkOnCell: false });
}
//# sourceMappingURL=OptionalField.js.map