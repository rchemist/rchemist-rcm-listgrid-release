import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { FormField } from './abstract';
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
import { XrefAvailableDateMappingView, } from './view/XrefAvailableDateMappingView';
import { isEmpty } from '../../utils';
export class XrefAvailableDateMappingField extends FormField {
    constructor(name, order, entityForm) {
        super(name, order, 'xrefMapping');
        this.entityForm = entityForm;
        this.helpText = '이 정보를 변경한 후 반드시 저장 버튼을 눌러야 변경 사항이 반영됩니다.';
    }
    static create(props) {
        return new XrefAvailableDateMappingField(props.name, props.order, props.entityForm).copyFields(props, true);
    }
    /**
     * XrefAvailableDateMappingField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    renderInstance(params) {
        return (async () => {
            const inputParams = await getInputRendererParameters(this, { ...params });
            return (_jsx(XrefAvailableDateMappingView, { ...inputParams, entityForm: this.entityForm }));
        })();
    }
    /**
     * XrefAvailableDateMappingField 인스턴스 생성
     */
    createInstance(name, order) {
        return new XrefAvailableDateMappingField(name, order, this.entityForm);
    }
    // override
    async isBlank(renderType = 'create') {
        const value = await this.getCurrentValue(renderType);
        if (value === undefined || value === null || value === '') {
            return true;
        }
        const mappingValue = value;
        return isEmpty(mappingValue.mapped);
    }
}
//# sourceMappingURL=XrefAvailableDateMappingField.js.map