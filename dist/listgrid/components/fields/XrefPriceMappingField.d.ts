import { FormField, FormFieldProps } from './abstract';
import { FieldRenderParameters } from '../../config/EntityField';
import React from 'react';
import { EntityForm } from '../../config/EntityForm';
import { RenderType } from '../../config/Config';
import { FilterItem } from '../../form/SearchForm';
interface XrefPriceAdditionalProps {
    entityForm: EntityForm;
    initPrice: (entityForm: EntityForm, rowValue: any) => Promise<void>;
    priceHelpText?: string | undefined;
    filterItems?: FilterItem[] | ((entityForm: EntityForm, parentEntityForm?: EntityForm) => Promise<FilterItem[]>) | undefined;
}
export interface XrefPriceMappingFieldProps extends FormFieldProps, XrefPriceAdditionalProps {
}
export declare class XrefPriceMappingField extends FormField<XrefPriceMappingField> {
    entityForm: EntityForm;
    initPrice: (entityForm: EntityForm, rowValue: any) => Promise<void>;
    priceHelpText?: string | undefined;
    filterItems?: FilterItem[] | ((entityForm: EntityForm, parentEntityForm?: EntityForm) => Promise<FilterItem[]>) | undefined;
    constructor(name: string, order: number, props: XrefPriceAdditionalProps);
    static create(props: XrefPriceMappingFieldProps): XrefPriceMappingField;
    /**
     * XrefPriceMappingField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null | undefined>;
    /**
     * XrefPriceMappingField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): XrefPriceMappingField;
    isBlank(renderType?: RenderType): Promise<boolean>;
    withFilterItem(filterItems: FilterItem[]): this;
}
export {};
//# sourceMappingURL=XrefPriceMappingField.d.ts.map