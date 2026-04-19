/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useMemo } from 'react';
import { cn as cnUtil } from '../../../utils/cn';
import { defaultEntityFormTheme } from '../themes/defaultTheme';
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
                typeof baseValue === 'object' &&
                typeof overrideValue === 'object' &&
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
 * EntityForm 테마 컨텍스트
 * ViewEntityForm과 하위 컴포넌트에서 스타일을 커스터마이징하는데 사용
 */
const EntityFormThemeContext = createContext({
    classNames: defaultEntityFormTheme,
    cn: (base, custom) => (custom ? cnUtil(base, custom) : base),
    getFieldRenderer: () => undefined,
    createStepButtonPosition: 'top',
});
/**
 * EntityForm 테마 Provider
 *
 * 사이트별로 다른 테마를 적용할 때 사용합니다.
 * 기본 테마에 커스텀 테마를 deep merge합니다.
 *
 * @example
 * ```tsx
 * // 사이트 A의 layout.tsx
 * import { EntityFormThemeProvider } from '../../../listgrid-compat';
 *
 * const siteATheme = {
 *   header: { container: 'mt-2 bg-blue-50 rounded-lg p-4' },
 *   title: { text: 'text-2xl font-medium text-blue-800' },
 *   buttons: { save: 'btn bg-blue-600 text-white hover:bg-blue-700' },
 * };
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <EntityFormThemeProvider theme={siteATheme}>
 *       {children}
 *     </EntityFormThemeProvider>
 *   );
 * }
 * ```
 */
export const EntityFormThemeProvider = ({ theme, fieldRenderers, buttonLabels, stepperRenderer, createStepButtonPosition, children, }) => {
    const value = useMemo(() => {
        // 기본 테마와 커스텀 테마를 deep merge
        const mergedClassNames = deepMerge(defaultEntityFormTheme, theme);
        const base = {
            classNames: mergedClassNames,
            cn: (base, custom) => {
                if (!custom)
                    return base;
                return cnUtil(base, custom);
            },
            getFieldRenderer: (fieldName) => {
                return fieldRenderers?.[fieldName];
            },
        };
        if (fieldRenderers !== undefined)
            base.fieldRenderers = fieldRenderers;
        if (buttonLabels !== undefined)
            base.buttonLabels = buttonLabels;
        if (stepperRenderer !== undefined)
            base.stepperRenderer = stepperRenderer;
        if (createStepButtonPosition !== undefined) {
            base.createStepButtonPosition = createStepButtonPosition;
        }
        return base;
    }, [theme, fieldRenderers, buttonLabels, stepperRenderer, createStepButtonPosition]);
    return (_jsx(EntityFormThemeContext.Provider, { value: value, children: children }));
};
/**
 * EntityForm 테마 훅
 *
 * ViewEntityForm의 하위 컴포넌트에서 테마 클래스를 가져올 때 사용합니다.
 *
 * @example
 * ```tsx
 * const { classNames, cn } = useEntityFormTheme();
 *
 * return (
 *   <div className={cn('flex items-center', classNames.header?.container)}>
 *     ...
 *   </div>
 * );
 * ```
 */
export const useEntityFormTheme = () => {
    const context = useContext(EntityFormThemeContext);
    if (!context) {
        // Context가 없으면 기본값 반환 (Provider 없이도 동작)
        return {
            classNames: defaultEntityFormTheme,
            cn: (base, custom) => (custom ? cnUtil(base, custom) : base),
            getFieldRenderer: () => undefined,
            createStepButtonPosition: 'top',
        };
    }
    return context;
};
export { EntityFormThemeContext };
//# sourceMappingURL=EntityFormThemeContext.js.map