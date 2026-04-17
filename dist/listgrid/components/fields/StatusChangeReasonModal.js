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
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600 mb-2", children: "\uC0C1\uD0DC \uBCC0\uACBD" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "font-medium", children: currentLabel }), _jsx("span", { className: "text-gray-400", children: "\u2192" }), _jsx("span", { className: "font-medium text-primary-600", children: newLabel })] })] }), _jsx("div", { children: _jsx(Textarea, { name: "changeReason", label: "\uBCC0\uACBD \uC0AC\uC720", value: changeReason, onChange: handleReasonChange, placeHolder: reason.message, required: reason.required, rows: 4, errors: error ? [error] : undefined }) }), _jsxs("div", { className: "flex justify-end gap-2 pt-4 border-t", children: [_jsx("button", { type: "button", className: "btn btn-secondary btn-sm", onClick: onCancel, children: "\uCDE8\uC18C" }), _jsx("button", { type: "button", className: "btn btn-primary btn-sm", onClick: handleConfirm, children: "\uD655\uC778" })] })] }));
};
//# sourceMappingURL=StatusChangeReasonModal.js.map