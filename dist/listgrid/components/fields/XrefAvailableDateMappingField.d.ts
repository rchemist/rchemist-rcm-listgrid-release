import { FormField, FormFieldProps } from './abstract';
import { FieldRenderParameters } from '../../config/EntityField';
import React from 'react';
import { EntityForm } from '../../config/EntityForm';
import { RenderType } from '../../config/Config';
export interface XrefAvailableDateMappingFieldProps extends FormFieldProps {
    entityForm: EntityForm;
}
export declare class XrefAvailableDateMappingField extends FormField<XrefAvailableDateMappingField> {
    entityForm: EntityForm;
    constructor(name: string, order: number, entityForm: EntityForm);
    static create(props: XrefAvailableDateMappingFieldProps): XrefAvailableDateMappingField;
    /**
     * XrefAvailableDateMappingField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null | undefined>;
    /**
     * XrefAvailableDateMappingField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): XrefAvailableDateMappingField;
    isBlank(renderType?: RenderType): Promise<boolean>;
}
//# sourceMappingURL=XrefAvailableDateMappingField.d.ts.map