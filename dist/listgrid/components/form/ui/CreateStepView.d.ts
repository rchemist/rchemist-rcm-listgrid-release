import React from 'react';
import { EntityForm } from '../../../config/EntityForm';
import { Session } from '../../../auth/types';
/**
 * Validate current step fields and determine if step can advance
 */
export declare function validateAndAdvanceStep(entityForm: EntityForm, currentStep: number, session?: Session): Promise<{
    canAdvance: boolean;
    updatedForm: EntityForm;
}>;
/**
 * CreateStepView 컴포넌트
 * - 다단계 입력/스텝 UI를 렌더링합니다.
 * - 단계 전환, 유효성 검사, 저장 버튼, stepper 표시/숨김 토글 등 포함
 *
 * @param props.currentStep - 현재 단계 인덱스
 * @param props.setCurrentStep - 단계 setter
 * @param props.maxStep - 최대 단계 수
 * @param props.entityForm - EntityForm 인스턴스
 * @param props.setEntityForm - EntityForm setter
 * @param props.onClickSaveButton - 저장 버튼 클릭 핸들러
 * @param props.showStepper - stepper 표시 여부
 * @param props.setShowStepper - stepper 표시 토글 setter
 * @param props.session - 세션 정보
 * @param props.buttonPosition - 버튼 위치 ('top' | 'bottom')
 */
export interface CreateStepViewProps {
    currentStep: number;
    setCurrentStep: (step: number) => void;
    maxStep: number;
    entityForm: EntityForm;
    setEntityForm: React.Dispatch<React.SetStateAction<EntityForm | undefined>>;
    onClickSaveButton: () => void;
    showStepper: boolean;
    setShowStepper: (show: boolean) => void;
    session?: Session;
    buttonPosition?: 'top' | 'bottom';
}
export declare const CreateStepView: React.NamedExoticComponent<CreateStepViewProps>;
//# sourceMappingURL=CreateStepView.d.ts.map