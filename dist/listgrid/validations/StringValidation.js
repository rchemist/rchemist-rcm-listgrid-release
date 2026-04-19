/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { ValidationItem } from '../validations/Validation';
export class StringValidation extends ValidationItem {
    validate(entityForm, value, message) {
        const currentValue = this.getValueAsString(entityForm, value);
        if (this.length) {
            if (this.length.min) {
                if ((currentValue?.length ?? 0) < this.length.min) {
                    return Promise.resolve(this.returnValidateResult(true, message ?? `Minimum length is ${this.length.min}`));
                }
            }
            if (this.length.max) {
                if ((currentValue?.length ?? 0) > this.length.max) {
                    return Promise.resolve(this.returnValidateResult(true, message ?? `Maximum length is ${this.length.max}`));
                }
            }
        }
        if (this.regex) {
            if (!this.regex.test(currentValue)) {
                return Promise.resolve(this.returnValidateResult(true));
            }
        }
        return Promise.resolve(this.returnValidateResult(false));
    }
    constructor(args, message) {
        super(args.id ?? `StringValidation`, message);
        if (args.length !== undefined) {
            this.length = args.length;
        }
        if (args.regex !== undefined) {
            this.regex = args.regex;
        }
    }
}
//# sourceMappingURL=StringValidation.js.map