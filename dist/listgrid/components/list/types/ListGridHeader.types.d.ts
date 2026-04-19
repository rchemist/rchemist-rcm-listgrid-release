import { SearchForm } from '../../../form/SearchForm';
import { EntityForm } from '../../../config/EntityForm';
import { DataTransferConfig } from '../../../transfer/Type';
import { ReactNode } from 'react';
import { SelectionOptions } from './ViewListGrid.types';
import { Session } from '../../../auth/types';
export interface ListGridHeaderProps extends ListGridHeaderButtonProps {
    buttons?: ((props: ListGridHeaderButtonProps) => Promise<ReactNode>)[];
    supportPriority: boolean;
    setManagePriority: () => void;
    cacheable?: boolean;
    addNew?: boolean;
    selectionOptions?: SelectionOptions;
    rows?: any[];
    readonly?: boolean;
}
export interface ListGridHeaderButtonProps {
    deleteItems: () => void;
    refresh: () => void;
    title: string;
    hideTitle?: boolean;
    enableHandleData: boolean;
    router: any;
    path: any;
    activeTrashIcon: boolean;
    searchForm: SearchForm;
    dataTransferConfig?: DataTransferConfig;
    isSubCollection?: boolean;
    entityForm: EntityForm;
    session?: Session;
    setErrors: (errors: string[]) => void;
    setNotifications: (notifications: string[]) => void;
    checkedItems?: string[];
}
export declare const useServerSideCache: boolean;
//# sourceMappingURL=ListGridHeader.types.d.ts.map