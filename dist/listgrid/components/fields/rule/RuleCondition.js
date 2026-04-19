'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { AbstractDateField } from '../abstract';
import { useEffect, useState } from 'react';
import { getQueryConditionHelpText, getQueryConditionTypes, getQueryConditionValueType, } from '../../../form/SearchForm';
import { SelectBox } from '../../../ui';
import { isBlank } from '../../../utils/StringUtil';
import { TagsInput } from '../../../ui';
import { IconCircleX } from '@tabler/icons-react';
import { getConfiguredFields, RuleConditionValue, } from './Type';
import { isEmpty } from '../../../utils';
import { RuleFieldRenderer } from './RuleFieldRenderer';
import { ViewFieldError } from '../../form/ui/ViewFieldError';
import { ViewHelpText } from '../../form/ui/ViewHelpText';
export const RuleCondition = (props) => {
    const { id, targetEntityForm, clearError, clearCondition } = props;
    const [fieldValues, setFieldValues] = useState(props.fieldValues);
    const [fieldErrors, setFieldErrors] = useState();
    const [selected, setSelected] = useState();
    useEffect(() => {
        setFieldErrors(props.fieldErrors);
    }, [props.fieldErrors]);
    function changeValue(index, value) {
        setFieldValues((prevFieldValues) => {
            const newFieldValues = [...prevFieldValues];
            newFieldValues[index].values = value;
            changeFilterValues(newFieldValues);
            return newFieldValues;
        });
    }
    /*
    function changeValue(index: number, value: any) {
      const newFieldValues = [...fieldValues];
      newFieldValues[index].values = value;
      changeFilterValues(newFieldValues);
    }*/
    function changeFilterValues(newFieldValues) {
        clearError();
        setFieldValues(newFieldValues);
        const ruleCondition = new RuleConditionValue(id, props.condition, props.targetEntityForm.prefix).withValues(newFieldValues);
        props.addCondition(ruleCondition);
    }
    function changeQueryConditionType(index, type) {
        const newFieldValues = [...fieldValues];
        newFieldValues[index].queryConditionType = type;
        newFieldValues[index].values = [];
        changeFilterValues(newFieldValues);
    }
    function getMaxConditionId() {
        if (isEmpty(fieldValues)) {
            return 0;
        }
        let maxId = 0;
        for (const filter of fieldValues) {
            if (filter.id > maxId) {
                maxId = filter.id;
            }
        }
        return maxId + 1;
    }
    if ((targetEntityForm.fields === undefined || targetEntityForm.fields.length === 0) &&
        targetEntityForm.entityForm === undefined) {
        // 아무 것도 할 수 있는게 없다.
        return _jsx("div", { children: "Rule \uC744 \uCC98\uB9AC\uD558\uB824\uBA74 EntityForm \uC774\uB098 \uB300\uC0C1 \uD544\uB4DC\uB97C \uC9C0\uC815\uD574\uC57C \uD569\uB2C8\uB2E4." });
    }
    const fields = getConfiguredFields(targetEntityForm);
    const fieldOptions = [];
    for (const field of fields) {
        fieldOptions.push({
            label: field.label + '',
            value: field.name,
        });
    }
    return (_jsx("div", { className: "rcm-rule-wrap", children: _jsxs("div", { className: "rcm-rule-condition-box", children: [_jsxs("div", { className: 'form-input w-fit flex relative mt-[-20px] space-x-2 items-center', children: [_jsx("div", { children: props.condition }), _jsx("div", { children: "\uC870\uAC74" }), _jsx("div", { children: _jsx("button", { className: 'mt-1', onClick: () => {
                                    clearCondition();
                                }, children: _jsx(IconCircleX, { className: "max-w-4" }) }) })] }), _jsxs("div", { className: 'flex gap-3 items-center mt-3', children: [_jsx("div", { className: 'min-w-[200px]', children: _jsx(SelectBox, { options: fieldOptions, required: true, onChange: (fieldName) => {
                                    const field = fields.find((f) => f.name === fieldName);
                                    setSelected(field?.name);
                                }, name: 'targetField' }) }), _jsx("div", { className: 'flex gap-3 items-center', children: _jsx("button", { className: 'btn btn-secondary h-[36px]', disabled: !selected, onClick: () => {
                                    const newFieldValues = [...fieldValues];
                                    const field = fields.find((f) => f.name === selected);
                                    const queryConditionTypes = getQueryConditionTypes(field);
                                    newFieldValues.push({
                                        id: getMaxConditionId(),
                                        name: selected,
                                        queryConditionType: queryConditionTypes[0].value,
                                        values: [],
                                    });
                                    setFieldValues(newFieldValues);
                                }, children: "\uC120\uD0DD" }) })] }), (function () {
                    return fieldValues.map((fieldValue, index) => {
                        const field = fields.find((f) => f.name === fieldValue.name);
                        if (!field) {
                            return null;
                        }
                        const currentQueryConditionType = fieldValue.queryConditionType;
                        const currentValueType = getQueryConditionValueType(currentQueryConditionType);
                        const helpText = getQueryConditionHelpText(field.getLabel(), currentQueryConditionType);
                        return (_jsxs("div", { children: [_jsx("div", { className: 'font-bold mt-5', children: field?.label }), _jsxs("div", { className: 'flex gap-3 items-center', children: [_jsx("div", { className: 'min-w-[200px] max-w-[200px]', children: _jsx(SelectBox, { options: getQueryConditionTypes(field), value: fieldValue.queryConditionType, required: true, onChange: (type) => {
                                                    changeQueryConditionType(index, type);
                                                }, name: `queryConditionType${index}` }) }), _jsx("div", { className: 'w-full flex', children: (function () {
                                                const fields = [];
                                                if (field.type === 'manyToOne') {
                                                    // manyToOneField 라면 required 를 제외해야 한다.
                                                    // 이게 required 가 되면 필드 clear 가 안 된다.
                                                    field.withRequired(false);
                                                }
                                                else {
                                                    field.withRequired(true);
                                                }
                                                if (currentValueType === 'SINGLE') {
                                                    const currentValue = fieldValue.values !== undefined && fieldValue.values.length > 0
                                                        ? fieldValue.values[0]
                                                        : '';
                                                    fields.push(_jsx("div", { className: 'w-full', children: _jsx(RuleFieldRenderer, { field: field
                                                                .clone()
                                                                // required 를 넣어서 optional field 의 선택안함 옵션을 제거한다.
                                                                .withValue(currentValue), onChange: (value) => {
                                                                if (field.type === 'manyToOne') {
                                                                    changeValue(index, isBlank(value) ? [] : [value.id]);
                                                                }
                                                                else {
                                                                    changeValue(index, [value]);
                                                                }
                                                            } }) }, `${fieldValue.name}_${index}`));
                                                }
                                                else if (currentValueType === 'RANGE') {
                                                    // 단일 필드로 Range 를 지원하는 필드 타입은 날짜 뿐이다.
                                                    if (field instanceof AbstractDateField) {
                                                        const cloned = field
                                                            .clone(true)
                                                            .withRange(true)
                                                            .withValue(fieldValue.values);
                                                        return (_jsx("div", { className: 'w-full', children: _jsx(RuleFieldRenderer, { field: cloned, onChange: (value) => {
                                                                    if (Array.isArray(value) && value.length === 2) {
                                                                        changeValue(index, [...value]);
                                                                    }
                                                                } }) }));
                                                    }
                                                    else {
                                                        const currentValue1 = fieldValue.values !== undefined && fieldValue.values.length > 0
                                                            ? fieldValue.values[0]
                                                            : '';
                                                        const currentValue2 = fieldValue.values !== undefined && fieldValue.values.length > 1
                                                            ? fieldValue.values[1]
                                                            : '';
                                                        const field1 = field.clone(true).withRange(true).withValue(currentValue1);
                                                        const field2 = field.clone(true).withRange(true).withValue(currentValue2);
                                                        return (_jsxs("div", { className: 'flex justify-between', children: [_jsx(RuleFieldRenderer, { field: field1, onChange: (value) => {
                                                                        changeValue(index, [...value]);
                                                                    } }), ' ', "~", _jsx(RuleFieldRenderer, { field: field2, onChange: (value) => {
                                                                        changeValue(index, [...value]);
                                                                    } })] }, `${fieldValue.name}_${index}`));
                                                    }
                                                }
                                                else if (currentValueType === 'MULTIPLE') {
                                                    // multiple field 는 tags 뿐이다.
                                                    const currentValue = fieldValue.values !== undefined && fieldValue.values.length > 0
                                                        ? fieldValue.values
                                                        : [];
                                                    fields.push(_jsx(TagsInput, { size: 'md', value: currentValue, clearable: true, onChange: (value) => {
                                                            changeValue(index, [...value]);
                                                        } }, `${fieldValue.name}_${index}`));
                                                }
                                                return fields;
                                            })() }), _jsx("button", { onClick: () => {
                                                const newFieldValues = [...fieldValues];
                                                newFieldValues.splice(index, 1);
                                                changeFilterValues(newFieldValues);
                                            }, children: _jsx(IconCircleX, { className: "max-w-4" }) })] }), fieldErrors?.has(index) && (_jsx("div", { className: 'px-2', children: _jsx(ViewFieldError, { errors: [fieldErrors.get(index)] }) })), _jsx("div", { className: 'px-2', children: _jsx(ViewHelpText, { helpText: `${helpText}` }) })] }, index));
                    });
                })()] }) }));
};
//# sourceMappingURL=RuleCondition.js.map