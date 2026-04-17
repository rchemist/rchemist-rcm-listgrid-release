import { ValidateResult, ValidationItem } from '../validations/Validation';
import { EntityForm } from '../config/EntityForm';
import { FieldValue } from '../config/Config';
export declare class RegexValidation extends ValidationItem {
    regex: RegExp;
    constructor(id: string, regex: RegExp, message?: string);
    validate(entityForm: EntityForm, value: FieldValue, message?: string): Promise<ValidateResult>;
}
//# sourceMappingURL=RegexValidation.d.ts.map