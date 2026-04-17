export interface SmsHistoryFieldConstructor {
    new (fieldName: string, order: number, targetFieldName: string): any;
}
export declare function registerSmsHistoryField(ctor: SmsHistoryFieldConstructor): void;
export declare function createSmsHistoryField(fieldName: string, order: number, targetFieldName: string): any | null;
//# sourceMappingURL=FieldExtensions.d.ts.map