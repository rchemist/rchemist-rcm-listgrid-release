import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { AbstractDateField } from './abstract';
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
import { fDate } from "../../misc";
import { FlatPickrDateField } from "../../ui";
import { IconCalendar } from "@tabler/icons-react";
import { isTrue } from '../../utils/BooleanUtil';
import { TextInput } from "../../ui";
export class DateField extends AbstractDateField {
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
                    fDate(today),
                    fDate(tomorrow)
                ];
            }
            return fDate(new Date());
        }
        return value;
    }
    /**
     * DateField 핵심 렌더링 로직
     */
    renderInstance(params) {
        return (async () => {
            const readonly = isTrue(this.readonly);
            let value = (await this.getCurrentValue(params.entityForm.getRenderType()));
            if (value) {
                if (this.range && Array.isArray(value)) {
                    value = `${fDate(value[0])} ~ ${fDate(value[1])}`;
                }
                else {
                    value = fDate(value + '');
                }
            }
            if (readonly) {
                return _jsx(TextInput, { name: `${this.name}_${params.entityForm.id}`, readonly: true, onChange: (value) => {
                        // do nothing
                    }, value: value });
            }
            return _jsx(FlatPickrDateField, { type: 'date', limit: this.limit, range: this.range, ...await getInputRendererParameters(this, params) });
        })();
    }
    /**
     * DateField 핵심 리스트 필터 렌더링 로직
     */
    renderListFilterInstance(params) {
        return (async () => {
            return _jsx(FlatPickrDateField, { type: 'date', name: this.getName(), onChange: (value) => {
                    if (Array.isArray(value) && value.length === 2) {
                        if (value[0] === value[1]) {
                            const until = new Date(value[1]);
                            until.setDate(until.getDate() + 1);
                            params.onChange([value[0], fDate(until, `yyyy-MM-dd`)], "BETWEEN");
                        }
                        else {
                            params.onChange(value, "BETWEEN");
                        }
                        return;
                    }
                }, limit: this.limit, range: true, value: params.value });
        })();
    }
    /**
     * DateField 핵심 리스트 아이템 렌더링 로직
     */
    renderListItemInstance(props) {
        const value = props.item[this.name];
        if (this.range && Array.isArray(value) && value.length === 2) {
            return Promise.resolve({
                result: `${fDate(value[0], 'yyyy-MM-dd')} ~ ${fDate(value[1], 'yyyy-MM-dd')}`
            });
        }
        return Promise.resolve({ result: fDate(value ?? '', 'yyyy-MM-dd') });
    }
    /**
     * DateField View 모드 렌더링 - 날짜 포맷팅 및 캘린더 아이콘 적용
     * cardIcon이 설정된 경우 해당 아이콘을 우선 사용
     */
    async renderViewInstance(props) {
        const value = props.item[this.name];
        // null, undefined, 빈 문자열 처리
        if (value === null || value === undefined || value === '') {
            return { result: null };
        }
        // 아이콘 컴포넌트 결정 (cardIcon > 기본 캘린더 아이콘)
        const IconComponent = this.cardIcon || IconCalendar;
        const iconColorClass = this.cardIcon
            ? 'text-gray-400 dark:text-gray-500'
            : 'text-sky-500 dark:text-sky-400';
        // range 타입인 경우 시작~끝 포맷
        if (this.range && Array.isArray(value) && value.length === 2) {
            const dateText = `${fDate(value[0], 'yyyy-MM-dd')} ~ ${fDate(value[1], 'yyyy-MM-dd')}`;
            return {
                result: (_jsxs("span", { className: "inline-flex items-center gap-2 text-gray-700 dark:text-gray-300", children: [_jsx("span", { className: "flex items-center justify-center w-6 h-6 rounded-md bg-sky-50 dark:bg-sky-950/50", children: _jsx(IconComponent, { className: `h-3.5 w-3.5 ${iconColorClass} shrink-0`, stroke: 1.75 }) }), _jsx("span", { className: "font-medium", children: dateText })] }))
            };
        }
        // 일반 날짜: yyyy-MM-dd 포맷으로 표시 (캘린더 아이콘 포함)
        const dateText = fDate(value, 'yyyy-MM-dd');
        return {
            result: (_jsxs("span", { className: "inline-flex items-center gap-2 text-gray-700 dark:text-gray-300", children: [_jsx("span", { className: "flex items-center justify-center w-6 h-6 rounded-md bg-sky-50 dark:bg-sky-950/50", children: _jsx(IconComponent, { className: `h-3.5 w-3.5 ${iconColorClass} shrink-0`, stroke: 1.75 }) }), _jsx("span", { className: "font-medium", children: dateText })] }))
        };
    }
    /**
     * DateField 인스턴스 생성
     */
    createInstance(name, order) {
        return new DateField(name, order, this.limit, this.range);
    }
    static create(props) {
        return new DateField(props.name, props.order, props.limit, props.range)
            .copyFields(props, true);
    }
}
//# sourceMappingURL=DateField.js.map