import { ViewListGridClassNames } from '../types/ViewListGridTheme.types';
/**
 * ViewListGrid 기본 테마 — 중립(neutral) 버전.
 *
 * 라이브러리가 제공하는 기본 스타일은 `@rcm/listgrid/styles.css`의
 * `rcm-*` scoped 클래스로만 구성됩니다. 호스트의 Tailwind/shadcn/HeroUI
 * 설정과 무관하게 동작하며, 스타일 커스터마이즈는 다음 네 경로로 가능:
 *
 *   1) CSS 변수 override — `:root { --rcm-color-primary: ... }`
 *   2) `@layer rcm-listgrid` 밖에서 `.rcm-button { ... }` 재정의
 *   3) `<ViewListGrid classNames={{...}}>` prop
 *   4) 이 파일을 복사해 자체 theme 객체를 만들고 `ListGridThemeProvider`에 주입
 */
export declare const defaultListGridTheme: ViewListGridClassNames;
//# sourceMappingURL=defaultListGridTheme.d.ts.map