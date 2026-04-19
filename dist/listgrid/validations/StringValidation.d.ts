import { ValidateResult, ValidationItem } from '../validations/Validation';
import { EntityForm } from '../config/EntityForm';
import { FieldValue } from '../config/Config';
import { MinMaxLimit } from '../form/Type';
export declare class StringValidation extends ValidationItem {
    length?: MinMaxLimit;
    regex?: RegExp;
    validate(entityForm: EntityForm, value: FieldValue, message?: string): Promise<ValidateResult>;
    constructor(args: {
        length?: {
            min?: number;
            max?: number;
        };
        regex?: RegExp;
        id: string;
    }, message?: string);
}
//# sourceMappingURL=StringValidation.d.ts.map