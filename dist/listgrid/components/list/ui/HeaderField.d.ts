import { ListableFormField } from '../../fields/abstract';
import { SearchForm } from '../../../form/SearchForm';
import { ViewFieldManageable } from '../types/ViewListGrid.types';
import { EntityForm } from '../../../config/EntityForm';
interface ViewHeaderFieldProps extends ViewFieldManageable {
    gridId: string;
    fields: ListableFormField<any>[];
    searchForm: SearchForm;
    entityForm: EntityForm;
    onChangeSearchForm: (searchForm: SearchForm, resetPage?: boolean) => void;
    sortable: boolean;
    draggable?: boolean;
    /** QuickSearch 필드명 Set (quickSearch 활성 시 해당 필드 헤더 필터 비활성화용) */
    quickSearchFieldNames?: Set<string>;
    /** QuickSearch 값 (값이 있으면 quickSearch 필드 헤더 필터 비활성화) */
    quickSearchValue?: string;
}
export declare const HeaderField: ({ viewFields, ...props }: ViewHeaderFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=HeaderField.d.ts.map