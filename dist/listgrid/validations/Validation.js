/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
const DEFAULT_ERROR_MESSAGE = 'form.save.error.invalid';
export class ValidateResult {
    constructor(error, message) {
        this.error = error;
        this.message = message;
    }
    static fail(message) {
        return new ValidateResult(true, message);
    }
    static success() {
        return new ValidateResult(false, '');
    }
    hasError() {
        return this.error;
    }
    withMessage(message) {
        this.message = message;
        return this;
    }
}
export class ValidationItem {
    constructor(id, message) {
        this.id = `${id}`;
        if (message !== undefined) {
            this.message = message;
        }
    }
    getErrorMessage() {
        return this.message ?? DEFAULT_ERROR_MESSAGE;
    }
    /**
     * 현재 필드값을 string 으로 반환하는 편의성 메소드
     * @param entityForm
     * @param value
     */
    getValueAsString(entityForm, value) {
        const currentValue = value?.current;
        if (currentValue !== undefined) {
            if (currentValue === null) {
                return '';
            }
            return String(currentValue);
        }
        return entityForm.getRenderType() === 'update' ? value?.fetched : value?.default;
    }
    /**
     * 현재 필드값을 number 로 반환하는 편의성 메소드
     * @param entityForm
     * @param value
     */
    getValueAsNumber(entityForm, value) {
        return Number((value?.current ?? entityForm.getRenderType() === 'update') ? value?.fetched : value?.default);
    }
    /**
     * 현재 필드값을 boolean 로 반환하는 편의성 메소드.
     * @param entityForm
     * @param value
     */
    getValueAsBoolean(entityForm, value) {
        return Boolean((value?.current ?? entityForm.getRenderType() === 'update') ? value?.fetched : value?.default);
    }
    /**
     * ValidateResult 를 반환하는 편의성 메소드.
     * @param error
     * @param message
     */
    returnValidateResult(error, message) {
        return error
            ? ValidateResult.fail(message ?? this.getErrorMessage())
            : ValidateResult.success();
    }
}
//# sourceMappingURL=Validation.js.map