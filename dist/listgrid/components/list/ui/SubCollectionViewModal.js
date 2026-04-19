import { jsx as _jsx } from "react/jsx-runtime";
import { Modal } from '../../../ui';
import { isTrue } from '../../../utils/BooleanUtil';
import React from 'react';
import { ViewEntityForm } from '../../form/ViewEntityForm';
export const SubCollectionViewModal = ({ entityForm, managedId, props, setManagedId, fetchData, setOpenBaseLoading, mappedBy, }) => {
    if (!managedId)
        return null;
    const collectionEntityForm = entityForm.withId(managedId);
    const excludeButtons = [];
    const readonly = isTrue(props.options?.readonly) || !isTrue(props.options?.subCollection?.modifyOnView, true);
    if (!isTrue(props.options?.subCollection?.delete, true)) {
        excludeButtons.push('delete');
    }
    return (_jsx(React.Fragment, { children: _jsx(Modal, { opened: true, view: { title: false }, size: "5xl", animation: 'none', position: "center", closeOnClickOutside: false, closeOnEscape: false, onClose: () => {
                setManagedId(undefined);
            }, children: _jsx(ViewEntityForm, { entityForm: collectionEntityForm, subCollection: true, readonly: readonly, excludeButtons: excludeButtons, ...(mappedBy !== undefined ? { hideMappedByFields: mappedBy } : {}), buttonLinks: {
                    onClickList: async () => {
                        setManagedId(undefined);
                    },
                }, postSave: () => {
                    // 저장이 완료된 경우에는 리프레시 한다.
                    return new Promise(() => {
                        setManagedId(undefined);
                        fetchData();
                        setOpenBaseLoading(false);
                    });
                }, postDelete: async () => {
                    setManagedId(undefined);
                    fetchData();
                    setOpenBaseLoading(false);
                } }, managedId) }) }));
};
//# sourceMappingURL=SubCollectionViewModal.js.map