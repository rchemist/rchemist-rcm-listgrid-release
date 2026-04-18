/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { IconCopy, IconMessage } from '@tabler/icons-react';
import { Tooltip } from '../../../ui';
import { useModalManagerStore } from '../../../store';
import { showToast } from '../../../message';
import { readonlyClass } from '../../../ui';
import { formatPhoneNumber, removePhoneNumberHyphens } from '../../../utils/PhoneUtil';
import { SmsModal } from './SmsModal';
export const PhoneNumberFieldView = ({ name, value, onChange, onError, readonly = false, placeHolder, regex, enableSms, session, renderType, }) => {
    const { openModal, closeModal } = useModalManagerStore();
    const [displayValue, setDisplayValue] = useState('');
    // Sync displayValue when external value changes
    useEffect(() => {
        if (value) {
            const formatted = formatPhoneNumber(value);
            setDisplayValue(formatted);
        }
        else {
            setDisplayValue('');
        }
    }, [value]);
    // Check if user has admin role
    const roles = session?.authentication?.roles ?? session?.roles ?? [];
    const isAdmin = roles.includes('ROLE_ADMIN');
    // SMS can be sent if: admin + enableSms + phoneNumber + update mode
    const canSendSms = isAdmin && enableSms && displayValue && renderType === 'update';
    // Copy is always available when there's a phone number
    const canCopy = !!displayValue;
    const handleChange = (e) => {
        const inputValue = e.target.value;
        const digitsOnly = removePhoneNumberHyphens(inputValue);
        const truncated = digitsOnly.substring(0, 11);
        const formatted = formatPhoneNumber(truncated);
        setDisplayValue(formatted);
        onChange(truncated, false);
    };
    const handleBlur = () => {
        const digitsOnly = removePhoneNumberHyphens(displayValue);
        if (regex && digitsOnly) {
            const isValid = regex.pattern.test(digitsOnly);
            if (!isValid) {
                onError?.(regex.message);
            }
            else {
                onError?.('');
            }
        }
        onChange(digitsOnly, true);
    };
    const handleCopy = async () => {
        try {
            const rawNumber = removePhoneNumberHyphens(displayValue);
            await navigator.clipboard.writeText(rawNumber);
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
    const handleSms = () => {
        const rawNumber = removePhoneNumberHyphens(displayValue);
        const modalId = `sms-modal-${rawNumber}-${Date.now()}`;
        openModal({
            modalId,
            title: 'SMS 발송',
            size: 'md',
            content: (_jsx(SmsModal, { phoneNumber: displayValue, onClose: () => closeModal(modalId) })),
        });
    };
    // Determine if buttons should be shown
    const showButtons = canCopy || canSendSms;
    return (_jsxs("div", { className: "rcm-input-group", children: [_jsx("div", { className: "rcm-input-group-input", children: _jsx("input", { type: "text", className: readonlyClass(readonly, `rcm-input ${showButtons ? 'rcm-input-group-input-with-addon' : ''}`), id: name, value: displayValue, placeholder: placeHolder, disabled: readonly, onChange: handleChange, onBlur: handleBlur }) }), showButtons && (_jsxs("div", { className: "rcm-input-addon", children: [canCopy && (_jsx(Tooltip, { label: "\uC804\uD654\uBC88\uD638 \uBCF5\uC0AC", children: _jsx("button", { type: "button", className: "rcm-input-addon-button", onClick: handleCopy, children: _jsx(IconCopy, { className: "rcm-icon-sm" }) }) })), canSendSms && (_jsx(Tooltip, { label: "SMS \uBCF4\uB0B4\uAE30", children: _jsx("button", { type: "button", className: "rcm-input-addon-button", onClick: handleSms, children: _jsx(IconMessage, { className: "rcm-icon-sm" }) }) }))] }))] }));
};
//# sourceMappingURL=PhoneNumberFieldView.js.map