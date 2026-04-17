'use client';
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { Table } from "../ui";
import { SafePerfectScrollbar } from "../ui";
import { Box } from "../ui";
import { Flex } from "../ui";
import { Grid } from "../ui";
import { Paper } from "../ui";
import { useEffect, useState } from "react";
// CSS module removed in Stage 8 (host app supplies styling)
const classes = {};
import { DataImportResultView, ImportErrorView } from '../transfer/DataImportResultView';
import { defaultString } from '../utils/StringUtil';
import { isEmpty } from "../utils";
export const DataImportProcessor = ({ resultView, data, importResult, onSubmit, cancelImport, onImportSuccess, viewError, importErrorView, importError, errorMessage, preview, ...props }) => {
    const [fields, setFields] = useState([]);
    useEffect(() => {
        if (data && !isEmpty(data) && props.fields && !isEmpty(props.fields)) {
            const fields = props.fields.filter((field) => {
                // 첫줄은 헤더로 {id: '아이디', name: '이름', ...} 형식으로 데이터가 들어 온다.
                const header = data[0];
                return header[field.getName()] !== undefined;
                ;
            });
            setFields(fields);
        }
    }, [props.fields, data]);
    if (isEmpty(fields)) {
        return _jsx(_Fragment, {});
    }
    return (_jsx(_Fragment, { children: _jsxs(Box, { children: [resultView && _jsxs(Box, { children: [_jsx(Box, { style: { padding: `2rem` }, children: _jsx(DataImportResultView, { result: importResult, fields: fields }) }), _jsx(Flex, { align: 'center', style: { width: '100%', paddingTop: 2 }, justify: 'center', children: _jsx("button", { type: "button", className: "rcm-button rcm-button-outline", onClick: () => {
                                    cancelImport();
                                    onImportSuccess?.call(this);
                                }, children: "\uD655\uC778" }) })] }), !resultView && _jsxs(Box, { children: [viewError && _jsxs(Box, { style: { padding: `2rem` }, children: [_jsx(ImportErrorView, { importError: importError, importErrorView: importErrorView, errorMessage: errorMessage }), _jsx(Flex, { align: 'center', style: { width: '100%', marginTop: `2rem` }, justify: 'center', children: _jsx("button", { type: "button", className: "rcm-button rcm-button-secondary", onClick: () => {
                                            cancelImport();
                                        }, children: "\uB2EB\uAE30" }) })] }), preview && _jsxs(Box, { style: { padding: `2rem` }, children: [_jsx(DataImportPreview, { data: data, fields: fields }), _jsxs(Flex, { gap: 10, align: 'center', style: { width: '100%', marginTop: `2rem` }, justify: 'center', children: [_jsx("button", { type: "button", className: "rcm-button rcm-button-primary", onClick: () => {
                                                onSubmit();
                                            }, children: "\uC5C5\uB85C\uB4DC" }), _jsx("button", { type: "button", className: "rcm-button rcm-button-outline", onClick: () => {
                                                cancelImport();
                                            }, children: "\uCDE8\uC18C" })] })] })] })] }) }));
};
export const DataImportPreview = ({ fields, data }) => {
    function showRows() {
        let rowFields = [];
        data?.forEach((row, index) => {
            if (index > 0) {
                rowFields.push(_jsxs(Table.Tr, { children: [_jsx(Table.Td, { className: classes.row, children: index }, 'cell_index_' + index), (function () {
                            const cells = [];
                            fields.map((field, index) => {
                                const fieldName = field.getName();
                                cells.push(_jsx(Table.Td, { className: classes.row, children: defaultString(row.find(r => r.name === fieldName)?.value) }, 'cell_' + fieldName + '_' + index));
                            });
                            return cells;
                        }())] }, 'row_' + index));
            }
        });
        return rowFields;
    }
    return (_jsx(Grid, { children: _jsx(Grid.Col, { span: 12, children: _jsx(Paper, { style: { padding: 2, width: '100%' }, children: _jsx(SafePerfectScrollbar, { children: _jsxs(Table, { border: 1, borderColor: '#ff0', children: [_jsx(Table.Thead, { children: _jsxs(Table.Tr, { children: [_jsx(Table.Th, { className: classes.header, children: "#" }, 'body_header_index'), fields.map((field, index) => (_jsx("th", { className: classes.header, children: _jsxs("div", { children: [_jsxs("div", { children: ["[", field.getName(), "]"] }), field.getLabel()] }) }, 'body_' + field + '_' + index)))] }) }), _jsx(Table.Tbody, { children: _jsx(_Fragment, { children: showRows() }) })] }) }) }) }) }));
};
//# sourceMappingURL=DataImportProcessor.js.map