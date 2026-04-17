import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Alert } from "../ui";
import { Table } from "../ui";
import { Box } from "../ui";
import { Flex } from "../ui";
import { Paper } from "../ui";
import { getTranslation } from "../utils/i18n";
import { isEmpty, isPositive } from "../misc";
export const DataImportResultView = ({ result, fields }) => {
    const { t } = getTranslation();
    const successResult = getImportSuccessResult(result);
    const message = getImportSuccessMessage(successResult);
    const titleColor = successResult === 'FAILED' ? 'red' : 'teal';
    const resultTableColor = successResult === 'FAILED' ? 'red' : 'teal';
    return (_jsx(_Fragment, { children: _jsxs(Alert, { color: titleColor, message: message, children: [_jsx("p", { className: `text-sm font-bold mb-2 ${titleColor === 'red' ? 'text-red-500' : 'text-teal-500'}`, children: t('form.list.dataTransfer.tab.import.result.title') }), _jsxs(Table, { className: 'mb-4 rounded-md', children: [_jsx(Table.Thead, { children: _jsxs(Table.Tr, { children: [_jsx(Table.Th, { className: `text-center w-40 border-l border-r border-b border-${resultTableColor}-500/20 text-sm font-bold bg-${resultTableColor}-400 text-white`, children: "\uAD6C\uBD84" }), _jsx(Table.Th, { className: `text-center border-r border-b border-${resultTableColor}-500/20 text-sm font-bold bg-${resultTableColor}-400 text-white`, children: "\uACB0\uACFC" })] }) }), _jsxs(Table.Tbody, { children: [_jsxs(Table.Tr, { children: [_jsx(Table.Td, { className: `text-center border-l border-r border-b border-${resultTableColor}-500/20`, children: t('form.list.dataTransfer.tab.import.result.requested') }), _jsx(Table.Td, { className: `text-center border-r border-b border-${resultTableColor}-500/20`, children: result.requested })] }), _jsxs(Table.Tr, { children: [_jsx(Table.Td, { className: `text-center border-l border-r border-b border-${resultTableColor}-500/20`, children: t('form.list.dataTransfer.tab.import.result.created') }), _jsx(Table.Td, { className: `text-center border-r border-b border-${resultTableColor}-500/20`, children: result.created })] }), isPositive(result.updated) && (_jsxs(Table.Tr, { children: [_jsx(Table.Td, { className: `text-center border-l border-r border-b border-${resultTableColor}-500/20`, children: t('form.list.dataTransfer.tab.import.result.updated') }), _jsx(Table.Td, { className: `text-center border-r border-b border-${resultTableColor}-500/20`, children: result.updated })] })), isPositive(result.failed) && (_jsxs(Table.Tr, { children: [_jsx(Table.Td, { className: `text-center border-l border-r border-b border-${resultTableColor}-500/20`, children: t('form.list.dataTransfer.tab.import.result.failed') }), _jsx(Table.Td, { className: `text-center border-r border-b border-${resultTableColor}-500/20`, children: result.failed })] }))] })] }), (result.errors && !isEmpty(result.errors)) && _jsxs(Box, { style: { paddingTop: 10 }, children: [_jsx("p", { className: 'text-sm font-bold text-red-500', children: t('form.list.dataTransfer.tab.import.result.error') }), result.errors && result.errors.length > 0 && (_jsxs(Table, { className: 'mt-2 rounded-md', children: [_jsx(Table.Thead, { children: _jsxs(Table.Tr, { children: [_jsx(Table.Th, { className: 'text-center w-20 border-l border-r border-b border-red-500/20 text-sm font-bold bg-red-400 text-white', children: "\uD589" }), _jsx(Table.Th, { className: 'text-center w-40 border-r border-b border-red-500/20 text-sm font-bold bg-red-400 text-white', children: "\uD544\uB4DC" }), _jsx(Table.Th, { className: 'text-center border-b border-r border-red-500/20 text-sm font-bold bg-red-400 text-white', children: "\uC5D0\uB7EC \uBA54\uC2DC\uC9C0" })] }) }), _jsx(Table.Tbody, { children: result.errors.map((value, errorIndex) => (_jsxs(Table.Tr, { children: [_jsx(Table.Td, { className: 'text-center border-l border-r border-b border-red-500/20', children: value.row || '-' }), _jsx(Table.Td, { className: 'text-center border-r border-b border-red-500/20', children: value.field ? getFieldLabel(value.field) : '-' }), _jsx(Table.Td, { className: 'text-sm font-normal border-r border-b border-red-500/20', children: value.message })] }, `error-row-${errorIndex}`))) })] }))] })] }) }));
    function getFieldLabel(name) {
        const field = fields.find(field => field.getName() === name);
        if (field) {
            return field.getLabel();
        }
        return '';
    }
};
export const ImportErrorView = (props) => {
    const { t } = getTranslation();
    const importError = props.importError;
    const parseError = props.errorMessage;
    const importErrorView = props.importErrorView;
    return (_jsxs(Box, { style: { width: `100%` }, children: [importError && _jsx(Flex, { align: 'center', justify: 'center', children: _jsx(Box, { style: { paddingTop: 5, paddingBottom: 5, width: `100%` }, children: _jsx(Alert, { color: 'red', message: importError, children: t('form.list.dataTransfer.tab.import.messages.retry') }) }) }), parseError && _jsx(Paper, { style: { padding: 2, width: '100%' }, children: _jsx(Alert, { color: 'red', message: parseError, children: t('form.list.dataTransfer.tab.import.messages.retry') }) }), importErrorView] }));
};
function getImportSuccessResult(result) {
    const created = getNumber(result.created);
    const updated = getNumber(result.updated);
    const failed = getNumber(result.failed);
    if (created > 0 || updated > 0) {
        if (failed > 0) {
            return 'PARTIAL_SUCCESS';
        }
        return 'SUCCESS';
    }
    if (failed > 0) {
        return 'FAILED';
    }
    return 'NOTHING';
}
function getNumber(value) {
    if (value === undefined) {
        return 0;
    }
    return value;
}
function getImportSuccessMessage(result) {
    const { t } = getTranslation();
    switch (result) {
        case 'SUCCESS':
            return t('form.list.dataTransfer.tab.import.messages.success');
        case 'FAILED':
            return t('form.list.dataTransfer.tab.import.messages.success.failed');
        case 'PARTIAL_SUCCESS':
            return t('form.list.dataTransfer.tab.import.messages.success.partial');
        case 'NOTHING':
            return t('form.list.dataTransfer.tab.import.messages.success.nothing');
    }
}
//# sourceMappingURL=DataImportResultView.js.map