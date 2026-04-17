'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright (c) "2025". gjcu.ac.kr by GJCU
 * Licensed under the GJCU Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by GJCU
 */
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { getTranslation } from '../../../utils/i18n';
/**
 * Memoized filter field component for performance optimization
 * Only re-renders when props actually change
 */
const MemoizedFilterFieldInner = ({ entityForm, field, fieldName, value, onChange, isCompact = false, }) => {
    const [filterView, setFilterView] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const mountedRef = useRef(true);
    const { t } = getTranslation();
    // Memoized change handler to prevent unnecessary re-renders
    const handleChange = useCallback((newValue, op) => {
        onChange(fieldName, newValue, op);
    }, [fieldName, onChange]);
    // Load filter view only once on mount
    useEffect(() => {
        mountedRef.current = true;
        const loadFilterView = async () => {
            if (!field.isFilterable()) {
                setIsLoading(false);
                return;
            }
            try {
                const view = await field.viewListFilter({
                    entityForm,
                    onChange: handleChange,
                    value,
                });
                if (mountedRef.current) {
                    setFilterView(view);
                    setIsLoading(false);
                }
            }
            catch (error) {
                console.error('Failed to load filter view:', error);
                if (mountedRef.current) {
                    setIsLoading(false);
                }
            }
        };
        loadFilterView();
        return () => {
            mountedRef.current = false;
        };
    }, [field, entityForm, handleChange, value]);
    if (isLoading) {
        return (_jsx("div", { className: `animate-pulse ${isCompact ? 'h-8' : 'h-10'} bg-gray-100 rounded` }));
    }
    if (!filterView) {
        return null;
    }
    return (_jsxs("div", { className: isCompact ? 'space-y-1' : 'space-y-2', children: [_jsx("label", { htmlFor: fieldName, className: `flex items-center text-gray-700 font-medium ${isCompact ? 'text-xs' : 'text-sm'}`, children: field.viewLabel(t) }), _jsx("div", { className: isCompact ? 'filter-field-compact' : '', children: filterView })] }));
};
// Memoize the component to prevent unnecessary re-renders
export const MemoizedFilterField = memo(MemoizedFilterFieldInner, (prevProps, nextProps) => {
    // Custom comparison: only re-render if these props change
    return (prevProps.fieldName === nextProps.fieldName &&
        prevProps.value === nextProps.value &&
        prevProps.isCompact === nextProps.isCompact &&
        // Reference equality for stable objects
        prevProps.entityForm === nextProps.entityForm &&
        prevProps.field === nextProps.field);
});
MemoizedFilterField.displayName = 'MemoizedFilterField';
//# sourceMappingURL=MemoizedFilterField.js.map