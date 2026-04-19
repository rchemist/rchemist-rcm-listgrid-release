import { FormField, FormFieldProps } from './abstract';
import { FieldRenderParameters } from '../../config/EntityField';
import React from 'react';
interface MarkdownFieldProps extends FormFieldProps {
}
export declare class MarkdownField extends FormField<MarkdownField> {
    constructor(name: string, order: number);
    /**
     * MarkdownField 핵심 렌더링 로직
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * MarkdownField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): MarkdownField;
    private isEqualsOrEmpty;
    isDirty(): boolean;
    static create(props: MarkdownFieldProps): MarkdownField;
}
export {};
//# sourceMappingURL=MarkdownField.d.ts.map