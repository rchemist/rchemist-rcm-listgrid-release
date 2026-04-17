/**
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { ListableFormField } from '../../fields/abstract';
interface ViewListGridSkeletonProps {
    /** 표시할 스켈레톤 행 수 (pageSize 기반) */
    pageSize?: number;
    /** 컬럼 필드 정보 */
    fields?: ListableFormField<any>[];
    /** SubCollection 모드 여부 */
    isSubCollection?: boolean;
    /** 체크박스 컬럼 표시 여부 */
    showCheckbox?: boolean;
    /** 팝업 모드 여부 */
    isPopup?: boolean;
}
/**
 * ViewListGrid용 스켈레톤 컴포넌트
 *
 * pageSize와 컬럼 정보를 기반으로 실제 테이블 레이아웃과 동일한 스켈레톤을 생성합니다.
 */
export declare const ViewListGridSkeleton: ({ pageSize, fields, isSubCollection, showCheckbox, isPopup, }: ViewListGridSkeletonProps) => import("react/jsx-runtime").JSX.Element;
export default ViewListGridSkeleton;
//# sourceMappingURL=ViewListGridSkeleton.d.ts.map