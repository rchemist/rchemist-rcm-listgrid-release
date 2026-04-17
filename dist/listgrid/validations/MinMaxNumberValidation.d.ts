import { ValidateResult, ValidationItem } from '../validations/Validation';
import { EntityForm } from '../config/EntityForm';
import { FieldValue } from '../config/Config';
export declare class MinMaxNumberValidation extends ValidationItem {
    limit: {
        min?: number;
        max?: number;
    };
    constructor(id: string | undefined, limit: {
        min?: number;
        max?: number;
    }, message?: string);
    validate(entityForm: EntityForm, value: FieldValue, message?: string): Promise<ValidateResult>;
}
//# sourceMappingURL=MinMaxNumberValidation.d.ts.map