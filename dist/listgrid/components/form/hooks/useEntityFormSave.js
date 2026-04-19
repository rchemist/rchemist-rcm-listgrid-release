'use client';
import { useCallback } from 'react';
import { ExtensionPoint, } from '../../../extensions/EntityFormExtension.types';
import { isEmpty } from '../../../utils';
import { openToast } from '../../../message';
/**
 * Custom hook for handling save/delete logic of EntityForm.
 * EntityForm 저장/삭제 로직을 처리하는 커스텀 훅
 * @param params - 저장/삭제에 필요한 파라미터 객체
 */
export const useEntityFormSave = ({ entityForm, isSubCollectionEntity, renderType, pathname, router, buttonLinks, postSave, setEntityForm, setNotifications, setTitleText, setCacheKey, setErrors, setOpenBaseLoading, session, }) => {
    /**
     * EntityForm 저장 버튼 클릭 시 호출되는 함수
     * Handles save button click
     */
    const onClickSaveButton = useCallback(async () => {
        setOpenBaseLoading(true);
        setErrors([]);
        setNotifications([]);
        // EntityForm Extension 지원 (클라이언트만)
        const hasClientExtensions = entityForm.hasClientExtensions &&
            (entityForm.hasClientExtensions(ExtensionPoint.PRE_CREATE, ExtensionPoint.POST_CREATE) ||
                entityForm.hasClientExtensions(ExtensionPoint.PRE_UPDATE, ExtensionPoint.POST_UPDATE));
        let processedEntityForm = entityForm;
        if (hasClientExtensions) {
            const context = {
                entityForm: entityForm,
                ...(session ? { session } : {}),
                ...(session?.getUser() != null ? { user: session.getUser() } : {}),
            };
            // Pre Extension 실행 (Create/Update 구분)
            const extensionPoint = renderType === 'update' ? ExtensionPoint.PRE_UPDATE : ExtensionPoint.PRE_CREATE;
            await entityForm.executeClientExtensions(extensionPoint, entityForm.fetchedEntity ?? {}, context);
            processedEntityForm = entityForm;
        }
        const saveResult = await processedEntityForm.save(session);
        if (isEmpty(saveResult.errors)) {
            // Post Extension 실행
            let finalEntityForm = saveResult.entityForm;
            if (hasClientExtensions) {
                const context = {
                    entityForm: finalEntityForm,
                    ...(session ? { session } : {}),
                    ...(session?.getUser() != null ? { user: session.getUser() } : {}),
                };
                const extensionPoint = renderType === 'update' ? ExtensionPoint.POST_UPDATE : ExtensionPoint.POST_CREATE;
                await finalEntityForm.executeClientExtensions(extensionPoint, finalEntityForm.fetchedEntity ?? {}, context);
            }
            try {
                setOpenBaseLoading(false);
                if (postSave) {
                    await postSave(finalEntityForm);
                }
            }
            catch (e) {
                // eslint-disable-next-line no-console
                console.error(e);
            }
        }
        else {
            const error = saveResult.errors?.[0] ?? '저장 중 오류가 발생 했습니다.';
            setEntityForm(saveResult.entityForm);
            setErrors([error]);
            setOpenBaseLoading(false);
            openToast({ message: `${error}`, color: 'danger', showCloseButton: false });
        }
    }, [
        entityForm,
        session,
        postSave,
        setEntityForm,
        setErrors,
        setNotifications,
        setOpenBaseLoading,
    ]);
    /**
     * EntityForm 삭제 후 처리
     * Handles post-delete logic
     */
    const handlePostDelete = useCallback(async (entityForm) => {
        if (postSave) {
            await postSave(entityForm);
        }
    }, [postSave]);
    return {
        onClickSaveButton,
        handlePostDelete,
    };
};
//# sourceMappingURL=useEntityFormSave.js.map