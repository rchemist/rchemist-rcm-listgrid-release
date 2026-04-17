import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { FormField } from './abstract';
import { Textarea } from "../../ui";
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
export class TextareaField extends FormField {
    constructor(name, order, rows, limit) {
        super(name, order, 'textarea');
        this.rows = rows ?? 10; // 기본 10줄 표시
        this.limit = limit;
    }
    async getCurrentValue(renderType) {
        const renderTypeValue = renderType ?? 'create';
        if (this.value !== undefined) {
            return this.value?.current !== undefined ? this.value?.current :
                renderTypeValue === 'create' ? this.value?.default : this.value?.fetched;
        }
        return undefined;
    }
    /**
     * TextareaField 핵심 렌더링 로직
     */
    renderInstance(params) {
        return (async () => {
            return _jsx(Textarea, { rows: this.rows, ...await getInputRendererParameters(this, params) });
        })();
    }
    /**
     * TextareaField 인스턴스 생성
     */
    createInstance(name, order) {
        return new TextareaField(name, order, this.rows, this.limit);
    }
    withRows(rows) {
        this.rows = rows;
        return this;
    }
    withLimit(limit) {
        this.limit = limit;
        return this;
    }
    static create(props) {
        return new TextareaField(props.name, props.order, props.rows, props.limit)
            .copyFields(props, true);
    }
}
//# sourceMappingURL=TextareaField.js.map