'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { showConfirm } from '../../../message';
import { useLoadingStore } from '../../../loading';
export const useListGridHeader = (props) => {
    const { buttons, selectionOptions, entityForm, checkedItems, session } = props;
    const [headerButtons, setHeaderButtons] = useState([]);
    const [checkedButtons, setCheckedButtons] = useState([]);
    const { setOpenBaseLoading } = useLoadingStore();
    useEffect(() => {
        (async () => {
            if (buttons) {
                const newButtons = [];
                for (const [index, buttonFunc] of buttons.entries()) {
                    const buttonProps = { ...props, ...(session !== undefined ? { session } : {}) };
                    newButtons.push(_jsx(React.Fragment, { children: await buttonFunc(buttonProps) }, index));
                }
                setHeaderButtons(newButtons);
            }
        })();
    }, [buttons, props]);
    useEffect(() => {
        (async () => {
            const newCheckedButtons = [];
            // selection.actions 처리
            if (selectionOptions?.actions && checkedItems && checkedItems.length > 0) {
                for (const [index, action] of selectionOptions.actions.entries()) {
                    // show 조건 확인
                    const shouldShow = action.show === undefined
                        ? true
                        : typeof action.show === 'function'
                            ? action.show(checkedItems)
                            : action.show;
                    if (!shouldShow)
                        continue;
                    const color = action.color ?? 'primary';
                    const outline = action.outline ?? false;
                    const className = action.className ?? (outline ? `btn btn-outline-${color}` : `btn btn-${color}`);
                    const label = typeof action.label === 'function' ? action.label(checkedItems) : action.label;
                    newCheckedButtons.push(_jsxs("button", { type: "button", className: className, onClick: async () => {
                            // 확인 메시지
                            if (action.confirmMessage) {
                                const message = typeof action.confirmMessage === 'function'
                                    ? action.confirmMessage(checkedItems)
                                    : action.confirmMessage;
                                showConfirm({
                                    title: '확인',
                                    message: message,
                                    confirmButtonText: '확인',
                                    cancelButtonText: '취소',
                                    onConfirm: async () => {
                                        // 실행 가능 여부 검증
                                        if (action.canExecute && !action.canExecute(checkedItems)) {
                                            return;
                                        }
                                        // 로딩바 표시
                                        setOpenBaseLoading(true);
                                        try {
                                            await action.onClick(entityForm, checkedItems);
                                        }
                                        finally {
                                            // 로딩바 숨김
                                            setOpenBaseLoading(false);
                                        }
                                    },
                                });
                            }
                            else {
                                // 확인 메시지가 없는 경우
                                // 실행 가능 여부 검증
                                if (action.canExecute && !action.canExecute(checkedItems)) {
                                    return;
                                }
                                // 로딩바 표시
                                setOpenBaseLoading(true);
                                try {
                                    await action.onClick(entityForm, checkedItems);
                                }
                                finally {
                                    // 로딩바 숨김
                                    setOpenBaseLoading(false);
                                }
                            }
                        }, disabled: action.canExecute && !action.canExecute(checkedItems), children: [action.icon, label] }, `action-${index}`));
                }
            }
            setCheckedButtons(newCheckedButtons);
        })();
    }, [selectionOptions, entityForm, checkedItems, setOpenBaseLoading]);
    return { headerButtons, checkedButtons };
};
//# sourceMappingURL=useListGridHeader.js.map