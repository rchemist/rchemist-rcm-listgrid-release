import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { FormField } from './abstract';
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
import { XrefPreferMappingView } from './view/XrefPreferMappingView';
import { isEmpty } from "../../utils";
export class XrefPreferMappingField extends FormField {
    constructor(props) {
        super(props.name, props.order, 'xrefMapping');
        this.entityForm = props.entityForm;
        this.helpText = '이 정보를 변경한 후 반드시 저장 버튼을 눌러야 변경 사항이 반영됩니다.';
        this.showPreferred = props.showPreferred;
        this.filters = props.filters;
        this.preferredLabel = props.preferredLabel;
    }
    static create(props) {
        return new XrefPreferMappingField(props)
            .copyFields(props, true);
    }
    /**
     * XrefPreferMappingField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    renderInstance(params) {
        return (async () => {
            return _jsx(XrefPreferMappingView, { ...await getInputRendererParameters(this, { ...params }), showPreferred: this.showPreferred, entityForm: this.entityForm, parentEntityForm: params.entityForm, filters: this.filters, preferredLabel: this.preferredLabel });
        })();
    }
    /**
     * XrefPreferMappingField 인스턴스 생성
     */
    createInstance(name, order) {
        return new XrefPreferMappingField({
            name,
            order,
            entityForm: this.entityForm,
            showPreferred: this.showPreferred,
            filters: this.filters,
            preferredLabel: this.preferredLabel
        });
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
    withPreferredLabel(preferredLabel) {
        this.preferredLabel = preferredLabel;
        return this;
    }
}
//# sourceMappingURL=XrefPreferMappingField.js.map