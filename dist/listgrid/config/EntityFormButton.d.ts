import { EntityForm } from '../config/EntityForm';
import { ReactNode } from "react";
import { LabelType } from '../config/Config';
import { ModalOptions } from '../store';
export interface EntityFormButtonStepInfo {
    useCreateStep: boolean;
    currentStep: number;
    maxStep: number;
    createStepFields: string[];
}
export interface EntityFormButtonProps {
    entityForm: EntityForm;
    router: any;
    pathname: any;
    setErrors: (errors: string[]) => void;
    setNotifications: (notifications: string[]) => void;
    step?: EntityFormButtonStepInfo;
    showModal?: (options: ModalOptions) => string;
    closeModal?: (id: string) => Promise<void>;
    closeTopModal?: () => Promise<void>;
    getModalData?: (id: string) => any;
    updateModalData?: (id: string, data: any) => void;
}
/**
 * ReactNode 버튼을 위한 래퍼 타입
 * ID를 가진 ReactNode로 중복 방지 가능
 */
export interface EntityFormReactNodeButton {
    id: string;
    button: ReactNode;
}
/**
 * EntityForm에서 사용할 수 있는 버튼 타입
 */
export type EntityFormButtonType = EntityFormButton | EntityFormReactNodeButton;
export declare class EntityFormButton {
    readonly id: string;
    icon?: ReactNode;
    label?: LabelType;
    className?: string;
    onClick?: (props: EntityFormButtonProps) => Promise<EntityForm>;
    disabled?: (props: EntityFormButtonProps) => Promise<boolean>;
    hidden?: (props: EntityFormButtonProps) => Promise<boolean>;
    tooltip?: (props: EntityFormButtonProps) => Promise<ReactNode>;
    constructor(id: string);
    getId(): string;
    isOverwrite(id: string): boolean;
    withIcon(icon?: ReactNode): this;
    withLabel(label?: ReactNode): this;
    withClassName(className?: string): this;
    withOnClick(onClick?: (props: EntityFormButtonProps) => Promise<EntityForm>): this;
    withDisabled(disabled?: (props: EntityFormButtonProps) => Promise<boolean>): this;
    withHidden(hidden?: (props: EntityFormButtonProps) => Promise<boolean>): this;
    withTooltip(tooltip?: (props: EntityFormButtonProps) => Promise<ReactNode>): this;
}
//# sourceMappingURL=EntityFormButton.d.ts.map