/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconCopy } from '@tabler/icons-react';
import { Tooltip } from '../../../ui';
import { showToast } from '../../../message';
export const CopyButton = ({ value, className }) => {
    const handleCopy = async (e) => {
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(value);
            showToast({
                message: '복사되었습니다.',
                color: 'success'
            });
        }
        catch (error) {
            console.error('Failed to copy:', error);
            showToast({
                message: '복사에 실패했습니다.',
                color: 'danger'
            });
        }
    };
    return (_jsx("div", { className: className ?? "rcm-copy-addon-wrap", children: _jsx(Tooltip, { label: "\uBCF5\uC0AC", children: _jsx("button", { type: "button", className: "rcm-icon-btn", "data-size": "sm", onClick: handleCopy, children: _jsx(IconCopy, { className: "rcm-icon", "data-size": "sm" }) }) }) }));
};
export const CopyableTextView = ({ value, displayValue, }) => {
    return (_jsxs("div", { className: "rcm-copy-text-wrap", children: [_jsx("span", { children: displayValue ?? value }), _jsx(Tooltip, { label: "\uBCF5\uC0AC", children: _jsx("button", { className: "rcm-icon-btn", "data-size": "xs", onClick: async (e) => {
                        e.stopPropagation();
                        try {
                            await navigator.clipboard.writeText(value);
                            showToast({
                                message: '복사되었습니다.',
                                color: 'success'
                            });
                        }
                        catch (error) {
                            console.error('Failed to copy:', error);
                            showToast({
                                message: '복사에 실패했습니다.',
                                color: 'danger'
                            });
                        }
                    }, children: _jsx(IconCopy, { className: "rcm-icon", "data-size": "xs" }) }) })] }));
};
//# sourceMappingURL=CopyableTextView.js.map