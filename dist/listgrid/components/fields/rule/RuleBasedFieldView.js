'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { useEffect, useState } from "react";
import { RuleConditionValue, } from './Type';
import { isEmpty } from "../../../utils";
import { IconBox } from "@tabler/icons-react";
import { SelectBox } from "../../../ui";
import { isBlank } from '../../../utils/StringUtil';
import { RuleCondition } from './RuleCondition';
import { isTrue } from '../../../utils/BooleanUtil';
import { getQueryConditionValueType, SearchForm } from "../../../form/SearchForm";
import { getExternalApiDataWithError } from "../../../misc";
import { ViewHelpText } from "../../form/ui/ViewHelpText";
import { ViewFieldError } from "../../form/ui/ViewFieldError";
import { useLoadingStore } from "../../../loading";
export const RuleBasedFieldsView = (props) => {
    // 기본적으로 리스트의 필드들은 검색이 가능하다는 뜻이다.
    const [condition, setCondition] = useState('AND');
    const [ruleConditions, setRuleConditions] = useState(new Map());
    const [fieldErrors, setFieldErrors] = useState(new Map());
    const [submitError, setSubmitError] = useState('');
    const [targetRuleFieldEntityForm, setTargetRuleFieldEntityForm] = useState();
    const { openBaseLoading, setOpenBaseLoading } = useLoadingStore();
    useEffect(() => {
        // 넘어온 props.value가 Map인지 확인
        if (props.value instanceof Map) {
            setRuleConditions(props.value);
        }
        else if (typeof props.value === 'object' && props.value !== null) {
            // 객체인 경우 Map으로 변환 시도
            const newMap = new Map(Object.entries(props.value).map(([key, value]) => [Number(key), value]));
            setRuleConditions(newMap);
        }
        else {
            // Map이 아니거나 변환이 불가능한 경우 빈 Map으로 설정
            setRuleConditions(new Map());
        }
        // 대상 엔티티폼이 하나 뿐이라면 굳이 바꿀 필요가 없다.
        if (props.entityForms.length === 1) {
            setTargetRuleFieldEntityForm(props.entityForms[0]);
        }
    }, []);
    if (props.entityForms.length === 0) {
        return null;
    }
    const hasConditions = ruleConditions !== undefined && ruleConditions.size > 0;
    const filtered = isFiltered();
    function getMaxRuleConditionId() {
        if (ruleConditions === undefined || ruleConditions.size === 0) {
            return 0;
        }
        const maxId = Math.max(...ruleConditions.keys());
        return maxId + 1;
    }
    const isButton = props.viewType !== 'field';
    function addNewRuleCondition() {
        if (condition !== undefined && targetRuleFieldEntityForm !== undefined) {
            const id = getMaxRuleConditionId();
            const ruleCondition = new RuleConditionValue(id, condition, targetRuleFieldEntityForm.prefix);
            const newRuleConditions = new Map(ruleConditions);
            newRuleConditions.set(id, ruleCondition);
            setRuleConditions(newRuleConditions);
            if (!isButton) {
                // viewType 이 field 면 바뀔 때 마다 자동으로 onSubmit 을 처리한다.
                props.onSubmitField(newRuleConditions);
            }
        }
    }
    const targetEntityOptions = [];
    for (const form of props.entityForms) {
        targetEntityOptions.push({ label: form.label, value: form.prefix });
    }
    function getTargetEntityForm(targetEntityPrefix) {
        for (const form of props.entityForms) {
            if (form.prefix === targetEntityPrefix) {
                return form;
            }
        }
        return props.entityForms[0];
    }
    return _jsxs(_Fragment, { children: [_jsxs("div", { className: "flex flex-wrap w-full justify-center mb-5", children: [_jsxs("div", { className: `w-full ${isButton ? 'p-6 pt-12 border border-gray-500/20 rounded-md' : 'p-2'} relative`, children: [isButton && _jsxs(_Fragment, { children: [_jsx("div", { className: "bg-primary absolute text-white-light left-6 -top-8 w-16 h-16 rounded-md flex items-center justify-center mb-5 mx-auto", children: _jsx(IconBox, { className: "h-12 w-12" }) }), _jsx("h5", { className: "text-dark text-lg font-semibold mb-3.5 dark:text-white-light", children: props.label }), props.helpText && _jsx(ViewHelpText, { helpText: props.helpText })] }), _jsxs("div", { className: 'flex gap-3 items-center', children: [(props.entityForms.length > 1) && _jsx("div", { className: 'min-w-[200px]', children: _jsx(SelectBox, { options: targetEntityOptions, value: targetRuleFieldEntityForm?.prefix ?? '', required: true, onChange: (prefix) => {
                                                for (const form of props.entityForms) {
                                                    if (form.prefix === prefix) {
                                                        setTargetRuleFieldEntityForm(form);
                                                        break;
                                                    }
                                                }
                                            }, name: 'chooseTargetEntityForm' }) }), _jsx("div", { className: 'min-w-[200px]', children: _jsx(SelectBox, { options: [{ label: 'AND', value: 'AND' }, { label: 'OR', value: 'OR' }], value: condition ?? 'AND', required: true, onChange: (condition) => {
                                                setCondition(condition);
                                            }, name: 'chooseCondition' }) }), _jsx("div", { children: _jsx("button", { className: 'btn btn-secondary h-[36px]', disabled: (condition === undefined || targetRuleFieldEntityForm === undefined), onClick: () => {
                                                addNewRuleCondition();
                                            }, children: "\uCD94\uAC00" }) })] })] }), !isBlank(submitError) && _jsx("div", { className: 'px-2 mt-5', children: _jsx(ViewFieldError, { errors: [submitError] }) })] }), function () {
                if (hasConditions) {
                    const conditionViews = [];
                    ruleConditions.forEach(c => {
                        conditionViews.push(_jsx(RuleCondition, { id: c.id, condition: c.condition, targetEntityForm: getTargetEntityForm(c.targetEntityPrefix), clearError: () => {
                                clearErrorById(c.id);
                            }, fieldErrors: fieldErrors.get(c.id) ?? new Map(), setFieldError: (error) => {
                                addError(c.id, error);
                            }, fieldValues: c.values, clearCondition: () => {
                                clearCondition(c.id);
                            }, addCondition: (value) => {
                                const newConditions = new Map(ruleConditions);
                                newConditions.set(c.id, value);
                                const newFieldErrors = new Map(fieldErrors);
                                newFieldErrors.delete(c.id);
                                setSubmitError('');
                                setFieldErrors(newFieldErrors);
                                setRuleConditions(newConditions);
                                if (!isButton) {
                                    // viewType 이 field 면 바뀔 때 마다 자동으로 onSubmit 을 처리한다.
                                    props.onSubmitField(newConditions);
                                }
                            } }, c.id));
                    });
                    return conditionViews;
                }
                return null;
            }(), props.viewType === 'selector' &&
                _jsxs("div", { className: 'flex gap-3 items-center justify-center mt-5', children: [_jsx("button", { className: 'btn btn-outline-secondary h-[34px]', onClick: () => {
                                props.onCancel();
                            }, children: "\uB2EB\uAE30" }), _jsxs("button", { className: 'btn btn-secondary h-[34px]', disabled: !filtered, onClick: () => {
                                submit();
                            }, children: ["\uAC80\uC0C9 \uD6C4 ", props.type === 'add' ? '등록' : '제거'] })] })] });
    function clearError() {
        setSubmitError('');
        setFieldErrors(new Map());
    }
    /**
     * 각 컨디션 별 ID 제거
     * @param id
     */
    function clearErrorById(id) {
        setSubmitError('');
        const newFieldErrors = new Map(fieldErrors);
        newFieldErrors.delete(id);
        setFieldErrors(newFieldErrors);
    }
    function addError(id, errors) {
        const newErrors = new Map(fieldErrors);
        newErrors.set(id, errors);
        setFieldErrors(newErrors);
    }
    function isFiltered() {
        if (ruleConditions !== undefined && ruleConditions.size > 0) {
            let filtered = true;
            ruleConditions.forEach((ruleCondition) => {
                if (ruleCondition.isEmpty()) {
                    filtered = false;
                    return;
                }
            });
            return filtered;
        }
        return false;
    }
    function clearCondition(id) {
        if (isEmpty(ruleConditions)) {
            return;
        }
        const newRuleConditions = new Map(ruleConditions);
        newRuleConditions.delete(id);
        setRuleConditions(newRuleConditions);
        if (!isButton) {
            // viewType 이 field 면 바뀔 때 마다 자동으로 onSubmit 을 처리한다.
            props.onSubmitField(newRuleConditions);
        }
    }
    function submit(ruleConditionValue) {
        setOpenBaseLoading(true);
        // fieldValues 를 조사한다.
        clearError();
        const errors = new Map();
        const conditions = ruleConditionValue ?? ruleConditions;
        for (const key of conditions.keys()) {
            const ruleCondition = conditions.get(key);
            const ruleError = new Map();
            ruleCondition.values.forEach((fieldValue) => {
                const field = getField(fieldValue.name);
                const currentQueryConditionType = fieldValue.queryConditionType;
                const currentValueType = getQueryConditionValueType(currentQueryConditionType);
                if (currentValueType !== 'NONE') {
                    if (fieldValue.values === undefined || fieldValue.values.length === 0 || isBlank(fieldValue.values[0])) {
                        ruleError.set(ruleCondition.id, `${field?.getLabel()} 의 검색어를 입력하세요.`);
                    }
                    if (currentValueType === 'RANGE') {
                        if (fieldValue.values === undefined
                            || fieldValue.values.length !== 2
                            || isBlank(fieldValue.values[0])
                            || isBlank(fieldValue.values[1])) {
                            ruleError.set(ruleCondition.id, `${field?.getLabel()} 의 검색 범위를 알맞게 입력하세요.`);
                        }
                    }
                }
            });
            if (ruleError.size > 0) {
                errors.set(ruleCondition.id, ruleError);
            }
        }
        if (errors.size > 0) {
            setFieldErrors(errors);
            setSubmitError('검색 정보를 다시 확인해 주세요.');
            setOpenBaseLoading(false);
            return;
        }
        const searchForm = new SearchForm();
        const filterMap = new Map();
        for (const key of conditions.keys()) {
            const ruleCondition = conditions.get(key);
            const fieldValues = ruleCondition.values;
            const filterItems = [];
            for (const fieldValue of fieldValues) {
                const queryConditionType = fieldValue.queryConditionType;
                const field = getField(fieldValue.name);
                if (field.type === 'manyToOne') {
                    // manyToOneField 인 경우에는 두가지 정보를 모두 서버로 보내자.
                    // @ManyToOne 으로 매핑되었을 수도 있고, 단순 key 만 저장하고 있을 수도 있기 때문이다.
                    filterItems.push({
                        name: fieldValue.name,
                        queryConditionType: queryConditionType,
                        value: queryConditionType === 'EQUAL' ? fieldValue.values[0] : undefined,
                        values: queryConditionType !== 'EQUAL' ? fieldValue.values : undefined
                    });
                    if (!fieldValue.name.endsWith("Id")) {
                        filterItems.push({
                            name: fieldValue.name + "Id",
                            queryConditionType: queryConditionType,
                            value: getQueryConditionValueType(queryConditionType) === 'SINGLE' ? fieldValue.values[0] : undefined,
                            values: getQueryConditionValueType(queryConditionType) !== 'SINGLE' ? fieldValue.values : undefined
                        });
                    }
                }
                else {
                    filterItems.push({
                        name: fieldValue.name,
                        queryConditionType: queryConditionType,
                        value: queryConditionType === 'EQUAL' ? fieldValue.values[0] : undefined,
                        values: queryConditionType !== 'EQUAL' ? fieldValue.values : undefined
                    });
                }
            }
            const condition = ruleCondition.condition;
            if (filterMap.has(condition)) {
                const newFilters = [...filterMap.get(condition)];
                newFilters.push(...filterItems);
                filterMap.set(condition, newFilters);
            }
            else {
                filterMap.set(condition, filterItems);
            }
        }
        if (filterMap.has('AND')) {
            searchForm.withFilterIgnoreDuplicate('AND', ...filterMap.get('AND'));
        }
        if (filterMap.has('OR')) {
            searchForm.withFilterIgnoreDuplicate('OR', ...filterMap.get('OR'));
        }
        searchForm.withIgnoreCache(true);
        if (searchForm.hasFilters()) {
            if (props.viewType === 'selector') {
                (async () => {
                    const response = await getExternalApiDataWithError({
                        url: props.apiUrl,
                        method: 'POST',
                        formData: searchForm
                    });
                    if (response.data !== undefined) {
                        // 결과는 RuleMappingResult 의 형태로 넘어 온다.
                        const affected = Number(response.data.affected);
                        if (affected > 0) {
                            props.onSubmitSelector(affected);
                        }
                        else {
                            if (isTrue(response.data.duplicated)) {
                                const found = Number(response.data.found);
                                setSubmitError(found + ' 건의 데이터가 검색되었으나 모두 이미 등록되었습니다. 검색 조건을 다시 설정하거나 닫기를 눌러 주세요.');
                            }
                            else {
                                setSubmitError('해당 검색 설정으로 검색된 데이터가 없습니다. 검색 조건을 다시 설정해 주세요.');
                            }
                        }
                    }
                    else {
                        setSubmitError(response.error ?? '오류가 발생했습니다.');
                    }
                    setOpenBaseLoading(false);
                })();
            }
            else {
                // RuleConditionMap 을 그대로 리턴한다.
                props.onSubmitField(conditions);
                setOpenBaseLoading(false);
            }
        }
        else {
            setSubmitError('검색 정보를 설정해야 합니다.');
            setOpenBaseLoading(false);
        }
    }
    function getField(fieldName) {
        let field = undefined;
        for (const form of props.entityForms) {
            if (props.entityForms.length === 1) {
                if (form.entityForm !== undefined) {
                    for (const field of form.entityForm.getListFields()) {
                        if (field.name === fieldName) {
                            return field;
                        }
                    }
                }
                if (form.fields !== undefined) {
                    for (const field of form.fields) {
                        if (field.name === fieldName) {
                            return field;
                        }
                    }
                }
            }
            else {
                const prefix = form.prefix;
                if (form.entityForm !== undefined) {
                    for (const field of form.entityForm.getListFields()) {
                        if (prefix + '.' + field.name === fieldName) {
                            return field;
                        }
                    }
                }
                if (form.fields !== undefined) {
                    for (const field of form.fields) {
                        if (prefix + '.' + field.name === fieldName) {
                            return field;
                        }
                    }
                }
            }
        }
        return field;
    }
};
//# sourceMappingURL=RuleBasedFieldView.js.map