'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState, useCallback, useEffect } from 'react';
import { useCardSubCollectionData } from '../hooks/useCardSubCollectionData';
import { CardItem } from './CardItem';
import { CardSubCollectionModal } from './CardSubCollectionModal';
import { Tooltip } from '../../../ui';
import { IconHelp, IconSearch, IconX, IconPlus, IconRefresh, IconLayoutGrid, IconAlertCircle, IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight, } from '@tabler/icons-react';
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
    // Get quickSearch fields from entity form (excluding mappedBy fields)
    const quickSearchFields = useMemo(() => {
        const fields = Array.from(entityForm.fields.values());
        const mappedBy = relation.mappedBy;
        return fields.filter((field) => {
            if (field.listConfig?.support !== true)
                return false;
            if (field.listConfig?.quickSearch !== true)
                return false;
            if (isMappedByField(field.name, mappedBy))
                return false;
            return true;
        });
    }, [entityForm, relation.mappedBy, isMappedByField]);
    const searchPlaceholder = useMemo(() => {
        if (quickSearchFields.length === 0) {
            return '검색';
        }
        const labels = quickSearchFields.slice(0, 3).map((field) => {
            const label = field.getLabel();
            return typeof label === 'string' ? label : field.getName();
        });
        return `${labels.join(', ')} 검색`;
    }, [quickSearchFields]);
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
        ...(relation.filterBy !== undefined ? { filterBy: relation.filterBy } : {}),
        ...(fetchOptions?.useSearchForm !== undefined
            ? { useSearchForm: fetchOptions.useSearchForm }
            : {}),
        ...(initialSearchForm !== undefined ? { searchForm: initialSearchForm } : {}),
    });
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
    const searchValue = useCallback((value, query) => {
        if (value === null || value === undefined)
            return false;
        if (typeof value === 'string') {
            return value.toLowerCase().includes(query);
        }
        if (typeof value === 'object' && !Array.isArray(value)) {
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
    const filteredData = useMemo(() => {
        if (!isQuickSearchEnabled || !searchQuery.trim()) {
            return data;
        }
        const query = searchQuery.toLowerCase().trim();
        return data.filter((item) => {
            return quickSearchFields.some((field) => {
                const fieldName = field.getName();
                const value = getFieldValue(item, fieldName);
                return searchValue(value, query);
            });
        });
    }, [data, searchQuery, quickSearchFields, isQuickSearchEnabled, getFieldValue, searchValue]);
    const pageSize = cardConfig?.pageSize;
    const isPaginationEnabled = pageSize && pageSize > 0;
    const totalPages = useMemo(() => {
        if (!isPaginationEnabled)
            return 1;
        return Math.ceil(filteredData.length / pageSize);
    }, [filteredData.length, pageSize, isPaginationEnabled]);
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
        else if (currentPage < 1 && totalPages > 0) {
            setCurrentPage(1);
        }
    }, [currentPage, totalPages]);
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);
    const paginatedData = useMemo(() => {
        if (!isPaginationEnabled)
            return filteredData;
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredData.slice(startIndex, endIndex);
    }, [filteredData, currentPage, pageSize, isPaginationEnabled]);
    const goToPage = useCallback((page) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    }, [totalPages]);
    const goToFirstPage = useCallback(() => goToPage(1), [goToPage]);
    const goToLastPage = useCallback(() => goToPage(totalPages), [goToPage, totalPages]);
    const goToPrevPage = useCallback(() => goToPage(currentPage - 1), [goToPage, currentPage]);
    const goToNextPage = useCallback(() => goToPage(currentPage + 1), [goToPage, currentPage]);
    // Parse columns configuration
    const cardColumns = useMemo(() => {
        const columnsConfig = cardConfig?.columns;
        if (typeof columnsConfig === 'object' && columnsConfig !== null) {
            return columnsConfig.card;
        }
        return 2;
    }, [cardConfig?.columns]);
    // rcm-subcollection-card-grid + optional variant for sm+ breakpoint.
    const gridClassName = useMemo(() => {
        const variant = cardColumns >= 1 && cardColumns <= 4
            ? ` rcm-subcollection-card-grid-${cardColumns}`
            : ' rcm-subcollection-card-grid-2';
        return `rcm-subcollection-card-grid${variant}`;
    }, [cardColumns]);
    const handleCardClick = useCallback((item) => {
        if (viewDetail || !readonly) {
            setSelectedItemId(item.id);
            setModalMode(readonly ? 'view' : 'view');
            setIsModalOpen(true);
        }
    }, [viewDetail, readonly]);
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
    const handleDelete = useCallback(async (item) => {
        if (onItemDelete) {
            onItemDelete(item);
        }
        else {
            setSelectedItemId(item.id);
            setModalMode('edit');
            setIsModalOpen(true);
        }
    }, [onItemDelete]);
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
    const handleModalClose = useCallback(() => {
        setIsModalOpen(false);
        setSelectedItemId(null);
        setModalMode(null);
    }, []);
    const handleSaveSuccess = useCallback(() => {
        refresh();
        handleModalClose();
    }, [refresh, handleModalClose]);
    const handleDeleteSuccess = useCallback(() => {
        refresh();
        handleModalClose();
    }, [refresh, handleModalClose]);
    const clearSearch = useCallback(() => {
        setSearchQuery('');
    }, []);
    // Loading state
    if (loading) {
        return (_jsxs("div", { className: "rcm-subcollection-skeleton", children: [_jsxs("div", { className: "rcm-subcollection-skeleton-toolbar", children: [_jsx("div", { className: "rcm-subcollection-skeleton-search" }), _jsxs("div", { className: "rcm-subcollection-skeleton-actions", children: [_jsx("div", { className: "rcm-subcollection-skeleton-pill" }), _jsx("div", { className: "rcm-subcollection-skeleton-pill" })] })] }), _jsx("div", { className: gridClassName, children: [1, 2, 3, 4].map((i) => (_jsxs("div", { className: "rcm-subcollection-skeleton-card", children: [_jsx("div", { className: "rcm-subcollection-skeleton-card-header", children: _jsx("div", { className: "rcm-subcollection-skeleton-value" }) }), _jsxs("div", { className: "rcm-subcollection-skeleton-card-body", children: [_jsxs("div", { className: "rcm-subcollection-skeleton-card-row", children: [_jsxs("div", { className: "rcm-subcollection-skeleton-card-field", children: [_jsx("div", { className: "rcm-subcollection-skeleton-label" }), _jsx("div", { className: "rcm-subcollection-skeleton-value" })] }), _jsxs("div", { className: "rcm-subcollection-skeleton-card-field", children: [_jsx("div", { className: "rcm-subcollection-skeleton-label" }), _jsx("div", { className: "rcm-subcollection-skeleton-value" })] })] }), _jsxs("div", { className: "rcm-subcollection-skeleton-card-row", children: [_jsxs("div", { className: "rcm-subcollection-skeleton-card-field", children: [_jsx("div", { className: "rcm-subcollection-skeleton-label" }), _jsx("div", { className: "rcm-subcollection-skeleton-value" })] }), _jsxs("div", { className: "rcm-subcollection-skeleton-card-field", children: [_jsx("div", { className: "rcm-subcollection-skeleton-label" }), _jsx("div", { className: "rcm-subcollection-skeleton-value" })] })] })] })] }, i))) })] }));
    }
    // Error state
    if (error) {
        return (_jsxs("div", { className: "rcm-subcollection-error", children: [_jsx("div", { className: "rcm-subcollection-error-icon", children: _jsx(IconAlertCircle, { size: 24 }) }), _jsxs("div", { className: "rcm-subcollection-error-body", children: [_jsx("h4", { className: "rcm-subcollection-error-title", children: "\uB370\uC774\uD130\uB97C \uBD88\uB7EC\uC624\uB294 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4" }), _jsx("p", { className: "rcm-subcollection-error-message", children: error.message }), _jsxs("button", { type: "button", onClick: () => refresh(), className: "rcm-subcollection-error-retry", children: [_jsx(IconRefresh, { size: 16 }), "\uB2E4\uC2DC \uC2DC\uB3C4"] })] })] }));
    }
    return (_jsxs("div", { className: "rcm-subcollection", children: [_jsxs("div", { className: "rcm-subcollection-toolbar", children: [isQuickSearchEnabled && (_jsxs("div", { className: "rcm-subcollection-search", children: [_jsx("span", { className: isSearchFocused
                                    ? 'rcm-subcollection-search-icon rcm-subcollection-search-icon-focused'
                                    : 'rcm-subcollection-search-icon', children: _jsx(IconSearch, { size: 18, stroke: 2 }) }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), onFocus: () => setIsSearchFocused(true), onBlur: () => setIsSearchFocused(false), placeholder: searchPlaceholder, className: "rcm-subcollection-search-input" }), searchQuery && (_jsx("button", { type: "button", onClick: clearSearch, className: "rcm-subcollection-search-clear", "aria-label": "\uAC80\uC0C9\uC5B4 \uC9C0\uC6B0\uAE30", children: _jsx(IconX, { size: 16 }) }))] })), _jsxs("div", { className: "rcm-subcollection-actions", children: [_jsx("div", { className: "rcm-subcollection-count", children: searchQuery ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "rcm-subcollection-count-accent", children: filteredData.length }), _jsx("span", { className: "rcm-subcollection-count-sep", children: "/" }), _jsx("span", { children: data.length })] })) : (_jsxs("span", { children: [data.length, "\uAC1C"] })) }), _jsx("button", { type: "button", onClick: () => refresh(), className: "rcm-subcollection-icon-btn", title: "\uC0C8\uB85C\uACE0\uCE68", children: _jsx(IconRefresh, { size: 16, stroke: 2 }) }), tooltip && (_jsx(Tooltip, { label: tooltip, color: "gray", withArrow: true, position: "top-end", children: _jsx("div", { className: "rcm-subcollection-icon-btn rcm-subcollection-icon-btn-help", children: _jsx(IconHelp, { size: 16, stroke: 2 }) }) })), !readonly && (_jsxs("button", { type: "button", onClick: handleAdd, className: "rcm-subcollection-add-btn", children: [_jsx(IconPlus, { size: 16, stroke: 2.5 }), _jsx("span", { className: "rcm-subcollection-add-btn-label", children: "\uCD94\uAC00" })] }))] })] }), filteredData.length === 0 ? (_jsx("div", { className: "rcm-subcollection-empty", children: searchQuery ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "rcm-subcollection-empty-icon", children: _jsx(IconSearch, { size: 32 }) }), _jsxs("p", { className: "rcm-subcollection-empty-title", children: ["'", searchQuery, "'\uC5D0 \uB300\uD55C \uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4"] }), _jsx("p", { className: "rcm-subcollection-empty-hint", children: "\uB2E4\uB978 \uD0A4\uC6CC\uB4DC\uB85C \uAC80\uC0C9\uD574 \uBCF4\uC138\uC694" }), _jsx("button", { type: "button", onClick: clearSearch, className: "rcm-subcollection-empty-action", children: "\uAC80\uC0C9 \uCD08\uAE30\uD654" })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "rcm-subcollection-empty-icon", children: _jsx(IconLayoutGrid, { size: 32 }) }), _jsx("p", { className: "rcm-subcollection-empty-title", children: "\uD45C\uC2DC\uD560 \uD56D\uBAA9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4" }), !readonly && (_jsxs("button", { type: "button", onClick: handleAdd, className: "rcm-subcollection-empty-action", children: [_jsx(IconPlus, { size: 16 }), "\uCCAB \uBC88\uC9F8 \uD56D\uBAA9 \uCD94\uAC00"] }))] })) })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: gridClassName, children: paginatedData.map((item) => (_jsx(CardItem, { item: item, entityForm: entityForm, parentEntityForm: parentEntityForm, parentId: parentId, ...(cardConfig !== undefined ? { cardConfig } : {}), relation: relation, readonly: readonly, ...(session !== undefined ? { session } : {}), ...(viewDetail ? { onClick: () => handleCardClick(item) } : {}), ...(!readonly ? { onEdit: () => handleEdit(item) } : {}), ...(!readonly ? { onDelete: () => handleDelete(item) } : {}) }, item.id))) }), isPaginationEnabled && totalPages > 1 && (_jsxs("div", { className: "rcm-subcollection-pagination", children: [_jsx("button", { type: "button", onClick: goToFirstPage, disabled: currentPage === 1, className: "rcm-subcollection-page-btn", title: "\uCCAB \uD398\uC774\uC9C0", children: _jsx(IconChevronsLeft, { size: 16, stroke: 2 }) }), _jsx("button", { type: "button", onClick: goToPrevPage, disabled: currentPage === 1, className: "rcm-subcollection-page-btn", title: "\uC774\uC804 \uD398\uC774\uC9C0", children: _jsx(IconChevronLeft, { size: 16, stroke: 2 }) }), _jsxs("div", { className: "rcm-subcollection-page-info", children: [_jsx("span", { className: "rcm-subcollection-page-info-current", children: currentPage }), _jsx("span", { className: "rcm-subcollection-count-sep", children: "/" }), _jsx("span", { children: totalPages })] }), _jsx("button", { type: "button", onClick: goToNextPage, disabled: currentPage === totalPages, className: "rcm-subcollection-page-btn", title: "\uB2E4\uC74C \uD398\uC774\uC9C0", children: _jsx(IconChevronRight, { size: 16, stroke: 2 }) }), _jsx("button", { type: "button", onClick: goToLastPage, disabled: currentPage === totalPages, className: "rcm-subcollection-page-btn", title: "\uB9C8\uC9C0\uB9C9 \uD398\uC774\uC9C0", children: _jsx(IconChevronsRight, { size: 16, stroke: 2 }) }), _jsxs("div", { className: "rcm-subcollection-page-size-badge", children: [pageSize, "\uAC1C\uC529"] })] }))] })), _jsx(CardSubCollectionModal, { isOpen: isModalOpen, entityForm: entityForm, parentEntityForm: parentEntityForm, itemId: selectedItemId, relation: relation, mode: modalMode, onClose: handleModalClose, onSave: handleSaveSuccess, onDelete: handleDeleteSuccess, readonly: readonly || modalMode === 'view', allowDelete: !readonly && modalMode === 'edit' })] }));
};
export default CardSubCollectionView;
//# sourceMappingURL=CardSubCollectionView.js.map