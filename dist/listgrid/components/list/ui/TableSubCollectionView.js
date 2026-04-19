'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCardSubCollectionData } from '../hooks/useCardSubCollectionData';
import { Tooltip } from '../../../ui';
import { ListableFormField } from '../../fields/abstract';
import { IconAlertCircle, IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight, IconHelp, IconRefresh, IconSearch, IconTable, IconX, } from '@tabler/icons-react';
/**
 * TableSubCollectionView
 * Displays a collection of items in a table format
 */
export const TableSubCollectionView = ({ parentEntityForm, parentId, entityForm, fetchUrl: fetchUrlProp, tableConfig, relation, readonly = false, session, fetchOptions, initialSearchForm, tooltip, }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    // Check if a field name matches mappedBy patterns
    const isMappedByField = useCallback((fieldName, mappedBy) => {
        if (fieldName === mappedBy)
            return true;
        let baseField = mappedBy;
        if (mappedBy.endsWith('Id')) {
            baseField = mappedBy.slice(0, -2);
        }
        else if (mappedBy.endsWith('.id')) {
            baseField = mappedBy.slice(0, -3);
        }
        if (fieldName === baseField)
            return true;
        if (fieldName.startsWith(baseField + '.'))
            return true;
        return false;
    }, []);
    // Build column definitions from entityForm fields
    const columns = useMemo(() => {
        const fields = Array.from(entityForm.fields.values());
        const mappedBy = relation.mappedBy;
        const displayFields = tableConfig?.displayFields;
        const excludeFields = tableConfig?.excludeFields;
        let selectedFields;
        if (displayFields && displayFields.length > 0) {
            // Use explicit displayFields order
            selectedFields = displayFields
                .map((name) => fields.find((f) => f.getName() === name))
                .filter(Boolean);
        }
        else {
            // Use list-enabled fields
            selectedFields = fields.filter((field) => {
                if (!(field instanceof ListableFormField))
                    return false;
                if (field.listConfig?.support !== true)
                    return false;
                if (isMappedByField(field.getName(), mappedBy))
                    return false;
                if (excludeFields?.includes(field.getName()))
                    return false;
                return true;
            });
        }
        return selectedFields.map((field) => {
            const label = field.getLabel();
            return {
                name: field.getName(),
                label: typeof label === 'string' ? label : field.getName(),
                options: field.options,
            };
        });
    }, [entityForm, relation.mappedBy, tableConfig, isMappedByField]);
    // quickSearch fields for search functionality
    const quickSearchFields = useMemo(() => {
        const fields = Array.from(entityForm.fields.values());
        const mappedBy = relation.mappedBy;
        return fields.filter((field) => {
            if (field.listConfig?.support !== true)
                return false;
            if (field.listConfig?.quickSearch !== true)
                return false;
            if (isMappedByField(field.getName(), mappedBy))
                return false;
            return true;
        });
    }, [entityForm, relation.mappedBy, isMappedByField]);
    const searchPlaceholder = useMemo(() => {
        if (quickSearchFields.length === 0)
            return '검색';
        const labels = quickSearchFields.slice(0, 3).map((field) => {
            const label = field.getLabel();
            return typeof label === 'string' ? label : field.getName();
        });
        return `${labels.join(', ')} 검색`;
    }, [quickSearchFields]);
    const isQuickSearchEnabled = quickSearchFields.length > 0;
    const fetchUrl = useMemo(() => {
        if (typeof fetchUrlProp === 'function') {
            return fetchUrlProp(parentEntityForm);
        }
        return fetchUrlProp;
    }, [fetchUrlProp, parentEntityForm]);
    const { data, loading, error, refresh } = useCardSubCollectionData(fetchUrl, {
        mappedBy: relation.mappedBy,
        ...(relation.filterBy !== undefined ? { filterBy: relation.filterBy } : {}),
        ...(fetchOptions?.useSearchForm !== undefined
            ? { useSearchForm: fetchOptions.useSearchForm }
            : {}),
        ...(initialSearchForm !== undefined ? { searchForm: initialSearchForm } : {}),
    });
    // Get nested field value from item
    const getFieldValue = useCallback((item, fieldName) => {
        if (!fieldName.includes('.')) {
            return item[fieldName];
        }
        const keys = fieldName.split('.');
        let value = item;
        for (const key of keys) {
            if (value === null || value === undefined)
                return undefined;
            value = value[key];
        }
        return value;
    }, []);
    // Resolve display value for a cell
    const getCellDisplay = useCallback((item, col) => {
        const value = getFieldValue(item, col.name);
        if (value === null || value === undefined)
            return '';
        // Resolve select options
        if (col.options && Array.isArray(col.options)) {
            const rawValue = typeof value === 'object' ? value?.value : value;
            const option = col.options.find((opt) => opt.value === rawValue);
            if (option)
                return option.label;
        }
        // Boolean
        if (typeof value === 'boolean') {
            return value ? 'Y' : 'N';
        }
        // Object with name/title (ManyToOne)
        if (typeof value === 'object' && !Array.isArray(value)) {
            return value.name || value.title || value.label || JSON.stringify(value);
        }
        return String(value);
    }, [getFieldValue]);
    // Search filtering
    const searchValue = useCallback((value, query) => {
        if (value === null || value === undefined)
            return false;
        if (typeof value === 'string')
            return value.toLowerCase().includes(query);
        if (typeof value === 'object' && !Array.isArray(value)) {
            for (const prop of ['name', 'title', 'label']) {
                if (value[prop] &&
                    typeof value[prop] === 'string' &&
                    value[prop].toLowerCase().includes(query)) {
                    return true;
                }
            }
        }
        return false;
    }, []);
    const filteredData = useMemo(() => {
        if (!isQuickSearchEnabled || !searchQuery.trim())
            return data;
        const query = searchQuery.toLowerCase().trim();
        return data.filter((item) => quickSearchFields.some((field) => searchValue(getFieldValue(item, field.getName()), query)));
    }, [data, searchQuery, quickSearchFields, isQuickSearchEnabled, getFieldValue, searchValue]);
    // Pagination
    const pageSize = tableConfig?.pageSize;
    const isPaginationEnabled = pageSize && pageSize > 0;
    const totalPages = useMemo(() => {
        if (!isPaginationEnabled)
            return 1;
        return Math.ceil(filteredData.length / pageSize);
    }, [filteredData.length, pageSize, isPaginationEnabled]);
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0)
            setCurrentPage(totalPages);
        else if (currentPage < 1 && totalPages > 0)
            setCurrentPage(1);
    }, [currentPage, totalPages]);
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);
    const paginatedData = useMemo(() => {
        if (!isPaginationEnabled)
            return filteredData;
        const start = (currentPage - 1) * pageSize;
        return filteredData.slice(start, start + pageSize);
    }, [filteredData, currentPage, pageSize, isPaginationEnabled]);
    const goToPage = useCallback((page) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    }, [totalPages]);
    const clearSearch = useCallback(() => {
        setSearchQuery('');
    }, []);
    const showRowNumbers = tableConfig?.showRowNumbers !== false;
    // Loading state
    if (loading) {
        return (_jsxs("div", { className: "rcm-subcollection-skeleton", children: [_jsxs("div", { className: "rcm-subcollection-skeleton-toolbar", children: [_jsx("div", { className: "rcm-subcollection-skeleton-search" }), _jsx("div", { className: "rcm-subcollection-skeleton-actions", children: _jsx("div", { className: "rcm-subcollection-skeleton-pill" }) })] }), _jsxs("div", { className: "rcm-subcollection-skeleton-table", children: [_jsx("div", { className: "rcm-subcollection-skeleton-thead" }), [1, 2, 3, 4, 5].map((i) => (_jsx("div", { className: "rcm-subcollection-skeleton-tr" }, i)))] })] }));
    }
    // Error state
    if (error) {
        return (_jsxs("div", { className: "rcm-subcollection-error", children: [_jsx("div", { className: "rcm-subcollection-error-icon", children: _jsx(IconAlertCircle, { size: 24 }) }), _jsxs("div", { className: "rcm-subcollection-error-body", children: [_jsx("h4", { className: "rcm-subcollection-error-title", children: "\uB370\uC774\uD130\uB97C \uBD88\uB7EC\uC624\uB294 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4" }), _jsx("p", { className: "rcm-subcollection-error-message", children: error.message }), _jsxs("button", { type: "button", onClick: () => refresh(), className: "rcm-subcollection-error-retry", children: [_jsx(IconRefresh, { size: 16 }), "\uB2E4\uC2DC \uC2DC\uB3C4"] })] })] }));
    }
    return (_jsxs("div", { className: "rcm-subcollection", children: [_jsxs("div", { className: "rcm-subcollection-toolbar", children: [isQuickSearchEnabled && (_jsxs("div", { className: "rcm-subcollection-search", children: [_jsx("span", { className: isSearchFocused
                                    ? 'rcm-subcollection-search-icon rcm-subcollection-search-icon-focused'
                                    : 'rcm-subcollection-search-icon', children: _jsx(IconSearch, { size: 18, stroke: 2 }) }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), onFocus: () => setIsSearchFocused(true), onBlur: () => setIsSearchFocused(false), placeholder: searchPlaceholder, className: "rcm-subcollection-search-input" }), searchQuery && (_jsx("button", { type: "button", onClick: clearSearch, className: "rcm-subcollection-search-clear", "aria-label": "\uAC80\uC0C9\uC5B4 \uC9C0\uC6B0\uAE30", children: _jsx(IconX, { size: 16 }) }))] })), _jsxs("div", { className: "rcm-subcollection-actions", children: [_jsx("div", { className: "rcm-subcollection-count", children: searchQuery ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "rcm-subcollection-count-accent", children: filteredData.length }), _jsx("span", { className: "rcm-subcollection-count-sep", children: "/" }), _jsx("span", { children: data.length })] })) : (_jsxs("span", { children: [data.length, "\uAC1C"] })) }), _jsx("button", { type: "button", onClick: () => refresh(), className: "rcm-subcollection-icon-btn", title: "\uC0C8\uB85C\uACE0\uCE68", children: _jsx(IconRefresh, { size: 16, stroke: 2 }) }), tooltip && (_jsx(Tooltip, { label: tooltip, color: "gray", withArrow: true, position: "top-end", children: _jsx("div", { className: "rcm-subcollection-icon-btn rcm-subcollection-icon-btn-help", children: _jsx(IconHelp, { size: 16, stroke: 2 }) }) }))] })] }), filteredData.length === 0 ? (_jsx("div", { className: "rcm-subcollection-empty", children: searchQuery ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "rcm-subcollection-empty-icon", children: _jsx(IconSearch, { size: 32 }) }), _jsxs("p", { className: "rcm-subcollection-empty-title", children: ["'", searchQuery, "'\uC5D0 \uB300\uD55C \uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4"] }), _jsx("button", { type: "button", onClick: clearSearch, className: "rcm-subcollection-empty-action", children: "\uAC80\uC0C9 \uCD08\uAE30\uD654" })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "rcm-subcollection-empty-icon", children: _jsx(IconTable, { size: 32 }) }), _jsx("p", { className: "rcm-subcollection-empty-title", children: "\uD45C\uC2DC\uD560 \uD56D\uBAA9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4" })] })) })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "rcm-subcollection-table-wrapper", children: _jsxs("table", { className: "rcm-subcollection-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [showRowNumbers && _jsx("th", { className: "rcm-subcollection-th-no", children: "No" }), columns.map((col) => (_jsx("th", { children: col.label }, col.name)))] }) }), _jsx("tbody", { children: paginatedData.map((item, index) => {
                                        const rowNumber = isPaginationEnabled
                                            ? (currentPage - 1) * pageSize + index + 1
                                            : index + 1;
                                        return (_jsxs("tr", { children: [showRowNumbers && _jsx("td", { className: "rcm-subcollection-td-no", children: rowNumber }), columns.map((col) => (_jsx("td", { children: getCellDisplay(item, col) }, col.name)))] }, item.id || index));
                                    }) })] }) }), isPaginationEnabled && totalPages > 1 && (_jsxs("div", { className: "rcm-subcollection-pagination", children: [_jsx("button", { type: "button", onClick: () => goToPage(1), disabled: currentPage === 1, className: "rcm-subcollection-page-btn", title: "\uCCAB \uD398\uC774\uC9C0", children: _jsx(IconChevronsLeft, { size: 16, stroke: 2 }) }), _jsx("button", { type: "button", onClick: () => goToPage(currentPage - 1), disabled: currentPage === 1, className: "rcm-subcollection-page-btn", title: "\uC774\uC804 \uD398\uC774\uC9C0", children: _jsx(IconChevronLeft, { size: 16, stroke: 2 }) }), _jsxs("div", { className: "rcm-subcollection-page-info", children: [_jsx("span", { className: "rcm-subcollection-page-info-current", children: currentPage }), _jsx("span", { className: "rcm-subcollection-count-sep", children: "/" }), _jsx("span", { children: totalPages })] }), _jsx("button", { type: "button", onClick: () => goToPage(currentPage + 1), disabled: currentPage === totalPages, className: "rcm-subcollection-page-btn", title: "\uB2E4\uC74C \uD398\uC774\uC9C0", children: _jsx(IconChevronRight, { size: 16, stroke: 2 }) }), _jsx("button", { type: "button", onClick: () => goToPage(totalPages), disabled: currentPage === totalPages, className: "rcm-subcollection-page-btn", title: "\uB9C8\uC9C0\uB9C9 \uD398\uC774\uC9C0", children: _jsx(IconChevronsRight, { size: 16, stroke: 2 }) }), _jsxs("div", { className: "rcm-subcollection-page-size-badge", children: [pageSize, "\uAC1C\uC529"] })] }))] }))] }));
};
export default TableSubCollectionView;
//# sourceMappingURL=TableSubCollectionView.js.map