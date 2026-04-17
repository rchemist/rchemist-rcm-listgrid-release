import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { AbstractDateField } from './abstract';
import { isTrue } from '../../utils/BooleanUtil';
import { getFormattedTime } from "../../misc";
import { FlatPickrDateField } from "../../ui";
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
export class TimeField extends AbstractDateField {
    constructor(name, order, limit, range) {
        super(name, order, 'time', limit, range);
    }
    async getCurrentValue(renderType) {
        const value = await super.getCurrentValue(renderType);
        if (value === 'now') {
            if (isTrue(this.range)) {
                const now = getFormattedTime();
                const after = getFormattedTime(new Date(), 12);
                return [
                    now,
                    after
                ];
            }
            return getFormattedTime();
        }
        return value;
    }
    /**
     * TimeField 핵심 렌더링 로직
     */
    renderInstance(params) {
        return (async () => {
            return _jsx(FlatPickrDateField, { type: 'time', limit: this.limit, range: this.range, ...await getInputRendererParameters(this, params) });
        })();
    }
    /**
     * TimeField 인스턴스 생성
     */
    createInstance(name, order) {
        return new TimeField(name, order, this.limit, this.range);
    }
    static create(props) {
        return new TimeField(props.name, props.order, props.limit, props.range)
            .copyFields(props, true);
    }
}
//# sourceMappingURL=TimeField.js.map