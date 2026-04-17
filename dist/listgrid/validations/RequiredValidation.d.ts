import { ValidateResult, ValidationItem } from '../validations/Validation';
import { EntityForm } from '../config/EntityForm';
import { FieldValue } from '../config/Config';
export declare class RequiredValidation extends ValidationItem {
    constructor(id: string, message?: string);
    validate(entityForm: EntityForm, value: FieldValue, message?: string): Promise<ValidateResult>;
}
//# sourceMappingURL=RequiredValidation.d.ts.map