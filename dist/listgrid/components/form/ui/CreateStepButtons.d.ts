import React from 'react';
import { EntityForm } from '../../../config/EntityForm';
import { Session } from '../../../auth/types';
/**
 * CreateStepButtons 컴포넌트
 * - 단계별 생성 모드에서 하단에 표시되는 이전/다음/저장 버튼
 *
 * @param props.currentStep - 현재 단계 인덱스
 * @param props.maxStep - 최대 단계 수
 * @param props.entityForm - EntityForm 인스턴스
 * @param props.setEntityForm - EntityForm setter
 * @param props.setCurrentStep - 단계 setter
 * @param props.onClickSaveButton - 저장 버튼 클릭 핸들러
 * @param props.session - 세션 정보
 */
export interface CreateStepButtonsProps {
    currentStep: number;
    maxStep: number;
    entityForm: EntityForm;
    setEntityForm: React.Dispatch<React.SetStateAction<EntityForm | undefined>>;
    setCurrentStep: (step: number) => void;
    onClickSaveButton: () => void;
    session?: Session;
}
export declare const CreateStepButtons: React.NamedExoticComponent<CreateStepButtonsProps>;
//# sourceMappingURL=CreateStepButtons.d.ts.map