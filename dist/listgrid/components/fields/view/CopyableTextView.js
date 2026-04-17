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
    return (_jsx("div", { className: className ?? "flex h-full items-center border border-white-light bg-[#fafafa] font-semibold text-secondary dark:border-[#17263c] dark:bg-[#1b2e4b] rounded-r-md border-l-0", children: _jsx(Tooltip, { label: "\uBCF5\uC0AC", children: _jsx("button", { type: "button", className: "flex h-[30px] w-[36px] items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors", onClick: handleCopy, children: _jsx(IconCopy, { className: "h-4 w-4" }) }) }) }));
};
export const CopyableTextView = ({ value, displayValue, }) => {
    return (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("span", { children: displayValue ?? value }), _jsx(Tooltip, { label: "\uBCF5\uC0AC", children: _jsx("button", { className: "h-5 w-5 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded opacity-60 hover:opacity-100 transition-opacity", onClick: async (e) => {
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
                    }, children: _jsx(IconCopy, { className: "h-3.5 w-3.5" }) }) })] }));
};
//# sourceMappingURL=CopyableTextView.js.map