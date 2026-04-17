import { RuleConditionValue, RuleFieldEntityForm, RuleFieldValue } from './Type';
interface RuleConditionProps {
    id: number;
    condition: 'AND' | 'OR';
    fieldValues: RuleFieldValue[];
    targetEntityForm: RuleFieldEntityForm;
    clearError: () => void;
    clearCondition: () => void;
    addCondition: (value: RuleConditionValue) => void;
    fieldErrors: Map<number, string>;
    setFieldError: (error: Map<number, string>) => void;
}
export declare const RuleCondition: (props: RuleConditionProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=RuleCondition.d.ts.map