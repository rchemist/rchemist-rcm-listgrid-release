/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import { SelectBox } from "../../../ui";
import { RadioChip } from "../../../ui";
import { RadioInput } from "../../../ui";
const CACHE_TTL = 5 * 60 * 1000; // 5분
const optionsCache = new Map();
export function getCachedOptions(cacheKey) {
    const entry = optionsCache.get(cacheKey);
    if (!entry)
        return null;
    if (Date.now() - entry.timestamp > CACHE_TTL) {
        optionsCache.delete(cacheKey);
        return null;
    }
    return entry.data;
}
export function setCachedOptions(cacheKey, data) {
    optionsCache.set(cacheKey, {
        data,
        timestamp: Date.now(),
    });
}
export function invalidateDynamicSelectCache(keyPattern) {
    if (keyPattern) {
        for (const key of optionsCache.keys()) {
            if (key.includes(keyPattern)) {
                optionsCache.delete(key);
            }
        }
    }
    else {
        optionsCache.clear();
    }
}
export const DynamicSelectFieldView = ({ fieldName, entityForm, loadOptions, staticOptions, renderType = 'select', combo, cacheKey, value, onChange, readonly, required, placeHolder, }) => {
    const [options, setOptions] = useState(staticOptions ?? []);
    const [loading, setLoading] = useState(!staticOptions);
    const [mounted, setMounted] = useState(false);
    const entityFormRef = useRef(entityForm);
    entityFormRef.current = entityForm;
    const loadedRef = useRef(false);
    // 캐시 키 생성
    const effectiveCacheKey = useMemo(() => {
        return cacheKey ?? `dynamic_select_${fieldName}`;
    }, [cacheKey, fieldName]);
    // 옵션 로드
    useEffect(() => {
        if (loadedRef.current && options.length > 0) {
            return;
        }
        if (staticOptions && staticOptions.length > 0) {
            setOptions(staticOptions);
            setLoading(false);
            setMounted(true);
            loadedRef.current = true;
            return;
        }
        let cancelled = false;
        (async () => {
            try {
                // 캐시 확인
                const cached = getCachedOptions(effectiveCacheKey);
                if (cached) {
                    setOptions(cached);
                    setLoading(false);
                    setMounted(true);
                    loadedRef.current = true;
                    return;
                }
                // 옵션 로드
                setLoading(true);
                const loadedOptions = await loadOptions(entityFormRef.current);
                if (!cancelled) {
                    setOptions(loadedOptions);
                    setCachedOptions(effectiveCacheKey, loadedOptions);
                    loadedRef.current = true;
                }
            }
            catch (e) {
                console.error(`[DynamicSelectFieldView:${fieldName}] Failed to load options:`, e);
                if (!cancelled)
                    setOptions([]);
            }
            finally {
                if (!cancelled) {
                    setLoading(false);
                    setMounted(true);
                }
            }
        })();
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [effectiveCacheKey, fieldName]);
    if (loading || !mounted) {
        return (_jsxs("div", { className: "rcm-select-loading", children: [_jsxs("svg", { className: "rcm-select-loading-spinner", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "rcm-spinner-track", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "rcm-spinner-head", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), _jsx("span", { className: "rcm-select-loading-text", children: "\uBD88\uB7EC\uC624\uB294 \uC911..." })] }));
    }
    const commonProps = {
        name: fieldName,
        value,
        onChange,
        readonly,
        required,
        placeHolder,
    };
    switch (renderType) {
        case 'chip':
            return (_jsx(RadioChip, { options: options, combo: combo ?? { direction: 'row' }, ...commonProps }));
        case 'radio':
            return (_jsx(RadioInput, { options: options, combo: combo, ...commonProps }));
        case 'select':
        default:
            return (_jsx(SelectBox, { options: options, ...commonProps }));
    }
};
export default DynamicSelectFieldView;
//# sourceMappingURL=DynamicSelectFieldView.js.map