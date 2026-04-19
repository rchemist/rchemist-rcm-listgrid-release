import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { ListableFormField } from './abstract';
import { TextInput } from '../../ui';
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
import { ValidateResult } from '../../validations/Validation';
import { isBlank } from '../../utils/StringUtil';
export class MonthField extends ListableFormField {
    constructor(name, order, limit) {
        super(name, order, 'month');
        this.limit = limit;
    }
    /**
     * MonthField 핵심 렌더링 로직
     */
    renderInstance(params) {
        return (async () => {
            return (_jsx(TextInput, { type: 'month', min: this.limit?.min, max: this.limit?.max, ...await getInputRendererParameters(this, params) }));
        })();
    }
    /**
     * MonthField 인스턴스 생성
     */
    createInstance(name, order) {
        return new MonthField(name, order, this.limit);
    }
    withLimit(limit) {
        this.limit = limit;
        return this;
    }
    async validate(entityForm) {
        const result = await super.validate(entityForm);
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
            // 에러가 안 난 경우에만 limit 에 의한 validation 처리를 시작한다.
            if (this.limit !== undefined) {
                const value = await this.getCurrentValue(entityForm.getRenderType());
                if (!isBlank(value)) {
                    // value 에 값이 있을 때만 비교한다.
                    // YYYY-MM 값이기 때문에 단순 비교해도 된다.
                    if (this.limit.min !== undefined && this.limit.min > value) {
                        return ValidateResult.fail(`최소 ${this.limit.min} 이상의 값을 선택해야 합니다.`);
                    }
                    else if (this.limit.max !== undefined && this.limit.max < value) {
                        return ValidateResult.fail(`최대 ${this.limit.max} 이하의 값을 선택해야 합니다.`);
                    }
                }
            }
        }
        return result;
    }
    static create(props) {
        return new MonthField(props.name, props.order, props.limit).copyFields(props, true);
    }
}
//# sourceMappingURL=MonthField.js.map