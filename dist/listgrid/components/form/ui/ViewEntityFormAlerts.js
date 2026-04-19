import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import React from 'react';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { getTranslation } from '../../../utils/i18n';
import { getIndicatorTone, useAlertManager } from '../hooks/useAlertManager';
import { AlertItem } from './AlertItem';
export const ViewEntityFormAlerts = React.memo(function ViewEntityFormAlerts({ alertMessages, onRemove, onTabChange, onFieldFocus, }) {
    const { t } = getTranslation();
    const { visibleAlerts, isCollapsed, handleLinkClick, handleCloseAlert, toggleCollapse, getDominantColor, } = useAlertManager(alertMessages, onRemove, onTabChange, onFieldFocus);
    // 조건부 return은 모든 hooks 호출 이후에
    if (!alertMessages || alertMessages.length === 0 || visibleAlerts.length === 0) {
        return null;
    }
    const dominantColor = getDominantColor();
    // 알림이 1개일 때는 헤더 없이 직접 렌더링
    if (visibleAlerts.length === 1) {
        return (_jsx("div", { className: "rcm-alerts-single", children: _jsx(AlertItem, { alert: visibleAlerts[0], onLinkClick: handleLinkClick, onClose: handleCloseAlert, t: t }, 'alert-' + visibleAlerts[0].key) }));
    }
    // 알림이 2개 이상일 때만 헤더와 함께 렌더링
    return (_jsxs("div", { className: isCollapsed ? '' : 'rcm-alerts-multi', children: [_jsxs("div", { className: `rcm-alerts-header ${isCollapsed ? 'rcm-alerts-header-collapsed' : 'rcm-alerts-header-expanded'}`, onClick: toggleCollapse, children: [_jsxs("div", { className: "rcm-alerts-header-left", children: [_jsx("span", { className: "rcm-icon-frame rcm-alerts-indicator", "data-shape": "circle", "data-size": "xs", "data-tone": getIndicatorTone(dominantColor), "aria-hidden": "true" }), _jsxs("span", { className: "rcm-text", "data-weight": "medium", children: ["\uC54C\uB9BC (", visibleAlerts.length, ")"] })] }), _jsx("button", { onClick: (e) => {
                            e.stopPropagation();
                            toggleCollapse();
                        }, className: "rcm-icon-btn", "data-size": "sm", "aria-label": isCollapsed ? '알림 펼치기' : '알림 접기', children: isCollapsed ? (_jsx(IconChevronDown, { className: "rcm-icon", "data-size": "sm" })) : (_jsx(IconChevronUp, { className: "rcm-icon", "data-size": "sm" })) })] }), _jsx("div", { className: `rcm-alerts-body ${isCollapsed ? 'rcm-alerts-body-collapsed' : 'rcm-alerts-body-expanded'}`, children: _jsx("div", { className: "rcm-alerts-list", children: visibleAlerts.map((alert) => (_jsx(AlertItem, { alert: alert, onLinkClick: handleLinkClick, onClose: handleCloseAlert, t: t }, 'alert-' + alert.key))) }) })] }));
});
//# sourceMappingURL=ViewEntityFormAlerts.js.map