import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { ListableFormField } from './abstract';
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
import { NumberInput } from "../../ui";
import { SelectBox } from "../../ui";
import { MultiSelectBox } from "../../ui";
export class YearField extends ListableFormField {
    constructor(name, order, limit) {
        super(name, order, 'year');
        // min/max 기본값 설정: 전달되지 않은 경우 기본값 사용
        const defaultMin = 1900;
        const defaultMax = new Date().getFullYear();
        this.limit = {
            min: limit?.min ?? defaultMin,
            max: limit?.max ?? defaultMax
        };
    }
    /**
     * YearField 핵심 렌더링 로직
     */
    renderInstance(params) {
        return (async () => {
            if (this.limit) {
                const options = [];
                const min = this.limit.min;
                const max = this.limit.max;
                // loop min to max
                for (let i = min; i <= max; i++) {
                    options.push({ value: `${i}`, label: `${i}` });
                }
                // sort by value desc
                options.sort((a, b) => b.value - a.value);
                return _jsx(SelectBox, { options: options, ...await getInputRendererParameters(this, params) });
            }
            return _jsx(NumberInput, { limit: this.limit, ...await getInputRendererParameters(this, params) });
        })();
    }
    /**
     * YearField 리스트 필터 렌더링 로직
     * 복수 년도 선택이 가능한 MultiSelectBox로 렌더링
     */
    renderListFilterInstance(params) {
        return (async () => {
            if (this.limit) {
                const options = [];
                const min = this.limit.min;
                const max = this.limit.max;
                for (let i = min; i <= max; i++) {
                    options.push({ value: `${i}`, label: `${i}` });
                }
                // sort by value desc (최신 년도가 위로)
                options.sort((a, b) => Number(b.value) - Number(a.value));
                return _jsx(MultiSelectBox, { options: options, ...await getInputRendererParameters(this, {
                        ...params,
                        required: false,
                        onChange: (value) => params.onChange(value, 'IN')
                    }) });
            }
            return null;
        })();
    }
    /**
     * YearField 인스턴스 생성
     */
    createInstance(name, order) {
        return new YearField(name, order, this.limit);
    }
    /**
     * YearField 목록 필드 설정
     * MultiSelectBox를 사용하므로 multiFilter를 true로 설정
     */
    useListField(props) {
        if (typeof props === 'number') {
            props = { order: props };
        }
        this.listConfig = {
            ...this.listConfig,
            support: true,
            order: props?.order,
            multiFilter: true,
            op: 'IN',
            sortable: props?.sortable,
            filterable: props?.filterable
        };
        return this;
    }
    withLimit(limit) {
        const defaultMin = 1900;
        const defaultMax = new Date().getFullYear();
        this.limit = {
            min: limit?.min ?? defaultMin,
            max: limit?.max ?? defaultMax
        };
        return this;
    }
    static create(props) {
        return new YearField(props.name, props.order, props.limit)
            .copyFields(props, true);
    }
}
//# sourceMappingURL=YearField.js.map