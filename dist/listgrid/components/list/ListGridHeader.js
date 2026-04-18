'use client';
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { isTrue } from '../../utils/BooleanUtil';
import { useListGridHeader } from "./hooks/useListGridHeader";
import { HeaderTitle } from "./ui/HeaderTitle";
import { DataTransferModals } from "./ui/DataTransferModal";
import { HeaderActionButtons } from "./ui/HeaderActionButtons";
import { useListGridTheme } from "./context/ListGridThemeContext";
export const ListGridHeader = (props) => {
    const { enableHandleData, isSubCollection, searchForm, refresh, dataTransferConfig, title, hideTitle, readonly, } = props;
    const [openDownload, setOpenDownload] = useState(false);
    const [openUpload, setOpenUpload] = useState(false);
    const { headerButtons, checkedButtons } = useListGridHeader(props);
    const { classNames: themeClasses } = useListGridTheme();
    const viewable = enableHandleData || !isTrue(hideTitle);
    if (!viewable)
        return null;
    return (_jsxs(React.Fragment, { children: [_jsxs("div", { className: themeClasses.header?.container ?? "rcm-listgrid-header", children: [_jsx(HeaderTitle, { title: title, hideTitle: hideTitle }), _jsx("div", { className: themeClasses.header?.buttonGroup ?? "rcm-listgrid-button-group", children: _jsx(HeaderActionButtons, { ...props, headerButtons: headerButtons, checkedButtons: checkedButtons, setOpenDownload: setOpenDownload, setOpenUpload: setOpenUpload, neverDelete: isTrue(props.entityForm.neverDelete) }) })] }), !isSubCollection && _jsx(DataTransferModals, { openDownload: openDownload, setOpenDownload: setOpenDownload, openUpload: openUpload, setOpenUpload: setOpenUpload, dataTransferConfig: dataTransferConfig, searchForm: searchForm, title: title, refresh: refresh })] }));
};
//# sourceMappingURL=ListGridHeader.js.map