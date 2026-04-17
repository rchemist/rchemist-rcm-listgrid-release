import { ReactNode } from "react";
import { ResultByCount, ResultByRuleCondition, RuleBasedFieldProps, RuleFieldEntityForm, RuleFieldType } from './Type';
interface RuleBasedFieldViewProps extends RuleBasedFieldProps {
    onCancel: () => void;
    apiUrl?: string;
    label?: ReactNode;
    helpText?: ReactNode;
    onSubmitField?: ResultByRuleCondition;
    onSubmitSelector?: ResultByCount;
    viewType: 'selector' | 'field';
    type?: RuleFieldType;
    entityForms: RuleFieldEntityForm[];
}
export declare const RuleBasedFieldsView: (props: RuleBasedFieldViewProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=RuleBasedFieldView.d.ts.map