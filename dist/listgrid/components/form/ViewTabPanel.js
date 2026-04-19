'use client';
import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { Tab } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { ViewFieldGroup } from './ViewFieldGroup';
import { useEntityFormTheme } from './context/EntityFormThemeContext';
export const ViewTabPanel = ({ id, tabIndex, entityForm, setEntityForm, readonly, subCollectionEntity, session, createStepFields, resetEntityForm, hideMappedByFields, ...props }) => {
    const { classNames, cn } = useEntityFormTheme();
    const [groups, setGroups] = useState([]);
    useEffect(() => {
        setGroups([]);
        (async () => {
            const viewableFieldGroups = await entityForm.getViewableFieldGroups({
                tabId: id,
                createStepFields,
            });
            setGroups(viewableFieldGroups);
        })();
    }, [id, createStepFields?.join(','), entityForm]); // tabIndex 의존성 제거, createStepFields를 문자열로 변환하여 안정적인 비교
    // Tab.Group에서 자동으로 활성화/비활성화되므로 별도의 조건 체크 제거
    // Tab.Group automatically handles activation/deactivation, so remove separate condition check
    if (groups.length === 0) {
        return (_jsx(Tab.Panel, { className: classNames.tabPanel?.panel, unmount: false, children: _jsx("div", { className: cn('p-4 text-gray-500 dark:text-gray-400', classNames.tabPanel?.empty), children: "\uC774 \uB2E8\uACC4\uC5D0\uC11C\uB294 \uD45C\uC2DC\uD560 \uB0B4\uC6A9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }) }));
    }
    return (_jsx(Tab.Panel, { className: classNames.tabPanel?.panel, unmount: false, children: _jsx("div", { className: cn('pt-2 md:pt-3', classNames.tabPanel?.content), children: (function () {
                const panels = [];
                groups.forEach((group, index) => {
                    panels.push(_jsx("div", { children: _jsx(ViewFieldGroup, { tabId: id, groupId: group, readonly: readonly, ...(subCollectionEntity !== undefined ? { subCollectionEntity } : {}), entityForm: entityForm, ...(setEntityForm !== undefined ? { setEntityForm } : {}), ...(session !== undefined ? { session } : {}), ...(createStepFields !== undefined ? { createStepFields } : {}), ...(resetEntityForm !== undefined ? { resetEntityForm } : {}), ...(hideMappedByFields !== undefined ? { hideMappedByFields } : {}) }, index) }, `${group}-${index}-${createStepFields ? createStepFields?.join(',') : ''}`));
                });
                return panels;
            })() }) }));
};
//# sourceMappingURL=ViewTabPanel.js.map