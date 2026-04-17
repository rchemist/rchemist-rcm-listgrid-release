import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { AbstractDateField } from './abstract';
import { fDate, fDateTime, fToNow } from "../../misc";
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
import { FlatPickrDateField } from "../../ui";
import { isTrue } from '../../utils/BooleanUtil';
import { DatetimeFilter } from './filter/DatetimeFilter';
import { isBlank } from '../../utils/StringUtil';
import { Tooltip } from "../../ui";
import { TextInput } from "../../ui";
export class DatetimeField extends AbstractDateField {
    constructor(name, order, limit, range) {
        super(name, order, 'date', limit, range);
    }
    async getCurrentValue(renderType) {
        const value = await super.getCurrentValue(renderType);
        if (value === 'today') {
            if (isTrue(this.range)) {
                const today = new Date();
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1);
                return [
                    fDate(today, `yyyy-MM-dd HH:mm`),
                    fDate(tomorrow, `yyyy-MM-dd HH:mm`)
                ];
            }
            return fDate(new Date(), `yyyy-MM-dd'T'HH:mm`);
        }
        return value;
    }
    /**
     * DatetimeField 핵심 렌더링 로직
     */
    renderInstance(params) {
        return (async () => {
            const readonly = isTrue(this.readonly);
            const value = (await this.getCurrentValue(params.entityForm.getRenderType())) + '';
            if (readonly) {
                return _jsx(TextInput, { name: `${this.name}_${params.entityForm.id}`, readonly: true, onChange: () => {
                        // do nothing
                    }, value: fDateTime(value) });
            }
            else {
                return _jsx(FlatPickrDateField, { type: 'datetime', limit: this.limit, range: this.range, ...await getInputRendererParameters(this, params) });
            }
        })();
    }
    /**
     * DatetimeField 핵심 리스트 필터 렌더링 로직
     */
    renderListFilterInstance(params) {
        return (async () => {
            return _jsx(DatetimeFilter, { ...params, name: this.getName(), limit: this.limit });
        })();
    }
    /**
     * DatetimeField 핵심 리스트 아이템 렌더링 로직
     */
    renderListItemInstance(props) {
        if (this.range) {
            const value = props.item[this.name];
            if (value == undefined) {
                return Promise.resolve({ result: '' });
            }
            else {
                return Promise.resolve({ result: `${fDateTime(value[0])} ~ ${fDateTime(value[1])}` });
            }
        }
        else {
            const viewRaw = isTrue(this.listConfig?.viewRaw);
            if (viewRaw) {
                return Promise.resolve({ result: fDate(props.item[this.name]) });
            }
            else {
                const value = fToNow(props.item[this.name]) ?? '';
                if (isBlank(value)) {
                    return Promise.resolve({ result: '' });
                }
                else {
                    return Promise.resolve({ result: _jsx(Tooltip, { label: `${fDateTime(props.item[this.name])}`, children: _jsx("span", { children: value }) }) });
                }
            }
        }
    }
    /**
     * DatetimeField 인스턴스 생성
     */
    createInstance(name, order) {
        return new DatetimeField(name, order, this.limit, this.range);
    }
    static create(props) {
        return new DatetimeField(props.name, props.order, props.limit, props.range).copyFields(props, true);
    }
}
//# sourceMappingURL=DatetimeField.js.map