import type { ReactNode } from 'react';
export interface ModalOptions {
    modalId?: string;
    title?: ReactNode;
    size?: string;
    fullHeight?: boolean;
    maxHeight?: string;
    content?: ReactNode;
    onClose?: () => void;
    [key: string]: unknown;
}
interface ModalManagerState {
    openModals: ModalOptions[];
    openModal: (options: ModalOptions) => string;
    closeModal: (modalId?: string, ...rest: unknown[]) => void;
    closeTopModal: () => Promise<void>;
    findModal: (modalId: string) => ModalOptions | undefined;
    updateModalData: (modalId: string, data: Partial<ModalOptions>) => void;
}
export declare const useModalManagerStore: import("zustand").UseBoundStore<import("zustand").StoreApi<ModalManagerState>>;
export declare function configureOverlayZIndex(base: number): void;
export declare function getOverlayZIndex(offset?: number): number;
export declare const POPOVER_Z_INDEX = 50;
export {};
//# sourceMappingURL=index.d.ts.map