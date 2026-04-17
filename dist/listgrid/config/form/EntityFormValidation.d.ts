import { EntityFormBase } from '../../config/form/EntityFormBase';
import { FieldError } from '../../config/EntityFormTypes';
import { ManageEntityForm } from '../../config/Config';
export declare abstract class EntityFormValidation extends EntityFormBase {
    constructor(name: string, url: string);
    getFieldValidationState(fieldName: string): {
        validated: boolean;
        message?: string;
        color?: string;
    } | undefined;
    setFieldValidationState(fieldName: string, state: {
        validated: boolean;
        message?: string;
        color?: string;
    }): void;
    clearFieldValidationState(fieldName: string): void;
    withRequired(name: string, required: boolean): this;
    withErrors(errors: FieldError[]): this;
    getErrorMap(): Map<string, FieldError[]>;
    mergeError(name: string, errors: FieldError[]): void;
    withManageEntityForm(manageEntityForm: ManageEntityForm): this;
    withCreatable(creatable?: boolean): this;
    withUpdatable(updatable?: boolean): this;
    withDeletable(deletable?: boolean): this;
    isCreatable(): boolean;
    isUpdatable(): boolean;
    isDeletable(): boolean;
}
//# sourceMappingURL=EntityFormValidation.d.ts.map