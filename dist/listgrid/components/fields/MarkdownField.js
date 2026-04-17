import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { FormField } from './abstract';
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
import { MarkdownEditor } from "../../ui";
import { isEquals } from "../../misc";
import { isBlank } from '../../utils/StringUtil';
export class MarkdownField extends FormField {
    constructor(name, order) {
        super(name, order, 'markdown');
    }
    /**
     * MarkdownField 핵심 렌더링 로직
     */
    renderInstance(params) {
        return (async () => {
            return _jsx(MarkdownEditor, { ...await getInputRendererParameters(this, params) });
        })();
    }
    /**
     * MarkdownField 인스턴스 생성
     */
    createInstance(name, order) {
        return new MarkdownField(name, order);
    }
    isEqualsOrEmpty(value) {
        if (isBlank(value))
            return true;
        return value === '<p><br></p>' || value === '<p></p>';
    }
    isDirty() {
        if (this.value) {
            const isNullDefaultValue = this.isEqualsOrEmpty(this.value.default);
            const isNullFetchedValue = this.isEqualsOrEmpty(this.value.fetched);
            const isNullCurrentValue = this.isEqualsOrEmpty(this.value.current);
            if (isNullDefaultValue
                && isNullFetchedValue
                && isNullCurrentValue) {
                return false;
            }
            if (this.value.fetched !== undefined) {
                // fetch 된 값이 존재할 때는 fetched 된 값과 비교한다.
                if (isNullFetchedValue && isNullCurrentValue) {
                    return false;
                }
                return !isEquals(this.value.fetched, this.value.current);
            }
            else {
                // fetch 된 값이 없을 때는 default 값과 비교한다.
                if (isNullDefaultValue && isNullCurrentValue) {
                    return false;
                }
                return !isEquals(this.value.default, this.value.current);
            }
        }
        return false;
    }
    static create(props) {
        return new MarkdownField(props.name, props.order).copyFields(props);
    }
}
//# sourceMappingURL=MarkdownField.js.map