import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { FormField } from './abstract';
import { InlineMap } from "../../ui";
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
export class InlineMapField extends FormField {
    constructor(name, order, config) {
        super(name, order, 'inlineMap');
        this.pendingRef = { current: { value: undefined, modified: false } };
        this.config = config;
    }
    isDirty() {
        if (this.pendingRef.current.modified) {
            return true;
        }
        return super.isDirty();
    }
    async getSaveValue(entityForm, renderType) {
        if (this.pendingRef.current.modified) {
            return this.pendingRef.current.value;
        }
        return super.getSaveValue(entityForm, renderType);
    }
    /**
     * InlineMapField 핵심 렌더링 로직
     */
    renderInstance(params) {
        return (async () => {
            return _jsx(InlineMap, { config: this.config, pendingRef: this.pendingRef, ...await getInputRendererParameters(this, params) });
        })();
    }
    /**
     * InlineMapField 인스턴스 생성
     */
    createInstance(name, order) {
        const instance = new InlineMapField(name, order, this.config);
        instance.pendingRef = this.pendingRef;
        return instance;
    }
    withKeys(keys) {
        this.config = { keys: keys, limit: this.config?.limit, resultType: this.config?.resultType };
        return this;
    }
    useResultMap() {
        this.config = { keys: this.config?.keys, limit: this.config?.limit, resultType: 'Map' };
        return this;
    }
    useKeyValue() {
        this.config = { keys: this.config?.keys, limit: this.config?.limit, resultType: 'KeyValue' };
        return this;
    }
    withLimit(limit) {
        this.config = { keys: this.config?.keys, limit: limit, resultType: this.config?.resultType };
        return this;
    }
    withConfig(config) {
        this.config = config;
        return this;
    }
    /**
     * Map 형태 또는 KeyValue[] 형태를 모두 지원한다.
     * @param value
     */
    withDefaultValue(value) {
        return super.withDefaultValue(value);
    }
    static create(props) {
        return new InlineMapField(props.name, props.order, props.config)
            .copyFields(props, true);
    }
}
//# sourceMappingURL=InlineMapField.js.map