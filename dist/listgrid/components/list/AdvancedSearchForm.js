'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { SearchForm } from "../../form/SearchForm";
import { AbstractManyToOneField, MultipleOptionalField, OptionalField } from '../fields/abstract';
import { Fragment, useEffect, useState } from "react";
import { getTranslation } from "../../utils/i18n";
import { Transition } from "@headlessui/react";
import { generateUUID } from '../../utils/simpleCrypt';
// import {ManyToOneField} from '../components/fields/ManyToOneField'; // Removed - using AbstractManyToOneField instead
import { isBlank } from '../../utils/StringUtil';
// import {UserField} from "../fields/UserField"; // Removed to fix circular dependency
import { FilterView } from "./ui/FilterView";
// NOT 계열 조건인지 확인하는 유틸리티 함수
const isNotCondition = (queryConditionType) => {
    if (!queryConditionType)
        return false;
    return queryConditionType.startsWith('NOT_') ||
        queryConditionType === 'NOT_EQUAL' ||
        queryConditionType === 'NOT_LIKE' ||
        queryConditionType === 'NOT_START_WITH' ||
        queryConditionType === 'NOT_END_WITH' ||
        queryConditionType === 'NOT_BETWEEN' ||
        queryConditionType === 'NOT_LESS_THAN' ||
        queryConditionType === 'NOT_LESS_THAN_EQUAL' ||
        queryConditionType === 'NOT_GREATER' ||
        queryConditionType === 'NOT_GREATER_THAN_EQUAL';
};
export const AdvancedSearchForm = ({ fields, entityForm, quickSearchProperty, searchForm, show, onClose, subCollection = false, ...props }) => {
    const [tempSearchForm, setTempSearchForm] = useState();
    const [resetCacheKey, setResetCacheKey] = useState();
    useEffect(() => {
        setResetCacheKey(generateUUID());
    }, []);
    useEffect(() => {
        setTempSearchForm(searchForm.clone());
    }, [searchForm]);
    const hidden = !show || (!searchForm) || (!tempSearchForm);
    const { t } = getTranslation();
    return (_jsx(Transition, { appear: true, show: !hidden, as: Fragment, children: _jsx(Transition.Child, { as: Fragment, enter: "ease-out duration-500", enterFrom: "opacity-0 scale-95", enterTo: "opacity-100 scale-100", leave: "ease-in duration-200", leaveFrom: "opacity-100 scale-100", leaveTo: "opacity-0 scale-95", children: _jsx("div", { className: "rcm-adv-search-legacy-outer", children: _jsx("div", { className: "rcm-adv-search-scroll", children: _jsxs("div", { className: `rcm-adv-search-legacy-inner ${subCollection ? 'rcm-adv-search-legacy-inner-sub' : ''}`, children: [_jsx("h4", { className: "rcm-adv-search-legacy-title", children: "\uD1B5\uD569 \uAC80\uC0C9" }), fields.map((field, index) => {
                                if (tempSearchForm === undefined) {
                                    return null;
                                }
                                // NOT 계열 조건은 통합검색에서 표시하지 않음 (개발자 지정 필터 보존)
                                const fieldName = (field instanceof AbstractManyToOneField) ? (field.getName() + ".id") : field.getName();
                                const filterItem = tempSearchForm.getFilters().get('AND')?.find(item => item.name === fieldName);
                                // NOT 조건인 경우 통합검색에 표시하지 않음 (빈 값으로 처리)
                                const fieldValue = isNotCondition(filterItem?.queryConditionType) ? null : tempSearchForm.getSearchValue(fieldName);
                                const filterField = field.clone(false).withValue(fieldValue);
                                if (!field.isFilterable()) {
                                    return null;
                                }
                                return (_jsxs("div", { className: `${resetCacheKey}_${index}`, children: [_jsx("label", { htmlFor: `${field.getName()}`, className: 'flex items-center', children: field.viewLabel(t) }), _jsx(FilterView, { entityForm: entityForm, field: filterField, value: fieldValue, onChange: (name, value, op = 'EQUAL') => {
                                                setTempSearchForm(prevForm => {
                                                    const newSearchForm = prevForm?.clone() ?? SearchForm.create();
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
                                                    // NOT 조건일 때는 통합검색에서 직접 수정하지 않음 (개발자 지정 필터 보존)
                                                    if (isNotCondition(op)) {
                                                        return newSearchForm;
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
                                                    if (isBlank(value) && (op !== 'NULL' && op !== 'NOT_NULL')) {
                                                        newSearchForm.removeFilter(name);
                                                    }
                                                    else {
                                                        newSearchForm.handleAndFilter(name, value, op);
                                                    }
                                                    return newSearchForm;
                                                });
                                            } }, `${resetCacheKey}_${index}_filter`)] }, `${resetCacheKey}_${index}`));
                            }), _jsxs("div", { className: 'py-4 flex items-center justify-center space-x-2', children: [_jsx("button", { className: `btn btn-outline-dark whitespace-nowrap px-4`, onClick: () => {
                                            setResetCacheKey(generateUUID());
                                            onClose();
                                        }, children: "\uB2EB\uAE30" }), _jsx("button", { className: `btn btn-outline-danger whitespace-nowrap px-4`, onClick: () => {
                                            setTempSearchForm(SearchForm.create());
                                            props.onReset();
                                            setResetCacheKey(generateUUID());
                                        }, children: "\uCD08\uAE30\uD654" }), _jsx("button", { className: `btn btn-primary whitespace-nowrap px-4 min-w-[80px]`, onClick: () => {
                                            if (tempSearchForm) {
                                                props.onSubmit(tempSearchForm);
                                            }
                                        }, children: "\uAC80\uC0C9" })] })] }) }) }) }) }));
};
//# sourceMappingURL=AdvancedSearchForm.js.map