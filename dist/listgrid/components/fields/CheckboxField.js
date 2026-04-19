import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { MultipleOptionalField, renderListMultipleOptionalField, } from './abstract';
import { CheckBox } from '../../ui';
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
export class CheckboxField extends MultipleOptionalField {
    constructor(name, order, options, limit) {
        super(name, order, 'checkbox', options, limit);
    }
    /**
     * CheckboxField 핵심 렌더링 로직
     */
    renderInstance(params) {
        return (async () => {
            const cacheKey = this.createCacheKey();
            return (_jsx(CheckBox, { limit: this.limit, combo: this.combo, options: this.options ?? [], ...await getInputRendererParameters(this, params) }, cacheKey));
        })();
    }
    /**
     * CheckboxField 핵심 리스트 아이템 렌더링 로직
     */
    renderListItemInstance(props) {
        return renderListMultipleOptionalField(this, props);
    }
    /**
     * CheckboxField 인스턴스 생성
     */
    createInstance(name, order) {
        return new CheckboxField(name, order, this.options, this.limit);
    }
    static create(props) {
        return new CheckboxField(props.name, props.order, props.options, props.limit).copyFields(props, true);
    }
}
//# sourceMappingURL=CheckboxField.js.map