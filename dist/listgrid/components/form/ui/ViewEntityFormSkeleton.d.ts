/**
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { EntityForm } from '../../../config/EntityForm';
interface ViewEntityFormSkeletonProps {
    entityForm?: EntityForm;
    /** 인라인 모드 여부 */
    inlineMode?: boolean;
    /** SubCollection 모드 여부 */
    subCollectionEntity?: boolean;
}
/**
 * EntityForm 구조 기반 스켈레톤 컴포넌트
 *
 * EntityForm의 Tab, FieldGroup, Field 메타데이터를 분석하여
 * 실제 레이아웃과 동일한 스켈레톤을 생성합니다.
 */
export declare const ViewEntityFormSkeleton: ({ entityForm, inlineMode, subCollectionEntity, }: ViewEntityFormSkeletonProps) => import("react/jsx-runtime").JSX.Element;
export default ViewEntityFormSkeleton;
//# sourceMappingURL=ViewEntityFormSkeleton.d.ts.map