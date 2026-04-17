import { MultipleOptionalField, MultipleOptionalFieldProps, ViewListProps, ViewListResult } from './abstract';
import React from "react";
import { MinMaxLimit, SelectOption } from "../../form/Type";
import { FieldRenderParameters } from '../../config/EntityField';
interface CheckboxFieldProps extends MultipleOptionalFieldProps {
}
export declare class CheckboxField extends MultipleOptionalField<CheckboxField> {
    constructor(name: string, order: number, options: SelectOption[], limit?: MinMaxLimit);
    /**
     * CheckboxField 핵심 렌더링 로직
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * CheckboxField 핵심 리스트 아이템 렌더링 로직
     */
    protected renderListItemInstance(props: ViewListProps): Promise<ViewListResult>;
    /**
     * CheckboxField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): CheckboxField;
    static create(props: CheckboxFieldProps): CheckboxField;
}
export {};
//# sourceMappingURL=CheckboxField.d.ts.map