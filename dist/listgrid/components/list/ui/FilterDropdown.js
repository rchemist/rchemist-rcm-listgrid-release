'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Transition } from "@headlessui/react";
import { IconX } from "@tabler/icons-react";
import { getOverlayZIndex } from '../../../store';
export const FilterDropdown = ({ isOpen, onClose, children, onApply, onClear, size = 'sm', placement = 'left', anchorRef, }) => {
    const dropdownRef = useRef(null);
    const [zIndex, setZIndex] = useState(50);
    const [positionStyle, setPositionStyle] = useState({});
    // z-index 동적 계산
    useEffect(() => {
        if (isOpen) {
            setZIndex(getOverlayZIndex());
        }
    }, [isOpen]);
    // 크기별 너비 (px)
    const getDropdownWidth = () => {
        switch (size) {
            case 'sm': return 260;
            case 'md': return 360;
            case 'lg': return 420;
            default: return 260;
        }
    };
    // 크기별 클래스 설정
    const getSizeClass = () => {
        switch (size) {
            case 'sm':
                return 'rcm-filter-dropdown-sm';
            case 'md':
                return 'rcm-filter-dropdown-md';
            case 'lg':
                return 'rcm-filter-dropdown-lg';
            default:
                return 'rcm-filter-dropdown-sm';
        }
    };
    // Portal + fixed positioning based on anchor element
    const updatePosition = useCallback(() => {
        if (!anchorRef?.current)
            return;
        const rect = anchorRef.current.getBoundingClientRect();
        const dropdownWidth = getDropdownWidth();
        const style = {
            position: 'fixed',
            top: rect.bottom + 8,
        };
        if (placement === 'right') {
            style.left = Math.max(0, rect.right - dropdownWidth);
        }
        else {
            style.left = rect.left;
        }
        setPositionStyle(style);
    }, [anchorRef, placement, size]);
    useEffect(() => {
        if (isOpen && anchorRef?.current) {
            updatePosition();
        }
    }, [isOpen, updatePosition]);
    // Recalculate on scroll/resize
    useEffect(() => {
        if (!isOpen || !anchorRef?.current)
            return;
        const handleReposition = () => updatePosition();
        window.addEventListener('scroll', handleReposition, true);
        window.addEventListener('resize', handleReposition);
        return () => {
            window.removeEventListener('scroll', handleReposition, true);
            window.removeEventListener('resize', handleReposition);
        };
    }, [isOpen, updatePosition]);
    // Fallback: inline absolute positioning when no anchorRef
    const getPlacementStyle = () => {
        if (placement === 'right') {
            return { top: '100%', right: 0 };
        }
        return { top: '100%', left: 0 };
    };
    // ESC 키 감지
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);
    const usePortal = !!anchorRef?.current;
    const dropdownContent = (_jsx(Transition, { show: isOpen, as: Fragment, enter: "transition ease-out duration-100", enterFrom: "transform opacity-0 scale-95", enterTo: "transform opacity-100 scale-100", leave: "transition ease-in duration-75", leaveFrom: "transform opacity-100 scale-100", leaveTo: "transform opacity-0 scale-95", children: _jsx("div", { ref: dropdownRef, className: `rcm-filter-dropdown ${usePortal ? '' : 'rcm-filter-dropdown-floating'} ${getSizeClass()}`, style: usePortal ? { ...positionStyle, zIndex } : { ...getPlacementStyle(), zIndex }, children: _jsxs("div", { className: "rcm-filter-dropdown-inner", children: [_jsxs("div", { className: "rcm-filter-dropdown-header", children: [_jsx("span", { className: "rcm-filter-dropdown-title", children: "\uD544\uD130" }), _jsx("button", { type: "button", onClick: onClose, className: "rcm-filter-dropdown-close", "aria-label": "\uB2EB\uAE30", children: _jsx(IconX, { className: "rcm-m2o-action-icon" }) })] }), _jsx("div", { className: "rcm-filter-dropdown-body", children: children }), _jsxs("div", { className: "rcm-filter-dropdown-footer", children: [onClear && (_jsx("button", { type: "button", className: "rcm-button", "data-variant": "outline", "data-color": "error", "data-size": "sm", onClick: onClear, children: "\uCD08\uAE30\uD654" })), onApply && (_jsx("button", { type: "button", className: "rcm-button", "data-variant": "primary", "data-size": "sm", onClick: onApply, children: "\uC801\uC6A9" }))] })] }) }) }));
    if (usePortal) {
        return ReactDOM.createPortal(dropdownContent, document.body);
    }
    return dropdownContent;
};
//# sourceMappingURL=FilterDropdown.js.map