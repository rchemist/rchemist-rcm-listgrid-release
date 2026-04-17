/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { ValidationItem } from '../validations/Validation';
export class CustomValidation extends ValidationItem {
    constructor(id, validateFunction, errorMessage) {
        super(id, errorMessage);
        this.validateFunction = validateFunction;
    }
    validate(entityForm, value, message) {
        return this.validateFunction(entityForm, value, message);
    }
}
//# sourceMappingURL=CustomValidation.js.map