import { jsx as _jsx } from "react/jsx-runtime";
import { Modal } from "../../../ui";
import { ViewEntityForm } from "../../form/ViewEntityForm";
export const SubCollectionModal = ({ open, setOpen, renderKey, entityForm, createOrUpdate, onNotifications, onErrors, onRefresh, mappedBy }) => {
    if (!open)
        return null;
    return (_jsx(Modal, { view: { title: false }, size: 'full', animation: 'none', closeOnClickOutside: false, closeOnEscape: false, opened: open, onClose: () => setOpen(false), children: _jsx(ViewEntityForm, { entityForm: entityForm, subCollection: true, hideMappedByFields: mappedBy, postSave: async (savedEntityForm) => {
                if (createOrUpdate?.onSave) {
                    await createOrUpdate.onSave(savedEntityForm);
                }
                setOpen(false);
                return savedEntityForm;
            }, buttonLinks: {
                onClickList: async () => setOpen(false),
                onDelete: {
                    success: () => {
                        setOpen(false);
                        onNotifications(['삭제가 완료되었습니다.']);
                        onRefresh();
                    },
                    failed: (result) => {
                        onErrors(result.errors ?? []);
                        setOpen(false);
                    },
                },
                onSave: {
                    success: () => {
                        setOpen(false);
                        onNotifications(['저장이 완료되었습니다.']);
                        onRefresh();
                    },
                }
            } }) }, renderKey));
};
//# sourceMappingURL=SubCollectionModal.js.map