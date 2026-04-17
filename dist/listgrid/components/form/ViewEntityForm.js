/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Static imports for core components
import { ViewEntityFormTitle } from "./ui/ViewEntityFormTitle";
import { ViewEntityFormButtons } from "./ui/ViewEntityFormButtons";
import { ViewEntityFormSkeleton } from "./ui/ViewEntityFormSkeleton";
import { Tab } from '@headlessui/react';
// Dynamic imports to reduce bundle size
import { dynamic } from "../../utils/lazy";
import { useEntityFormLogic } from "./hooks/useEntityFormLogic";
import { clearAllToasts } from "../../message";
// Theme system
import { useEntityFormTheme } from "./context/EntityFormThemeContext";
// Lazy load heavy components
const ViewEntityFormErrors = dynamic(() => import("./ui/ViewEntityFormErrors").then(mod => ({ default: mod.ViewEntityFormErrors })), {
    loading: () => _jsx("div", { className: "h-4" })
});
const ViewEntityFormAlerts = dynamic(() => import("./ui/ViewEntityFormAlerts").then(mod => ({ default: mod.ViewEntityFormAlerts })), {
    loading: () => _jsx("div", { className: "h-4" })
});
const ViewTab = dynamic(() => import("./ViewTab").then(mod => ({ default: mod.ViewTab })), {
    loading: () => _jsx("div", { className: "h-8 bg-gray-100 rounded animate-pulse" })
});
const ViewTabPanel = dynamic(() => import("./ViewTabPanel").then(mod => ({ default: mod.ViewTabPanel })), {
    loading: () => _jsx("div", { className: "h-96 bg-gray-50 rounded animate-pulse" })
});
const SafePerfectScrollbar = dynamic(() => import('../../ui').then(mod => ({ default: mod.SafePerfectScrollbar })), {
    ssr: false,
    loading: () => _jsx("div", { className: "w-full h-full" })
});
const CreateStepView = dynamic(() => import("./ui/CreateStepView").then(mod => ({ default: mod.CreateStepView })), {
    loading: () => _jsx("div", { className: "h-32 bg-gray-100 rounded animate-pulse" })
});
const CreateStepButtons = dynamic(() => import("./ui/CreateStepButtons").then(mod => ({ default: mod.CreateStepButtons })), {
    loading: () => _jsx("div", { className: "h-12" })
});
/**
 * ViewEntityForm component (render-only structure)
 * - All state/handlers/logic are managed by the useEntityFormLogic hook.
 * - This component is responsible only for rendering structure.
 *
 * ViewEntityForm 컴포넌트 (최소 렌더링 구조)
 * - 모든 상태/핸들러/로직은 useEntityFormLogic 훅에서 관리
 * - 이 컴포넌트는 렌더링 구조만 담당
 *
 * @param props {ViewEntityFormProps} - EntityForm 렌더링에 필요한 모든 속성
 * @returns {JSX.Element|null} - 렌더링 결과 또는 로딩 상태
 */
