import { ReactNode } from "react";
import { ModalOptions } from '../../../store';
import { EntityForm } from '../../../config/EntityForm';
import { EntityTab } from '../../../config/EntityTab';
import { RenderType } from '../../../config/Config';
import { Session } from '../../../auth/types';
import { ViewEntityFormProps } from "../types/ViewEntityForm.types";
/**
 * useEntityFormLogic 훅
 * - ViewEntityForm의 모든 상태/핸들러/로직을 관리하는 커스텀 훅
 * - 렌더링에 필요한 모든 값/함수만 반환
 *
 * @param props ViewEntityFormProps
 */
export declare function useEntityFormLogic(props: ViewEntityFormProps): {
    entityForm: EntityForm | undefined;
    setEntityForm: import("react").Dispatch<import("react").SetStateAction<EntityForm | undefined>>;
    tabIndex: string | undefined;
    setTabIndex: import("react").Dispatch<import("react").SetStateAction<string | undefined>>;
    cacheKey: string | undefined;
    setCacheKey: import("react").Dispatch<import("react").SetStateAction<string | undefined>>;
    loadingError: boolean;
    initialized: boolean;
    errors: string[];
    setErrors: import("react").Dispatch<import("react").SetStateAction<string[]>>;
    notifications: string[];
    setNotifications: import("react").Dispatch<import("react").SetStateAction<string[]>>;
    title: ReactNode;
    setTitle: import("react").Dispatch<import("react").SetStateAction<ReactNode>>;
    renderType: RenderType | undefined;
    setRenderType: import("react").Dispatch<import("react").SetStateAction<RenderType | undefined>>;
    selectedTabIndex: number;
    setSelectedTabIndex: import("react").Dispatch<import("react").SetStateAction<number>>;
    currentStep: number;
    setCurrentStep: (stepNumber: number) => void;
    showStepper: boolean;
    setShowStepper: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    tabs: EntityTab[];
    setTabs: import("react").Dispatch<import("react").SetStateAction<EntityTab[]>>;
    isSubCollectionEntity: boolean;
    isInlineMode: boolean;
    readonly: boolean;
    popupMode: boolean;
    session: Session | null;
    useCreateStep: boolean;
    maxStep: number;
    createStepFields: string[];
    buttons: ReactNode[];
    headerAreaContent: ReactNode;
    postSave: (entityForm: EntityForm) => Promise<EntityForm>;
    postDelete: (entityForm: EntityForm) => Promise<void>;
    updateTitle: (form?: EntityForm) => Promise<void>;
    onClickSaveButton: () => Promise<void>;
    showModal: (options: ModalOptions) => string;
    closeModal: (id: string) => Promise<void>;
    closeTopModal: () => Promise<void>;
    getModalData: (id: string) => any;
    updateModalData: (id: string, data: any) => void;
    resetEntityForm: (delay?: number, preserveState?: boolean) => Promise<void>;
    triggerAutoSave: () => void;
    clearAutoSave: () => void;
    saveAutoSaveNow: () => Promise<void>;
};
//# sourceMappingURL=useEntityFormLogic.d.ts.map