import { EntityForm } from '../../../config/EntityForm';
import { EntityTab } from '../../../config/EntityTab';
import { Session } from '../../../auth/types';
import { EntityButtonLinkProps } from '../../../config/Config';
/**
 * Custom hook for initializing EntityForm state and tabs.
 * EntityForm 상태 및 탭 초기화를 위한 커스텀 훅
 * @param params - 초기화에 필요한 파라미터 객체
 */
export declare const useEntityFormInitializer: ({ entityForm: initialEntityForm, isSubCollectionEntity, pathname, session, buttonLinks, onInitialize, setTabs, setTabIndex, setEntityForm, setTitleText, setLoadingError }: {
    entityForm: EntityForm;
    isSubCollectionEntity: boolean;
    pathname: string;
    session?: Session;
    buttonLinks?: EntityButtonLinkProps;
    onInitialize?: (entityForm: EntityForm) => Promise<EntityForm>;
    setTabs: (tabs: EntityTab[]) => void;
    setTabIndex: (tabId: string) => void;
    setEntityForm: (entityForm: EntityForm) => void;
    setTitleText: (entityForm: EntityForm) => void;
    setLoadingError: (error: boolean) => void;
}) => (options?: {
    preserveTabIndex?: boolean;
}) => Promise<void>;
//# sourceMappingURL=useEntityFormInitializer.d.ts.map