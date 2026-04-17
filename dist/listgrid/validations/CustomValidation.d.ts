import { ValidateResult, ValidationItem } from '../validations/Validation';
import { EntityForm } from '../config/EntityForm';
import { FieldValue } from '../config/Config';
export declare class CustomValidation extends ValidationItem {
    validateFunction: (entityForm: EntityForm, value: FieldValue, message?: string) => Promise<ValidateResult>;
    constructor(id: string, validateFunction: (entityForm: EntityForm, value: FieldValue, message?: string) => Promise<ValidateResult>, errorMessage?: string);
    validate(entityForm: EntityForm, value: FieldValue, message?: string): Promise<ValidateResult>;
}
//# sourceMappingURL=CustomValidation.d.ts.map