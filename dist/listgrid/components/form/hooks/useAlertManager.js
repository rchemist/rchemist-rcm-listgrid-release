'use client';
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { useCallback, useEffect, useState } from 'react';
import { useModalManagerStore } from '../../../store';
import { IconAlertTriangle, IconCheck, IconInfoCircle } from '@tabler/icons-react';
export const useAlertManager = (alertMessages, onRemove, onTabChange, onFieldFocus) => {
    const { openModal } = useModalManagerStore();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [closedAlerts, setClosedAlerts] = useState(new Set());
    // alertMessages가 변경되면 닫힌 알림 초기화
    useEffect(() => {
        setClosedAlerts(new Set());
    }, [alertMessages.length]);
    // 닫히지 않은 알림들
    const visibleAlerts = alertMessages.filter(alert => !closedAlerts.has(alert.key));
    const handleLinkClick = useCallback((link) => {
        const linkType = link.type || 'tab';
        switch (linkType) {
            case 'tab':
                if (typeof link.value === 'string' && onTabChange) {
                    onTabChange(link.value);
                }
                break;
            case 'field':
                if (typeof link.value === 'string' && onFieldFocus) {
                    onFieldFocus(link.value);
                }
                break;
            case 'external':
                if (typeof link.value === 'string') {
                    window.open(link.value, link.target || '_blank');
                }
                break;
            case 'modal':
                if (typeof link.value === 'object' && link.value !== null) {
                    openModal(link.value);
                }
                break;
        }
    }, [onTabChange, onFieldFocus, openModal]);
    const handleCloseAlert = useCallback((key) => {
        setClosedAlerts(prev => new Set(prev).add(key));
        if (onRemove) {
            onRemove(key);
        }
    }, [onRemove]);
    const toggleCollapse = useCallback(() => {
        setIsCollapsed(prev => !prev);
    }, []);
    // 주요 알림 색상 결정 (우선순위 기반)
    const getDominantColor = useCallback(() => {
        const hasColor = (color) => visibleAlerts.some(alert => alert.color === color);
        // 우선순위: danger > warning > success > info
        if (hasColor('danger'))
            return 'danger';
        if (hasColor('warning'))
            return 'warning';
        if (hasColor('success'))
            return 'success';
        return 'info';
    }, [visibleAlerts]);
    return {
        visibleAlerts,
        isCollapsed,
        handleLinkClick,
        handleCloseAlert,
        toggleCollapse,
        getDominantColor
    };
};
// 알림 스타일 가져오기 — rcm-notice 변형으로 통일
export const getAlertStyles = (color) => {
    switch (color) {
        case 'success':
            return { bg: 'rcm-notice rcm-notice-success', hoverBg: '', text: '', icon: IconCheck };
        case 'danger':
            return { bg: 'rcm-notice rcm-notice-error', hoverBg: '', text: '', icon: IconAlertTriangle };
        case 'warning':
            return { bg: 'rcm-notice rcm-notice-warning', hoverBg: '', text: '', icon: IconAlertTriangle };
        case 'info':
            return { bg: 'rcm-notice rcm-notice-info', hoverBg: '', text: '', icon: IconInfoCircle };
        case 'secondary':
        case 'primary':
        case 'dark':
            return { bg: 'rcm-notice', hoverBg: '', text: '', icon: IconInfoCircle };
        default:
            return { bg: 'rcm-notice rcm-notice-info', hoverBg: '', text: '', icon: IconInfoCircle };
    }
};
// 색상별 인디케이터 스타일 (알림 요약 헤더의 점)
export const getColorIndicator = (color) => {
    switch (color) {
        case 'danger':
            return 'rcm-alerts-indicator-error';
        case 'warning':
            return 'rcm-alerts-indicator-warning';
        case 'success':
            return 'rcm-alerts-indicator-success';
        default:
            return 'rcm-alerts-indicator-info';
    }
};
//# sourceMappingURL=useAlertManager.js.map