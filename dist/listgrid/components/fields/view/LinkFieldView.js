/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { readonlyClass } from "../../../ui";
import { Tooltip } from "../../../ui";
import { IconExternalLink } from "@tabler/icons-react";
import { isBlank } from '../../../utils/StringUtil';
import { normalizeUrl } from "../../../misc";
export const LinkFieldView = (props) => {
    const [value, setValue] = useState(props.value ?? '');
    useEffect(() => {
        setValue(props.value);
    }, [props.value]);
    const input = _jsx("input", { type: 'text', className: readonlyClass(props.readonly, `form-input ${!isBlank(value) ? ' rounded-r-none border-r-0' : ''} ${props.className}`), id: `${props.name}`, value: value ?? '', placeholder: props.placeHolder, disabled: props.readonly, min: props.min, max: props.max, onChange: (e) => {
            const value = e.target.value ?? '';
            setValidatedValue(props, value, setValue);
        } });
    if (props.tooltip !== undefined) {
        return _jsx(Tooltip, { label: props.tooltip.label, color: props.tooltip.color, children: _jsx("div", { className: "flex w-full", children: _jsxs("div", { className: "flex w-full items-center", children: [_jsx("div", { className: "group relative flex w-full", children: _jsx("div", { className: "dropdown flex w-full", children: input }) }), !isBlank(value) && (_jsx("button", { type: "button", className: "flex h-full min-w-[40px] cursor-pointer items-center justify-center space-x-1 whitespace-nowrap border border-secondary bg-secondary px-2 font-semibold text-white hover:bg-secondary/85 disabled:opacity-20 dark:border-[#17263c] rounded-r-md border-l-0", onClick: () => {
                                window.open(normalizeUrl(value), "_blank");
                            }, children: _jsx(IconExternalLink, { className: "h-4 w-4" }) }))] }) }) });
    }
    return (_jsx("div", { className: "flex w-full", children: _jsxs("div", { className: "flex w-full items-center", children: [_jsx("div", { className: "group relative flex w-full", children: _jsx("div", { className: "dropdown flex w-full", children: input }) }), !isBlank(value) && (_jsx("button", { type: "button", className: "flex h-full min-w-[40px] cursor-pointer items-center justify-center space-x-1 whitespace-nowrap border border-secondary bg-secondary px-2 font-semibold text-white hover:bg-secondary/85 disabled:opacity-20 dark:border-[#17263c] rounded-r-md border-l-0", onClick: () => {
                        window.open(normalizeUrl(value), "_blank");
                    }, children: _jsx(IconExternalLink, { className: "h-4 w-4" }) }))] }) }));
};
function setValidatedValue(props, value, setValue) {
    let acceptable = true;
    let errorMessage = 'form.save.error.invalid';
    if (props.regex !== undefined) {
        acceptable = props.regex.pattern.test(value);
        errorMessage = props.regex.message;
    }
    setValue(value);
    props.onChange(value, false);
    if (!acceptable) {
        setTimeout(() => {
            props.onError?.(errorMessage);
        }, 50);
    }
}
//# sourceMappingURL=LinkFieldView.js.map