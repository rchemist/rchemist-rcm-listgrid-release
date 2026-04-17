/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconCopy, IconDotsVertical, IconMessage } from '@tabler/icons-react';
import { Popover } from '../../../ui';
import { Tooltip } from '../../../ui';
import { getOverlayZIndex, POPOVER_Z_INDEX, useModalManagerStore } from '../../../store';
import { showToast } from '../../../message';
import { SmsModal } from './SmsModal';
import { formatPhoneNumber } from '../../../utils/PhoneUtil';
export const PhoneNumberListView = ({ phoneNumber, formattedValue, enableSms, session, }) => {
    const { openModal, closeModal } = useModalManagerStore();
    // Check if user has admin role
    const roles = session?.authentication?.roles ?? session?.roles ?? [];
    const isAdmin = roles.includes('ROLE_ADMIN');
    // SMS can be sent if: admin + enableSms + phoneNumber
    const canSendSms = isAdmin && enableSms && phoneNumber;
    const handleCopy = async (e) => {
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(phoneNumber);
            showToast({
                message: '전화번호가 복사되었습니다.',
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
    const handleSms = (e) => {
        e.stopPropagation();
        const modalId = `sms-modal-${phoneNumber}-${Date.now()}`;
        openModal({
            modalId,
            title: 'SMS 발송',
            size: 'md',
            content: (_jsx(SmsModal, { phoneNumber: formatPhoneNumber(phoneNumber), onClose: () => closeModal(modalId) })),
        });
    };
    // If no actions available, just show the formatted value
    if (!canSendSms) {
        return _jsx("span", { children: formattedValue });
    }
    return (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("span", { children: formattedValue }), _jsxs(Popover, { position: "bottom", withArrow: true, shadow: "md", zIndex: getOverlayZIndex(POPOVER_Z_INDEX), children: [_jsx(Popover.Target, { children: _jsx(Tooltip, { label: "\uBA54\uB274", children: _jsx("button", { className: "h-6 w-6 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded", children: _jsx(IconDotsVertical, { className: "h-4 w-4" }) }) }) }), _jsx(Popover.Dropdown, { onClick: (e) => e.stopPropagation(), children: _jsxs("div", { className: "flex flex-col space-y-1 p-1", children: [_jsxs("button", { className: "flex items-center space-x-2 rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700", onClick: handleCopy, children: [_jsx(IconCopy, { className: "h-4 w-4" }), _jsx("span", { children: "\uC804\uD654\uBC88\uD638 \uBCF5\uC0AC" })] }), canSendSms && (_jsxs("button", { className: "flex items-center space-x-2 rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700", onClick: handleSms, children: [_jsx(IconMessage, { className: "h-4 w-4" }), _jsx("span", { children: "SMS \uBCF4\uB0B4\uAE30" })] }))] }) })] })] }));
};
//# sourceMappingURL=PhoneNumberListView.js.map