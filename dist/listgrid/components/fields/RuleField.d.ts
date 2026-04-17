import { ReactNode } from "react";
import { FieldRenderParameters } from "../../config/EntityField";
import { FormField } from './abstract';
import { RuleFieldEntityForm } from './rule/Type';
export declare class RuleField extends FormField<RuleField> {
    entityForms: RuleFieldEntityForm[];
    constructor(name: string, order: number, ...entityForms: RuleFieldEntityForm[]);
    withEntityForms(entityForms: RuleFieldEntityForm[]): this;
    protected createInstance(name: string, order: number): RuleField;
    protected renderInstance(params: FieldRenderParameters): Promise<ReactNode | null | undefined>;
}
//# sourceMappingURL=RuleField.d.ts.map