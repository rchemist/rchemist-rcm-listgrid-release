import React from 'react';
import { SelectOption } from '../../form/Type';
import { FieldValue } from '../../config/Config';
import { EntityForm } from '../../config/EntityForm';
import { ValidateResult } from '../../validations/Validation';
import type { ImmediateChangeProps } from './SelectField';
interface StatusReason {
    message: string;
    fieldName: string;
    required?: boolean;
}
interface StatusChangeReason {
    targets?: string[];
    config: StatusReason;
}
interface StatusChangeValidation {
    validate: (entityForm: EntityForm, value: FieldValue) => Promise<ValidateResult>;
    message?: string;
    success?: (entityForm: EntityForm) => Promise<void>;
    fail?: (entityForm: EntityForm) => Promise<void>;
}
interface SelectFieldRendererProps {
    name: string;
    value: FieldValue;
    fetchedValue?: FieldValue;
    options: SelectOption[];
    onChange: (value: FieldValue) => void;
    entityForm: EntityForm;
    reason?: StatusChangeReason[];
    validateStatusChange?: StatusChangeValidation;
    immediateChangeProps?: ImmediateChangeProps;
    disabled?: boolean;
}
export declare const SelectFieldRenderer: React.FC<SelectFieldRendererProps>;
export {};
//# sourceMappingURL=SelectFieldRenderer.d.ts.map