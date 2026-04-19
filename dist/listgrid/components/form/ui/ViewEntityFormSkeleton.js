/**
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEntityFormTheme } from '../context/EntityFormThemeContext';
// Inline sizing for skeleton blocks — keeps the CSS surface small while the
// component decides per-placeholder shape. Library-provided `rcm-skeleton` /
// `rcm-skeleton-accent` / `rcm-skeleton-danger` classes own the pulse and
// color; host CSS overrides either by redefining those classes or by re-
// targeting `.rcm-skeleton` via an unlayered selector.
const size = (height, width) => ({
    height: typeof height === 'number' ? `${height}px` : height,
    ...(width !== undefined ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
});
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
        .filter((tab) => !tab.hidden)
        .sort((a, b) => a.order - b.order);
    const showTabs = tabs.length > 1;
    return (_jsxs("div", { className: cn('rcm-pulse', classNames.root), children: [!inlineMode && (_jsx("div", { className: "rcm-skeleton-row", children: _jsx("div", { className: "rcm-skeleton", style: size(28, 192) }) })), _jsx("div", { className: cn(inlineMode ? 'rcm-panel rcm-panel-compact' : 'rcm-skeleton-panel', inlineMode ? '' : classNames.panel?.container), children: _jsxs("div", { className: cn(inlineMode ? '' : 'rcm-skeleton-inner', inlineMode ? '' : classNames.panel?.inner), children: [inlineMode && (_jsxs("div", { className: showTabs
                                ? 'rcm-row-between rcm-skeleton-tab-bar'
                                : 'rcm-row-between rcm-skeleton-row', children: [_jsx("div", { className: "rcm-row rcm-flex-1", children: showTabs &&
                                        tabs.map((tab, index) => (_jsx("div", { className: index === 0 ? 'rcm-skeleton rcm-skeleton-accent' : 'rcm-skeleton', style: size(32, index === 0 ? 80 : 64) }, tab.id))) }), _jsxs("div", { className: "rcm-row", children: [_jsx("div", { className: "rcm-skeleton rcm-skeleton-accent", style: size(28, 56) }), _jsx("div", { className: "rcm-skeleton rcm-skeleton-danger", style: size(28, 56) })] })] })), !inlineMode && showTabs && (_jsx("div", { className: "rcm-row rcm-skeleton-tab-bar", children: tabs.map((tab, index) => (_jsx("div", { className: index === 0
                                    ? 'rcm-skeleton rcm-skeleton-accent rcm-skeleton-tab-active'
                                    : 'rcm-skeleton', style: size(40, index === 0 ? 96 : 80) }, tab.id))) })), tabs.length > 0 && (_jsx(FieldGroupsSkeleton, { fieldGroups: tabs[0].fieldGroups, entityForm: entityForm, subCollectionEntity: subCollectionEntity })), !inlineMode && (_jsxs("div", { className: "rcm-action-bar-end", children: [_jsx("div", { className: "rcm-skeleton rcm-skeleton-accent", style: size(40, 80) }), _jsx("div", { className: "rcm-skeleton", style: size(40, 80) }), _jsx("div", { className: "rcm-skeleton rcm-skeleton-danger", style: size(40, 80) })] }))] }) })] }));
};
const FieldGroupsSkeleton = ({ fieldGroups, entityForm, subCollectionEntity, }) => {
    const sortedGroups = [...fieldGroups].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    return (_jsx("div", { className: "rcm-stack", children: sortedGroups.map((group) => {
            const containerClass = subCollectionEntity
                ? 'rcm-panel rcm-panel-muted rcm-panel-compact'
                : 'rcm-panel';
            return (_jsxs("div", { className: containerClass, children: [_jsx("div", { className: "rcm-skeleton-row", children: _jsx("div", { className: "rcm-skeleton", style: size(20, 96) }) }), _jsx("div", { className: "rcm-stack", children: [...group.fields]
                            .sort((a, b) => a.order - b.order)
                            .map((fieldItem) => {
                            const field = entityForm.fields.get(fieldItem.name);
                            return (_jsx(FieldSkeleton, { fieldName: fieldItem.name, ...(field !== undefined ? { field } : {}) }, fieldItem.name));
                        }) })] }, group.id));
        }) }));
};
const FieldSkeleton = ({ fieldName: _fieldName, field }) => {
    const getFieldHeight = () => {
        if (!field)
            return 40;
        // Subclass-specific config access (e.g. CustomOptionField.config.fieldType);
        // EntityField base has no `config`, so we probe via a narrow structural cast.
        const fieldType = field.config?.fieldType;
        switch (fieldType) {
            case 'HTML':
            case 'RICH_TEXT':
                return 128;
            case 'TEXT_AREA':
                return 96;
            case 'CHECKBOX':
            case 'RADIO':
                return 24;
            default:
                return 40;
        }
    };
    return (_jsxs("div", { className: "rcm-field-root", children: [_jsx("div", { className: "rcm-skeleton", style: size(16, 80) }), _jsx("div", { className: "rcm-skeleton", style: size(getFieldHeight()) })] }));
};
/**
 * 기본 스켈레톤 (EntityForm 정보 없을 때)
 */
const DefaultSkeleton = ({ inlineMode }) => {
    return (_jsxs("div", { className: "rcm-pulse", children: [!inlineMode && (_jsx("div", { className: "rcm-skeleton-row", children: _jsx("div", { className: "rcm-skeleton", style: size(28, 192) }) })), _jsxs("div", { className: inlineMode ? 'rcm-panel' : '', children: [_jsxs("div", { className: "rcm-row rcm-skeleton-tab-bar", children: [_jsx("div", { className: "rcm-skeleton", style: size(32, 80) }), _jsx("div", { className: "rcm-skeleton", style: size(32, 64) })] }), _jsx("div", { className: "rcm-stack", children: [1, 2, 3, 4].map((i) => (_jsxs("div", { className: "rcm-field-root", children: [_jsx("div", { className: "rcm-skeleton", style: size(16, 80) }), _jsx("div", { className: "rcm-skeleton", style: size(40) })] }, i))) }), !inlineMode && (_jsxs("div", { className: "rcm-action-bar-end", children: [_jsx("div", { className: "rcm-skeleton", style: size(40, 80) }), _jsx("div", { className: "rcm-skeleton", style: size(40, 80) })] }))] })] }));
};
export default ViewEntityFormSkeleton;
//# sourceMappingURL=ViewEntityFormSkeleton.js.map