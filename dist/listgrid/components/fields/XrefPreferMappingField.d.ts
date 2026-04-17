import { FormField, FormFieldProps } from './abstract';
import { FieldRenderParameters } from '../../config/EntityField';
import React from "react";
import { EntityForm } from '../../config/EntityForm';
import { RenderType } from '../../config/Config';
import { FilterItem } from "../../form/SearchForm";
export interface XrefPreferMappingFieldProps extends FormFieldProps {
    entityForm: EntityForm;
    showPreferred?: boolean;
    filters?: FilterItem[] | ((entityForm: EntityForm, parentEntityForm?: EntityForm) => Promise<FilterItem[]>);
    preferredLabel?: string;
}
export declare class XrefPreferMappingField extends FormField<XrefPreferMappingField> {
    entityForm: EntityForm;
    showPreferred?: boolean;
    filters?: FilterItem[] | ((entityForm: EntityForm, parentEntityForm?: EntityForm) => Promise<FilterItem[]>);
    preferredLabel?: string;
    constructor(props: XrefPreferMappingFieldProps);
    static create(props: XrefPreferMappingFieldProps): XrefPreferMappingField;
    /**
     * XrefPreferMappingField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null | undefined>;
    /**
     * XrefPreferMappingField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): XrefPreferMappingField;
    isBlank(renderType?: RenderType): Promise<boolean>;
    withPreferredLabel(preferredLabel: string): XrefPreferMappingField;
}
//# sourceMappingURL=XrefPreferMappingField.d.ts.map