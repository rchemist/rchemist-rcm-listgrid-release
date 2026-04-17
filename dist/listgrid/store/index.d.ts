export interface ModalOptions {
    modalId?: string;
    title?: any;
    size?: any;
    fullHeight?: boolean;
    maxHeight?: string;
    content?: any;
    onClose?: () => void;
    [key: string]: any;
}
interface ModalManagerState {
    openModals: ModalOptions[];
    openModal: (options: ModalOptions) => string;
    closeModal: (modalId?: string, ...rest: any[]) => void;
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