import { SearchForm } from '../../../form/SearchForm';
import { EntityForm } from '../../../config/EntityForm';
import { ListableFormField } from '../../fields/abstract';
interface HeaderFieldFilterProps {
    field: ListableFormField<any>;
    gridId: string;
    searchForm: SearchForm;
    entityForm: EntityForm;
    onChangeSearchForm: (searchForm: SearchForm, resetPage?: boolean) => void;
    /** QuickSearch 활성 시 해당 필드의 헤더 필터를 비활성화 */
    disabled?: boolean;
}
export declare const HeaderFieldFilter: ({ field, gridId, searchForm, entityForm, onChangeSearchForm, disabled, }: HeaderFieldFilterProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=HeaderFieldFilter.d.ts.map