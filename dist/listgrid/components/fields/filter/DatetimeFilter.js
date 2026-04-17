'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { useEffect, useState } from "react";
import { fDate, getDefinedDates } from "../../../misc";
import { FlatPickrDateField } from "../../../ui";
import { SafePerfectScrollbar } from "../../../ui";
export const DatetimeFilter = (props) => {
    const [value, setValue] = useState();
    function handleValueChange(type) {
        const values = getDefinedDates(type);
        props.onChange(values, 'BETWEEN');
        setValue(values);
    }
    useEffect(() => {
        setValue(props.value);
    }, [props.value]);
    return _jsxs("div", { children: [_jsx(FlatPickrDateField, { type: 'date', name: props.name, onChange: (val => {
                    if (Array.isArray(val) && val.length === 2) {
                        if (val[0] === val[1]) {
                            const until = new Date(val[1]);
                            until.setDate(until.getDate() + 1);
                            props.onChange([val[0], fDate(until, `yyyy-MM-dd`)], "BETWEEN");
                        }
                        else {
                            props.onChange(val, "BETWEEN");
                        }
                        return;
                    }
                }), limit: props.limit, range: true, value: value }), _jsx("div", { className: "block md:hidden", children: _jsx(SafePerfectScrollbar, { className: "perfect-scrollbar relative w-full -mr-3 pr-3", children: showButtons() }) }), _jsx("div", { className: "hidden md:block", children: showButtons() })] });
    function showButtons() {
        return _jsxs("div", { className: 'flex gap-3 mt-2', children: [_jsx("button", { className: 'btn-sm border rounded-md flex items-center max-h-[24px] btn-outline-primary whitespace-nowrap', onClick: () => {
                        handleValueChange('TODAY');
                    }, children: "\uC624\uB298" }), _jsx("button", { className: 'btn-sm border rounded-md flex items-center max-h-[24px] btn-outline-primary whitespace-nowrap', onClick: () => { handleValueChange('WEEK'); }, children: "1\uC8FC\uC77C" }), _jsx("button", { className: 'btn-sm border rounded-md flex items-center max-h-[24px] btn-outline-primary whitespace-nowrap', onClick: () => { handleValueChange('MONTH'); }, children: "1\uAC1C\uC6D4" }), _jsx("button", { className: 'btn-sm border rounded-md flex items-center max-h-[24px] btn-outline-primary whitespace-nowrap', onClick: () => { handleValueChange('MONTH3'); }, children: "3\uAC1C\uC6D4" }), _jsx("button", { className: 'btn-sm border rounded-md flex items-center max-h-[24px] btn-outline-primary whitespace-nowrap', onClick: () => { handleValueChange('MONTH6'); }, children: "6\uAC1C\uC6D4" }), _jsx("button", { className: 'btn-sm border rounded-md flex items-center max-h-[24px] btn-outline-primary whitespace-nowrap', onClick: () => { handleValueChange('YEAR'); }, children: "1\uB144" })] });
    }
};
//# sourceMappingURL=DatetimeFilter.js.map