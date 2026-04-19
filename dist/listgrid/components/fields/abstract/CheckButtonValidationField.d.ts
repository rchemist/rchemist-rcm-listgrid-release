import { ReactNode } from 'react';
import { ListableFormField, ListableFormFieldProps } from './ListableFormField';
import { ValidateResult } from '../../../validations/Validation';
import { EntityForm } from '../../../config/EntityForm';
import { FieldInfoParameters, FieldRenderParameters } from '../../../config/EntityField';
export interface CheckButtonValidationFieldProps<TValue = any, TForm extends object = any> extends ListableFormFieldProps<TValue, TForm> {
    checkButtonValidation?: (entityForm: EntityForm<TForm>, value: string) => Promise<ValidateResult>;
    checkButtonLabel?: string;
}
export declare abstract class CheckButtonValidationField<TSelf extends CheckButtonValidationField<TSelf, TValue, TForm>, TValue = any, TForm extends object = any> extends ListableFormField<TSelf, TValue, TForm> {
    checkButtonValidation?: (entityForm: EntityForm<TForm>, value: string) => Promise<ValidateResult>;
    checkButtonLabel?: string;
    /**
     * 중복확인 버튼을 클릭했을 때 value 를 중복 확인 하는 함수
     * @param checkButtonValidation
     */
    withCheckButtonValidation(checkButtonValidation?: (entityForm: EntityForm<TForm>, value: string) => Promise<ValidateResult>): this;
    withCheckButtonLabel(checkButtonLabel?: string): this;
    protected copyFields(origin: CheckButtonValidationFieldProps<TValue, TForm>, includeValue?: boolean): this;
    protected renderCheckButtonValidationField(params: FieldRenderParameters<TForm, TValue>): Promise<ReactNode | null>;
    isRequired(props: FieldInfoParameters<TForm>): Promise<boolean>;
}
//# sourceMappingURL=CheckButtonValidationField.d.ts.map