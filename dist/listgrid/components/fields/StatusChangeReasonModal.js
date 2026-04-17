'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { useState } from 'react';
import { Textarea } from '../../ui';
export const StatusChangeReasonModal = ({ currentStatus, newStatus, options, reason, onConfirm, onCancel }) => {
    const [changeReason, setChangeReason] = useState('');
    const [error, setError] = useState(null);
    // 현재 상태와 새 상태의 라벨 찾기
    const currentLabel = options.find(opt => opt.value === currentStatus)?.label || String(currentStatus);
    const newLabel = options.find(opt => opt.value === newStatus)?.label || String(newStatus);
    const handleConfirm = () => {
        if (reason.required && !changeReason.trim()) {
            setError('변경 사유를 입력해주세요.');
            return;
        }
        onConfirm(changeReason);
    };
    const handleReasonChange = (value) => {
        setChangeReason(value);
        if (error) {
            setError(null);
        }
    };
    return (_jsxs("div", { className: "rcm-status-change-modal", children: [_jsxs("div", { className: "rcm-status-change-box", children: [_jsx("div", { className: "rcm-status-change-caption", children: "\uC0C1\uD0DC \uBCC0\uACBD" }), _jsxs("div", { className: "rcm-status-change-row", children: [_jsx("span", { className: "rcm-status-change-from", children: currentLabel }), _jsx("span", { className: "rcm-status-change-arrow", children: "\u2192" }), _jsx("span", { className: "rcm-status-change-to", children: newLabel })] })] }), _jsx("div", { children: _jsx(Textarea, { name: "changeReason", label: "\uBCC0\uACBD \uC0AC\uC720", value: changeReason, onChange: handleReasonChange, placeHolder: reason.message, required: reason.required, rows: 4, errors: error ? [error] : undefined }) }), _jsxs("div", { className: "rcm-status-change-footer", children: [_jsx("button", { type: "button", className: "rcm-button rcm-button-secondary rcm-button-sm", onClick: onCancel, children: "\uCDE8\uC18C" }), _jsx("button", { type: "button", className: "rcm-button rcm-button-primary rcm-button-sm", onClick: handleConfirm, children: "\uD655\uC778" })] })] }));
};
//# sourceMappingURL=StatusChangeReasonModal.js.map