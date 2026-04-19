import { SearchForm } from '../../form/SearchForm';
import { ListableFormField } from '../fields/abstract';
import { EntityForm } from '../../config/EntityForm';
import { QuickSearchProps } from '../../config/ListGrid';
interface ViewAdvancedSearchProps {
    entityForm: EntityForm;
    fields: ListableFormField<any>[];
    quickSearchProperty: QuickSearchProps | undefined;
    searchForm: SearchForm;
    onSubmit: (searchForm: SearchForm) => void;
    onReset: () => void;
    onClose: () => void;
    show: boolean;
    subCollection?: boolean;
}
export declare const AdvancedSearchForm: ({ fields, entityForm, quickSearchProperty, searchForm, show, onClose, subCollection, ...props }: ViewAdvancedSearchProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=AdvancedSearchForm.d.ts.map