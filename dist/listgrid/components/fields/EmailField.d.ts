import { CheckButtonValidationField, CheckButtonValidationFieldProps } from './abstract';
import React from 'react';
import { Validation } from '../../validations/Validation';
import { FieldRenderParameters, FilterRenderParameters } from '../../config/EntityField';
interface EmailFieldProps extends CheckButtonValidationFieldProps {
    text?: boolean;
    commonDomains?: string[];
}
export declare class EmailField extends CheckButtonValidationField<EmailField> {
    text: boolean;
    commonDomains: string[];
    constructor(name: string, order: number, validations?: Validation[]);
    withText(text: boolean): this;
    withCommonDomains(commonDomains: string[]): this;
    /**
     * EmailField 핵심 렌더링 로직
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * EmailDomainInput 렌더링 (복합 입력 모드)
     */
    private renderEmailDomainInput;
    /**
     * EmailDomainCheckButtonInput 렌더링 (복합 입력 모드 + 중복확인 버튼)
     */
    private renderCheckButtonValidationEmailDomainInput;
    /**
     * EmailField 핵심 리스트 필터 렌더링 로직
     */
    protected renderListFilterInstance(params: FilterRenderParameters): Promise<React.ReactNode | null>;
    /**
     * EmailField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): EmailField;
    static create(props: EmailFieldProps): EmailField;
}
export {};
//# sourceMappingURL=EmailField.d.ts.map