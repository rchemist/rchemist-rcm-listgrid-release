import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Tooltip } from "../../../ui";
import { useLoadingStore } from "../../../loading";
import { isTrue } from '../../../utils/BooleanUtil';
import { IconDownload, IconPlus, IconTrash, IconUpload } from "@tabler/icons-react";
import { CacheClearButton } from "./buttons/CacheClearButton";
import { isEmpty } from "../../../utils";
export const HeaderActionButtons = (props) => {
    const { headerButtons, supportPriority, isSubCollection, setManagePriority, cacheable, entityForm, setNotifications, setErrors, refresh, dataTransferConfig, setOpenDownload, setOpenUpload, enableHandleData, activeTrashIcon, deleteItems, neverDelete, checkedItems, checkedButtons, addNew, router, path, selectionOptions, rows, readonly, } = props;
    const { setOpenBaseLoading } = useLoadingStore();
    return (_jsxs("div", { className: "rcm-header-actions", children: [headerButtons, supportPriority && !isSubCollection && (_jsx(Tooltip, { label: "\uB9AC\uC2A4\uD2B8 \uAC01 \uD589\uC758 \uB9E8 \uC88C\uCE21 \uC5F4\uC744 \uB4DC\uB798\uADF8\uD574 \uC6B0\uC120\uC21C\uC704\uB97C \uBCC0\uACBD\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4", children: _jsx("button", { type: "button", className: "rcm-button rcm-button-primary", onClick: setManagePriority, children: "\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD" }) })), cacheable && !isSubCollection && (_jsx(CacheClearButton, { entityForm: entityForm, setNotifications: setNotifications, setErrors: setErrors, onRefresh: refresh })), !isSubCollection && !readonly && isTrue(dataTransferConfig?.isSupportExport()) && (_jsxs("button", { type: "button", className: "rcm-button rcm-button-primary", onClick: () => setOpenDownload(true), children: [_jsx(IconDownload, { className: "rcm-btn-icon" }), "\uB2E4\uC6B4\uB85C\uB4DC"] })), !isSubCollection && !readonly && isTrue(dataTransferConfig?.isSupportImport()) && (_jsxs("button", { type: "button", className: "rcm-button rcm-button-primary", onClick: () => setOpenUpload(true), children: [_jsx(IconUpload, { className: "rcm-btn-icon" }), "\uC5C5\uB85C\uB4DC"] })), !isEmpty(checkedItems) && checkedButtons.length > 0 && selectionOptions?.actions && (_jsx(_Fragment, { children: checkedButtons })), enableHandleData && (_jsxs(_Fragment, { children: [!isSubCollection && activeTrashIcon && (() => {
                        const deleteButton = selectionOptions?.deleteButton;
                        const isDeleteButtonObject = deleteButton && typeof deleteButton === 'object';
                        return (_jsxs("button", { type: "button", className: isDeleteButtonObject && deleteButton.className ? deleteButton.className : "rcm-button rcm-button-outline-danger", onClick: async () => {
                                // 삭제 확인 메시지
                                if (isDeleteButtonObject && deleteButton.confirmMessage) {
                                    const message = typeof deleteButton.confirmMessage === 'function'
                                        ? deleteButton.confirmMessage(checkedItems || [])
                                        : deleteButton.confirmMessage;
                                    if (!confirm(message))
                                        return;
                                }
                                deleteItems();
                            }, children: [isDeleteButtonObject && deleteButton.icon ? deleteButton.icon : _jsx(IconTrash, { className: "rcm-btn-icon" }), isDeleteButtonObject && deleteButton.label
                                    ? (typeof deleteButton.label === 'function'
                                        ? deleteButton.label(checkedItems || [])
                                        : deleteButton.label)
                                    : (isTrue(neverDelete) ? "사용 중지" : "선택 삭제")] }));
                    })(), !isEmpty(checkedItems) && checkedButtons.length > 0 && !selectionOptions?.actions && (_jsx(_Fragment, { children: checkedButtons })), !isTrue(isSubCollection) && isTrue(addNew, true) && (_jsxs("button", { className: "rcm-button rcm-button-primary", onClick: () => {
                            setOpenBaseLoading(true);
                            router.push(`${path}/add`);
                        }, children: [_jsx(IconPlus, { className: "rcm-btn-icon" }), "\uC2E0\uADDC \uC785\uB825"] }))] }))] }));
};
//# sourceMappingURL=HeaderActionButtons.js.map