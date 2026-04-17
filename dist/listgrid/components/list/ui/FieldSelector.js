'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright (c) "2025". gjcu.ac.kr by GJCU
 * Licensed under the GJCU Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by GJCU
 */
import { memo, useCallback, useMemo, useState } from 'react';
import { getTranslation } from '../../../utils/i18n';
import { IconCheck, IconSearch } from '@tabler/icons-react';
/**
 * Field selector component for choosing which fields to display in advanced search
 */
const FieldSelectorInner = ({ availableFields, selectedFieldNames, onToggleField, onSelectAll, onDeselectAll, }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const { t } = getTranslation();
    // Filter fields based on search query
    const filteredFields = useMemo(() => {
        if (!searchQuery.trim()) {
            return availableFields;
        }
        const query = searchQuery.toLowerCase();
        return availableFields.filter((field) => {
            const label = field.viewLabel(t);
            const name = field.getName();
            return ((typeof label === 'string' && label.toLowerCase().includes(query)) ||
                name.toLowerCase().includes(query));
        });
    }, [availableFields, searchQuery, t]);
    const handleSearchChange = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);
    // availableFields에 포함된 필드 중 선택된 것만 카운트
    // (통합검색 모드에서 quickSearch 필드가 제외될 때 정확한 숫자 표시)
    const selectedCount = availableFields.filter(field => selectedFieldNames.has(field.getName())).length;
    const totalCount = availableFields.length;
    return (_jsxs("div", { className: "border border-gray-200 rounded-lg bg-white", children: [_jsxs("div", { className: "flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors", onClick: () => setIsExpanded(!isExpanded), children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: "\uAC80\uC0C9 \uD544\uB4DC \uC120\uD0DD" }), _jsxs("span", { className: "text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full", children: [selectedCount, "/", totalCount] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [!isExpanded && selectedCount > 0 && (_jsxs("span", { className: "text-xs text-gray-500", children: [selectedCount, "\uAC1C \uC120\uD0DD\uB428"] })), _jsx("button", { type: "button", className: "p-1 hover:bg-gray-100 rounded transition-colors", "aria-label": isExpanded ? '접기' : '펼치기', children: _jsx("svg", { className: `w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) }) })] })] }), isExpanded && (_jsxs("div", { className: "border-t border-gray-200", children: [_jsxs("div", { className: "px-3 py-2 border-b border-gray-100 flex items-center gap-2", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(IconSearch, { className: "absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }), _jsx("input", { type: "text", placeholder: "\uD544\uB4DC \uAC80\uC0C9...", value: searchQuery, onChange: handleSearchChange, className: "w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" })] }), _jsx("button", { type: "button", onClick: onSelectAll, className: "text-xs text-primary hover:text-primary-dark px-2 py-1 hover:bg-primary/5 rounded transition-colors", children: "\uC804\uCCB4 \uC120\uD0DD" }), _jsx("button", { type: "button", onClick: onDeselectAll, className: "text-xs text-gray-500 hover:text-gray-700 px-2 py-1 hover:bg-gray-100 rounded transition-colors", children: "\uC804\uCCB4 \uD574\uC81C" })] }), _jsxs("div", { className: "max-h-48 overflow-y-auto", children: [_jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 p-2", children: filteredFields.map((field) => {
                                    const fieldName = field.getName();
                                    const isSelected = selectedFieldNames.has(fieldName);
                                    return (_jsxs("button", { type: "button", onClick: () => onToggleField(fieldName), className: `flex items-center gap-1.5 px-2 py-1.5 text-xs rounded transition-colors text-left ${isSelected
                                            ? 'bg-primary/10 text-primary border border-primary/30'
                                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'}`, children: [_jsx("span", { className: `flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center ${isSelected
                                                    ? 'bg-primary border-primary'
                                                    : 'border-gray-300'}`, children: isSelected && _jsx(IconCheck, { className: "w-3 h-3 text-white" }) }), _jsx("span", { className: "truncate", children: field.viewLabel(t) })] }, fieldName));
                                }) }), filteredFields.length === 0 && (_jsx("div", { className: "text-center py-4 text-sm text-gray-500", children: "\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4" }))] })] }))] }));
};
export const FieldSelector = memo(FieldSelectorInner);
FieldSelector.displayName = 'FieldSelector';
//# sourceMappingURL=FieldSelector.js.map