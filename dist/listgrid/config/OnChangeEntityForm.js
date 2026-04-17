/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { OptionalField } from '../components/fields/abstract';
export class ConditionalValidation {
    constructor(value) {
        this.result = new Map();
        this.value = value;
    }
    static create(value) {
        return new ConditionalValidation(value);
    }
    addValidation(fieldName, type, ...validations) {
        this.result.set(fieldName, { type, validations });
        return this;
    }
}
export class ConditionalSelectOption {
    constructor(value) {
        this.result = new Map();
        this.value = value;
    }
    static create(value) {
        return new ConditionalSelectOption(value);
    }
    withDefaultValue(defaultValue) {
        this.defaultValue = defaultValue;
        return this;
    }
    addSelectOption(fieldName, ...options) {
        this.result.set(fieldName, options);
        return this;
    }
}
export class OnChangeEntityForm {
    static changeHidden(name, options) {
        return onChangeSetFieldHidden(name, options);
    }
    static changeRequired(name, options) {
        return onChangeSetFieldRequired(name, options);
    }
    static changeSelectOptions(name, options) {
        return onChangeSetSelectOptions(name, options);
    }
    static derivedValidations(name, options) {
        return onChangeDerivedValidations(name, options);
    }
}
function onChangeDerivedValidations(name, options) {
    return (entityForm) => {
        const field = entityForm.getField(name);
        if (field) {
            const value = field.getCurrentValue(entityForm.getRenderType());
            if (Array.isArray(options)) {
                for (const option of options) {
                    setDerivedValidations(option, value);
                }
            }
            else {
                setDerivedValidations(options, value, true);
            }
        }
        return Promise.resolve(entityForm);
        function setDerivedValidations(option, value, autoRemove = false) {
            function isMatched(option, value) {
                if (typeof option.value === 'function') {
                    return option.value(value);
                }
                return option.value === value;
            }
            if (isMatched(option, value)) {
                option.result.forEach((value, key) => {
                    const f = entityForm.getField(key);
                    if (f) {
                        // false 로 지정하면 validations 을 제거하라는 뜻이다.
                        if (value === false) {
                            f.withValidations();
                        }
                        else {
                            if (value.type === 'overwrite') {
                                const validations = value.validations ? [...value.validations] : [];
                                f.withValidations(...validations);
                            }
                            else {
                                const validations = f.validations ? [...f.validations] : [];
                                if (value.validations) {
                                    for (const v of value.validations) {
                                        let duplicated = false;
                                        for (const validation of [...validations]) {
                                            if (validation.id === v.id) {
                                                duplicated = true;
                                            }
                                        }
                                        if (!duplicated) {
                                            validations.push(v);
                                        }
                                    }
                                }
                                f.withValidations(...validations);
                            }
                        }
                    }
                });
            }
            else {
                if (autoRemove) {
                    option.result.forEach((value, key) => {
                        const f = entityForm.getField(key);
                        if (f && f.validations) {
                            const validations = [...f.validations];
                            if (typeof value === 'boolean') {
                                f.withValidations();
                            }
                            else {
                                if (value.validations) {
                                    for (const validation of validations) {
                                        for (const v of value.validations) {
                                            if (validation.id === v.id) {
                                                validations.splice(validations.indexOf(validation), 1);
                                            }
                                        }
                                    }
                                    f.withValidations(...validations);
                                }
                            }
                        }
                    });
                }
            }
        }
    };
}
function onChangeSetSelectOptions(name, options) {
    function changeOptions({ key, field, value, entityForm, defaultValue }) {
        if (key === field.getName()) {
            if (field instanceof OptionalField) {
                return field.changeOptions(value);
            }
        }
        else {
            const other = entityForm.getField(key);
            if (other instanceof OptionalField) {
                return other.changeOptions(value, defaultValue);
            }
        }
        return false;
    }
    function revertOptions(key, field, entityForm) {
        if (key === field.getName()) {
            if (field instanceof OptionalField) {
                return field.revertOptions(entityForm.getRenderType());
            }
        }
        else {
            const other = entityForm.getField(key);
            if (other instanceof OptionalField) {
                return other.revertOptions(entityForm.getRenderType());
            }
        }
        return false;
    }
    return (entityForm) => {
        const field = entityForm.getField(name);
        let changed = false;
        if (field) {
            const value = field.getCurrentValue(entityForm.getRenderType());
            if (Array.isArray(options)) {
                for (const option of options) {
                    if (option.value === value) {
                        option.result.forEach((value, key) => {
                            if (changeOptions({ key, field, value, entityForm })) {
                                changed = true;
                            }
                        });
                    }
                    else {
                        option.result.forEach((_value, key) => {
                            if (revertOptions(key, field, entityForm)) {
                                changed = true;
                            }
                        });
                    }
                }
            }
            else {
                if (options.value === value) {
                    options.result.forEach((value, key) => {
                        if (changeOptions({ key, field, value, entityForm })) {
                            changed = true;
                        }
                    });
                }
                else {
                    options.result.forEach((_value, key) => {
                        if (revertOptions(key, field, entityForm)) {
                            changed = true;
                        }
                    });
                }
            }
        }
        if (changed) {
            entityForm.withShouldReload(changed);
        }
        return Promise.resolve(entityForm);
    };
}
function onChangeSetFieldRequired(name, options) {
    return (entityForm) => {
        const field = entityForm.getField(name);
        if (field) {
            const value = field.getCurrentValue(entityForm.getRenderType());
            if (Array.isArray(options)) {
                for (const prop of options) {
                    if (prop.value === value) {
                        prop.result.forEach((value, key) => {
                            entityForm.getField(key)?.withRequired(value);
                        });
                    }
                }
            }
            else {
                // option 이 단수라면 value 가 equals 일 때와 그렇지 않을 때를 각각 적용한다.
                const required = value === options.value;
                options.result.forEach((v, k) => {
                    const requiredValue = required ? v : !v;
                    if (k === field.getName()) {
                        field.withRequired(requiredValue);
                    }
                    else {
                        entityForm.getField(k)?.withRequired(requiredValue);
                    }
                });
            }
        }
        return Promise.resolve(entityForm);
    };
}
function onChangeSetFieldHidden(name, options) {
    return (entityForm) => {
        const field = entityForm.getField(name);
        if (field) {
            const value = field.getCurrentValue(entityForm.getRenderType());
            if (Array.isArray(options)) {
                for (const prop of options) {
                    if (prop.value === value) {
                        prop.result.forEach((value, key) => {
                            entityForm.getField(key)?.withHidden(value);
                        });
                    }
                }
            }
            else {
                // option 이 단수라면 value 가 equals 일 때와 그렇지 않을 때를 각각 적용한다.
                const hidden = value === options.value;
                options.result.forEach((v, k) => {
                    const hiddenValue = hidden ? v : !v;
                    if (k === field.getName()) {
                        field.withHidden(hiddenValue);
                    }
                    else {
                        entityForm.getField(k)?.withHidden(hiddenValue);
                    }
                });
            }
        }
        return Promise.resolve(entityForm);
    };
}
//# sourceMappingURL=OnChangeEntityForm.js.map