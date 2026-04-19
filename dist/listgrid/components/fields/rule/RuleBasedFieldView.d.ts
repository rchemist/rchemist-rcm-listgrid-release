import { ReactNode } from 'react';
import { ResultByCount, ResultByRuleCondition, RuleBasedFieldProps, RuleFieldEntityForm, RuleFieldType } from './Type';
interface RuleBasedFieldViewProps extends RuleBasedFieldProps {
    onCancel: () => void;
    apiUrl?: string | undefined;
    label?: ReactNode | undefined;
    helpText?: ReactNode | undefined;
    onSubmitField?: ResultByRuleCondition | undefined;
    onSubmitSelector?: ResultByCount | undefined;
    viewType: 'selector' | 'field';
    type?: RuleFieldType | undefined;
    entityForms: RuleFieldEntityForm[];
}
export declare const RuleBasedFieldsView: (props: RuleBasedFieldViewProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=RuleBasedFieldView.d.ts.map