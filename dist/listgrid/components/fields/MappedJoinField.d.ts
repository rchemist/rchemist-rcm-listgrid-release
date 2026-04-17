import { FormField, FormFieldProps } from './abstract';
import { FieldInfoParameters, FieldRenderParameters } from '../../config/EntityField';
import React from "react";
export declare class MappedJoinField extends FormField<MappedJoinField> {
    constructor(name: string);
    /**
     * MappedJoinField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * MappedJoinField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): MappedJoinField;
    static create(props: FormFieldProps): MappedJoinField;
    isHidden(props: FieldInfoParameters): Promise<boolean>;
}
//# sourceMappingURL=MappedJoinField.d.ts.map