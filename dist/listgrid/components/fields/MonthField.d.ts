import { ListableFormField, ListableFormFieldProps } from './abstract';
import React from "react";
import { FieldRenderParameters } from '../../config/EntityField';
import { EntityForm } from '../../config/EntityForm';
import { ValidateResult } from '../../validations/Validation';
import { MinMaxStringLimit } from "../../form/Type";
interface MonthFieldProps extends ListableFormFieldProps {
    limit?: MinMaxStringLimit;
}
export declare class MonthField extends ListableFormField<MonthField> {
    limit?: MinMaxStringLimit;
    constructor(name: string, order: number, limit?: MinMaxStringLimit);
    /**
     * MonthField 핵심 렌더링 로직
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * MonthField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): MonthField;
    withLimit(limit?: MinMaxStringLimit): this;
    validate(entityForm: EntityForm): Promise<ValidateResult | ValidateResult[]>;
    static create(props: MonthFieldProps): MonthField;
}
export {};
//# sourceMappingURL=MonthField.d.ts.map