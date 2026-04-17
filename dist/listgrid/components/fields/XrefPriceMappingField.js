import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { FormField } from './abstract';
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
import { isEmpty } from "../../utils";
import { XrefPriceMappingView } from './view/XrefPiceMappingView';
export class XrefPriceMappingField extends FormField {
    constructor(name, order, props) {
        super(name, order, 'xrefMapping');
        this.entityForm = props.entityForm;
        this.helpText = '이 정보를 변경한 후 반드시 저장 버튼을 눌러야 변경 사항이 반영됩니다.';
        this.initPrice = props.initPrice;
        this.priceHelpText = props.priceHelpText;
        this.filterItems = props.filterItems;
    }
    static create(props) {
        return new XrefPriceMappingField(props.name, props.order, {
            entityForm: props.entityForm,
            initPrice: props.initPrice,
            priceHelpText: props.priceHelpText,
            filterItems: props.filterItems
        })
            .copyFields(props, true);
    }
    /**
     * XrefPriceMappingField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    renderInstance(params) {
        return (async () => {
            return _jsx(XrefPriceMappingView, { ...await getInputRendererParameters(this, { ...params }), priceHelpText: this.priceHelpText, initPrice: this.initPrice, parentEntityForm: params.entityForm, filters: this.filterItems, entityForm: this.entityForm });
        })();
    }
    /**
     * XrefPriceMappingField 인스턴스 생성
     */
    createInstance(name, order) {
        return new XrefPriceMappingField(name, order, {
            entityForm: this.entityForm,
            initPrice: this.initPrice,
            priceHelpText: this.priceHelpText,
            filterItems: this.filterItems
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
    withFilterItem(filterItems) {
        this.filterItems = filterItems;
        return this;
    }
}
//# sourceMappingURL=XrefPriceMappingField.js.map