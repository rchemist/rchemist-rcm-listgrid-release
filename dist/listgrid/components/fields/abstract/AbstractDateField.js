/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { ListableFormField } from './ListableFormField';
export class AbstractDateField extends ListableFormField {
    constructor(name, order, type, limit, range) {
        super(name, order, type);
        if (limit !== undefined)
            this.limit = limit;
        if (range !== undefined)
            this.range = range;
    }
    /**
     * range 가 true 면, 시작 시각 ~ 종료 시각 두 가지를 입력받게 됩니다.
     * @param range
     */
    withRange(range) {
        if (range !== undefined)
            this.range = range;
        else
            delete this.range;
        return this;
    }
    /**
     * 최소, 최대값 설정
     * @param limit
     */
    withLimit(limit) {
        if (limit !== undefined)
            this.limit = limit;
        else
            delete this.limit;
        return this;
    }
    /**
     * 최소값 설정
     * @param min
     */
    withMin(min) {
        const newLimit = {};
        if (min !== undefined)
            newLimit.min = min;
        if (this.limit?.max !== undefined)
            newLimit.max = this.limit.max;
        this.limit = newLimit;
        return this;
    }
    /**
     * 최대값 설정
     * @param max
     */
    withMax(max) {
        const newLimit = {};
        if (this.limit?.min !== undefined)
            newLimit.min = this.limit.min;
        if (max !== undefined)
            newLimit.max = max;
        this.limit = newLimit;
        return this;
    }
    copyFields(origin, includeValue = true) {
        return super.copyFields(origin, includeValue).withLimit(this.limit).withRange(this.range);
    }
}
//# sourceMappingURL=AbstractDateField.js.map