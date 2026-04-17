/**
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEntityFormTheme } from '../context/EntityFormThemeContext';
/**
 * EntityForm 구조 기반 스켈레톤 컴포넌트
 *
 * EntityForm의 Tab, FieldGroup, Field 메타데이터를 분석하여
 * 실제 레이아웃과 동일한 스켈레톤을 생성합니다.
 */
export const ViewEntityFormSkeleton = ({ entityForm, inlineMode = false, subCollectionEntity = false, }) => {
    const { classNames, cn } = useEntityFormTheme();
    // EntityForm이 없으면 기본 스켈레톤
    if (!entityForm) {
        return _jsx(DefaultSkeleton, { inlineMode: inlineMode });
    }
    // 탭 정보 추출
    const tabs = Array.from(entityForm.tabs.values())
        .filter(tab => !tab.hidden)
        .sort((a, b) => a.order - b.order);
    const showTabs = tabs.length > 1;
    return (_jsxs("div", { className: cn("animate-pulse", classNames.root), children: [!inlineMode && (_jsx("div", { className: "mb-4", children: _jsx("div", { className: "h-7 bg-gray-200 dark:bg-gray-700 rounded w-48" }) })), _jsx("div", { className: cn(inlineMode
                    ? "panel w-full rounded-lg px-3 py-2 bg-white dark:bg-dark"
                    : "panel w-full rounded-xl px-0 pt-1", inlineMode ? undefined : classNames.panel?.container), children: _jsxs("div", { className: cn(inlineMode
                        ? "w-full"
                        : "w-full pl-1.5 pr-1.5 md:pl-3 md:pr-3", inlineMode ? undefined : classNames.panel?.inner), children: [inlineMode && (_jsxs("div", { className: `flex items-center justify-between mb-2 ${showTabs ? 'border-b border-white-light dark:border-[#191e3a]' : ''}`, children: [_jsx("div", { className: "flex-1 flex gap-2", children: showTabs && tabs.map((tab, index) => (_jsx("div", { className: `h-8 rounded ${index === 0 ? 'w-20 bg-primary/30' : 'w-16 bg-gray-200 dark:bg-gray-700'}` }, tab.id))) }), _jsxs("div", { className: "flex-shrink-0 ml-2 flex gap-2", children: [_jsx("div", { className: "h-7 w-14 bg-primary/30 rounded" }), _jsx("div", { className: "h-7 w-14 bg-red-200 dark:bg-red-900/30 rounded" })] })] })), !inlineMode && showTabs && (_jsx("div", { className: "mt-3 flex flex-row border-b border-white-light dark:border-[#191e3a] mb-4", children: tabs.map((tab, index) => (_jsx("div", { className: `h-10 rounded-t mr-1 px-4 ${index === 0 ? 'w-24 bg-primary/20 border-b-2 border-primary' : 'w-20 bg-gray-100 dark:bg-gray-800'}` }, tab.id))) })), tabs.length > 0 && (_jsx(FieldGroupsSkeleton, { fieldGroups: tabs[0].fieldGroups, entityForm: entityForm, subCollectionEntity: subCollectionEntity })), !inlineMode && (_jsxs("div", { className: "flex justify-end gap-2 mt-4", children: [_jsx("div", { className: "h-10 w-20 bg-primary/30 rounded" }), _jsx("div", { className: "h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded" }), _jsx("div", { className: "h-10 w-20 bg-red-200 dark:bg-red-900/30 rounded" })] }))] }) })] }));
};
const FieldGroupsSkeleton = ({ fieldGroups, entityForm, subCollectionEntity }) => {
    const sortedGroups = [...fieldGroups].sort((a, b) => a.order - b.order);
    return (_jsx("div", { className: "space-y-4", children: sortedGroups.map((group) => {
            const sortedFields = [...group.fields].sort((a, b) => a.order - b.order);
            // 컨테이너 클래스 (subCollectionEntity 모드에 따라 다름)
            const containerClass = subCollectionEntity
                ? 'relative mb-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50'
                : 'panel mb-3 md:mb-4 border md:border shadow-none md:shadow-md bg-white dark:bg-dark px-4';
            return (_jsxs("div", { className: containerClass, children: [_jsx("div", { className: "mb-3", children: _jsx("div", { className: "h-5 bg-gray-300 dark:bg-gray-600 rounded w-24" }) }), _jsx("div", { className: "space-y-4", children: sortedFields.map((fieldItem) => {
                            const field = entityForm.fields.get(fieldItem.name);
                            return (_jsx(FieldSkeleton, { fieldName: fieldItem.name, field: field }, fieldItem.name));
                        }) })] }, group.id));
        }) }));
};
const FieldSkeleton = ({ fieldName, field }) => {
    // 필드 타입에 따라 다른 스켈레톤 높이
    const getFieldHeight = () => {
        if (!field)
            return 'h-10';
        const fieldType = field.config?.fieldType;
        switch (fieldType) {
            case 'HTML':
            case 'RICH_TEXT':
                return 'h-32';
            case 'TEXT_AREA':
                return 'h-24';
            case 'CHECKBOX':
            case 'RADIO':
                return 'h-6';
            default:
                return 'h-10';
        }
    };
    return (_jsxs("div", { className: "space-y-1.5", children: [_jsx("div", { className: "h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" }), _jsx("div", { className: `${getFieldHeight()} bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700` })] }));
};
/**
 * 기본 스켈레톤 (EntityForm 정보 없을 때)
 */
const DefaultSkeleton = ({ inlineMode }) => {
    return (_jsxs("div", { className: "animate-pulse", children: [!inlineMode && (_jsx("div", { className: "mb-4", children: _jsx("div", { className: "h-7 bg-gray-200 dark:bg-gray-700 rounded w-48" }) })), _jsxs("div", { className: inlineMode ? "p-3 bg-white dark:bg-dark rounded-lg" : "", children: [_jsxs("div", { className: "flex gap-2 border-b border-gray-200 dark:border-gray-700 pb-2 mb-4", children: [_jsx("div", { className: "h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded" }), _jsx("div", { className: "h-8 w-16 bg-gray-100 dark:bg-gray-800 rounded" })] }), _jsx("div", { className: "space-y-4", children: [1, 2, 3, 4].map((i) => (_jsxs("div", { className: "space-y-1.5", children: [_jsx("div", { className: "h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" }), _jsx("div", { className: "h-10 bg-gray-100 dark:bg-gray-800 rounded" })] }, i))) }), !inlineMode && (_jsxs("div", { className: "flex justify-end gap-2 mt-6", children: [_jsx("div", { className: "h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded" }), _jsx("div", { className: "h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded" })] }))] })] }));
};
export default ViewEntityFormSkeleton;
//# sourceMappingURL=ViewEntityFormSkeleton.js.map