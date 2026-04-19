import React from 'react';
import { FormField, FormFieldProps } from '../fields/abstract';
import { FieldRenderParameters, FilterRenderParameters } from '../../config/EntityField';
interface RevisionFieldProps extends FormFieldProps {
}
export declare class RevisionField extends FormField<RevisionField> {
    constructor(name: string, order: number);
    protected createInstance(name: string, order: number): RevisionField;
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    protected renderListFilterInstance(params: FilterRenderParameters): Promise<React.ReactNode | null>;
    static create(props: RevisionFieldProps): RevisionField;
}
export {};
//# sourceMappingURL=RevisionField.d.ts.map