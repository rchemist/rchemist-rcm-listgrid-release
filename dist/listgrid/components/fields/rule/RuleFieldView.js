import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { RuleBasedFieldsView } from './RuleBasedFieldView';
import { RuleConditionValue } from './Type';
export const RuleFieldView = (props) => {
    const value = getValue(props.value);
    function getValue(v) {
        if (v === undefined) {
            return undefined;
        }
        if (v instanceof Map) {
            return v;
        }
        else if (typeof v === 'object' && v !== null) {
            // 객체인 경우 Map으로 변환 시도
            const newMap = new Map();
            Object.entries(v).map(([key, value]) => {
                const ruleCondition = RuleConditionValue.create(value);
                newMap.set(ruleCondition.id, ruleCondition);
            });
            return newMap;
        }
        else {
            // Map이 아니거나 변환이 불가능한 경우 빈 Map으로 설정
            return undefined;
        }
    }
    return _jsx("div", { className: 'border rounded-md p-4', children: _jsx(RuleBasedFieldsView, { ...props, value: value, viewType: 'field', onSubmitField: props.onSubmit, onCancel: () => {
            } }) });
};
//# sourceMappingURL=RuleFieldView.js.map