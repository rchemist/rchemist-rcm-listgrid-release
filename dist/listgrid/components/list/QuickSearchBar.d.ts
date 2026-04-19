import { QuickSearchProps } from '../../config/ListGrid';
import { ViewFieldManageable } from './types/ViewListGrid.types';
import { ListableFormField } from '../fields/abstract';
import { SearchForm } from '../../form/SearchForm';
export interface QuickSearchBarProps extends ViewFieldManageable {
    quickSearchProperty?: QuickSearchProps;
    quickSearchValue?: string;
    loading: boolean;
    onQuickSearch: (search: string) => void;
    listFields: ListableFormField<any>[];
    enableHandleData: boolean;
    showAdvancedSearch: boolean;
    onOpenAdvancedSearch?: () => void;
    subCollection: boolean;
    searchForm: SearchForm;
    onChangeSearchForm: (searchForm: SearchForm) => void;
    hidePageSize?: boolean;
    entityUrl: string;
    subCollectionName?: string;
    hideAdvancedSearch?: boolean;
}
export declare const QuickSearchBar: (props: QuickSearchBarProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=QuickSearchBar.d.ts.map