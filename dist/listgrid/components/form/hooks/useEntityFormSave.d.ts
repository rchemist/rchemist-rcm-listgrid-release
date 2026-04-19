import { EntityForm } from '../../../config/EntityForm';
import { EntityButtonLinkProps, RenderType } from '../../../config/Config';
import { Session } from '../../../auth/types';
import type { RouterApi } from '../../../router';
/**
 * Custom hook for handling save/delete logic of EntityForm.
 * EntityForm 저장/삭제 로직을 처리하는 커스텀 훅
 * @param params - 저장/삭제에 필요한 파라미터 객체
 */
export declare const useEntityFormSave: ({ entityForm, isSubCollectionEntity, renderType, pathname, router, buttonLinks, postSave, setEntityForm, setNotifications, setTitleText, setCacheKey, setErrors, setOpenBaseLoading, session, }: {
    entityForm: EntityForm;
    isSubCollectionEntity: boolean;
    renderType: RenderType | undefined;
    pathname: string;
    router: RouterApi;
    buttonLinks?: EntityButtonLinkProps;
    postSave?: (entityForm: EntityForm) => Promise<EntityForm>;
    setEntityForm: (entityForm: EntityForm) => void;
    setNotifications: (messages: string[]) => void;
    setTitleText: (form?: EntityForm) => void;
    setCacheKey: (key: string) => void;
    setErrors: (errors: string[]) => void;
    setOpenBaseLoading: (open: boolean) => void;
    session?: Session;
}) => {
    onClickSaveButton: () => Promise<void>;
    handlePostDelete: (entityForm: EntityForm) => Promise<void>;
};
//# sourceMappingURL=useEntityFormSave.d.ts.map