export const ViewEntityForm = (props) => {
    // useEntityFormLogic 훅에서 모든 상태/핸들러/로직을 일괄 관리
    // All state/handlers/logic are managed by the useEntityFormLogic hook
    const { entityForm, tabIndex, setTabIndex, cacheKey, loadingError, initialized, errors, notifications, title, selectedTabIndex, setSelectedTabIndex, currentStep, setCurrentStep, showStepper, setShowStepper, tabs, isSubCollectionEntity, isInlineMode, readonly, session, useCreateStep, maxStep, createStepFields, buttons, headerAreaContent, setEntityForm, onClickSaveButton, resetEntityForm, } = useEntityFormLogic(props);
    // 테마 시스템에서 클래스 가져오기
    const { classNames, cn, createStepButtonPosition } = useEntityFormTheme();
    // 로딩/에러/초기화 미완료/필수 데이터 미존재 시 로딩 UI만 표시
    // Show loading UI if loading, error, not initialized, or required data is missing
    const loading = loadingError || !initialized || !entityForm || !tabs || tabs.length === 0;
    if (loading) {
        return (_jsx(ViewEntityFormSkeleton, { entityForm: entityForm, inlineMode: isInlineMode, subCollectionEntity: isSubCollectionEntity }));
    }
    /*
      if (entityForm.getRenderType() === 'update') {
          (async () => {
            console.log('ViewEntityForm', entityForm.getRenderType(), await entityForm.getValues());
          })();
      } */
    // 버튼 위치 결정 (기본값: header)
    // 인라인 모드에서는 탭 영역 옆에 버튼 배치
    const buttonPosition = props.buttonPosition ?? 'header';
    const showButtonsInHeader = buttonPosition === 'header' && !isInlineMode;
    const showButtonsInTabRow = isInlineMode;
    return (_jsxs("div", { id: `view-entity-form-${entityForm.name}${isSubCollectionEntity ? '-sub' : ''}`, className: classNames.root, children: [_jsxs("div", { className: "rcm-form-sticky-header", children: [_jsxs("div", { className: cn("rcm-form-header", classNames.header?.container), children: [_jsx("div", { className: cn("rcm-form-header-title", classNames.header?.titleWrapper), children: _jsx(ViewEntityFormTitle, { title: title, hideTitle: props.hideTitle }) }), showButtonsInHeader && (_jsx("div", { className: cn("rcm-form-header-buttons", classNames.header?.buttonWrapper), children: _jsx(ViewEntityFormButtons, { buttons: buttons }) }))] }), headerAreaContent && (_jsx("div", { className: cn("rcm-form-header-area", classNames.headerArea?.container), children: headerAreaContent }))] }), useCreateStep && entityForm && (_jsx(CreateStepView, { currentStep: currentStep, setCurrentStep: setCurrentStep, maxStep: maxStep, entityForm: entityForm, setEntityForm: setEntityForm, onClickSaveButton: onClickSaveButton, showStepper: showStepper, setShowStepper: setShowStepper, session: session ?? undefined, buttonPosition: createStepButtonPosition ?? 'top' })), _jsx(SafePerfectScrollbar, { className: cn("rcm-form-scroll-container", classNames.panel?.scrollContainer), children: _jsx("div", { className: cn("rcm-form-layout-wrapper", classNames.panel?.layoutWrapper), children: _jsx("div", { className: cn(isInlineMode ? "rcm-form-panel rcm-form-panel-inline" : "rcm-form-panel", classNames.panel?.container), children: _jsxs("div", { className: cn("rcm-form-panel-inner", classNames.panel?.inner), children: [_jsx(ViewEntityFormAlerts, { alertMessages: entityForm.getAlertMessages(), onRemove: (key) => {
                                        const updatedForm = entityForm.clone().removeAlertMessage(key);
                                        setEntityForm(updatedForm);
                                    }, onTabChange: (tabId) => {
                                        // tab id로 tab index 찾기
                                        const index = tabs.findIndex(tab => tab.id === tabId);
                                        if (index !== -1) {
                                            setSelectedTabIndex(index);
                                            setTabIndex(tabId);
                                        }
                                    }, onFieldFocus: (fieldName) => {
                                        // 필드가 있는 탭 찾기
                                        const field = entityForm.getField(fieldName);
                                        if (field) {
                                            const fieldTabId = field.getTabId();
                                            if (fieldTabId) {
                                                const tabIdx = tabs.findIndex(tab => tab.id === fieldTabId);
                                                if (tabIdx !== -1) {
                                                    setSelectedTabIndex(tabIdx);
                                                    setTabIndex(fieldTabId);
                                                    // 필드로 스크롤 (약간의 지연 후)
                                                    setTimeout(() => {
                                                        const fieldElement = document.querySelector(`[data-field-name="${fieldName}"]`);
                                                        if (fieldElement) {
                                                            fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                            // 포커스 효과 추가 (선택사항)
                                                            fieldElement.classList.add('ring-2', 'ring-primary');
                                                            setTimeout(() => {
                                                                fieldElement.classList.remove('ring-2', 'ring-primary');
                                                            }, 2000);
                                                        }
                                                    }, 100);
                                                }
                                            }
                                        }
                                    } }), _jsx(ViewEntityFormErrors, { errors: errors, entityErrorMap: entityForm.getErrorMap(), notifications: notifications, onTabChange: (tabIndex) => {
                                        clearAllToasts();
                                        setSelectedTabIndex(tabIndex);
                                        if (tabs[tabIndex]) {
                                            setTabIndex(tabs[tabIndex].id);
                                        }
                                    }, tabs: tabs, entityForm: entityForm }), _jsxs(Tab.Group, { selectedIndex: selectedTabIndex, onChange: (index) => {
                                        clearAllToasts();
                                        setSelectedTabIndex(index);
                                    }, children: [showButtonsInTabRow && (_jsxs("div", { className: `flex items-center justify-between mb-2 ${tabs.length > 1 ? 'border-b border-white-light dark:border-[#191e3a]' : ''}`, children: [_jsx("div", { className: "flex-1", children: tabs.length > 1 && (_jsx(Tab.List, { className: cn("flex flex-row whitespace-nowrap", useCreateStep ? "hidden" : undefined), children: tabs.map((tab, index) => (_jsx(ViewTab, { id: tab.id, label: tab.label, tabIndex: tabIndex, description: tab.description, entityForm: entityForm, createStepFields: createStepFields, setTabIndex: setTabIndex }, `${index}_${cacheKey}_tab`))) })) }), _jsx("div", { className: "flex-shrink-0 ml-2 [&_button]:!py-1 [&_button]:!px-3 [&_button]:!text-sm [&_button]:!min-h-0 [&_button]:!h-auto [&_button]:!pb-0.5", children: _jsx(ViewEntityFormButtons, { buttons: buttons }) })] })), !showButtonsInTabRow && tabs.length > 1 && (_jsx(SafePerfectScrollbar, { className: cn("relative w-full whitespace-nowrap", useCreateStep ? "hidden" : undefined), children: _jsx(Tab.List, { className: cn("mt-3 flex flex-row border-b border-white-light dark:border-[#191e3a] whitespace-nowrap", classNames.tabs?.list), children: function () {
                                                    const tabsView = [];
                                                    tabs.forEach((tab, index) => {
                                                        tabsView.push(_jsx(ViewTab, { id: tab.id, label: tab.label, tabIndex: tabIndex, description: tab.description, entityForm: entityForm, createStepFields: createStepFields, setTabIndex: setTabIndex }, `${index}_${cacheKey}_tab`));
                                                    });
                                                    return tabsView;
                                                }() }) })), _jsx(Tab.Panels, { children: function () {
                                                const panels = [];
                                                tabs.forEach((tab, index) => {
                                                    panels.push(_jsx(ViewTabPanel, { id: tab.id, tabIndex: tabIndex, readonly: readonly, subCollectionEntity: isSubCollectionEntity, session: session ?? undefined, createStepFields: createStepFields, entityForm: entityForm, setEntityForm: setEntityForm, resetEntityForm: resetEntityForm, hideMappedByFields: props.hideMappedByFields }, `${index}_${cacheKey}`));
                                                });
                                                return panels;
                                            }() })] }), !showButtonsInTabRow && (_jsxs("div", { className: cn("mt-6 flex flex-col items-center gap-3", classNames.footer?.container), children: [useCreateStep && createStepButtonPosition === 'bottom' && entityForm && (_jsx(CreateStepButtons, { currentStep: currentStep, maxStep: maxStep, entityForm: entityForm, setEntityForm: setEntityForm, setCurrentStep: setCurrentStep, onClickSaveButton: onClickSaveButton, session: session ?? undefined })), !showButtonsInHeader && !(useCreateStep && createStepButtonPosition === 'bottom') && (_jsx(ViewEntityFormButtons, { buttons: buttons }))] }))] }) }) }) })] }));
};
//# sourceMappingURL=ViewEntityForm.js.map