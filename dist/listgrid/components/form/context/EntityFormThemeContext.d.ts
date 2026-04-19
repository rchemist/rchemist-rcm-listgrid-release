import React from 'react';
import { EntityFormThemeContextValue, EntityFormThemeProviderProps } from '../types/ViewEntityFormTheme.types';
/**
 * EntityForm 테마 컨텍스트
 * ViewEntityForm과 하위 컴포넌트에서 스타일을 커스터마이징하는데 사용
 */
declare const EntityFormThemeContext: React.Context<EntityFormThemeContextValue>;
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
export declare const EntityFormThemeProvider: React.FC<EntityFormThemeProviderProps>;
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
export declare const useEntityFormTheme: () => EntityFormThemeContextValue;
export { EntityFormThemeContext };
//# sourceMappingURL=EntityFormThemeContext.d.ts.map