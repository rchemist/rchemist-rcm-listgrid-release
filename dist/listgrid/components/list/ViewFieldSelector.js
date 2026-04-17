import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import React from "react";
import { Popover } from "../../ui";
import { Tooltip } from "../../ui";
import { getTranslation } from "../../utils/i18n";
import { setListFieldsToCache } from '../../config/ListGridViewFieldCache';
export const ViewFieldSelector = ({ viewFields, setViewFields, ...props }) => {
    const { t } = getTranslation();
    const fields = props.fields;
    function isChecked(fieldName) {
        return viewFields.length === 0 || viewFields.includes(fieldName);
    }
    const syncViewFieldsToCache = (fieldName) => {
        let newFieldNames = [...viewFields];
        if (viewFields.length === 0) {
            // find field.name except equals fieldName
            newFieldNames = fields.map(field => field.name);
            newFieldNames.splice(newFieldNames.indexOf(fieldName), 1);
            if (newFieldNames.length === 0) {
                // 건드리면 안 된다.
                return;
            }
        }
        else {
            const index = newFieldNames.indexOf(fieldName);
            if (index === -1) {
                newFieldNames.push(fieldName);
            }
            else {
                // remove from viewFields
                newFieldNames.splice(index, 1);
            }
        }
        setViewFields?.([...newFieldNames]);
        // localStorage에 저장
        setListFieldsToCache(props.entityUrl, props.subCollectionName, newFieldNames);
    };
    if (fields.length < 2) {
        // 필드 셀렉터를 표시하지 않는다.
        return null;
    }
    const maxWidth = `max-w-[240px] sm:max-w-none`;
    const gridCols = `grid-cols-2 sm:grid-cols-3`;
    return _jsx(React.Fragment, { children: _jsxs(Popover, { position: 'bottom', shadow: 'md', closeOnClickOutside: true, children: [_jsx(Popover.Target, { children: _jsx(Tooltip, { label: '원하는 필드만 표시할 수 있습니다.', children: _jsx("button", { className: 'btn btn-outline-primary whitespace-nowrap', disabled: props.disabled, children: "\uBAA9\uB85D \uC124\uC815" }) }) }), _jsx(Popover.Dropdown, { children: _jsx("div", { className: `w-full grid ${gridCols} gap-2 ${maxWidth} p-4`, children: fields.map(field => {
                            const checked = isChecked(field.name);
                            return (_jsx("div", { className: 'flex whitespace-nowrap space-x-2 mr-2', children: _jsxs("label", { className: 'cursor-pointer !font-normal !text-sm text-gray-700 dark:text-gray-200', children: [_jsx("input", { type: 'checkbox', className: 'form-checkbox !w-4 !h-4', checked: checked, onChange: () => syncViewFieldsToCache(field.getName()) }), _jsx("span", { className: "whitespace-nowrap", children: field.viewLabel(t) })] }) }, `checkbox_${field.getName()}`));
                        }) }) })] }) });
};
//# sourceMappingURL=ViewFieldSelector.js.map