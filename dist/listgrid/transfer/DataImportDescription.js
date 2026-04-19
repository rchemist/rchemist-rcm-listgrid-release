import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { Table } from '../ui';
import { SafePerfectScrollbar } from '../ui';
import { Box } from '../ui';
import { Flex } from '../ui';
import { defaultString } from '../utils/StringUtil';
// CSS module removed in Stage 8 (host app supplies styling)
const styles = {};
import clsx from 'clsx';
import { Tooltip } from '../ui';
export const DataImportDescription = ({ title, data }) => {
    return (_jsxs(Box, { style: { marginTop: `1rem`, paddingTop: `1.5rem` }, children: [_jsx(Flex, { align: 'center', justify: 'flex-end', children: title ? (title) : (_jsxs(Box, { children: [_jsx("span", { style: { color: `#f00`, marginRight: `4px` }, children: "*" }), " \uD45C\uC2DC\uAC00 \uB41C \uD544\uB4DC\uB294 \uD544\uC218\uAC12\uC785\uB2C8\uB2E4."] })) }), _jsx(SafePerfectScrollbar, { style: { height: '350px' }, children: _jsxs(Table, { stickyHeader: true, striped: 'odd', withColumnBorders: true, highlightOnHover: true, children: [_jsx(Table.Thead, { children: _jsxs(Table.Tr, { children: [_jsx(Table.Th, { w: `30%`, className: clsx(styles.header, styles.headerLeft), children: "\uD544\uB4DC" }), _jsx(Table.Th, { w: `70%`, className: clsx(styles.header, styles.headerRight), children: "\uC124\uBA85" })] }) }), _jsx(Table.Tbody, { children: data.map((field) => {
                                if (defaultString(field.getDescription()) === '') {
                                    return null;
                                }
                                return (_jsxs(Table.Tr, { children: [_jsxs(Table.Td, { className: clsx(styles.body, styles.bodyLeft), children: [field.getLabel(), field.isRequired() && (_jsx(Tooltip, { label: '필수', children: _jsx("span", { style: { color: `#f00`, marginRight: `4px` }, children: " *" }) }))] }), _jsx(Table.Td, { className: clsx(styles.body, styles.bodyRight), children: field.getDescription() })] }, field.getName()));
                            }) })] }) })] }));
};
//# sourceMappingURL=DataImportDescription.js.map