/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { parse, stringify } from '../../../utils/jsonUtils';
export class RuleConditionValue {
    constructor(id, condition, targetEntityPrefix) {
        this.id = id;
        this.condition = condition;
        this.values = [];
        this.targetEntityPrefix = targetEntityPrefix;
    }
    static create(data) {
        if (typeof data === 'string') {
            const result = parse(data);
            const value = new RuleConditionValue(result.id, result.condition, result.targetEntityPrefix);
            if (result.values) {
                value.addValues(...result.values);
            }
            return value;
        }
        else {
            return RuleConditionValue.create(stringify(data));
        }
    }
    addValues(...values) {
        values.forEach((newValue) => {
            const existingValueIndex = this.values.findIndex((v) => v.id === newValue.id && v.name === newValue.name);
            if (existingValueIndex !== -1) {
                // 기존에 동일한 id와 name이 있는 경우, 해당 값을 업데이트
                this.values[existingValueIndex] = {
                    ...this.values[existingValueIndex],
                    ...newValue,
                };
            }
            else {
                // 동일한 id와 name이 없는 경우, 새로운 값을 추가
                this.values.push(newValue);
            }
        });
    }
    withValues(values) {
        this.values = values ?? []; // undefined인 경우 빈 배열로 설정
        return this;
    }
    isEmpty() {
        return !this.values || this.values.length === 0;
    }
}
export function getConfiguredFields(targetEntityForm) {
    const fields = [];
    if (targetEntityForm.fields !== undefined && targetEntityForm.fields.length > 0) {
        fields.push(...targetEntityForm.fields);
    }
    else {
        // 둘 중 하나는 반드시 있어야 한다.
        for (const field of targetEntityForm.entityForm.getListFields()) {
            if (field.isFilterable() && !isIgnoreField(field)) {
                fields.push(field);
            }
        }
    }
    return fields;
}
/**
 * 엔티티폼에서 Rule 필드를 자동으로 추출할 때 무조건 제거해야 할 대상 필드를 지정한다.
 * 여러 조건이 있을 수 있으니 함수로 따로 뺀다.
 * @param field
 */
export function isIgnoreField(field) {
    if (field.name === 'active' && field.type === 'boolean') {
        // active 조건을 rule 로 지정하는 것은 말이 안 된다.
        return true;
    }
    return false;
}
//# sourceMappingURL=Type.js.map