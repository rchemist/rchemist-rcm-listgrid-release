import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import React from 'react';
import { IconExternalLink, IconX } from '@tabler/icons-react';
import { getAlertStyles } from '../hooks/useAlertManager';
/**
 * AlertItem 컴포넌트
 * 개별 알림 아이템을 렌더링합니다.
 */
export const AlertItem = React.memo(function AlertItem({ alert, onLinkClick, onClose, t }) {
    const styles = getAlertStyles(alert.color);
    const IconComponent = styles.icon;
    const hasLink = !!alert.link;
    const isClickable = hasLink && alert.link?.type !== 'external';
    return (_jsxs("div", { className: `${styles.bg} rcm-alert-item ${isClickable ? 'rcm-cursor-pointer' : ''}`, onClick: hasLink && alert.link?.type !== 'external' ? () => onLinkClick(alert.link) : undefined, children: [_jsxs("div", { className: "rcm-alert-item-content", children: [_jsx(IconComponent, { className: "rcm-alert-item-icon" }), _jsxs("div", { className: "rcm-alert-item-body", children: [_jsxs("div", { className: "rcm-alert-item-message", children: [typeof alert.message === 'string' ? t(alert.message) : alert.message, alert.link && alert.link.type === 'external' && (_jsx("a", { href: alert.link.value, target: alert.link.target || '_blank', rel: "noopener noreferrer", className: "rcm-alert-item-external", onClick: (e) => e.stopPropagation(), children: _jsx(IconExternalLink, { className: "rcm-alert-item-external-icon" }) }))] }), alert.description && (_jsx("div", { className: "rcm-alert-item-description", children: alert.description }))] })] }), _jsx("button", { onClick: (e) => {
                    e.stopPropagation();
                    onClose(alert.key);
                }, className: "rcm-alert-item-close", "aria-label": "\uBA54\uC2DC\uC9C0 \uB2EB\uAE30", children: _jsx(IconX, { className: "rcm-alert-item-close-icon" }) })] }));
});
//# sourceMappingURL=AlertItem.js.map