import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { FormField } from './abstract';
import { XrefMappingView } from './view/XrefMappingView';
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
import { isTrue } from '../../utils/BooleanUtil';
import { XrefPriorityMappingView } from './view/XrefPriorityMappingView';
import { isEmpty } from "../../utils";
export class XrefMappingField extends FormField {
    constructor({ name, order, entityForm, supportPriority, excludeId, add, filters }) {
        super(name, order, 'xrefMapping');
        this.entityForm = entityForm;
        this.supportPriority = supportPriority;
        this.helpText = '이 정보를 변경한 후 반드시 저장 버튼을 눌러야 변경 사항이 반영됩니다.';
        this.excludeId = excludeId;
        this.add = add ?? false;
        this.filters = filters;
    }
    /**
     * XrefMappingField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    renderInstance(params) {
        return (async () => {
            if (isTrue(this.supportPriority)) {
                return _jsx(XrefPriorityMappingView, { ...await getInputRendererParameters(this, { ...params }), parentEntityForm: params.entityForm, entityForm: this.entityForm, excludeId: this.excludeId, add: this.add, filters: this.filters });
            }
            return _jsx(XrefMappingView, { ...await getInputRendererParameters(this, { ...params }), parentEntityForm: params.entityForm, entityForm: this.entityForm, excludeId: this.excludeId, add: this.add, filters: this.filters });
        })();
    }
    /**
     * XrefMappingField 인스턴스 생성
     */
    createInstance(name, order) {
        return new XrefMappingField({
            name,
            order,
            entityForm: this.entityForm,
            supportPriority: this.supportPriority,
            excludeId: this.excludeId,
            add: this.add,
            filters: this.filters
        });
    }
    // override
    async isBlank(renderType = 'create') {
        const value = await this.getCurrentValue(renderType);
        if (value === undefined || value === null || value === '') {
            return true;
        }
        if (isTrue(this.supportPriority)) {
            const mappingValue = value;
            return isEmpty(mappingValue.mapped);
        }
        else {
            const mappingValue = value;
            return isEmpty(mappingValue.mapped);
        }
    }
}
//# sourceMappingURL=XrefMappingField.js.map