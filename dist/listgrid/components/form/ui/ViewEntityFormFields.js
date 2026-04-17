'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Tab } from '@headlessui/react';
import { SafePerfectScrollbar } from '../../../ui';
import { ViewTab } from '../ViewTab';
import { ViewTabPanel } from '../ViewTabPanel';
export const ViewEntityFormFields = React.memo(function ViewEntityFormFields({ tabs, tabIndex, setTabIndex, entityForm, setEntityForm, readonly, subCollectionEntity, session, createStepFields, cacheKey, selectedTabIndex, setSelectedTabIndex }) {
    // 단순하게 원래 tabs를 그대로 사용하고, 개별 컴포넌트에서 표시 여부 결정
    React.useEffect(() => {
        if (tabs && tabs.length > 0) {
            const currentTabIndex = tabs.findIndex(tab => tab.id === tabIndex);
            if (currentTabIndex !== -1 && currentTabIndex !== selectedTabIndex) {
                console.log('ViewEntityFormFields - syncing selectedTabIndex from', selectedTabIndex, 'to', currentTabIndex);
                setSelectedTabIndex(currentTabIndex);
            }
        }
    }, [tabIndex, tabs]);
    const handleTabChange = (index) => {
        if (tabs && tabs[index]) {
            setSelectedTabIndex(index);
            setTabIndex(tabs[index].id);
        }
    };
    return (_jsx(React.Fragment, { children: _jsxs(Tab.Group, { selectedIndex: selectedTabIndex, onChange: handleTabChange, children: [tabs.length > 1 && (_jsx(SafePerfectScrollbar, { className: `relative w-full whitespace-nowrap`, children: _jsx(Tab.List, { className: "rcm-tab-list", children: tabs.map((tab, index) => (_jsx(ViewTab, { id: tab.id, label: tab.label, tabIndex: tabIndex, description: tab.description, entityForm: entityForm, createStepFields: createStepFields, setTabIndex: setTabIndex }, `${tab.id}_${cacheKey}_${createStepFields.join(',')}_tab`))) }) })), _jsx(Tab.Panels, { children: tabs.map((tab, index) => (_jsx(ViewTabPanel, { id: tab.id, tabIndex: tabIndex, readonly: readonly, subCollectionEntity: subCollectionEntity, session: session, createStepFields: createStepFields, entityForm: entityForm, setEntityForm: setEntityForm }, `${tab.id}_${cacheKey}_${createStepFields.join(',')}_panel`))) })] }) }));
});
//# sourceMappingURL=ViewEntityFormFields.js.map