import React, { Dispatch, SetStateAction } from "react";
import { EntityTab } from '../../../config/EntityTab';
import { EntityForm } from '../../../config/EntityForm';
import { Session } from '../../../auth/types';
/**
 * ViewEntityFormFields 컴포넌트
 * - EntityForm의 필드(Tab/Panel) 영역만 렌더링합니다.
 * - Tab.Group, Tab.List, Tab.Panels 구조를 그대로 사용합니다.
 *
 * @param props.tabs - 탭 목록
 * @param props.tabIndex - 현재 탭 인덱스
 * @param props.setTabIndex - 탭 인덱스 setter
 * @param props.entityForm - EntityForm 인스턴스
 * @param props.setEntityForm - EntityForm 상태 setter (useState와 동일)
 * @param props.readonly - 읽기 전용 여부
 * @param props.subCollectionEntity - 서브 콜렉션 여부
 * @param props.session - 세션 정보
 * @param props.createStepFields - 생성 단계 필드명 배열
 * @param props.cacheKey - 캐시 키(리렌더링 트리거)
 * @param props.selectedTabIndex - 선택된 탭 인덱스(숫자)
 * @param props.setSelectedTabIndex - 선택 탭 setter
 */
interface ViewEntityFormFieldsProps {
    tabs: EntityTab[];
    tabIndex: string;
    setTabIndex: (tabIndex: string) => void;
    entityForm: EntityForm;
    setEntityForm: Dispatch<SetStateAction<EntityForm | undefined>>;
    readonly: boolean;
    subCollectionEntity: boolean;
    session: Session;
    createStepFields: string[];
    cacheKey: string;
    selectedTabIndex: number;
    setSelectedTabIndex: (idx: number) => void;
}
export declare const ViewEntityFormFields: React.NamedExoticComponent<ViewEntityFormFieldsProps>;
export {};
//# sourceMappingURL=ViewEntityFormFields.d.ts.map