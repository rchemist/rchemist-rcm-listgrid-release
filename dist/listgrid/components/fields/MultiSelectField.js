import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { MultipleOptionalField, renderListMultipleOptionalField, } from './abstract';
import { CheckBoxChip } from '../../ui';
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
import { MultiSelectBox } from '../../ui';
export class MultiSelectField extends MultipleOptionalField {
    constructor(name, order, options, limit, reason, validateStatusChange) {
        super(name, order, 'multiselect', options, limit);
        this.reason = reason;
        this.validateStatusChange = validateStatusChange;
    }
    renderInstance(params) {
        const cacheKey = this.createCacheKey();
        return (async () => {
            // combo 설정이 있으면 CheckBoxChip 우선 (다중 선택 전용)
            // NOTE: MultiSelectField 는 값 타입이 배열이므로 RadioInput(단일 선택) 대신
            //       CheckBoxChip 을 사용해야 선택 상태가 정상적으로 표시된다.
            if (this.combo !== undefined && this.combo.direction !== undefined) {
                return (_jsx(CheckBoxChip, { options: this.options, limit: this.limit, combo: this.combo, ...await getInputRendererParameters(this, params) }, cacheKey));
            }
            // Chip UI 조건 충족 시 CheckBoxChip 사용
            if (this.shouldRenderAsChip()) {
                return (_jsx(CheckBoxChip, { options: this.options, limit: this.limit, combo: { direction: 'row' }, ...await getInputRendererParameters(this, params) }, cacheKey));
            }
            return (_jsx(MultiSelectBox, { limit: this.limit, options: this.options, ...await getInputRendererParameters(this, params) }, cacheKey));
        })();
    }
    /**
     * MultiSelectField 핵심 리스트 아이템 렌더링 로직
     */
    renderListItemInstance(props) {
        return renderListMultipleOptionalField(this, props);
    }
    /**
     * MultiSelectField 인스턴스 생성
     */
    createInstance(name, order) {
        const instance = new MultiSelectField(name, order, this.options, this.limit, this.reason, this.validateStatusChange);
        instance.enableImmediateChange = this.enableImmediateChange;
        return instance;
    }
    static create(props) {
        const field = new MultiSelectField(props.name, props.order, props.options, props.limit, props.reason, props.validateStatusChange);
        field.enableImmediateChange = props.enableImmediateChange;
        return field.copyFields(props, true);
    }
    /**
     * 즉시 변경 기능 활성화.
     * 옵션을 선택하면 즉시 API를 호출하여 상태를 변경합니다.
     * @param enable 활성화 여부 (기본값: true)
     */
    withImmediateChange(enable = true) {
        this.enableImmediateChange = enable;
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
}
//# sourceMappingURL=MultiSelectField.js.map