import React from "react";
import { TabIndexable } from './types/ViewEntityForm.types';
import { EntityForm } from '../../config/EntityForm';
/**
 * ViewTab component
 * - Renders a single tab button for EntityForm's tab navigation.
 * - Handles tab selection, description tooltip, and dynamic field group visibility.
 *
 * ViewTab 컴포넌트
 * - EntityForm의 탭 네비게이션에서 단일 탭 버튼을 렌더링합니다.
 * - 탭 선택, 설명 툴팁, 동적 필드 그룹 표시를 처리합니다.
 *
 * @param props {ViewTabProps} - 탭 정보, 인덱스, EntityForm 인스턴스 등
 * @returns {JSX.Element|null} - 렌더링 결과 또는 null
 */
interface ViewTabProps extends TabIndexable {
    id: string;
    label: string;
    description?: string | React.ReactNode;
    entityForm: EntityForm;
    createStepFields?: string[];
}
export declare const ViewTab: ({ id, tabIndex, label, setTabIndex, entityForm, createStepFields, ...props }: ViewTabProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ViewTab.d.ts.map