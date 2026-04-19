import React from 'react';
import { Validation } from '../../validations/Validation';
import { FormField, FormFieldProps } from './abstract';
import { FieldRenderParameters } from '../../config/EntityField';
import { PasswordStrength } from '../../ui';
interface PasswordFieldProps extends FormFieldProps {
    strength?: PasswordStrength;
}
export declare class PasswordField extends FormField<PasswordField> {
    strength?: PasswordStrength;
    constructor(name: string, order: number, validations?: Validation[], strength?: PasswordStrength);
    /**
     * PasswordField 핵심 렌더링 로직
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * PasswordField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): PasswordField;
    withStrength(strength?: PasswordStrength): this;
    static create(props: PasswordFieldProps): PasswordField;
}
export {};
//# sourceMappingURL=PasswordField.d.ts.map