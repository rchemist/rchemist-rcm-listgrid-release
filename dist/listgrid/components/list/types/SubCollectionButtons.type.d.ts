import { SearchForm } from '../../../form/SearchForm';
import { EntityForm } from '../../../config/EntityForm';
import { CreateUpdateOptions } from './ViewListGrid.types';
export interface SubCollectionBaseButtonProps {
    add?: boolean;
    delete?: boolean;
    activeTrashIcon: boolean;
    deleteItems: () => void;
    mappedBy?: string;
    mappedValue?: any;
    collectionName?: string;
    createOrUpdate?: CreateUpdateOptions;
    setErrors: (errors: string[]) => void;
    setNotifications: (notifications: string[]) => void;
    entityForm: EntityForm;
    onRefresh: () => void;
    parentId: any;
    checkedItems?: string[];
    onChangeSearchForm: (searchForm: SearchForm, reset?: boolean, resetPage?: boolean) => void;
    searchForm: SearchForm;
    totalCount: number;
}
export interface SubCollectionButtonsProps extends SubCollectionBaseButtonProps {
    buttons?: ((props: SubCollectionBaseButtonProps) => React.ReactNode)[];
    supportPriority: boolean;
    setManagePriority: () => void;
    cacheable?: boolean;
    rows?: any[];
}
//# sourceMappingURL=SubCollectionButtons.type.d.ts.map