import React from 'react';
import { EntityForm } from '../../../config/EntityForm';
import { FieldError } from '../../../config/EntityFormTypes';
import { EntityTab } from '../../../config/EntityTab';
/**
 * ViewEntityFormErrors 컴포넌트
 * - EntityForm의 에러 및 알림 메시지 영역만 렌더링합니다.
 *
 * @param props.errors - 에러 메시지 배열
 * @param props.entityErrorMap - 필드별 에러 맵 (Map<string, FieldError[]>)
 * @param props.notifications - 알림 메시지 배열
 * @param props.onTabChange - 탭 변경 콜백 함수
 * @param props.tabs - 탭 정보 배열
 * @param props.entityForm - EntityForm 인스턴스
 */
interface ViewEntityFormErrorsProps {
    errors: string[];
    entityErrorMap: Map<string, FieldError[]>;
    notifications: string[];
    onTabChange?: (tabIndex: number) => void;
    tabs?: EntityTab[];
    entityForm?: EntityForm;
}
export declare const ViewEntityFormErrors: React.NamedExoticComponent<ViewEntityFormErrorsProps>;
export {};
//# sourceMappingURL=ViewEntityFormErrors.d.ts.map