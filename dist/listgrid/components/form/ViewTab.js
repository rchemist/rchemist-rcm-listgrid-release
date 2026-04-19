'use client';
import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { Fragment, useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import { Tooltip } from '../../ui';
import { getTranslation } from '../../utils/i18n';
import { useEntityFormTheme } from './context/EntityFormThemeContext';
export const ViewTab = ({ id, tabIndex, label, setTabIndex, entityForm, createStepFields, ...props }) => {
    const { classNames, cn } = useEntityFormTheme();
    // 현재 탭에서 표시할 필드 그룹 id 목록
    // List of field group ids to display in this tab
    const [groups, setGroups] = useState([]);
    useEffect(() => {
        // 탭이 마운트될 때, 표시 가능한 필드 그룹 목록을 비동기로 조회
        // On mount, fetch viewable field groups for this tab asynchronously
        (async () => {
            const viewableFieldGroups = await entityForm.getViewableFieldGroups({
                tabId: id,
                createStepFields,
            });
            setGroups(viewableFieldGroups);
        })();
    }, [id, createStepFields?.join(','), entityForm]); // tabIndex 의존성 제거, createStepFields를 문자열로 변환
    // CreateStep에서 필드가 없는 탭은 숨김 처리하되 null 반환하지 않음
    // 이렇게 해야 Tab.Group의 selectedIndex가 깨지지 않음
    const hasContent = groups.length > 0;
    const { t } = getTranslation();
    // description이 string이면 번역, 아니면 그대로 사용
    // If description is a string, translate it; otherwise, use as is
    let description = undefined;
    if (props.description !== undefined) {
        if (typeof props.description === 'string') {
            description = t(props.description);
        }
        else {
            description = props.description;
        }
    }
    /**
     * ShowButton
     * - 실제 탭 버튼 렌더링 및 선택 처리
     * - 선택 시 스타일 강조, 클릭 시 setTabIndex 호출
     *
     * 실제로는 headlessui의 Tab 컴포넌트와 연동됨
     *
     * @param selected {boolean} - 현재 탭이 선택되었는지 여부
     * @returns {JSX.Element} - 버튼 렌더링
     */
    function ShowButton(selected) {
        // primitive + data-state: rcm-tab 기본 + [data-state="selected"|"disabled"]
        let buttonClass = cn('rcm-tab', classNames.tabs?.tab);
        if (selected) {
            buttonClass = cn(buttonClass, classNames.tabs?.tabSelected);
        }
        if (!hasContent) {
            buttonClass = cn(buttonClass, classNames.tabs?.tabDisabled);
        }
        const dataState = !hasContent ? 'disabled' : selected ? 'selected' : undefined;
        return (_jsx("div", { style: { display: hasContent ? 'block' : 'none' }, children: _jsx("button", { className: buttonClass, "data-state": dataState, onClick: () => {
                    if (hasContent) {
                        setTabIndex?.(id);
                    }
                }, disabled: !hasContent, children: label }) }));
    }
    // description이 있으면 Tooltip으로 감싸서 렌더링, 없으면 바로 버튼 렌더링
    // If description exists, wrap with Tooltip; otherwise, render button directly
    return (_jsx(Tab, { as: Fragment, children: ({ selected }) => description === undefined ? (ShowButton(selected)) : (_jsx(Tooltip, { label: description, children: ShowButton(selected) })) }));
};
//# sourceMappingURL=ViewTab.js.map