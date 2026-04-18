'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Modal } from "../ui";
import { getTranslation } from "../utils/i18n";
import { useEffect, useState } from "react";
import { SimpleGrid } from "../ui";
import { DataExportProcessor } from '../transfer/DataExportProcessor';
import { Button } from "../ui";
import { ExcelPasswordField } from '../transfer/ExcelPasswordField';
export const DataExporter = ({ config, searchForm, fileName, onClose }) => {
    const { t } = getTranslation();
    const fields = config?.fields ?? [];
    const [dataFields, setDataFields] = useState([...fields]);
    const [ableToExport, setAbleToExport] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [exportKey, setExportKey] = useState(Date.now());
    const [mounted, setMounted] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    useEffect(() => {
        setMounted(true);
    }, []);
    if (config === undefined || !mounted)
        return null;
    const title = t('form.list.dataTransfer.tab.export.title') ?? '다운로드';
    const instruction = t('form.list.dataTransfer.tab.export.message');
    const description = config?.description ?? '';
    const url = config.url;
    return _jsxs(_Fragment, { children: [_jsx(Modal, { size: '5xl', title: title, animation: 'none', closeOnClickOutside: false, closeOnEscape: false, opened: true, onClose: () => { onClose(); }, children: _jsxs("div", { className: "rcm-dialog-body", children: [_jsxs("div", { className: "rcm-stack", children: [_jsx("div", { className: "rcm-notice", "data-tone": "info", style: { wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }, children: _jsx("label", { className: "rcm-text-sm rcm-text-info rcm-text-emphasis", children: instruction }) }), _jsxs("div", { className: "rcm-panel", children: [_jsx("h3", { className: "rcm-heading-sm", children: "\uB2E4\uC6B4\uB85C\uB4DC\uD560 \uD544\uB4DC \uC120\uD0DD" }), _jsx(SimpleGrid, { cols: { base: 2, xs: 2, sm: 3, md: 4, lg: 5 }, spacing: "md", children: (function () {
                                                const forms = [];
                                                fields.forEach((field) => {
                                                    const fieldName = field.getName();
                                                    if (fieldName === 'id') {
                                                        return;
                                                    }
                                                    forms.push(_jsxs("div", { className: "rcm-checkbox-row", children: [_jsx("input", { type: "checkbox", id: fieldName, name: fieldName, defaultChecked: dataFields.some((item) => item.equals(field)), value: field.getName(), onChange: (event) => {
                                                                    handleTargetFieldChange(field, event);
                                                                } }, fieldName), _jsx("label", { htmlFor: `${fieldName}`, className: "rcm-checkbox-label", children: field.getLabel() })] }, `fields_${fieldName}`));
                                                });
                                                return forms;
                                            }()) })] })] }), _jsx(ExcelPasswordField, { password: password, onPasswordChange: setPassword, error: error, onErrorChange: setError }), description && (_jsx("div", { className: "rcm-notice", "data-tone": "warning", children: _jsx("div", { className: "rcm-text-sm rcm-text-warning", children: description }) })), _jsx("div", { className: "rcm-action-bar", children: _jsx(Button, { variant: "filled", disabled: !ableToExport, className: "rcm-button", "data-variant": "primary", onClick: () => {
                                    handleExport();
                                }, children: t('form.list.dataTransfer.tab.export.button.download') }) })] }) }), processing && _jsx(Modal, { size: 'lg', title: `${title}`, opened: processing, closeOnClickOutside: false, closeOnEscape: false, onClose: () => { setProcessing(false); }, children: _jsx(DataExportProcessor, { url: url, fields: dataFields, searchForm: searchForm, exportFileName: fileName, addedFields: config?.addedFields, overrideFormData: config?.overrideFormData, process: processing, password: password, onProcessed: () => {
                        setExportKey(Date.now());
                        setProcessing(false);
                    } }, 'data_export_' + exportKey) })] });
    function handleExport() {
        setError('');
        setProcessing(true);
    }
    function handleTargetFieldChange(targetField, event) {
        const isChecked = event.target.checked;
        const fieldExists = dataFields.some((item) => item.equals(targetField));
        if (isChecked && !fieldExists) {
            addExportField(targetField);
            updateAbleToExport(true);
        }
        else if (!isChecked) {
            removeExportField(targetField);
            updateAbleToExportIfEmpty();
        }
    }
    function addExportField(targetField) {
        const newExportFields = [...dataFields, targetField];
        setDataFields(newExportFields);
    }
    function removeExportField(targetField) {
        const newExportFields = dataFields.filter((item) => !item.equals(targetField));
        setDataFields(newExportFields);
    }
    function updateAbleToExport(value) {
        if (!ableToExport) {
            setAbleToExport(value);
        }
    }
    function updateAbleToExportIfEmpty() {
        if (dataFields.length === 1) {
            setAbleToExport(false);
        }
    }
};
//# sourceMappingURL=DataExporter.js.map