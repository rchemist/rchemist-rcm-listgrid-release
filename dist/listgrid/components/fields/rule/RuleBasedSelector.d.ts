import { ResultByCount, RuleBasedFieldProps, RuleFieldType } from './Type';
import { HelpTextType, LabelType } from '../../../config/Config';
import { EntityForm } from '../../../config/EntityForm';
interface RuleBasedSelectorProps extends RuleBasedFieldProps {
    type: RuleFieldType;
    helpText?: HelpTextType;
    label?: LabelType;
    onSubmit?: ResultByCount;
    entityForm: EntityForm;
    apiUrl?: string;
}
export declare const RuleBasedSelector: ({ ...props }: RuleBasedSelectorProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=RuleBasedSelector.d.ts.map