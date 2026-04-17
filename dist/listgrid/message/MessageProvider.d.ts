export interface MessageServices {
    showAlert(options: any): Promise<any>;
    showConfirm(options: any): Promise<boolean>;
    showSuccess(options: any): Promise<any> | any;
    showToast(options: any): any;
    showError(message: any): any;
    openToast(options: any): any;
    clearAllToasts(): any;
}
export declare function configureMessages(services: Partial<MessageServices>): void;
export declare function showAlert(options: any): Promise<any>;
export declare function showConfirm(options: any): Promise<boolean>;
export declare function showSuccess(options: any): any;
export declare function showToast(options: any): any;
export declare function showError(message: any): any;
export declare function openToast(options: any): any;
export declare function clearAllToasts(): any;
export declare const ShowError: any;
//# sourceMappingURL=MessageProvider.d.ts.map