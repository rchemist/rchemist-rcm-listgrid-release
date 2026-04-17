import React, { ReactNode } from "react";
/**
 * ViewEntityFormTitle 컴포넌트
 * - EntityForm의 제목 영역만 렌더링합니다.
 * - 20자 이상이면 Tooltip으로 감싸서 표시합니다.
 *
 * @param props.title - 제목(ReactNode)
 * @param props.hideTitle - 제목 숨김 여부
 */
interface ViewEntityFormTitleProps {
    title: ReactNode;
    hideTitle?: boolean;
}
export declare const ViewEntityFormTitle: React.NamedExoticComponent<ViewEntityFormTitleProps>;
export {};
//# sourceMappingURL=ViewEntityFormTitle.d.ts.map