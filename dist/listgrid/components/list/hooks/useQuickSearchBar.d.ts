import { QuickSearchBarProps } from '../QuickSearchBar';
import { QuickSearchProps } from '../../../config/ListGrid';
import { ListableFormField } from '../../fields/abstract';
import { SearchForm } from '../../../form/SearchForm';
export declare const PAGE_SIZE_STORAGE_KEY = "listgrid_global_page_size";
export declare const DEFAULT_PAGE_SIZE = 20;
export declare const getGlobalPageSize: () => number;
export declare const setGlobalPageSize: (size: number) => void;
export declare function getFilteredAndSearchEnabled(listFields: ListableFormField<any>[], searchForm: SearchForm): {
    filtered: boolean;
    searchEnabled: boolean;
};
export declare function getQuickSearchLabel(quickSearchProperty: QuickSearchProps | undefined, t: (key: string) => string): string;
export declare const useQuickSearchBar: (props: QuickSearchBarProps) => {
    search: string;
    setSearch: import("react").Dispatch<import("react").SetStateAction<string>>;
    quickSearchEnabled: boolean;
    quickSearchLabel: string;
    handlePageSizeChange: (value: string) => void;
    filtered: boolean;
    searchEnabled: boolean;
};
//# sourceMappingURL=useQuickSearchBar.d.ts.map