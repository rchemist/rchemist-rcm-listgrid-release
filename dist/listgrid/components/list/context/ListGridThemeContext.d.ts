import React from "react";
import { ViewListGridClassNames, ListGridThemeVariant, ListGridThemeContextValue } from "../types/ViewListGridTheme.types";
/**
 * ListGrid 테마 컨텍스트
 * ViewListGrid과 하위 컴포넌트에서 스타일을 커스터마이징하는데 사용
 */
declare const ListGridThemeContext: React.Context<ListGridThemeContextValue>;
/**
 * ListGrid 테마 Provider Props
 */
export interface ListGridThemeProviderProps {
    /** 커스텀 테마 (기본 테마에 병합됨) */
    theme?: Partial<ViewListGridClassNames>;
    /** 테마 변형 (default, main, subCollection, modal) */
    variant?: ListGridThemeVariant;
    /** 자식 컴포넌트 */
    children: React.ReactNode;
}
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
export declare const ListGridThemeProvider: React.FC<ListGridThemeProviderProps>;
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
export declare const useListGridTheme: () => ListGridThemeContextValue;
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
export declare const getListGridThemeByVariant: (variant: ListGridThemeVariant) => ViewListGridClassNames;
export { ListGridThemeContext };
//# sourceMappingURL=ListGridThemeContext.d.ts.map