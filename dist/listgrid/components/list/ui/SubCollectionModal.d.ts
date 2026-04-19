import { EntityForm } from '../../../config/EntityForm';
import { CreateUpdateOptions } from '../types/ViewListGrid.types';
export interface SubCollectionModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    renderKey: number;
    entityForm: EntityForm;
    createOrUpdate?: CreateUpdateOptions;
    onNotifications: (notifications: string[]) => void;
    onErrors: (errors: string[]) => void;
    onRefresh: () => void;
    /** MappedBy field name for auto-hiding parent reference fields */
    mappedBy?: string;
}
export declare const SubCollectionModal: React.FC<SubCollectionModalProps>;
//# sourceMappingURL=SubCollectionModal.d.ts.map