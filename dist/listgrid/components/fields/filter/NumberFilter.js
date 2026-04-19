/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { SelectBox } from '../../../ui';
import { TextInput } from '../../../ui';
import { isBlank } from '../../../utils/StringUtil';
export const NumberFilter = (props) => {
    const [type, setType] = useState('BETWEEN');
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const filterType = getNumberFilterType(type);
    function setValue(valueType, value) {
        let startValue = start;
        let endValue = end;
        if (valueType === 'start') {
            const start = value ? Number(value) : undefined;
            setStart(start);
            startValue = start;
        }
        else {
            const end = value ? Number(value) : undefined;
            setEnd(end);
            endValue = end;
        }
        if (filterType.showEnd) {
            if (startValue !== undefined && endValue !== undefined) {
                props.onChange(type, [startValue, endValue]);
                return;
            }
            else {
                props.onRemove();
            }
        }
        else {
            if (startValue !== undefined) {
                props.onChange(type, startValue);
            }
            else {
                props.onRemove();
            }
        }
    }
    function changeType(type) {
        setType(type);
        setStart(undefined);
        setEnd(undefined);
        props.onRemove();
    }
    return (_jsxs("div", { className: 'flex w-full space-x-2', children: [_jsx("div", { className: 'w-[140px]', children: _jsx(SelectBox, { value: type, required: true, name: 'type', options: [...NumberFilterTypes], onChange: (value) => {
                        changeType(value);
                    } }) }), _jsxs("div", { className: 'w-full flex space-x-2 items-center', children: [_jsx(TextInput, { name: 'start', type: 'number', value: start ?? '', onChange: (value) => {
                            if (!isBlank(value) && isNaN(Number(value))) {
                                return;
                            }
                            setValue('start', value);
                        } }), filterType.showEnd && (_jsxs(React.Fragment, { children: [_jsx("span", { children: "~" }), _jsx(TextInput, { name: 'end', type: 'number', value: end ?? '', onChange: (value) => {
                                    if (!isBlank(value) && isNaN(Number(value))) {
                                        return;
                                    }
                                    setValue('end', value);
                                } })] }))] })] }));
};
const NumberFilterTypes = [
    { value: 'BETWEEN', label: '범위', showEnd: true },
    { value: 'EQUAL', label: '일치', showEnd: false },
    { value: 'NOT_EQUAL', label: '불일치', showEnd: false },
    { value: 'LESS_THAN', label: '미만', showEnd: false },
    { value: 'LESS_THAN_EQUAL', label: '이하', showEnd: false },
    { value: 'GREATER', label: '초과', showEnd: false },
    { value: 'GREATER_THAN_EQUAL', label: '이상', showEnd: false },
];
function getNumberFilterType(type) {
    return NumberFilterTypes.find((value) => value.value === type);
}
//# sourceMappingURL=NumberFilter.js.map