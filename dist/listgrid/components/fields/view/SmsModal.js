/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { RequestUtil } from '../../../misc';
import { showAlert, showSuccess } from '../../../message';
export const SmsModal = ({ phoneNumber, onClose }) => {
    const [senderAddress, setSenderAddress] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [senderList, setSenderList] = useState([]);
    const [loadingSenderList, setLoadingSenderList] = useState(false);
    // SMS content length calculation (in bytes for Korean)
    const getByteLength = (str) => {
        let byteLength = 0;
        for (let i = 0; i < str.length; i++) {
            const charCode = str.charCodeAt(i);
            if (charCode <= 0x7f) {
                byteLength += 1;
            }
            else if (charCode <= 0x7ff) {
                byteLength += 2;
            }
            else {
                byteLength += 2; // Korean characters are typically 2 bytes in EUC-KR
            }
        }
        return byteLength;
    };
    const byteLength = getByteLength(content);
    const isLms = byteLength > 90;
    // Fetch sender list on modal mount
    useEffect(() => {
        const fetchSenderList = async () => {
            setLoadingSenderList(true);
            try {
                const response = await RequestUtil.getExternalApiDataWithError({
                    url: '/api/v1/sms-sender/list',
                    method: 'GET'
                });
                const senderCache = response.data;
                if (senderCache && senderCache.permittedPhoneNumbers) {
                    setSenderList(senderCache.permittedPhoneNumbers);
                    // If there's only one sender, auto-select it
                    if (senderCache.permittedPhoneNumbers.length === 1) {
                        setSenderAddress(senderCache.permittedPhoneNumbers[0].phoneNumber);
                    }
                }
            }
            catch (error) {
                console.error('Failed to fetch sender list:', error);
                showAlert({
                    message: '발신번호 목록을 불러올 수 없습니다.',
                    title: '오류',
                    icon: 'error'
                });
            }
            finally {
                setLoadingSenderList(false);
            }
        };
        fetchSenderList();
    }, []);
    const handleSend = async (senderAddress) => {
        if (!senderAddress) {
            showAlert({
                message: '발신번호를 선택해주세요.',
                title: '알림',
                icon: 'error'
            });
            return;
        }
        if (!content.trim()) {
            showAlert({
                message: '메시지 내용을 입력해주세요.',
                title: '알림',
                icon: 'error'
            });
            return;
        }
        setLoading(true);
        try {
            const notificationQueue = {
                senderAddress: senderAddress,
                notificationType: 'SMS',
                content: content,
                toList: [{ address: phoneNumber }]
            };
            const response = await RequestUtil.getExternalApiDataWithError({
                url: '/notification/send',
                method: 'POST',
                formData: notificationQueue
            });
            if (response.data) {
                showSuccess({
                    message: 'SMS가 성공적으로 전송되었습니다.'
                });
                onClose();
            }
            else {
                showAlert({
                    message: response.error || 'SMS 전송에 실패했습니다.',
                    title: '오류',
                    icon: 'error'
                });
            }
        }
        catch (error) {
            console.error('Failed to send SMS:', error);
            showAlert({
                message: 'SMS 전송 중 오류가 발생했습니다.',
                title: '오류',
                icon: 'error'
            });
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "rcm-modal-body", children: [_jsxs("div", { className: "rcm-modal-field-group", children: [_jsx("label", { className: "rcm-modal-label", children: "\uBC1C\uC2E0\uBC88\uD638 *" }), _jsxs("select", { className: "rcm-field-select", value: senderAddress, onChange: (e) => setSenderAddress(e.target.value), disabled: loadingSenderList || senderList.length === 0, children: [_jsx("option", { value: "", children: "\uBC1C\uC2E0\uBC88\uD638\uB97C \uC120\uD0DD\uD574\uC8FC\uC138\uC694" }), senderList.map((sender, index) => (_jsxs("option", { value: sender.phoneNumber, children: [sender.name, " (", sender.phoneNumber, ")"] }, index)))] }), senderList.length === 0 && !loadingSenderList && (_jsx("p", { className: "rcm-modal-warning", children: "\uC0AC\uC6A9 \uAC00\uB2A5\uD55C \uBC1C\uC2E0\uBC88\uD638\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }))] }), _jsxs("div", { className: "rcm-modal-field-group", children: [_jsx("label", { className: "rcm-modal-label", children: "\uC218\uC2E0\uC790 \uC804\uD654\uBC88\uD638" }), _jsx("input", { type: "text", className: "rcm-field-input rcm-field-input-disabled", value: phoneNumber, disabled: true, readOnly: true })] }), _jsxs("div", { className: "rcm-modal-field-group", children: [_jsx("label", { className: "rcm-modal-label", children: "\uBA54\uC2DC\uC9C0 \uB0B4\uC6A9" }), _jsx("textarea", { className: "rcm-field-textarea rcm-sms-textarea", value: content, onChange: (e) => setContent(e.target.value), placeholder: "\uBA54\uC2DC\uC9C0 \uB0B4\uC6A9\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694." }), _jsxs("div", { className: "rcm-sms-meta", children: [_jsx("span", { children: isLms ? (_jsx("span", { className: "rcm-sms-lms-notice", children: "LMS\uB85C \uBC1C\uC1A1\uB429\uB2C8\uB2E4 (90\uBC14\uC774\uD2B8 \uCD08\uACFC)" })) : (_jsxs("span", { children: ["SMS (", byteLength, "/90 \uBC14\uC774\uD2B8)"] })) }), _jsxs("span", { children: [content.length, "\uC790"] })] })] }), _jsxs("div", { className: "rcm-modal-footer", children: [_jsx("button", { type: "button", className: "rcm-button", "data-variant": "outline", onClick: onClose, disabled: loading, children: "\uCDE8\uC18C" }), _jsx("button", { type: "button", className: "rcm-button", "data-variant": "primary", onClick: () => {
                            (async () => {
                                await handleSend(senderAddress);
                            })();
                        }, disabled: loading || !content.trim() || !senderAddress, children: loading ? '발송 중...' : '발송' })] })] }));
};
//# sourceMappingURL=SmsModal.js.map