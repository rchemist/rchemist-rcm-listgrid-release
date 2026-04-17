import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ViewEntityForm } from '../../form/ViewEntityForm';
import { IconExternalLink } from "@tabler/icons-react";
import { useModalManagerStore } from '../../../store';
export const ManyToOneListView = ({ value, id, entityForm }) => {
    const { openModal, closeModal } = useModalManagerStore();
    return _jsx("div", { children: _jsxs("div", { className: 'flex space-x-1 items-center', children: [_jsx("span", { children: value }), id && _jsx("button", { className: 'w-6 h-6', onClick: (e) => {
                        e.stopPropagation();
                        const modalId = `many-to-one-list-view-${id}`;
                        const viewEntityForm = entityForm.clone(true).withId(id);
                        if (viewEntityForm.title === undefined) {
                            viewEntityForm.withTitle('정보 조회');
                        }
                        openModal({
                            modalId,
                            title: `View ${value}`,
                            size: '5xl',
                            content: (_jsx(ViewEntityForm, { entityForm: viewEntityForm, buttonLinks: {
                                    onClickList: async () => {
                                        closeModal(modalId);
                                    }
                                }, subCollection: true, readonly: true })),
                        });
                    }, children: _jsx(IconExternalLink, { className: 'w-4 h-4' }) })] }) });
};
//# sourceMappingURL=ManyToOneListView.js.map