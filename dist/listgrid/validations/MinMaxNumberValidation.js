/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { ValidationItem } from '../validations/Validation';
export class MinMaxNumberValidation extends ValidationItem {
    constructor(id, limit, message) {
        super(id ?? 'MinMaxNumberValidation', message);
        this.limit = limit;
    }
    validate(entityForm, value, message) {
        const numberValue = this.getValueAsNumber(entityForm, value);
        if (isNaN(numberValue)) {
            return Promise.resolve(this.returnValidateResult(true, message));
        }
        let error = false;
        if (this.limit.min || this.limit.max) {
            if (numberValue === undefined) {
                error = true;
            }
            else {
                if (this.limit.min && numberValue < this.limit.min) {
                    error = true;
                }
                else if (this.limit.max && numberValue > this.limit.max) {
                    error = true;
                }
            }
        }
        return Promise.resolve(this.returnValidateResult(error, message));
    }
}
//# sourceMappingURL=MinMaxNumberValidation.js.map