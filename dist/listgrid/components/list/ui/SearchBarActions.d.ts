import { SearchForm } from '../../../form/SearchForm';
import { ListableFormField } from '../../fields/abstract';
import { ViewFieldManageable } from '../types/ViewListGrid.types';
export interface SearchBarActionsProps extends ViewFieldManageable {
    searchForm: SearchForm;
    handlePageSizeChange: (value: string) => void;
    hidePageSize?: boolean;
    enableHandleData: boolean;
    listFields: ListableFormField<any>[];
    loading: boolean;
    entityUrl: string;
    subCollectionName?: string;
    searchEnabled: boolean;
    subCollection: boolean;
    filtered: boolean;
    onOpenAdvancedSearch?: () => void;
    hideAdvancedSearch?: boolean;
}
export declare const SearchBarActions: React.FC<SearchBarActionsProps>;
//# sourceMappingURL=SearchBarActions.d.ts.map