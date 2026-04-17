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
                .map(name => fields.find(f => f.getName() === name))
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
        filterBy: relation.filterBy,
        useSearchForm: fetchOptions?.useSearchForm,
        searchForm: initialSearchForm,
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
                if (value[prop] && typeof value[prop] === 'string' && value[prop].toLowerCase().includes(query)) {
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
    useEffect(() => { setCurrentPage(1); }, [searchQuery]);
    const paginatedData = useMemo(() => {
        if (!isPaginationEnabled)
            return filteredData;
        const start = (currentPage - 1) * pageSize;
        return filteredData.slice(start, start + pageSize);
    }, [filteredData, currentPage, pageSize, isPaginationEnabled]);
    const goToPage = useCallback((page) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    }, [totalPages]);
    const clearSearch = useCallback(() => { setSearchQuery(''); }, []);
    const showRowNumbers = tableConfig?.showRowNumbers !== false;
    // Loading state
    if (loading) {
        return (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsx("div", { className: "h-9 w-64 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" }), _jsx("div", { className: "flex items-center gap-2", children: _jsx("div", { className: "h-8 w-16 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" }) })] }), _jsxs("div", { className: "overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700", children: [_jsx("div", { className: "h-10 bg-gray-50 dark:bg-gray-800 animate-pulse" }), [1, 2, 3, 4, 5].map((i) => (_jsx("div", { className: "h-10 border-t border-gray-100 dark:border-gray-800 animate-pulse bg-white dark:bg-gray-900" }, i)))] })] }));
    }
    // Error state
    if (error) {
        return (_jsx("div", { className: "relative overflow-hidden rounded-xl border border-red-200/80 bg-gradient-to-br from-red-50 to-red-50/50 p-6 dark:border-red-900/50 dark:from-red-950/50 dark:to-red-900/20", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/50 dark:to-red-800/30", children: _jsx(IconAlertCircle, { className: "h-6 w-6 text-red-500 dark:text-red-400" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "text-base font-semibold text-red-800 dark:text-red-200", children: "\uB370\uC774\uD130\uB97C \uBD88\uB7EC\uC624\uB294 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4" }), _jsx("p", { className: "mt-1 text-sm text-red-600/90 dark:text-red-300/90 line-clamp-2", children: error.message }), _jsxs("button", { onClick: () => refresh(), className: "mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white text-red-700 border border-red-200 hover:bg-red-50 hover:border-red-300 transition-colors duration-150 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800 dark:hover:bg-red-900/50 dark:hover:border-red-700", children: [_jsx(IconRefresh, { className: "h-4 w-4" }), "\uB2E4\uC2DC \uC2DC\uB3C4"] })] })] }) }));
    }
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [isQuickSearchEnabled && (_jsxs("div", { className: "relative flex-1 max-w-md group", children: [_jsx("div", { className: `pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 transition-colors duration-150 ${isSearchFocused ? 'text-primary' : 'text-gray-400'}`, children: _jsx(IconSearch, { className: "h-[18px] w-[18px]", stroke: 2 }) }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), onFocus: () => setIsSearchFocused(true), onBlur: () => setIsSearchFocused(false), placeholder: searchPlaceholder, className: "block w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-primary dark:focus:ring-primary/20" }), searchQuery && (_jsx("button", { onClick: clearSearch, className: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors dark:hover:text-gray-300", children: _jsx(IconX, { className: "h-4 w-4" }) }))] })), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100/80 text-gray-600 text-sm font-medium dark:bg-gray-800 dark:text-gray-400", children: searchQuery ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-primary font-semibold", children: filteredData.length }), _jsx("span", { className: "text-gray-400 dark:text-gray-500", children: "/" }), _jsx("span", { children: data.length })] })) : (_jsxs("span", { children: [data.length, "\uAC1C"] })) }), _jsx("button", { onClick: () => refresh(), className: "flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 bg-gray-100/80 hover:bg-gray-200/80 hover:text-gray-700 transition-all duration-150 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300", title: "\uC0C8\uB85C\uACE0\uCE68", children: _jsx(IconRefresh, { className: "h-4 w-4", stroke: 2 }) }), tooltip && (_jsx(Tooltip, { label: tooltip, color: "gray", withArrow: true, position: "top-end", children: _jsx("div", { className: "flex items-center justify-center w-9 h-9 rounded-lg cursor-help text-gray-400 bg-gray-100/80 hover:bg-gray-200/80 hover:text-gray-600 transition-all duration-150 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300", children: _jsx(IconHelp, { className: "h-4 w-4", stroke: 2 }) }) }))] })] }), filteredData.length === 0 ? (_jsx("div", { className: "flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gradient-to-br from-gray-50/50 to-transparent py-16 dark:border-gray-700 dark:from-gray-800/30", children: searchQuery ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 mb-4", children: _jsx(IconSearch, { className: "h-8 w-8 text-gray-300 dark:text-gray-600" }) }), _jsxs("p", { className: "text-base font-medium text-gray-600 dark:text-gray-400", children: ["'", searchQuery, "'\uC5D0 \uB300\uD55C \uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4"] }), _jsx("button", { onClick: clearSearch, className: "mt-4 px-4 py-2 rounded-lg text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 transition-colors duration-150", children: "\uAC80\uC0C9 \uCD08\uAE30\uD654" })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 mb-4", children: _jsx(IconTable, { className: "h-8 w-8 text-gray-300 dark:text-gray-600" }) }), _jsx("p", { className: "text-base font-medium text-gray-600 dark:text-gray-400", children: "\uD45C\uC2DC\uD560 \uD56D\uBAA9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4" })] })) })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700", children: _jsxs("table", { className: "w-full border-collapse text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-50 dark:bg-gray-800/80", children: [showRowNumbers && (_jsx("th", { className: "border-b border-gray-200 dark:border-gray-700 py-3 px-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 w-12", children: "No" })), columns.map((col) => (_jsx("th", { className: "border-b border-gray-200 dark:border-gray-700 py-3 px-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400", children: col.label }, col.name)))] }) }), _jsx("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-800", children: paginatedData.map((item, index) => {
                                        const rowNumber = isPaginationEnabled
                                            ? (currentPage - 1) * pageSize + index + 1
                                            : index + 1;
                                        return (_jsxs("tr", { className: "bg-white dark:bg-gray-900 hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors", children: [showRowNumbers && (_jsx("td", { className: "py-2.5 px-3 text-center text-gray-400 dark:text-gray-500 tabular-nums", children: rowNumber })), columns.map((col) => (_jsx("td", { className: "py-2.5 px-3 text-center text-gray-700 dark:text-gray-300", children: getCellDisplay(item, col) }, col.name)))] }, item.id || index));
                                    }) })] }) }), isPaginationEnabled && totalPages > 1 && (_jsxs("div", { className: "flex items-center justify-center gap-2 pt-2", children: [_jsx("button", { onClick: () => goToPage(1), disabled: currentPage === 1, className: "flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300", title: "\uCCAB \uD398\uC774\uC9C0", children: _jsx(IconChevronsLeft, { className: "h-4 w-4", stroke: 2 }) }), _jsx("button", { onClick: () => goToPage(currentPage - 1), disabled: currentPage === 1, className: "flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300", title: "\uC774\uC804 \uD398\uC774\uC9C0", children: _jsx(IconChevronLeft, { className: "h-4 w-4", stroke: 2 }) }), _jsxs("div", { className: "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400", children: [_jsx("span", { className: "text-primary font-semibold", children: currentPage }), _jsx("span", { className: "text-gray-400 dark:text-gray-500", children: "/" }), _jsx("span", { children: totalPages })] }), _jsx("button", { onClick: () => goToPage(currentPage + 1), disabled: currentPage === totalPages, className: "flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300", title: "\uB2E4\uC74C \uD398\uC774\uC9C0", children: _jsx(IconChevronRight, { className: "h-4 w-4", stroke: 2 }) }), _jsx("button", { onClick: () => goToPage(totalPages), disabled: currentPage === totalPages, className: "flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300", title: "\uB9C8\uC9C0\uB9C9 \uD398\uC774\uC9C0", children: _jsx(IconChevronsRight, { className: "h-4 w-4", stroke: 2 }) }), _jsxs("div", { className: "ml-2 px-2 py-1 rounded-md text-xs text-gray-400 bg-gray-50 dark:text-gray-500 dark:bg-gray-800/50", children: [pageSize, "\uAC1C\uC529"] })] }))] }))] }));
};
export default TableSubCollectionView;
//# sourceMappingURL=TableSubCollectionView.js.map