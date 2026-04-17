import { EntityFormManageable, TabIndexable } from './types/ViewEntityForm.types';
import { Session } from '../../auth/types';
interface ViewTabPanelProps extends TabIndexable, EntityFormManageable {
    id: string;
    readonly: boolean;
    subCollectionEntity?: boolean;
    session?: Session;
    createStepFields?: string[];
    resetEntityForm?: (delay?: number, preserveState?: boolean) => Promise<void>;
    /** MappedBy field name for hiding parent reference fields in SubCollection */
    hideMappedByFields?: string;
}
export declare const ViewTabPanel: ({ id, tabIndex, entityForm, setEntityForm, readonly, subCollectionEntity, session, createStepFields, resetEntityForm, hideMappedByFields, ...props }: ViewTabPanelProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ViewTabPanel.d.ts.map