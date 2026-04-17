/**
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useListGridTheme } from '../context/ListGridThemeContext';
// Inline sizing for skeleton rects; library CSS owns pulse/color.
const size = (height, width) => ({
    height: `${height}px`,
    ...(width !== undefined
        ? { width: typeof width === 'number' ? `${width}px` : width }
        : {}),
});
/**
 * ViewListGrid용 스켈레톤 컴포넌트
 *
 * pageSize와 컬럼 정보를 기반으로 실제 테이블 레이아웃과 동일한 스켈레톤을 생성합니다.
 */
export const ViewListGridSkeleton = ({ pageSize = 10, fields = [], isSubCollection = false, showCheckbox = true, isPopup = false, }) => {
    const { classNames: themeClasses } = useListGridTheme();
    const columnCount = fields.length > 0 ? fields.length : 5;
    const rowCount = Math.max(3, Math.min(pageSize, 20));
    return (_jsxs("div", { className: "rcm-pulse", children: [!isSubCollection && (_jsxs("div", { className: "rcm-row-between rcm-skeleton-row", children: [_jsx("div", { className: "rcm-skeleton-search-input", children: _jsx("div", { className: "rcm-skeleton", style: size(40) }) }), _jsx("div", { className: "rcm-row", children: _jsx("div", { className: "rcm-skeleton", style: size(40, 80) }) })] })), isSubCollection && (_jsxs("div", { className: "rcm-row-between rcm-skeleton-subcollection-bar", children: [_jsxs("div", { className: "rcm-row", children: [_jsx("div", { className: "rcm-skeleton", style: size(20, 64) }), _jsx("div", { className: "rcm-skeleton", style: size(20, 32) })] }), _jsx("div", { className: "rcm-row", children: _jsx("div", { className: "rcm-skeleton rcm-skeleton-accent", style: size(32, 64) }) })] })), _jsx("div", { className: isPopup ? themeClasses.popup?.container ?? 'rcm-skeleton-popup-container' : '', children: _jsx("div", { className: themeClasses.table?.container ?? 'rcm-scroll-y', children: _jsx("div", { className: themeClasses.table?.responsiveWrapper ?? 'rcm-skeleton-table-wrapper', children: _jsxs("table", { className: themeClasses.table?.table ?? 'rcm-table', children: [_jsx("thead", { className: themeClasses.table?.thead ?? 'rcm-skeleton-thead', children: _jsxs("tr", { children: [showCheckbox && (_jsx("th", { className: "rcm-skeleton-th-checkbox", children: _jsx("div", { className: "rcm-skeleton", style: size(16, 16) }) })), fields.length > 0 ? (fields.map((field, index) => (_jsx("th", { className: "rcm-skeleton-th", children: _jsx("div", { className: "rcm-skeleton", style: { height: '16px', width: getColumnWidth(field, index) } }) }, field.getName())))) : (Array.from({ length: columnCount }).map((_, index) => (_jsx("th", { className: "rcm-skeleton-th", children: _jsx("div", { className: "rcm-skeleton", style: { height: '16px', width: `${60 + (index % 3) * 20}px` } }) }, index))))] }) }), _jsx("tbody", { children: Array.from({ length: rowCount }).map((_, rowIndex) => (_jsxs("tr", { className: "rcm-skeleton-tr", children: [showCheckbox && (_jsx("td", { className: "rcm-skeleton-td-checkbox", children: _jsxs("div", { className: "rcm-row rcm-gap-xs", children: [_jsx("div", { className: "rcm-skeleton", style: size(16, 16) }), _jsx("div", { className: "rcm-skeleton", style: size(16, 24) })] }) })), fields.length > 0 ? (fields.map((field, colIndex) => (_jsx("td", { className: "rcm-skeleton-td", children: _jsx(SkeletonCell, { field: field, rowIndex: rowIndex, colIndex: colIndex }) }, field.getName())))) : (Array.from({ length: columnCount }).map((_, colIndex) => (_jsx("td", { className: "rcm-skeleton-td", children: _jsx("div", { className: "rcm-skeleton", style: {
                                                        height: '20px',
                                                        width: `${40 + ((rowIndex + colIndex) % 4) * 20}%`,
                                                        maxWidth: '200px',
                                                    } }) }, colIndex))))] }, rowIndex))) })] }) }) }) }), !isPopup && !isSubCollection && (_jsx("div", { className: "rcm-skeleton-pagination", children: _jsx("div", { className: "rcm-row rcm-gap-xs", children: Array.from({ length: 5 }).map((_, index) => (_jsx("div", { className: index === 2
                            ? 'rcm-skeleton rcm-skeleton-accent'
                            : 'rcm-skeleton', style: size(32, 32) }, index))) }) }))] }));
};
/**
 * 컬럼 너비 계산 (필드 타입 기반)
 * constructor.name을 사용하여 필드 클래스 타입 감지
 */
function getColumnWidth(field, index) {
    const fieldClassName = field.constructor.name.toLowerCase();
    if (fieldClassName.includes('date'))
        return '100px';
    if (fieldClassName.includes('boolean') || fieldClassName.includes('checkbox'))
        return '60px';
    if (fieldClassName.includes('number') || fieldClassName.includes('integer') || fieldClassName.includes('decimal'))
        return '80px';
    if (fieldClassName.includes('email'))
        return '140px';
    if (fieldClassName.includes('url'))
        return '160px';
    return index === 0 ? '120px' : '80px';
}
const SkeletonCell = ({ field, rowIndex, colIndex }) => {
    const fieldClassName = field.constructor.name.toLowerCase();
    if (fieldClassName.includes('boolean') || fieldClassName.includes('checkbox')) {
        return (_jsx("div", { className: "rcm-row-center", children: _jsx("div", { className: "rcm-skeleton", style: size(20, 20) }) }));
    }
    if (fieldClassName.includes('image') || fieldClassName.includes('thumbnail')) {
        return _jsx("div", { className: "rcm-skeleton", style: size(40, 40) });
    }
    if (fieldClassName.includes('datetime')) {
        return _jsx("div", { className: "rcm-skeleton", style: size(20, 112) });
    }
    if (fieldClassName.includes('date')) {
        return _jsx("div", { className: "rcm-skeleton", style: size(20, 80) });
    }
    if (fieldClassName.includes('number') ||
        fieldClassName.includes('integer') ||
        fieldClassName.includes('decimal') ||
        fieldClassName.includes('currency')) {
        return _jsx("div", { className: "rcm-skeleton rcm-ml-auto", style: size(20, 64) });
    }
    if (fieldClassName.includes('tag') || fieldClassName.includes('badge')) {
        return (_jsx("div", { className: "rcm-row rcm-gap-xs", children: _jsx("div", { className: "rcm-skeleton rcm-radius-full rcm-bg-info-surface", style: size(20, 48) }) }));
    }
    if (fieldClassName.includes('enum') || fieldClassName.includes('select')) {
        return _jsx("div", { className: "rcm-skeleton", style: size(24, 64) });
    }
    const widthPercent = 40 + ((rowIndex + colIndex) % 4) * 15;
    return (_jsx("div", { className: "rcm-skeleton", style: {
            height: '20px',
            width: `${widthPercent}%`,
            maxWidth: colIndex === 0 ? '180px' : '140px',
            minWidth: '40px',
        } }));
};
export default ViewListGridSkeleton;
//# sourceMappingURL=ViewListGridSkeleton.js.map