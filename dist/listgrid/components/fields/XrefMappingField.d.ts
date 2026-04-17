import { FormField, FormFieldProps } from './abstract';
import { FieldRenderParameters } from '../../config/EntityField';
import React from "react";
import { EntityForm } from '../../config/EntityForm';
import { RenderType } from '../../config/Config';
import { FilterItem } from "../../form/SearchForm";
export interface XrefMappingFieldProps extends FormFieldProps {
    supportPriority?: boolean;
    excludeId?: string;
    add?: boolean;
    entityForm: EntityForm;
    filters?: FilterItem[] | ((entityForm: EntityForm, parentEntityForm?: EntityForm) => Promise<FilterItem[]>);
}
export declare class XrefMappingField extends FormField<XrefMappingField> {
    entityForm: EntityForm;
    supportPriority?: boolean;
    excludeId?: string;
    add?: boolean;
    filters?: FilterItem[] | ((entityForm: EntityForm, parentEntityForm?: EntityForm) => Promise<FilterItem[]>);
    constructor({ name, order, entityForm, supportPriority, excludeId, add, filters }: XrefMappingFieldProps);
    /**
     * XrefMappingField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null | undefined>;
    /**
     * XrefMappingField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): XrefMappingField;
    isBlank(renderType?: RenderType): Promise<boolean>;
}
//# sourceMappingURL=XrefMappingField.d.ts.map