'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright (c) "2025". gjcu.ac.kr by GJCU
 * Licensed under the GJCU Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by GJCU
 */
import { SearchForm } from '../../form/SearchForm';
import { AbstractManyToOneField, MultipleOptionalField, OptionalField } from '../fields/abstract';
import React, { Fragment, useCallback, useEffect, useMemo, useReducer, } from 'react';
import { getTranslation } from '../../utils/i18n';
import { Transition } from '@headlessui/react';
import { isBlank } from '../../utils/StringUtil';
import { MemoizedFilterField } from './ui/MemoizedFilterField';
import { FieldSelector } from './ui/FieldSelector';
import { IconLayoutGrid, IconLayoutList, IconRefresh, IconSearch, IconX } from '@tabler/icons-react';
// NOT condition check utility
const isNotCondition = (queryConditionType) => {
    if (!queryConditionType)
        return false;
    return (queryConditionType.startsWith('NOT_') ||
        queryConditionType === 'NOT_EQUAL' ||
        queryConditionType === 'NOT_LIKE' ||
        queryConditionType === 'NOT_START_WITH' ||
        queryConditionType === 'NOT_END_WITH' ||
        queryConditionType === 'NOT_BETWEEN' ||
        queryConditionType === 'NOT_LESS_THAN' ||
        queryConditionType === 'NOT_LESS_THAN_EQUAL' ||
        queryConditionType === 'NOT_GREATER' ||
        queryConditionType === 'NOT_GREATER_THAN_EQUAL');
};
function searchFormReducer(state, action) {
    switch (action.type) {
        case 'SET_TEMP_FORM':
            return { ...state, tempSearchForm: action.payload };
        case 'SYNC_EXTERNAL_FORM': {
            const newForm = action.payload.searchForm.clone();
            const quickSearchValue = action.payload.quickSearchValue ?? '';
            const hasMultipleQuickSearchFields = action.payload.hasMultipleQuickSearchFields ?? false;
            const quickSearchFieldNames = action.payload.quickSearchFieldNames ?? new Set();
            // 통합검색 모드 기본값 결정:
            // 1. quickSearchValue가 있으면 (OR 검색 활성) → true
            // 2. quickSearch 필드가 2개 이상이고, 해당 필드에 AND 필터가 없으면 → true
            // 3. 그 외 → false
            let useQuickSearchMode = false;
            // AND 필터가 있는 quickSearch 필드들을 찾아서 selectedFields에 추가할 준비
            const andFilters = newForm.getFilters().get('AND') ?? [];
            const quickSearchFieldsWithAndFilter = [];
            if (!isBlank(quickSearchValue)) {
                // OR 검색이 이미 활성화된 상태
                useQuickSearchMode = true;
            }
            else if (hasMultipleQuickSearchFields) {
                // quickSearch 필드가 2개 이상인 경우, AND 필터 존재 여부 확인
                andFilters.forEach(filter => {
                    // 직접 매칭
                    if (quickSearchFieldNames.has(filter.name)) {
                        quickSearchFieldsWithAndFilter.push(filter.name);
                    }
                    // ManyToOne 필드의 경우 .id 접미사 제거하여 확인
                    [...quickSearchFieldNames].forEach(fieldName => {
                        if (filter.name === `${fieldName}.id`) {
                            quickSearchFieldsWithAndFilter.push(fieldName);
                        }
                    });
                });
                // quickSearch 필드에 AND 필터가 없으면 통합검색 모드 활성화
                useQuickSearchMode = quickSearchFieldsWithAndFilter.length === 0;
            }
            // 통합검색 모드가 아니고 quickSearch 필드에 AND 필터가 있으면
            // 해당 필드들을 selectedFields에 추가
            let newSelectedFields = state.selectedFields;
            if (!useQuickSearchMode && quickSearchFieldsWithAndFilter.length > 0) {
                newSelectedFields = new Set(state.selectedFields);
                quickSearchFieldsWithAndFilter.forEach(fieldName => {
                    newSelectedFields.add(fieldName);
                });
            }
            return {
                ...state,
                tempSearchForm: newForm,
                selectedFields: newSelectedFields,
                quickSearchValue,
                useQuickSearchMode,
            };
        }
        case 'INIT_SELECTED_FIELDS': {
            // listFieldNames를 그대로 사용 - 목록에 표시되는 필드는 모두 검색 필드로 선택
            // (quickSearch 필드도 포함 - 개별 AND 필터로 사용 가능)
            const { listFieldNames } = action.payload;
            return {
                ...state,
                selectedFields: new Set(listFieldNames),
            };
        }
        case 'UPDATE_FILTER': {
            if (!state.tempSearchForm)
                return state;
            const newForm = state.tempSearchForm.clone();
            const { name, value, op } = action.payload;
            if (isNotCondition(op)) {
                return state;
            }
            if (isBlank(value) && op !== 'NULL' && op !== 'NOT_NULL') {
                newForm.removeFilter(name);
            }
            else {
                // 항상 AND 조건으로 필터 적용
                newForm.handleAndFilter(name, value, op);
            }
            return { ...state, tempSearchForm: newForm };
        }
        case 'TOGGLE_FIELD': {
            const newSelected = new Set(state.selectedFields);
            if (newSelected.has(action.payload)) {
                newSelected.delete(action.payload);
            }
            else {
                newSelected.add(action.payload);
            }
            return { ...state, selectedFields: newSelected };
        }
        case 'SELECT_ALL_FIELDS':
            return { ...state, selectedFields: new Set(action.payload) };
        case 'DESELECT_ALL_FIELDS':
            return { ...state, selectedFields: new Set() };
        case 'RESET_FORM':
            return {
                ...state,
                tempSearchForm: SearchForm.create(),
                quickSearchValue: '',
                useQuickSearchMode: false,
            };
        case 'TOGGLE_VIEW':
            return { ...state, isGridView: !state.isGridView };
        case 'TOGGLE_QUICK_SEARCH_MODE':
            return { ...state, useQuickSearchMode: !state.useQuickSearchMode };
        case 'SET_QUICK_SEARCH_VALUE':
            return { ...state, quickSearchValue: action.payload };
        default:
            return state;
    }
}
export const AdvancedSearchFormV2 = ({ fields, entityForm, listFieldNames, quickSearchProperty, searchForm, show, onClose, subCollection = false, popup = false, ...props }) => {
    // subCollection 또는 popup 모드에서는 컴팩트 스타일 적용
    const isCompactMode = subCollection || popup;
    const { t } = getTranslation();
    // QuickSearch 필드명 목록 추출
    const quickSearchFieldNames = useMemo(() => {
        if (!quickSearchProperty)
            return new Set();
        const names = new Set();
        names.add(quickSearchProperty.name);
        if (quickSearchProperty.orFields) {
            quickSearchProperty.orFields.forEach(name => names.add(name));
        }
        return names;
    }, [quickSearchProperty]);
    // QuickSearch 필드 존재 여부
    const hasQuickSearchFields = quickSearchFieldNames.size > 0;
    // 통합검색이 의미 있는 경우: quickSearch 필드가 2개 이상일 때만
    // (원칙: 퀵서치 가능 필드가 하나 뿐이라면 통합 필드가 필요 없다)
    const hasMultipleQuickSearchFields = quickSearchFieldNames.size > 1;
    // Get filterable fields only (computed once)
    const filterableFields = useMemo(() => {
        return fields.filter((field) => field.isFilterable());
    }, [fields]);
    // QuickSearch가 아닌 일반 필드들
    const regularFields = useMemo(() => {
        return filterableFields.filter(field => !quickSearchFieldNames.has(field.getName()));
    }, [filterableFields, quickSearchFieldNames]);
    // QuickSearch 필드들
    const quickSearchFields = useMemo(() => {
        return filterableFields.filter(field => quickSearchFieldNames.has(field.getName()));
    }, [filterableFields, quickSearchFieldNames]);
    // Initialize selected fields based on listFieldNames (columns shown in list)
    // Include ALL listFieldNames (including quickSearch fields) for consistent display
    const initialSelectedFields = useMemo(() => {
        // listFieldNames가 있으면 그대로 사용 (quickSearch 필드도 포함)
        if (listFieldNames && listFieldNames.size > 0) {
            // listFieldNames를 그대로 사용 - 목록에 표시되는 필드는 모두 검색 필드로 선택
            return new Set(listFieldNames);
        }
        // fallback: filterableFields에서 처음 6개
        return new Set(filterableFields.slice(0, 6).map((f) => f.getName()));
    }, [listFieldNames, filterableFields]);
    // State management with useReducer
    const [state, dispatch] = useReducer(searchFormReducer, {
        tempSearchForm: null,
        selectedFields: initialSelectedFields,
        isGridView: true,
        useQuickSearchMode: false,
        quickSearchValue: '',
    });
    // listFieldNames가 있으면 selectedFields 초기화 (최초 1회)
    const initializedRef = React.useRef(false);
    useEffect(() => {
        if (listFieldNames && listFieldNames.size > 0 && !initializedRef.current) {
            initializedRef.current = true;
            dispatch({
                type: 'INIT_SELECTED_FIELDS',
                payload: { listFieldNames }
            });
        }
    }, [listFieldNames]);
    // Sync temp form with external searchForm
    useEffect(() => {
        const quickSearchValue = searchForm.getQuickSearchValue() ?? '';
        dispatch({
            type: 'SYNC_EXTERNAL_FORM',
            payload: {
                searchForm,
                quickSearchValue,
                hasMultipleQuickSearchFields,
                quickSearchFieldNames,
            }
        });
    }, [searchForm, hasMultipleQuickSearchFields, quickSearchFieldNames]);
    // Memoized handlers
    const handleFilterChange = useCallback((name, value, op = 'EQUAL') => {
        const field = entityForm.getField(name);
        if (field instanceof AbstractManyToOneField) {
            if (field.config.field?.id) {
                name = name + '.' + field.config.field.id;
                if (value !== undefined && value[field.config.field.id] !== undefined) {
                    value = value[field.config.field.id];
                }
            }
            else {
                name = name + '.id';
                if (value?.['id'] !== undefined) {
                    value = value['id'];
                }
            }
        }
        if (field instanceof OptionalField && field.singleFilter) {
            op = 'EQUAL';
        }
        else if (field instanceof MultipleOptionalField) {
            op = 'IN';
        }
        else if (field instanceof OptionalField && (field.options?.length ?? 0) > 2) {
            op = 'IN';
        }
        dispatch({ type: 'UPDATE_FILTER', payload: { name, value, op } });
    }, [entityForm]);
    const handleToggleField = useCallback((fieldName) => {
        dispatch({ type: 'TOGGLE_FIELD', payload: fieldName });
    }, []);
    const handleSelectAll = useCallback(() => {
        // QuickSearch 모드에서는 quickSearch 필드 제외
        const fieldsToSelect = state.useQuickSearchMode
            ? regularFields.map((f) => f.getName())
            : filterableFields.map((f) => f.getName());
        dispatch({ type: 'SELECT_ALL_FIELDS', payload: fieldsToSelect });
    }, [filterableFields, regularFields, state.useQuickSearchMode]);
    const handleDeselectAll = useCallback(() => {
        dispatch({ type: 'DESELECT_ALL_FIELDS' });
    }, []);
    const handleReset = useCallback(() => {
        dispatch({ type: 'RESET_FORM' });
        props.onReset();
    }, [props]);
    const handleSubmit = useCallback(() => {
        if (state.tempSearchForm) {
            const newForm = state.tempSearchForm.clone();
            if (quickSearchProperty) {
                const allQuickSearchFields = [quickSearchProperty.name, ...(quickSearchProperty.orFields ?? [])];
                // 통합검색 모드인 경우 quickSearch 필드들에 OR 조건으로 검색 적용
                if (state.useQuickSearchMode && !isBlank(state.quickSearchValue)) {
                    newForm.handleQuickSearch(state.quickSearchValue, allQuickSearchFields);
                }
                else {
                    // 통합검색 모드가 아니거나 값이 없으면 기존 quickSearch OR 필터 제거
                    newForm.handleQuickSearch('', allQuickSearchFields);
                }
            }
            props.onSubmit(newForm);
        }
    }, [state.tempSearchForm, state.useQuickSearchMode, state.quickSearchValue, quickSearchProperty, props]);
    const handleToggleView = useCallback(() => {
        dispatch({ type: 'TOGGLE_VIEW' });
    }, []);
    const handleToggleQuickSearchMode = useCallback(() => {
        dispatch({ type: 'TOGGLE_QUICK_SEARCH_MODE' });
    }, []);
    const handleQuickSearchValueChange = useCallback((value) => {
        dispatch({ type: 'SET_QUICK_SEARCH_VALUE', payload: value });
    }, []);
    // Get field value for display
    const getFieldValue = useCallback((field) => {
        if (!state.tempSearchForm)
            return null;
        const fieldName = field instanceof AbstractManyToOneField
            ? field.getName() + '.id'
            : field.getName();
        // AND 조건에서 필터 조회
        const andFilters = state.tempSearchForm.getFilters().get('AND');
        const filterItem = andFilters?.find((item) => item.name === fieldName);
        // Don't show NOT condition values in UI
        if (isNotCondition(filterItem?.queryConditionType)) {
            return null;
        }
        if (filterItem) {
            return (filterItem.values && filterItem.values.length > 0)
                ? filterItem.values
                : filterItem.value;
        }
        return null;
    }, [state.tempSearchForm]);
    // Fields to display (filtered by selection and mode)
    const displayFields = useMemo(() => {
        // 통합검색 모드에서는 quickSearch 필드 제외
        const availableFields = state.useQuickSearchMode ? regularFields : filterableFields;
        return availableFields.filter((field) => state.selectedFields.has(field.getName()));
    }, [filterableFields, regularFields, state.selectedFields, state.useQuickSearchMode]);
    // QuickSearch 라벨 생성
    const quickSearchLabel = useMemo(() => {
        if (!quickSearchProperty)
            return '';
        const labels = [];
        // 메인 필드 라벨
        if (typeof quickSearchProperty.label === 'string') {
            labels.push(t(quickSearchProperty.label));
        }
        // orFieldLabels가 있으면 추가
        if (quickSearchProperty.orFieldLabels) {
            quickSearchProperty.orFieldLabels.forEach(label => {
                if (typeof label === 'string') {
                    labels.push(t(label));
                }
            });
        }
        return labels.join(', ');
    }, [quickSearchProperty, t]);
    const hidden = !show || !searchForm || !state.tempSearchForm;
    return (_jsx(Transition, { appear: true, show: !hidden, as: Fragment, children: _jsx(Transition.Child, { as: Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0 scale-95", enterTo: "opacity-100 scale-100", leave: "ease-in duration-150", leaveFrom: "opacity-100 scale-100", leaveTo: "opacity-0 scale-95", children: _jsx("div", { className: isCompactMode ? '' : 'rcm-adv-search-outer', children: _jsx("div", { className: "rcm-adv-search-scroll", children: _jsxs("div", { className: `rcm-adv-search-inner ${isCompactMode ? 'rcm-adv-search-inner-compact' : 'rcm-adv-search-inner-panel'}`, children: [_jsxs("div", { className: "rcm-adv-search-header", children: [_jsxs("div", { className: "rcm-adv-search-header-left", children: [_jsx(IconSearch, { className: "rcm-adv-search-header-icon" }), _jsx("span", { className: "rcm-text", "data-size": "md", "data-weight": "semibold", children: "\uD1B5\uD569 \uAC80\uC0C9" }), _jsxs("span", { className: "rcm-adv-search-count", children: [displayFields.length, "\uAC1C \uD544\uB4DC"] })] }), _jsx("div", { className: "rcm-adv-search-header-right", children: _jsx("button", { type: "button", onClick: handleToggleView, className: "rcm-adv-search-view-toggle", title: state.isGridView ? '리스트 뷰' : '그리드 뷰', children: state.isGridView ? (_jsx(IconLayoutList, { className: "rcm-adv-search-view-icon" })) : (_jsx(IconLayoutGrid, { className: "rcm-adv-search-view-icon" })) }) })] }), hasMultipleQuickSearchFields && (_jsxs("div", { className: "rcm-adv-search-qs-toggle", children: [_jsxs("label", { className: "rcm-adv-search-qs-label", children: [_jsx("input", { type: "checkbox", checked: state.useQuickSearchMode, onChange: handleToggleQuickSearchMode, className: "rcm-adv-search-qs-checkbox" }), _jsx("span", { className: "rcm-adv-search-qs-title", children: "\uD1B5\uD569\uAC80\uC0C9 \uC0AC\uC6A9" })] }), _jsxs("span", { className: "rcm-adv-search-qs-hint", children: [quickSearchLabel, " \uD544\uB4DC\uB97C \uD558\uB098\uC758 \uAC80\uC0C9\uC5B4\uB85C \uAC80\uC0C9\uD569\uB2C8\uB2E4"] })] })), state.useQuickSearchMode && hasMultipleQuickSearchFields && (_jsxs("div", { className: "rcm-adv-search-qs-input-panel", children: [_jsxs("label", { className: "rcm-adv-search-qs-input-label", children: [quickSearchLabel, " \uAC80\uC0C9"] }), _jsx("input", { type: "text", value: state.quickSearchValue, onChange: (e) => handleQuickSearchValueChange(e.target.value), placeholder: `${quickSearchLabel} 중 아무거나 입력...`, className: "rcm-input" }), _jsxs("p", { className: "rcm-adv-search-qs-description", children: ["\uC785\uB825\uD55C \uAC80\uC0C9\uC5B4\uAC00 ", quickSearchLabel, " \uC911 \uD558\uB098\uB77C\uB3C4 \uD3EC\uD568\uB418\uBA74 \uAC80\uC0C9\uB429\uB2C8\uB2E4 (OR \uC870\uAC74)"] })] })), _jsx(FieldSelector, { availableFields: state.useQuickSearchMode ? regularFields : filterableFields, selectedFieldNames: state.selectedFields, onToggleField: handleToggleField, onSelectAll: handleSelectAll, onDeselectAll: handleDeselectAll }), displayFields.length > 0 ? (_jsx("div", { className: state.isGridView ? 'rcm-adv-search-grid' : 'rcm-adv-search-list', children: displayFields.map((field) => {
                                    const fieldName = field instanceof AbstractManyToOneField
                                        ? field.getName() + '.id'
                                        : field.getName();
                                    return (_jsx(MemoizedFilterField, { entityForm: entityForm, field: field.clone(false).withValue(getFieldValue(field)), fieldName: field.getName(), value: getFieldValue(field), onChange: handleFilterChange, isCompact: state.isGridView }, fieldName));
                                }) })) : (_jsxs("div", { className: "rcm-adv-search-empty", children: [_jsx("p", { className: "rcm-adv-search-empty-text", children: "\uAC80\uC0C9\uD560 \uD544\uB4DC\uB97C \uC120\uD0DD\uD574\uC8FC\uC138\uC694" }), _jsx("button", { type: "button", onClick: handleSelectAll, className: "rcm-adv-search-empty-action", children: "\uC804\uCCB4 \uD544\uB4DC \uC120\uD0DD" })] })), _jsxs("div", { className: "rcm-adv-search-footer", children: [_jsxs("button", { type: "button", className: "rcm-button rcm-adv-search-btn", "data-variant": "outline", "data-size": "sm", onClick: onClose, children: [_jsx(IconX, { className: "rcm-m2o-action-icon" }), "\uB2EB\uAE30"] }), _jsxs("button", { type: "button", className: "rcm-button rcm-adv-search-btn", "data-variant": "outline", "data-color": "error", "data-size": "sm", onClick: handleReset, children: [_jsx(IconRefresh, { className: "rcm-m2o-action-icon" }), "\uCD08\uAE30\uD654"] }), _jsxs("button", { type: "button", className: "rcm-button rcm-adv-search-btn rcm-adv-search-btn-submit", "data-variant": "primary", "data-size": "sm", onClick: handleSubmit, children: [_jsx(IconSearch, { className: "rcm-m2o-action-icon" }), "\uAC80\uC0C9"] })] })] }) }) }) }) }));
};
// Re-export original for backward compatibility
export { AdvancedSearchForm } from './AdvancedSearchForm';
//# sourceMappingURL=AdvancedSearchFormV2.js.map