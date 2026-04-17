/**
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useListGridTheme } from '../context/ListGridThemeContext';
/**
 * ViewListGrid용 스켈레톤 컴포넌트
 *
 * pageSize와 컬럼 정보를 기반으로 실제 테이블 레이아웃과 동일한 스켈레톤을 생성합니다.
 */
export const ViewListGridSkeleton = ({ pageSize = 10, fields = [], isSubCollection = false, showCheckbox = true, isPopup = false, }) => {
    const { classNames: themeClasses } = useListGridTheme();
    // 필드가 없으면 기본 컬럼 수 사용
    const columnCount = fields.length > 0 ? fields.length : 5;
    // 표시할 행 수 결정 (최소 3개, 최대 pageSize)
    const rowCount = Math.max(3, Math.min(pageSize, 20));
    return (_jsxs("div", { className: "animate-pulse", children: [!isSubCollection && (_jsxs("div", { className: "flex items-center justify-between mb-4 gap-4", children: [_jsx("div", { className: "flex-1 max-w-md", children: _jsx("div", { className: "h-10 bg-gray-200 dark:bg-gray-700 rounded" }) }), _jsx("div", { className: "flex items-center gap-2", children: _jsx("div", { className: "h-10 w-20 bg-gray-100 dark:bg-gray-800 rounded" }) })] })), isSubCollection && (_jsxs("div", { className: "flex items-center justify-between mb-3 px-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded" }), _jsx("div", { className: "h-5 w-8 bg-gray-300 dark:bg-gray-600 rounded" })] }), _jsx("div", { className: "flex items-center gap-2", children: _jsx("div", { className: "h-8 w-16 bg-primary/30 rounded" }) })] })), _jsx("div", { className: isPopup
                    ? themeClasses.popup?.container ?? 'max-h-[70vh] flex flex-col overflow-hidden'
                    : '', children: _jsx("div", { className: themeClasses.table?.container ?? "overflow-auto", children: _jsx("div", { className: themeClasses.table?.responsiveWrapper ?? "table-responsive w-full", children: _jsxs("table", { className: themeClasses.table?.table ?? "table-hover w-full", children: [_jsx("thead", { className: themeClasses.table?.thead ?? 'border-t border-b border-white-light dark:border-[#17263c]', children: _jsxs("tr", { children: [showCheckbox && (_jsx("th", { className: "w-[50px] p-2", children: _jsx("div", { className: "h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded" }) })), fields.length > 0 ? (fields.map((field, index) => (_jsx("th", { className: "p-2 text-left", children: _jsx("div", { className: "h-4 bg-gray-300 dark:bg-gray-600 rounded", style: { width: getColumnWidth(field, index) } }) }, field.getName())))) : (
                                            // 필드 정보 없으면 기본 컬럼 생성
                                            Array.from({ length: columnCount }).map((_, index) => (_jsx("th", { className: "p-2 text-left", children: _jsx("div", { className: "h-4 bg-gray-300 dark:bg-gray-600 rounded", style: { width: `${60 + (index % 3) * 20}px` } }) }, index))))] }) }), _jsx("tbody", { children: Array.from({ length: rowCount }).map((_, rowIndex) => (_jsxs("tr", { className: "border-b border-white-light dark:border-[#17263c]", children: [showCheckbox && (_jsx("td", { className: "w-[50px] p-2", children: _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("div", { className: "h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded" }), _jsx("div", { className: "h-4 w-6 bg-gray-200 dark:bg-gray-700 rounded" })] }) })), fields.length > 0 ? (fields.map((field, colIndex) => (_jsx("td", { className: "p-2", children: _jsx(SkeletonCell, { field: field, rowIndex: rowIndex, colIndex: colIndex }) }, field.getName())))) : (
                                            // 필드 정보 없으면 기본 셀 생성
                                            Array.from({ length: columnCount }).map((_, colIndex) => (_jsx("td", { className: "p-2", children: _jsx("div", { className: "h-5 bg-gray-100 dark:bg-gray-800 rounded", style: {
                                                        width: `${40 + ((rowIndex + colIndex) % 4) * 20}%`,
                                                        maxWidth: '200px'
                                                    } }) }, colIndex))))] }, rowIndex))) })] }) }) }) }), !isPopup && !isSubCollection && (_jsx("div", { className: "flex justify-center py-6", children: _jsx("div", { className: "flex items-center gap-1", children: Array.from({ length: 5 }).map((_, index) => (_jsx("div", { className: `h-8 w-8 rounded ${index === 2
                            ? 'bg-primary/30'
                            : 'bg-gray-200 dark:bg-gray-700'}` }, index))) }) }))] }));
};
/**
 * 컬럼 너비 계산 (필드 타입 기반)
 * constructor.name을 사용하여 필드 클래스 타입 감지
 */
function getColumnWidth(field, index) {
    const fieldClassName = field.constructor.name.toLowerCase();
    // 필드 클래스명으로 타입 추론
    if (fieldClassName.includes('date')) {
        return '100px';
    }
    if (fieldClassName.includes('boolean') || fieldClassName.includes('checkbox')) {
        return '60px';
    }
    if (fieldClassName.includes('number') || fieldClassName.includes('integer') || fieldClassName.includes('decimal')) {
        return '80px';
    }
    if (fieldClassName.includes('email')) {
        return '140px';
    }
    if (fieldClassName.includes('url')) {
        return '160px';
    }
    // 첫 번째 컬럼은 보통 ID나 제목이므로 더 넓게
    return index === 0 ? '120px' : '80px';
}
const SkeletonCell = ({ field, rowIndex, colIndex }) => {
    // constructor.name을 사용하여 필드 클래스 타입 감지
    const fieldClassName = field.constructor.name.toLowerCase();
    // 필드 클래스명에 따른 스켈레톤 스타일
    if (fieldClassName.includes('boolean') || fieldClassName.includes('checkbox')) {
        return (_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded" }) }));
    }
    if (fieldClassName.includes('image') || fieldClassName.includes('thumbnail')) {
        return (_jsx("div", { className: "h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded" }));
    }
    if (fieldClassName.includes('datetime')) {
        return (_jsx("div", { className: "h-5 w-28 bg-gray-100 dark:bg-gray-800 rounded" }));
    }
    if (fieldClassName.includes('date')) {
        return (_jsx("div", { className: "h-5 w-20 bg-gray-100 dark:bg-gray-800 rounded" }));
    }
    if (fieldClassName.includes('number') || fieldClassName.includes('integer') ||
        fieldClassName.includes('decimal') || fieldClassName.includes('currency')) {
        return (_jsx("div", { className: "h-5 w-16 bg-gray-100 dark:bg-gray-800 rounded ml-auto" }));
    }
    if (fieldClassName.includes('tag') || fieldClassName.includes('badge')) {
        return (_jsx("div", { className: "flex gap-1", children: _jsx("div", { className: "h-5 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full" }) }));
    }
    if (fieldClassName.includes('enum') || fieldClassName.includes('select')) {
        return (_jsx("div", { className: "h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-md" }));
    }
    // 일반 텍스트 - 행/열에 따라 다른 너비로 자연스러운 효과
    const widthPercent = 40 + ((rowIndex + colIndex) % 4) * 15;
    return (_jsx("div", { className: "h-5 bg-gray-100 dark:bg-gray-800 rounded", style: {
            width: `${widthPercent}%`,
            maxWidth: colIndex === 0 ? '180px' : '140px',
            minWidth: '40px'
        } }));
};
export default ViewListGridSkeleton;
//# sourceMappingURL=ViewListGridSkeleton.js.map