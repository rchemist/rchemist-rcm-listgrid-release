/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useMemo } from "react";
import { cn as cnUtil } from "../../../utils/cn";
import { defaultListGridTheme } from "../themes/defaultListGridTheme";
import { mainListGridTheme } from "../themes/variants/mainTheme";
import { subCollectionListGridTheme } from "../themes/variants/subCollectionTheme";
import { modalListGridTheme } from "../themes/variants/modalTheme";
/**
 * 두 객체를 깊게 병합하는 유틸리티
 * 커스텀 테마가 기본 테마를 오버라이드
 */
const deepMerge = (base, override) => {
    if (!override)
        return base;
    const result = { ...base };
    for (const key in override) {
        if (Object.prototype.hasOwnProperty.call(override, key)) {
            const baseValue = base[key];
            const overrideValue = override[key];
            if (baseValue &&
                overrideValue &&
                typeof baseValue === "object" &&
                typeof overrideValue === "object" &&
                !Array.isArray(baseValue) &&
                !Array.isArray(overrideValue)) {
                // 중첩 객체 병합
                result[key] = deepMerge(baseValue, overrideValue);
            }
            else if (overrideValue !== undefined) {
                // 값 오버라이드
                result[key] = overrideValue;
            }
        }
    }
    return result;
};
/**
 * Variant에 따른 프리셋 테마 가져오기
 */
const getVariantTheme = (variant) => {
    switch (variant) {
        case "main":
            return mainListGridTheme;
        case "subCollection":
            return subCollectionListGridTheme;
        case "modal":
        case "popup":
            return modalListGridTheme;
        default:
            return undefined;
    }
};
/**
 * ListGrid 테마 컨텍스트
 * ViewListGrid과 하위 컴포넌트에서 스타일을 커스터마이징하는데 사용
 */
const ListGridThemeContext = createContext({
    classNames: defaultListGridTheme,
    cn: (base, custom) => (custom ? cnUtil(base, custom) : base),
    variant: "default",
});
/**
 * ListGrid 테마 Provider
 *
 * ListGrid에 테마를 적용할 때 사용합니다.
 * variant를 지정하면 해당 프리셋 테마가 자동으로 적용됩니다.
 *
 * @example
 * ```tsx
 * // 서브콜렉션에서 사용
 * <ListGridThemeProvider variant="subCollection">
 *   <ViewListGrid {...props} />
 * </ListGridThemeProvider>
 *
 * // 커스텀 테마 적용
 * const customTheme = {
 *   panel: { container: 'mt-8 border-2 rounded-2xl' },
 * };
 * <ListGridThemeProvider theme={customTheme}>
 *   <ViewListGrid {...props} />
 * </ListGridThemeProvider>
 * ```
 */
export const ListGridThemeProvider = ({ theme, variant = "default", children, }) => {
    const value = useMemo(() => {
        // 1. 기본 테마
        let mergedClassNames = { ...defaultListGridTheme };
        // 2. Variant 프리셋 적용
        const variantTheme = getVariantTheme(variant);
        if (variantTheme) {
            mergedClassNames = deepMerge(mergedClassNames, variantTheme);
        }
        // 3. 커스텀 테마 적용 (최우선)
        if (theme) {
            mergedClassNames = deepMerge(mergedClassNames, theme);
        }
        return {
            classNames: mergedClassNames,
            cn: (base, custom) => {
                if (!custom)
                    return base;
                return cnUtil(base, custom);
            },
            variant,
        };
    }, [theme, variant]);
    return (_jsx(ListGridThemeContext.Provider, { value: value, children: children }));
};
/**
 * ListGrid 테마 훅
 *
 * ViewListGrid의 하위 컴포넌트에서 테마 클래스를 가져올 때 사용합니다.
 *
 * @example
 * ```tsx
 * const { classNames, cn, variant } = useListGridTheme();
 *
 * return (
 *   <div className={cn('flex items-center', classNames.header?.container)}>
 *     ...
 *   </div>
 * );
 * ```
 */
export const useListGridTheme = () => {
    const context = useContext(ListGridThemeContext);
    if (!context) {
        // Context가 없으면 기본값 반환 (Provider 없이도 동작)
        return {
            classNames: defaultListGridTheme,
            cn: (base, custom) => (custom ? cnUtil(base, custom) : base),
            variant: "default",
        };
    }
    return context;
};
/**
 * 특정 variant의 테마 클래스를 직접 가져오는 유틸리티
 *
 * Provider 없이 특정 variant의 테마를 사용하고 싶을 때 활용합니다.
 *
 * @example
 * ```tsx
 * const subCollectionTheme = getListGridThemeByVariant('subCollection');
 * ```
 */
export const getListGridThemeByVariant = (variant) => {
    let mergedClassNames = { ...defaultListGridTheme };
    const variantTheme = getVariantTheme(variant);
    if (variantTheme) {
        mergedClassNames = deepMerge(mergedClassNames, variantTheme);
    }
    return mergedClassNames;
};
export { ListGridThemeContext };
//# sourceMappingURL=ListGridThemeContext.js.map