'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState, useCallback, useEffect } from 'react';
import { useCardSubCollectionData } from '../hooks/useCardSubCollectionData';
import { CardItem } from './CardItem';
import { CardSubCollectionModal } from './CardSubCollectionModal';
import { Tooltip } from '../../../ui';
import { IconHelp, IconSearch, IconX, IconPlus, IconRefresh, IconLayoutGrid, IconAlertCircle, IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from '@tabler/icons-react';
/**
 * CardSubCollectionView
 * Displays a collection of items in a professional card grid format
 * Features: Client-side search, responsive grid, CRUD operations
 */
export const CardSubCollectionView = ({ parentEntityForm, parentId, entityForm, fetchUrl: fetchUrlProp, cardConfig, relation, readonly = false, session, onItemEdit, onItemDelete, onItemAdd, fetchOptions, initialSearchForm, viewDetail = false, tooltip, }) => {
    // Modal state management
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [modalMode, setModalMode] = useState(null);
    // Search state
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    // Helper: Check if a field name matches mappedBy patterns (should be excluded)
    const isMappedByField = useCallback((fieldName, mappedBy) => {
        // 1. Exact match
        if (fieldName === mappedBy)
            return true;
        // 2. Base field without Id/.id suffix
        let baseField = mappedBy;
        if (mappedBy.endsWith('Id')) {
            baseField = mappedBy.slice(0, -2);
        }
        else if (mappedBy.endsWith('.id')) {
            baseField = mappedBy.slice(0, -3);
        }
        // 3. Exact base field match
        if (fieldName === baseField)
            return true;
        // 4. Nested pattern match (e.g., "student.name" when mappedBy is "studentId")
        if (fieldName.startsWith(baseField + '.'))
            return true;
        return false;
    }, []);
    // Get quickSearch fields from entity form (excluding mappedBy fields)
    // Logic matches ViewListGrid: first get list fields (support: true), then filter by quickSearch
    const quickSearchFields = useMemo(() => {
        const fields = Array.from(entityForm.fields.values());
        const mappedBy = relation.mappedBy;
        return fields.filter((field) => {
            // Must be a list field (shown in list view) - matches getListFields() behavior
            if (field.listConfig?.support !== true)
                return false;
            // Must have quickSearch explicitly enabled
            if (field.listConfig?.quickSearch !== true)
                return false;
            // Exclude mappedBy related fields (parent reference fields shouldn't be searched)
            if (isMappedByField(field.name, mappedBy))
                return false;
            return true;
        });
    }, [entityForm, relation.mappedBy, isMappedByField]);
    // Generate search placeholder from quickSearch fields
    const searchPlaceholder = useMemo(() => {
        if (quickSearchFields.length === 0) {
            return '검색';
        }
        const labels = quickSearchFields
            .slice(0, 3)
            .map((field) => {
            const label = field.getLabel();
            return typeof label === 'string' ? label : field.getName();
        });
        return `${labels.join(', ')} 검색`;
    }, [quickSearchFields]);
    // Check if quick search is enabled (at least one quickSearch field exists)
    const isQuickSearchEnabled = quickSearchFields.length > 0;
    // Get the actual fetch URL
    const fetchUrl = useMemo(() => {
        if (typeof fetchUrlProp === 'function') {
            return fetchUrlProp(parentEntityForm);
        }
        return fetchUrlProp;
    }, [fetchUrlProp, parentEntityForm]);
    // Fetch data using the hook
    const { data, loading, error, refresh } = useCardSubCollectionData(fetchUrl, {
        mappedBy: relation.mappedBy,
        filterBy: relation.filterBy,
        useSearchForm: fetchOptions?.useSearchForm,
        searchForm: initialSearchForm,
    });
    // Get field value from item, supporting nested paths (e.g., 'course.name')
    const getFieldValue = useCallback((item, fieldName) => {
        if (!fieldName.includes('.')) {
            return item[fieldName];
        }
        // Handle nested path
        const keys = fieldName.split('.');
        let value = item;
        for (const key of keys) {
            if (value === null || value === undefined)
                return undefined;
            value = value[key];
        }
        return value;
    }, []);
    // Search a single value (string comparison)
    const searchValue = useCallback((value, query) => {
        if (value === null || value === undefined)
            return false;
        // String match
        if (typeof value === 'string') {
            return value.toLowerCase().includes(query);
        }
        // For ManyToOne fields, check common display properties
        if (typeof value === 'object' && !Array.isArray(value)) {
            // Check common display properties: name, title, label
            const displayProps = ['name', 'title', 'label'];
            for (const prop of displayProps) {
                if (value[prop] && typeof value[prop] === 'string') {
                    if (value[prop].toLowerCase().includes(query)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }, []);
    // Client-side search filtering - ONLY searches quickSearch fields
    const filteredData = useMemo(() => {
        // If no quickSearch fields defined or no search query, return all data
        if (!isQuickSearchEnabled || !searchQuery.trim()) {
            return data;
        }
        const query = searchQuery.toLowerCase().trim();
        return data.filter((item) => {
            // Search only through quickSearch fields
            return quickSearchFields.some((field) => {
                const fieldName = field.getName();
                const value = getFieldValue(item, fieldName);
                return searchValue(value, query);
            });
        });
    }, [data, searchQuery, quickSearchFields, isQuickSearchEnabled, getFieldValue, searchValue]);
    // Client-side pagination configuration
    const pageSize = cardConfig?.pageSize;
    const isPaginationEnabled = pageSize && pageSize > 0;
    // Calculate total pages
    const totalPages = useMemo(() => {
        if (!isPaginationEnabled)
            return 1;
        return Math.ceil(filteredData.length / pageSize);
    }, [filteredData.length, pageSize, isPaginationEnabled]);
    // Reset page when search results change and current page exceeds total pages
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
        else if (currentPage < 1 && totalPages > 0) {
            setCurrentPage(1);
        }
    }, [currentPage, totalPages]);
    // Reset to page 1 when search query changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);
    // Paginated data
    const paginatedData = useMemo(() => {
        if (!isPaginationEnabled)
            return filteredData;
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredData.slice(startIndex, endIndex);
    }, [filteredData, currentPage, pageSize, isPaginationEnabled]);
    // Pagination handlers
    const goToPage = useCallback((page) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    }, [totalPages]);
    const goToFirstPage = useCallback(() => goToPage(1), [goToPage]);
    const goToLastPage = useCallback(() => goToPage(totalPages), [goToPage, totalPages]);
    const goToPrevPage = useCallback(() => goToPage(currentPage - 1), [goToPage, currentPage]);
    const goToNextPage = useCallback(() => goToPage(currentPage + 1), [goToPage, currentPage]);
    // Parse columns configuration
    // - If number: field columns only, card grid auto-calculated (default: 2)
    // - If object { card, field }: explicit values for both
    const cardColumns = useMemo(() => {
        const columnsConfig = cardConfig?.columns;
        if (typeof columnsConfig === 'object' && columnsConfig !== null) {
            return columnsConfig.card;
        }
        // Default: auto-calculate card columns (default to 2)
        return 2;
    }, [cardConfig?.columns]);
    // Generate responsive grid class names for CARD grid
    // Mobile: always 1 column
    // Desktop (sm+): use cardColumns
    const gridClassName = useMemo(() => {
        const baseClass = 'grid gap-4 grid-cols-1'; // Mobile: always 1 column
        // Desktop breakpoint: use cardColumns
        const desktopClass = cardColumns === 1 ? 'sm:grid-cols-1' :
            cardColumns === 2 ? 'sm:grid-cols-2' :
                cardColumns === 3 ? 'sm:grid-cols-3' :
                    cardColumns === 4 ? 'sm:grid-cols-4' : 'sm:grid-cols-2';
        return `${baseClass} ${desktopClass}`.trim();
    }, [cardColumns]);
    // Handle card click for view detail
    const handleCardClick = useCallback((item) => {
        if (viewDetail || !readonly) {
            setSelectedItemId(item.id);
            setModalMode(readonly ? 'view' : 'view');
            setIsModalOpen(true);
        }
    }, [viewDetail, readonly]);
    // Handle edit button click
    const handleEdit = useCallback((item) => {
        if (onItemEdit) {
            onItemEdit(item);
        }
        else {
            setSelectedItemId(item.id);
            setModalMode('edit');
            setIsModalOpen(true);
        }
    }, [onItemEdit]);
    // Handle delete button click
    const handleDelete = useCallback(async (item) => {
        if (onItemDelete) {
            onItemDelete(item);
        }
        else {
            // Open modal in view mode with delete capability
            setSelectedItemId(item.id);
            setModalMode('edit');
            setIsModalOpen(true);
        }
    }, [onItemDelete]);
    // Handle add button click
    const handleAdd = useCallback(() => {
        if (onItemAdd) {
            onItemAdd();
        }
        else {
            setSelectedItemId(null);
            setModalMode('create');
            setIsModalOpen(true);
        }
    }, [onItemAdd]);
    // Handle modal close
    const handleModalClose = useCallback(() => {
        setIsModalOpen(false);
        setSelectedItemId(null);
        setModalMode(null);
    }, []);
    // Handle save success
    const handleSaveSuccess = useCallback(() => {
        refresh();
        handleModalClose();
    }, [refresh, handleModalClose]);
    // Handle delete success
    const handleDeleteSuccess = useCallback(() => {
        refresh();
        handleModalClose();
    }, [refresh, handleModalClose]);
    // Clear search
    const clearSearch = useCallback(() => {
        setSearchQuery('');
    }, []);
    // Handle loading state
    if (loading) {
        return (_jsxs("div", { className: "space-y-5", children: [_jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsx("div", { className: "h-11 w-72 animate-pulse rounded-xl bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-9 w-16 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" }), _jsx("div", { className: "h-9 w-20 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" })] })] }), _jsx("div", { className: gridClassName, children: [1, 2, 3, 4].map((i) => (_jsxs("div", { className: "\n                h-52 rounded-xl\n                bg-gradient-to-br from-white via-white to-gray-50/80\n                border border-gray-100\n                shadow-[0_1px_3px_rgba(0,0,0,0.04)]\n                dark:from-gray-900 dark:via-gray-900 dark:to-gray-800/80\n                dark:border-gray-700/60\n                overflow-hidden\n              ", children: [_jsx("div", { className: "h-14 bg-gradient-to-br from-gray-50/80 to-transparent dark:from-gray-800/50 p-4", children: _jsx("div", { className: "h-5 w-32 animate-pulse rounded bg-gray-200/80 dark:bg-gray-700" }) }), _jsxs("div", { className: "p-4 space-y-3", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: "h-3 w-12 animate-pulse rounded bg-gray-100 dark:bg-gray-800" }), _jsx("div", { className: "h-4 w-20 animate-pulse rounded bg-gray-200/80 dark:bg-gray-700" })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: "h-3 w-12 animate-pulse rounded bg-gray-100 dark:bg-gray-800" }), _jsx("div", { className: "h-4 w-24 animate-pulse rounded bg-gray-200/80 dark:bg-gray-700" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: "h-3 w-16 animate-pulse rounded bg-gray-100 dark:bg-gray-800" }), _jsx("div", { className: "h-4 w-16 animate-pulse rounded bg-gray-200/80 dark:bg-gray-700" })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: "h-3 w-10 animate-pulse rounded bg-gray-100 dark:bg-gray-800" }), _jsx("div", { className: "h-4 w-28 animate-pulse rounded bg-gray-200/80 dark:bg-gray-700" })] })] })] })] }, i))) })] }));
    }
    // Handle error state
    if (error) {
        return (_jsx("div", { className: "\n        relative overflow-hidden\n        rounded-xl border border-red-200/80 bg-gradient-to-br from-red-50 to-red-50/50\n        p-6\n        dark:border-red-900/50 dark:from-red-950/50 dark:to-red-900/20\n      ", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "\n            flex items-center justify-center w-12 h-12 rounded-xl\n            bg-gradient-to-br from-red-100 to-red-50\n            dark:from-red-900/50 dark:to-red-800/30\n          ", children: _jsx(IconAlertCircle, { className: "h-6 w-6 text-red-500 dark:text-red-400" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "text-base font-semibold text-red-800 dark:text-red-200", children: "\uB370\uC774\uD130\uB97C \uBD88\uB7EC\uC624\uB294 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4" }), _jsx("p", { className: "mt-1 text-sm text-red-600/90 dark:text-red-300/90 line-clamp-2", children: error.message }), _jsxs("button", { onClick: () => refresh(), className: "\n                mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg\n                text-sm font-medium\n                bg-white text-red-700 border border-red-200\n                hover:bg-red-50 hover:border-red-300\n                transition-colors duration-150\n                dark:bg-red-950/50 dark:text-red-300 dark:border-red-800\n                dark:hover:bg-red-900/50 dark:hover:border-red-700\n              ", children: [_jsx(IconRefresh, { className: "h-4 w-4" }), "\uB2E4\uC2DC \uC2DC\uB3C4"] })] })] }) }));
    }
    return (_jsxs("div", { className: "space-y-5", children: [_jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [isQuickSearchEnabled && (_jsxs("div", { className: "relative flex-1 max-w-md group", children: [_jsx("div", { className: `
              pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5
              transition-colors duration-150
              ${isSearchFocused ? 'text-primary' : 'text-gray-400'}
            `, children: _jsx(IconSearch, { className: "h-[18px] w-[18px]", stroke: 2 }) }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), onFocus: () => setIsSearchFocused(true), onBlur: () => setIsSearchFocused(false), placeholder: searchPlaceholder, className: "\n                block w-full rounded-xl\n                border border-gray-200 bg-white\n                py-2.5 pl-10 pr-10\n                text-sm text-gray-900 placeholder-gray-400\n                shadow-sm\n                transition-all duration-200\n                focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10\n                focus:shadow-[0_0_0_4px_rgba(var(--color-primary-rgb),0.1)]\n                dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-100 dark:placeholder-gray-500\n                dark:focus:border-primary dark:focus:ring-primary/20\n              " }), searchQuery && (_jsx("button", { onClick: clearSearch, className: "\n                  absolute inset-y-0 right-0 flex items-center pr-3\n                  text-gray-400 hover:text-gray-600 transition-colors\n                  dark:hover:text-gray-300\n                ", children: _jsx(IconX, { className: "h-4 w-4" }) }))] })), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "\n            inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg\n            bg-gray-100/80 text-gray-600\n            text-sm font-medium\n            dark:bg-gray-800 dark:text-gray-400\n          ", children: searchQuery ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-primary font-semibold", children: filteredData.length }), _jsx("span", { className: "text-gray-400 dark:text-gray-500", children: "/" }), _jsx("span", { children: data.length })] })) : (_jsxs("span", { children: [data.length, "\uAC1C"] })) }), _jsx("button", { onClick: () => refresh(), className: "\n              flex items-center justify-center w-9 h-9 rounded-lg\n              text-gray-500 bg-gray-100/80\n              hover:bg-gray-200/80 hover:text-gray-700\n              transition-all duration-150\n              dark:bg-gray-800 dark:text-gray-400\n              dark:hover:bg-gray-700 dark:hover:text-gray-300\n            ", title: "\uC0C8\uB85C\uACE0\uCE68", children: _jsx(IconRefresh, { className: "h-4 w-4", stroke: 2 }) }), tooltip && (_jsx(Tooltip, { label: tooltip, color: "gray", withArrow: true, position: "top-end", children: _jsx("div", { className: "\n                flex items-center justify-center w-9 h-9 rounded-lg\n                cursor-help text-gray-400 bg-gray-100/80\n                hover:bg-gray-200/80 hover:text-gray-600\n                transition-all duration-150\n                dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300\n              ", children: _jsx(IconHelp, { className: "h-4 w-4", stroke: 2 }) }) })), !readonly && (_jsxs("button", { onClick: handleAdd, className: "\n                inline-flex items-center gap-1.5 rounded-lg\n                bg-gradient-to-r from-primary to-primary/90\n                px-4 py-2\n                text-sm font-medium text-white\n                shadow-sm shadow-primary/20\n                transition-all duration-200\n                hover:from-primary/95 hover:to-primary/85\n                hover:shadow-md hover:shadow-primary/25\n                focus:outline-none focus:ring-4 focus:ring-primary/20\n                active:scale-[0.98]\n              ", children: [_jsx(IconPlus, { className: "h-4 w-4", stroke: 2.5 }), _jsx("span", { className: "hidden sm:inline", children: "\uCD94\uAC00" })] }))] })] }), filteredData.length === 0 ? (_jsx("div", { className: "\n          flex flex-col items-center justify-center\n          rounded-xl border-2 border-dashed border-gray-200\n          bg-gradient-to-br from-gray-50/50 to-transparent\n          py-16\n          dark:border-gray-700 dark:from-gray-800/30\n        ", children: searchQuery ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "\n                flex items-center justify-center w-16 h-16 rounded-2xl\n                bg-gray-100 dark:bg-gray-800\n                mb-4\n              ", children: _jsx(IconSearch, { className: "h-8 w-8 text-gray-300 dark:text-gray-600" }) }), _jsxs("p", { className: "text-base font-medium text-gray-600 dark:text-gray-400", children: ["'", searchQuery, "'\uC5D0 \uB300\uD55C \uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4"] }), _jsx("p", { className: "mt-1 text-sm text-gray-400 dark:text-gray-500", children: "\uB2E4\uB978 \uD0A4\uC6CC\uB4DC\uB85C \uAC80\uC0C9\uD574 \uBCF4\uC138\uC694" }), _jsx("button", { onClick: clearSearch, className: "\n                  mt-4 px-4 py-2 rounded-lg\n                  text-sm font-medium text-primary\n                  bg-primary/5 hover:bg-primary/10\n                  transition-colors duration-150\n                ", children: "\uAC80\uC0C9 \uCD08\uAE30\uD654" })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "\n                flex items-center justify-center w-16 h-16 rounded-2xl\n                bg-gray-100 dark:bg-gray-800\n                mb-4\n              ", children: _jsx(IconLayoutGrid, { className: "h-8 w-8 text-gray-300 dark:text-gray-600" }) }), _jsx("p", { className: "text-base font-medium text-gray-600 dark:text-gray-400", children: "\uD45C\uC2DC\uD560 \uD56D\uBAA9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4" }), !readonly && (_jsxs("button", { onClick: handleAdd, className: "\n                    mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg\n                    text-sm font-medium text-primary\n                    bg-primary/5 hover:bg-primary/10\n                    transition-colors duration-150\n                  ", children: [_jsx(IconPlus, { className: "h-4 w-4" }), "\uCCAB \uBC88\uC9F8 \uD56D\uBAA9 \uCD94\uAC00"] }))] })) })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: `${gridClassName} w-full`, children: paginatedData.map((item) => (_jsx(CardItem, { item: item, entityForm: entityForm, parentEntityForm: parentEntityForm, parentId: parentId, cardConfig: cardConfig, relation: relation, readonly: readonly, session: session, onClick: viewDetail ? () => handleCardClick(item) : undefined, onEdit: !readonly ? () => handleEdit(item) : undefined, onDelete: !readonly ? () => handleDelete(item) : undefined }, item.id))) }), isPaginationEnabled && totalPages > 1 && (_jsxs("div", { className: "flex items-center justify-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-800", children: [_jsx("button", { onClick: goToFirstPage, disabled: currentPage === 1, className: "\n                  flex items-center justify-center w-8 h-8 rounded-lg\n                  text-gray-500 bg-white border border-gray-200\n                  hover:bg-gray-50 hover:text-gray-700\n                  disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500\n                  transition-all duration-150\n                  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400\n                  dark:hover:bg-gray-700 dark:hover:text-gray-300\n                  dark:disabled:hover:bg-gray-800 dark:disabled:hover:text-gray-400\n                ", title: "\uCCAB \uD398\uC774\uC9C0", children: _jsx(IconChevronsLeft, { className: "h-4 w-4", stroke: 2 }) }), _jsx("button", { onClick: goToPrevPage, disabled: currentPage === 1, className: "\n                  flex items-center justify-center w-8 h-8 rounded-lg\n                  text-gray-500 bg-white border border-gray-200\n                  hover:bg-gray-50 hover:text-gray-700\n                  disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500\n                  transition-all duration-150\n                  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400\n                  dark:hover:bg-gray-700 dark:hover:text-gray-300\n                  dark:disabled:hover:bg-gray-800 dark:disabled:hover:text-gray-400\n                ", title: "\uC774\uC804 \uD398\uC774\uC9C0", children: _jsx(IconChevronLeft, { className: "h-4 w-4", stroke: 2 }) }), _jsxs("div", { className: "\n                flex items-center gap-1.5 px-3 py-1.5\n                text-sm font-medium text-gray-600 dark:text-gray-400\n              ", children: [_jsx("span", { className: "text-primary font-semibold", children: currentPage }), _jsx("span", { className: "text-gray-400 dark:text-gray-500", children: "/" }), _jsx("span", { children: totalPages })] }), _jsx("button", { onClick: goToNextPage, disabled: currentPage === totalPages, className: "\n                  flex items-center justify-center w-8 h-8 rounded-lg\n                  text-gray-500 bg-white border border-gray-200\n                  hover:bg-gray-50 hover:text-gray-700\n                  disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500\n                  transition-all duration-150\n                  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400\n                  dark:hover:bg-gray-700 dark:hover:text-gray-300\n                  dark:disabled:hover:bg-gray-800 dark:disabled:hover:text-gray-400\n                ", title: "\uB2E4\uC74C \uD398\uC774\uC9C0", children: _jsx(IconChevronRight, { className: "h-4 w-4", stroke: 2 }) }), _jsx("button", { onClick: goToLastPage, disabled: currentPage === totalPages, className: "\n                  flex items-center justify-center w-8 h-8 rounded-lg\n                  text-gray-500 bg-white border border-gray-200\n                  hover:bg-gray-50 hover:text-gray-700\n                  disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500\n                  transition-all duration-150\n                  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400\n                  dark:hover:bg-gray-700 dark:hover:text-gray-300\n                  dark:disabled:hover:bg-gray-800 dark:disabled:hover:text-gray-400\n                ", title: "\uB9C8\uC9C0\uB9C9 \uD398\uC774\uC9C0", children: _jsx(IconChevronsRight, { className: "h-4 w-4", stroke: 2 }) }), _jsxs("div", { className: "\n                ml-2 px-2 py-1 rounded-md\n                text-xs text-gray-400 bg-gray-50\n                dark:text-gray-500 dark:bg-gray-800/50\n              ", children: [pageSize, "\uAC1C\uC529"] })] }))] })), _jsx(CardSubCollectionModal, { isOpen: isModalOpen, entityForm: entityForm, parentEntityForm: parentEntityForm, itemId: selectedItemId, relation: relation, mode: modalMode, onClose: handleModalClose, onSave: handleSaveSuccess, onDelete: handleDeleteSuccess, readonly: readonly || modalMode === 'view', allowDelete: !readonly && modalMode === 'edit' })] }));
};
export default CardSubCollectionView;
//# sourceMappingURL=CardSubCollectionView.js.map