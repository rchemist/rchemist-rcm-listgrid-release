import { QueryConditionType } from '../../../form/SearchForm';
import { EntityForm } from '../../../config/EntityForm';
import { ListableFormField } from '../../fields/abstract';
interface FilterViewProps {
    entityForm: EntityForm;
    field: ListableFormField<any>;
    value?: any;
    resetValue?: boolean;
    onChange: (name: string, value: any, op?: QueryConditionType) => void;
}
export declare const FilterView: ({ entityForm, field, value, resetValue, onChange }: FilterViewProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=FilterView.d.ts.map