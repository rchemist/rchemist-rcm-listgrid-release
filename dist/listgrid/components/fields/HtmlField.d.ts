import { FormField, FormFieldProps, ViewRenderProps, ViewRenderResult } from './abstract';
import { FieldRenderParameters } from '../../config/EntityField';
import React from 'react';
interface HtmlFieldProps extends FormFieldProps {
}
export declare class HtmlField extends FormField<HtmlField> {
    constructor(name: string, order: number);
    /**
     * HtmlField 핵심 렌더링 로직
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * View mode: render HTML content with dangerouslySetInnerHTML
     */
    protected renderViewInstance(props: ViewRenderProps): Promise<ViewRenderResult>;
    /**
     * HtmlField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): HtmlField;
    private isEqualsOrEmpty;
    isDirty(): boolean;
    static create(props: HtmlFieldProps): HtmlField;
}
export {};
//# sourceMappingURL=HtmlField.d.ts.map