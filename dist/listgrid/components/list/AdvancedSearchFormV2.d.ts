import { SearchForm } from '../../form/SearchForm';
import { ListableFormField } from '../fields/abstract';
import { EntityForm } from '../../config/EntityForm';
import { QuickSearchProps } from '../../config/ListGrid';
interface ViewAdvancedSearchProps {
    entityForm: EntityForm;
    fields: ListableFormField<any>[];
    listFieldNames?: Set<string>;
    quickSearchProperty?: QuickSearchProps;
    searchForm: SearchForm;
    onSubmit: (searchForm: SearchForm) => void;
    onReset: () => void;
    onClose: () => void;
    show: boolean;
    subCollection?: boolean;
    popup?: boolean;
}
export declare const AdvancedSearchFormV2: ({ fields, entityForm, listFieldNames, quickSearchProperty, searchForm, show, onClose, subCollection, popup, ...props }: ViewAdvancedSearchProps) => import("react/jsx-runtime").JSX.Element;
export { AdvancedSearchForm } from './AdvancedSearchForm';
//# sourceMappingURL=AdvancedSearchFormV2.d.ts.map