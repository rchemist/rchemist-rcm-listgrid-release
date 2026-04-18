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
    return (_jsxs("div", { className: "rcm-field-selector", children: [_jsxs("div", { className: "rcm-field-selector-header", onClick: () => setIsExpanded(!isExpanded), children: [_jsxs("div", { className: "rcm-field-selector-header-left", children: [_jsx("span", { className: "rcm-text", "data-weight": "medium", children: "\uAC80\uC0C9 \uD544\uB4DC \uC120\uD0DD" }), _jsxs("span", { className: "rcm-badge", "data-color": "primary", "data-size": "sm", children: [selectedCount, "/", totalCount] })] }), _jsxs("div", { className: "rcm-field-selector-header-right", children: [!isExpanded && selectedCount > 0 && (_jsxs("span", { className: "rcm-text", "data-size": "xs", "data-tone": "muted", children: [selectedCount, "\uAC1C \uC120\uD0DD\uB428"] })), _jsx("button", { type: "button", className: "rcm-icon-btn", "data-size": "sm", "aria-label": isExpanded ? '접기' : '펼치기', children: _jsx("svg", { className: `rcm-icon ${isExpanded ? 'rcm-rotate-180' : ''}`, "data-size": "sm", "data-tone": "muted", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) }) })] })] }), isExpanded && (_jsxs("div", { className: "rcm-field-selector-body", children: [_jsxs("div", { className: "rcm-field-selector-search-row", children: [_jsxs("div", { className: "rcm-field-selector-search-input-wrap", children: [_jsx(IconSearch, { className: "rcm-icon rcm-field-selector-search-icon", "data-size": "sm", "data-tone": "muted" }), _jsx("input", { type: "text", placeholder: "\uD544\uB4DC \uAC80\uC0C9...", value: searchQuery, onChange: handleSearchChange, className: "rcm-input", "data-size": "sm" })] }), _jsx("button", { type: "button", onClick: onSelectAll, className: "rcm-button", "data-variant": "ghost", "data-size": "sm", children: "\uC804\uCCB4 \uC120\uD0DD" }), _jsx("button", { type: "button", onClick: onDeselectAll, className: "rcm-button", "data-variant": "ghost", "data-size": "sm", children: "\uC804\uCCB4 \uD574\uC81C" })] }), _jsxs("div", { className: "rcm-field-selector-list", children: [_jsx("div", { className: "rcm-field-selector-grid", children: filteredFields.map((field) => {
                                    const fieldName = field.getName();
                                    const isSelected = selectedFieldNames.has(fieldName);
                                    return (_jsxs("button", { type: "button", onClick: () => onToggleField(fieldName), className: "rcm-chip", "data-interactive": true, "data-state": isSelected ? 'selected' : undefined, children: [_jsx("span", { className: `rcm-field-selector-chip-check ${isSelected ? 'rcm-field-selector-chip-check-selected' : ''}`, children: isSelected && _jsx(IconCheck, { className: "rcm-icon rcm-field-selector-chip-check-icon", "data-size": "xs" }) }), _jsx("span", { className: "rcm-truncate", children: field.viewLabel(t) })] }, fieldName));
                                }) }), filteredFields.length === 0 && (_jsx("span", { className: "rcm-text rcm-field-selector-empty", "data-tone": "muted", children: "\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4" }))] })] }))] }));
};
export const FieldSelector = memo(FieldSelectorInner);
FieldSelector.displayName = 'FieldSelector';
//# sourceMappingURL=FieldSelector.js.map