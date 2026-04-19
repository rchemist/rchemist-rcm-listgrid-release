import { FormField, FormFieldProps } from './abstract';
import { FieldRenderParameters } from '../../config/EntityField';
import React from 'react';
interface MultipleAssetFieldProps extends FormFieldProps {
    tags?: string[] | undefined;
    fileTypes?: string[] | undefined;
}
export declare class MultipleAssetField extends FormField<MultipleAssetField> {
    tags?: string[] | undefined;
    fileTypes?: string[] | undefined;
    constructor(name: string, order: number, tags?: string[], fileTypes?: string[]);
    /**
     * MultipleAssetField 핵심 렌더링 로직
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * MultipleAssetField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): MultipleAssetField;
    static create(props: MultipleAssetFieldProps): MultipleAssetField;
}
export interface MultipleAssetForm {
    assets?: AssetItem[] | undefined;
    preferred?: string | undefined;
}
export interface AssetItem {
    name?: string | undefined;
    description?: string | undefined;
    url: string;
}
export {};
//# sourceMappingURL=MultipleAssetField.d.ts.map