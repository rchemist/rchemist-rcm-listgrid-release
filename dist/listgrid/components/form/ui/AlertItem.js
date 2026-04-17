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
    return (_jsxs("div", { className: `${styles.bg} ${isClickable ? `hover:${styles.hoverBg} cursor-pointer transition-colors` : ''} ${styles.text} p-4 rounded-lg border border-current/20 flex items-start justify-between gap-3`, onClick: hasLink && alert.link?.type !== 'external' ? () => onLinkClick(alert.link) : undefined, children: [_jsxs("div", { className: "flex items-start gap-3 flex-1", children: [_jsx(IconComponent, { className: "h-5 w-5 mt-0.5 flex-shrink-0" }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "font-medium", children: [typeof alert.message === 'string' ? t(alert.message) : alert.message, alert.link && alert.link.type === 'external' && (_jsx("a", { href: alert.link.value, target: alert.link.target || '_blank', rel: "noopener noreferrer", className: "ml-2 inline-flex items-center gap-1 hover:underline", onClick: (e) => e.stopPropagation(), children: _jsx(IconExternalLink, { className: "h-3 w-3" }) }))] }), alert.description && (_jsx("div", { className: "mt-1 text-sm", children: alert.description }))] })] }), _jsx("button", { onClick: (e) => {
                    e.stopPropagation();
                    onClose(alert.key);
                }, className: `${styles.text} hover:opacity-70 transition-opacity flex-shrink-0`, "aria-label": "\uBA54\uC2DC\uC9C0 \uB2EB\uAE30", children: _jsx(IconX, { className: "h-4 w-4" }) })] }));
});
//# sourceMappingURL=AlertItem.js.map