import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { getAlignClassName } from '../../../common/func';
import React from 'react';
import { getTranslation } from '../../../utils/i18n';
import { isTrue } from '../../../utils/BooleanUtil';
import { SortField } from './SortField';
import { HeaderFieldFilter } from './HeaderFieldFilter';
import { useListGridTheme } from '../context/ListGridThemeContext';
export const HeaderField = ({ viewFields, ...props }) => {
    const { t } = getTranslation();
    const { classNames: themeClasses } = useListGridTheme();
    const listFields = props.fields;
    const draggable = isTrue(props.draggable);
    // 테마에서 헤더 셀 클래스 가져오기
    const cellClass = themeClasses.headerCell?.cell ?? 'whitespace-nowrap';
    const sortableClass = themeClasses.headerCell?.sortable ?? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-dark/30';
    const sortIconClass = themeClasses.headerCell?.sortIcon ?? 'ml-1 inline-block';
    const filterIconClass = themeClasses.headerCell?.filterIcon ?? 'ml-1 text-gray-400 hover:text-primary cursor-pointer';
    return (_jsxs(React.Fragment, { children: [listFields.map((field, index) => {
                if (viewFields.length === 0 || viewFields.includes(field.getName())) {
                    const alignClassName = getAlignClassName(field.getListFieldAlignType(), true);
                    const sortable = props.sortable && isTrue(field.getListConfig()?.sortable, true);
                    const filterable = field.isFilterable();
                    // QuickSearch 필드이고, QuickSearch 값이 있으면 헤더 필터 비활성화
                    const isQuickSearchField = props.quickSearchFieldNames?.has(field.getName()) ?? false;
                    const isQuickSearchActive = !!(props.quickSearchValue && props.quickSearchValue.trim().length > 0);
                    const disableHeaderFilter = isQuickSearchField && isQuickSearchActive;
                    return (_jsx("th", { className: cellClass, children: _jsxs("div", { className: `w-full min-w-[40px] flex items-center ${alignClassName}`, children: [_jsx("span", { children: field.viewLabel(t) }), isTrue(sortable) && (_jsx("span", { className: `inline-flex items-center ${sortIconClass}`, children: _jsx(SortField, { name: field.name, searchForm: props.searchForm, onChangeSearchForm: props.onChangeSearchForm }) })), filterable && (_jsx("span", { className: `inline-flex items-center ${filterIconClass}`, children: _jsx(HeaderFieldFilter, { field: field, gridId: props.gridId, searchForm: props.searchForm, entityForm: props.entityForm, onChangeSearchForm: props.onChangeSearchForm, disabled: disableHeaderFilter }) }))] }) }, `th_${index}`));
                }
                return null;
            }), draggable && (_jsx("th", { className: themeClasses.headerCell?.dragHandleCell ?? 'w-2 whitespace-nowrap', children: t('순서 변경') }, `th_drag`))] }));
};
//# sourceMappingURL=HeaderField.js.map