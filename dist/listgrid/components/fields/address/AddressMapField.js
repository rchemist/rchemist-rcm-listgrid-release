/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { FormField } from '../abstract';
import { getInputRendererParameters } from '../../helper/FieldRendererHelper';
import { AddressFieldView } from "./AddressFieldView";
export class AddressMapField extends FormField {
    constructor(name, order, showMap, prefix) {
        super(name, order, 'custom');
        this.showMap = showMap;
        this.prefix = prefix;
    }
    static create(props) {
        return new AddressMapField(props.name, props.order, props.showMap, props.prefix);
    }
    /**
     * AddressMapField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    renderInstance(params) {
        return (async () => {
            return _jsx(AddressFieldView, { ...await getInputRendererParameters(this, { ...params }), showMap: this.showMap, prefix: this.prefix });
        })();
    }
    /**
     * AddressMapField 인스턴스 생성
     */
    createInstance(name, order) {
        return new AddressMapField(name, order, this.showMap);
    }
    withPrefix(prefix) {
        this.prefix = prefix;
        return this;
    }
    copyFields(origin, includeValue = true) {
        super.copyFields(origin, includeValue);
        this.prefix = origin.prefix;
        this.showMap = origin.showMap;
        return this;
    }
}
export function appendLastDot(str) {
    if (!str || str.length === 0) {
        return '';
    }
    if (str.endsWith('.')) {
        return str;
    }
    return str + '.';
}
//# sourceMappingURL=AddressMapField.js.map