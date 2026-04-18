'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useListGridTheme } from "../../context/ListGridThemeContext";
export const CreateButton = ({ ableDelete, activeTrashIcon, deleteItems, buttons, buttonProps, ableAdd, setOpen, setRenderKey, }) => {
    const { classNames: themeClasses } = useListGridTheme();
    const deleteButtonClass = themeClasses.subCollectionButtons?.deleteButton ?? "rcm-button";
    const addButtonClass = themeClasses.subCollectionButtons?.addButton ?? "rcm-button";
    return (_jsxs(_Fragment, { children: [ableDelete && activeTrashIcon && (_jsx("button", { className: deleteButtonClass, "data-variant": "outline", "data-color": "error", "data-size": "sm", onClick: deleteItems, children: "\uC0AD\uC81C" })), buttons?.map((buttonFunc, index) => (_jsx(React.Fragment, { children: buttonFunc(buttonProps) }, index))), ableAdd && (_jsx("button", { className: addButtonClass, "data-variant": "primary", "data-size": "sm", onClick: () => {
                    setRenderKey(new Date().getTime());
                    setOpen(true);
                }, children: "\uC2E0\uADDC \uC785\uB825" }))] }));
};
//# sourceMappingURL=CreateButton.js.map