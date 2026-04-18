import type React from 'react';
export interface MessageServices {
    showAlert(options: unknown): Promise<unknown>;
    showConfirm(options: unknown): Promise<boolean>;
    showSuccess(options: unknown): Promise<unknown> | unknown;
    showToast(options: unknown): unknown;
    showError(message: unknown): unknown;
    openToast(options: unknown): unknown;
    clearAllToasts(): unknown;
}
export declare function configureMessages(services: Partial<MessageServices>): void;
export declare function showAlert(options: unknown): Promise<unknown>;
export declare function showConfirm(options: unknown): Promise<boolean>;
export declare function showSuccess(options: unknown): unknown;
export declare function showToast(options: unknown): unknown;
export declare function showError(message: unknown): unknown;
export declare function openToast(options: unknown): unknown;
export declare function clearAllToasts(): unknown;
export declare const ShowError: React.FC<Record<string, unknown>>;
//# sourceMappingURL=MessageProvider.d.ts.map