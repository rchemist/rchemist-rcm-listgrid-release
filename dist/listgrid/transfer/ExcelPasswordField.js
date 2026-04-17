'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Tooltip } from '../ui';
import { ShowError } from '../message';
import { getTranslation } from '../utils/i18n';
export const ExcelPasswordField = ({ password, onPasswordChange, error, onErrorChange, }) => {
    const { t } = getTranslation();
    const [usePassword, setUsePassword] = useState(false);
    const usePasswordLabel = t('form.list.dataTransfer.tab.export.usepassword.label') || '비밀번호 설정';
    const passwordLabel = t('form.list.dataTransfer.tab.export.password.label') || '비밀번호';
    return (_jsxs("div", { className: "bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsx(Tooltip, { label: _jsx("div", { children: "\uD30C\uC77C\uC5D0 \uBE44\uBC00\uBC88\uD638\uB97C \uC124\uC815\uD558\uB294 \uACBD\uC6B0 \uB370\uC774\uD130 \uC591\uC774 \uB9CE\uC744 \uACBD\uC6B0 \uC554\uD638\uD654\uC5D0 \uB2E4\uC18C \uC2DC\uAC04\uC774 \uC18C\uC694\uB420 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }), zIndex: 1100, color: "gray", withArrow: true, position: "top-start", children: _jsxs("label", { htmlFor: "usePassword", className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "checkbox", className: "form-checkbox text-indigo-600 focus:ring-indigo-500", id: "usePassword", name: "usePassword", checked: usePassword, onChange: (event) => {
                                    const checked = event.target.checked;
                                    setUsePassword(checked);
                                    if (!checked) {
                                        onPasswordChange('');
                                    }
                                    onErrorChange?.('');
                                } }), _jsx("span", { className: "text-sm font-medium text-gray-700", children: usePasswordLabel })] }) }) }), usePassword && (_jsxs("div", { className: "space-y-2 pl-6", children: [_jsx("label", { htmlFor: "excelPassword", className: "block text-sm font-medium text-gray-700", children: passwordLabel }), _jsx("input", { type: "text", className: "form-input max-w-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500", id: "excelPassword", name: "excelPassword", maxLength: 32, value: password, onChange: (event) => {
                            onPasswordChange(event.target.value);
                            onErrorChange?.('');
                        } }), error && _jsx(ShowError, { message: error, gap: "0" })] }))] }));
};
//# sourceMappingURL=ExcelPasswordField.js.map