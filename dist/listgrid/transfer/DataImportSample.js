'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { useEffect, useState } from 'react';
import { Table } from "../ui";
import { SafePerfectScrollbar } from "../ui";
import { Modal } from "../ui";
import { IconFile, IconHelpCircle } from "@tabler/icons-react";
import clsx from "clsx";
import { DataField } from '../transfer/Type';
import { DataExportProcessor } from '../transfer/DataExportProcessor';
import { getTranslation } from "../utils/i18n";
import { Tooltip } from '../ui';
export const DataImportSample = ({ sampleFileName: exportFileName, sampleData: initialData, allowUpdate = true, ...props }) => {
    const fields = props.fields.filter((field) => {
        return initialData[0].find((item) => item.name === field.getName()) !== undefined;
    });
    // 업데이트 모드가 허용된 경우에만 id 필드를 노출한다.
    if (allowUpdate && fields.find((field) => field.getName() === 'id') === undefined) {
        // 첫번째 항목으로 추가한다.
        fields.unshift(DataField.create({ name: 'id', label: '아이디', type: 'text' }));
    }
    const { t } = getTranslation();
    const [exportKey, setExportKey] = useState(Date.now());
    const [processing, setProcessing] = useState(false);
    const [sampleData, setSampleData] = useState();
    const hasRequired = fields.find((field) => field.isRequired()) !== undefined;
    useEffect(() => {
        if (initialData && initialData.length > 0) {
            let shouldAddId = allowUpdate;
            if (shouldAddId) {
                const row = initialData[0];
                for (const data of row) {
                    if (data.name === 'id') {
                        shouldAddId = false;
                        break;
                    }
                }
            }
            if (shouldAddId && allowUpdate) {
                const newData = { name: 'id', value: '' };
                const newDataArray = [];
                let index = 0;
                for (const row of initialData) {
                    const newRow = [];
                    if (index === 0) {
                        newRow.push(newData);
                    }
                    else {
                        newRow.push({ name: 'id', value: '' });
                    }
                    for (const data of row) {
                        newRow.push(data);
                    }
                    newDataArray.push(newRow);
                    index++;
                }
                setSampleData(newDataArray);
            }
            else {
                setSampleData(initialData);
            }
        }
    }, []);
    if (sampleData === undefined) {
        return null;
    }
    return (_jsxs("div", { className: "rcm-import-sample", children: [_jsxs("div", { className: "rcm-import-sample-guide", children: [_jsx("p", { className: "rcm-text", "data-size": "sm", "data-tone": "muted", children: t('form.list.dataTransfer.tab.import.messages.guide') }), _jsx(SampleDataButton, { exportKey: exportKey, setExportKey: setExportKey, setProcessing: setProcessing, processing: processing, data: sampleData, fileName: exportFileName, fields: fields })] }), hasRequired && (_jsxs("div", { className: "rcm-import-sample-required-notice", children: [_jsx("span", { className: "rcm-import-sample-required-star", children: "*" }), _jsx("span", { className: "rcm-import-sample-required-text", children: "\uD45C\uC2DC\uAC00 \uC788\uB294 \uD544\uB4DC\uB294 \uD544\uC218 \uD56D\uBAA9\uC785\uB2C8\uB2E4. \uD544\uC218 \uD56D\uBAA9\uC744 \uC785\uB825\uD558\uC9C0 \uC54A\uC73C\uBA74 \uC5C5\uB85C\uB4DC \uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." })] })), _jsx("div", { className: "rcm-import-sample-table-wrap", children: _jsx(SafePerfectScrollbar, { style: { minWidth: '100%' }, children: _jsxs(Table, { style: { minWidth: 650 }, "aria-label": "simple table", children: [_jsx(Table.Thead, { children: _jsx(Table.Tr, { children: fields.map((field, index) => {
                                        return (_jsx(Table.Th, { className: clsx('rcm-import-sample-th', field.isRequired() && 'rcm-import-sample-th-required'), children: _jsxs("div", { className: "rcm-import-sample-th-inner", children: [_jsxs("div", { className: "rcm-import-sample-th-label-row", children: [field.isRequired() && _jsx("span", { className: "rcm-import-sample-th-star", children: "*" }), _jsx("span", { className: "rcm-import-sample-th-label", children: field.getLabel() })] }), _jsxs("div", { className: "rcm-import-sample-th-name", children: ["[", field.getName(), "]"] })] }) }, `header_${field.getName()}_${index + 1}`));
                                    }) }) }), _jsx(Table.Tbody, { children: sampleData.map((row, index) => {
                                    return (_jsx(Table.Tr, { children: fields.map((field, index) => {
                                            if (field.getName() === 'id') {
                                                return (_jsx(Table.Td, { align: "center", className: "rcm-import-sample-td", children: _jsxs("div", { className: 'rcm-import-sample-td-id', children: [_jsx("span", { className: "rcm-text", "data-size": "sm", "data-tone": "muted", style: { whiteSpace: 'nowrap' }, children: `ID 값` }), _jsx(Tooltip, { zIndex: 10000, label: '\uAC12\uC774 \uC788\uC73C\uBA74 UPDATE, \uC5C6\uC73C\uBA74 INSERT', children: _jsx(IconHelpCircle, { className: 'rcm-import-sample-td-id-help' }) })] }) }, `body_${field.getName()}_${index + 1}`));
                                            }
                                            let value = '';
                                            for (const data of row) {
                                                if (data.name === field.getName()) {
                                                    value = data.value;
                                                    break;
                                                }
                                            }
                                            return (_jsx(Table.Td, { align: "center", className: "rcm-import-sample-td rcm-import-sample-td-value", children: value }, `body_${field.getName()}_${index + 1}`));
                                        }) }, `body_${index + 1}`));
                                }) })] }) }) })] }));
};
export default DataImportSample;
const SampleDataButton = (props) => {
    const setProcessing = props.setProcessing ?? function (processing) {
        console.debug('do nothing with processing value: ', processing);
    };
    if (props.data === undefined) {
        return _jsx(_Fragment, {});
    }
    const sampleData = props.data.map((row) => {
        return row.filter((item) => props.fields.find((field) => field.getName() === item.name));
    });
    console.log('sampleData: ', sampleData);
    return (_jsxs(_Fragment, { children: [props.processing && (_jsx(Modal, { size: "lg", opened: props.processing, closeOnClickOutside: false, zIndex: 10000, onClose: () => {
                    setProcessing(false);
                }, children: _jsx(DataExportProcessor, { fields: props.fields, exportFileName: props.fileName, process: props.processing, data: sampleData, onProcessed: () => {
                        props.setExportKey(Date.now());
                        setProcessing(false);
                    } }, 'data_export_import_data' + props.exportKey) })), !props.processing && (_jsxs("button", { type: "button", className: "rcm-button rcm-import-sample-download-btn", "data-variant": "primary", onClick: () => { setProcessing(true); }, children: [_jsx(IconFile, { className: "rcm-m2o-action-icon" }), "\uC0D8\uD50C \uD30C\uC77C \uB2E4\uC6B4\uB85C\uB4DC"] }))] }));
};
//# sourceMappingURL=DataImportSample.js.map