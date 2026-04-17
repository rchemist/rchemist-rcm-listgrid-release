'use client';
import { createElement as _createElement } from "react";
import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { ViewRows } from "./ui/ViewRows";
import { useListGridTheme } from "./context/ListGridThemeContext";
export const RowItem = (props) => {
    const { list, checkedItems, setCheckedItems } = props;
    const [sortableList, setSortableList] = useState([]);
    const { classNames: themeClasses } = useListGridTheme();
    useEffect(() => {
        setSortableList(list);
    }, [list]);
    const draggable = props.onDrag !== undefined;
    if (sortableList.length === 0) {
        let colspan = props.viewFields.length === 0 ? props.fields.length : props.viewFields.length;
        if (draggable || props.managePriority) {
            colspan++;
        }
        // 새창으로 보기 컬럼
        if (props.openInNewWindow?.enabled && props.isAdmin && !props.onSelect) {
            colspan++;
        }
        // 선택 버튼 컬럼
        if (props.onSelect) {
            colspan++;
        }
        return _jsx("tbody", { className: themeClasses.table?.tbody ?? "overflow-auto p-0 !border-0", children: _jsx("tr", { children: _jsx("td", { colSpan: colspan, children: _jsx("div", { className: themeClasses.empty?.container ?? "flex h-full !border-0 min-h-[400px] items-center whitespace-nowrap justify-center text-md sm:min-h-[300px]", children: props.messages?.noData ?? '데이터가 없습니다.' }) }) }) });
    }
    return _jsx(React.Fragment, { children: showList() });
    function onDrag(list) {
        setSortableList(list);
        props.onDrag?.(list.map(item => item.id));
    }
    function sortRowsPriority(list) {
        setSortableList(list);
        props.sortRowsPriority?.(list);
    }
    function showList() {
        const totalCount = sortableList.length - 1;
        if (props.managePriority) {
            return _jsx(ReactSortable, { tag: 'tbody', list: sortableList, setList: list => sortRowsPriority(list), animation: 200, swap: true, swapThreshold: 1, className: themeClasses.table?.tbody ?? "overflow-auto p-0 !border-0", children: sortableList.map((item, index) => {
                    return _createElement(ViewRows, { ...props, key: `view_row_${item.id}_${index}`, sortableList: sortableList, totalCount: totalCount, draggable: draggable, item: item, index: index, onDrag: onDrag, checkItem: checkItem, selectionOptions: props.selectionOptions, showCheckboxInput: props.showCheckboxInput });
                }) });
        }
        else {
            return _jsx("tbody", { className: themeClasses.table?.tbody ?? "overflow-auto p-0 !border-0", children: sortableList.map((item, index) => {
                    return _createElement(ViewRows, { ...props, key: `view_row_${item.id}_${index}`, sortableList: sortableList, totalCount: totalCount, draggable: draggable, item: item, index: index, onDrag: onDrag, checkItem: checkItem, selectionOptions: props.selectionOptions, showCheckboxInput: props.showCheckboxInput });
                }) });
        }
    }
    function checkItem(id) {
        const items = [...checkedItems];
        if (items.includes(id)) {
            setCheckedItems?.(items.filter(item => item !== id));
        }
        else {
            setCheckedItems?.([...items, id]);
        }
    }
};
//# sourceMappingURL=RowItem.js.map