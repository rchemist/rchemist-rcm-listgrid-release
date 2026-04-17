import { ReactNode } from "react";
import { ListableFormField, ListableFormFieldProps } from "./ListableFormField";
import { ValidateResult } from '../../../validations/Validation';
import { EntityForm } from '../../../config/EntityForm';
import { FieldInfoParameters, FieldRenderParameters } from '../../../config/EntityField';
export interface CheckButtonValidationFieldProps extends ListableFormFieldProps {
    checkButtonValidation?: (entityForm: EntityForm, value: string) => Promise<ValidateResult>;
    checkButtonLabel?: string;
}
export declare abstract class CheckButtonValidationField<T extends CheckButtonValidationField<T>> extends ListableFormField<T> {
    checkButtonValidation?: (entityForm: EntityForm, value: string) => Promise<ValidateResult>;
    checkButtonLabel?: string;
    /**
     * 중복확인 버튼을 클릭했을 때 value 를 중복 확인 하는 함수
     * @param checkButtonValidation
     */
    withCheckButtonValidation(checkButtonValidation?: (entityForm: EntityForm, value: string) => Promise<ValidateResult>): this;
    withCheckButtonLabel(checkButtonLabel?: string): this;
    protected copyFields(origin: CheckButtonValidationFieldProps, includeValue?: boolean): this;
    protected renderCheckButtonValidationField(params: FieldRenderParameters): Promise<ReactNode | null>;
    isRequired(props: FieldInfoParameters): Promise<boolean>;
}
//# sourceMappingURL=CheckButtonValidationField.d.ts.map