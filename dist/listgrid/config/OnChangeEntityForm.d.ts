import { ModifyEntityFormFunc } from '../config/Config';
import { Validation } from '../validations/Validation';
import { SelectOption } from "../form/Type";
export type ConditionalProps = {
    value: any;
    result: Map<string, boolean>;
};
export type ConditionalSelectOptionProps = {
    value: any;
    result: Map<string, SelectOption[]>;
    defaultValue?: any;
};
export type OptionalValidation = false | {
    type?: 'append' | 'overwrite';
    validations?: Validation[];
};
export type ConditionalValidations = {
    value: ConditionalValidationValue;
    result: Map<string, OptionalValidation>;
};
export type ConditionalValidationValue = string | number | boolean | string[] | number[] | boolean[] | ((value: any) => boolean);
export declare class ConditionalValidation implements ConditionalValidations {
    value: ConditionalValidationValue;
    result: Map<string, OptionalValidation>;
    constructor(value: ConditionalValidationValue);
    static create(value: ConditionalValidationValue): ConditionalValidation;
    addValidation(fieldName: string, type: 'append' | 'overwrite', ...validations: Validation[]): this;
}
export declare class ConditionalSelectOption implements ConditionalSelectOptionProps {
    value: any;
    result: Map<string, SelectOption[]>;
    defaultValue: any;
    constructor(value: any);
    static create(value: any): ConditionalSelectOption;
    withDefaultValue(defaultValue?: any): this;
    addSelectOption(fieldName: string, ...options: SelectOption[]): this;
}
export declare class OnChangeEntityForm {
    static changeHidden(name: string, options: ConditionalProps | ConditionalProps[]): ModifyEntityFormFunc;
    static changeRequired(name: string, options: ConditionalProps | ConditionalProps[]): ModifyEntityFormFunc;
    static changeSelectOptions(name: string, options: ConditionalSelectOptionProps | ConditionalSelectOptionProps[]): ModifyEntityFormFunc;
    static derivedValidations(name: string, options: ConditionalValidations | ConditionalValidations[]): ModifyEntityFormFunc;
}
//# sourceMappingURL=OnChangeEntityForm.d.ts.map