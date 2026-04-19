'use client';
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { getExportFileName, } from '../transfer/Type';
import { SearchForm } from '../form/SearchForm';
import { useEffect, useState } from 'react';
import { getTranslation } from '../utils/i18n';
import DataExportService from '../transfer/DataExportService';
import { isBlank } from '../utils/StringUtil';
import { LinearIndicator } from '../ui';
import { Button } from '../ui';
import ExcelDownload from '../transfer/Provider/ExcelProvider';
import { LoadingOverlay } from '../ui';
export const DataExportProcessor = ({ process, url, fields, onProcessed, maxCount, countPerPage, searchForm, exportFileName, data: initialData, password, addedFields, overrideFormData, }) => {
    const restrictCount = maxCount || 100;
    const perPageCount = countPerPage || 100;
    const maxLimitCount = restrictCount * perPageCount;
    const editorFields = getEditorFields();
    const [exportable, setExportable] = useState(true);
    const [failedCount, setFailedCount] = useState(0);
    const [error, setError] = useState('');
    const [data, setData] = useState();
    const { t } = getTranslation();
    const [exportProgress, setExportProgress] = useState(0);
    const fileName = getExportFileName(exportFileName, t);
    const [onDownload, setOnDownload] = useState(false);
    const service = new DataExportService({
        searchForm: searchForm?.clone() ?? SearchForm.create(),
        url: url,
        fields: fields,
        restrictCount: restrictCount,
        pagePerCount: perPageCount,
        setExportable: setExportable,
        setFailedCount: setFailedCount,
        setProgress: setExportProgress,
        setData: setData,
        data: initialData,
        setError: setError,
        editorFields: editorFields,
        addedFields: addedFields,
    });
    useEffect(() => {
        service.process();
    }, []);
    if (!process) {
        return _jsx(_Fragment, {});
    }
    return (_jsxs(_Fragment, { children: [_jsx("h1", { className: 'text-xl mb-2', children: (function () {
                    if (exportProgress < 100) {
                        return t('form.list.dataTransfer.tab.export.processing');
                    }
                    else if (exportProgress >= 100) {
                        return t('form.list.dataTransfer.tab.export.processed');
                    }
                    return t('form.list.dataTransfer.tab.export.processing');
                })() }), _jsxs("div", { children: [exportable && (_jsxs(_Fragment, { children: [isBlank(error) && (_jsxs(_Fragment, { children: [exportProgress < 100 && (_jsxs("div", { className: 'py-1 mb-3', children: [_jsx("div", { className: 'text-primary', children: t('form.list.dataTransfer.tab.export.onProcessing') }), _jsx(LinearIndicator, { value: exportProgress }, 'progress_indicator_' + exportProgress)] })), exportProgress >= 100 && (_jsx("div", { className: 'py-1 mb-3', children: _jsx("div", { className: 'text-success text-sm', children: t('form.list.dataTransfer.tab.export.fileCreated') }) }))] })), !isBlank(error) && (_jsx("div", { className: 'py-1 mb-3', children: _jsx("span", { className: 'text-danger', children: t(error) }) })), onDownload && (_jsxs("div", { className: 'relative', children: [_jsx(LoadingOverlay, { visible: true }), _jsx("div", { className: 'w-full h-[100px]' })] })), !onDownload && (_jsxs("div", { className: 'flex items-center justify-center space-x-2', children: [_jsx(Button, { variant: 'filled', onClick: () => {
                                            setOnDownload(true);
                                            try {
                                                setTimeout(() => {
                                                    (async () => {
                                                        let fileData = [...(data ?? [])];
                                                        if (overrideFormData !== undefined && data !== undefined) {
                                                            const overrideFormDataResult = await overrideFormData(data);
                                                            fileData = Array.isArray(overrideFormDataResult)
                                                                ? overrideFormDataResult
                                                                : [overrideFormDataResult];
                                                        }
                                                        await ExcelDownload({
                                                            data: fileData,
                                                            fileName: fileName,
                                                            password: password,
                                                            fields: fields,
                                                            logOptions: {
                                                                condition: {
                                                                    exportUrl: url,
                                                                    fields: fields.map((f) => f.getName()),
                                                                },
                                                            },
                                                        });
                                                        onProcessed();
                                                    })();
                                                }, 100);
                                            }
                                            catch (e) {
                                                setOnDownload(false);
                                                setError(t('form.list.dataTransfer.tab.export.error.download'));
                                            }
                                        }, disabled: exportProgress < 100 || !isBlank(error), style: { marginRight: 1 }, children: t('form.list.dataTransfer.tab.export.button.download') }), _jsx(Button, { variant: 'outline', onClick: () => {
                                            setExportProgress(0);
                                            onProcessed();
                                        }, children: t('form.list.dataTransfer.tab.export.button.cancel') })] }))] })), !exportable && (_jsxs(_Fragment, { children: [_jsxs("div", { children: [_jsx("h3", { children: t('form.list.dataTransfer.tab.export.error.limit.retry') }), _jsxs("div", { children: [t('form.list.dataTransfer.tab.export.error.limit.cause'), ": ", failedCount] }), _jsxs("div", { children: [t('form.list.dataTransfer.tab.export.error.limit.warning'), ": ", maxLimitCount] })] }), _jsx("div", { className: 'text-center', children: _jsx(Button, { variant: 'outline', color: 'inherit', onClick: () => {
                                        onProcessed();
                                    }, children: t('form.list.dataTransfer.tab.export.button.close') }) })] }))] })] }));
    function getEditorFields() {
        const editorFields = [];
        fields.forEach((field) => {
            if (field.getType() === 'html' || field.getType() === 'markdown') {
                editorFields.push(field.getName());
            }
        });
        return editorFields;
    }
};
//# sourceMappingURL=DataExportProcessor.js.map