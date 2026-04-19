import { FieldType } from '../config/Config';
import { ReactNode } from 'react';
import { SelectOption } from '../form/Type';
export interface IDataTransferProperty {
    name: string;
    propertyName: string;
    helpText?: string | undefined;
    order?: number | undefined;
    tabId?: string | undefined;
    fieldGroupId?: string | undefined;
}
export declare class DataTransferProperty implements IDataTransferProperty {
    name: string;
    propertyName: string;
    helpText?: string | undefined;
    order?: number | undefined;
    tabId?: string | undefined;
    fieldGroupId?: string | undefined;
    constructor(data: IDataTransferProperty);
    static fromJson(data: IDataTransferProperty): DataTransferProperty;
    static fromJsonArray(data: IDataTransferProperty[]): DataTransferProperty[];
    withHelpText(helpText: string): DataTransferProperty;
    withOrder(order: number): DataTransferProperty;
    withTabId(tabId: string): DataTransferProperty;
    withFieldGroupId(fieldGroupId: string): DataTransferProperty;
    isConfigured(...configuredForms: string[]): boolean;
    static getForm(tabId: string, fieldGroupId: string): string;
}
export interface DataManageType {
    exportable: boolean;
    importable: boolean;
}
export interface IDataTransferConfig {
    type: DataManageType;
    export?: TransferConfig | undefined;
    import?: ImportTransferConfig | undefined;
    refreshView?: boolean | undefined;
    exportFileName?: string | undefined;
}
export declare const DataTransferAll: DataManageType;
export declare const DataTransferNotSupport: DataManageType;
export declare const DataTransferExportOnly: DataManageType;
export declare const DataTransferImportOnly: DataManageType;
export interface DataColumn {
    name: string;
    value: any;
}
export type DataRow = DataColumn[];
export type DataRowSet = DataRow[];
export type SampleDataItem = {
    name: string;
    value: any;
};
export interface ImportTransferConfig extends TransferConfig {
    sampleData?: SampleDataItem[][] | undefined;
    overrideParseResult?: ((formData: DataRowSet, response: unknown) => {
        success: boolean;
        result: DataTransferResult;
        error?: string;
        errorView?: ReactNode;
    }) | undefined;
    mode?: {
        create?: boolean;
        update?: boolean;
    } | undefined;
}
export interface ExportTransferConfig extends TransferConfig {
}
export interface TransferConfig {
    fields?: DataField[] | undefined;
    url?: string | undefined;
    description?: ReactNode | undefined;
    addedFields?: ((row: DataRow) => Promise<DataRow>) | undefined;
    overrideFormData?: ((formData: DataRowSet) => Promise<DataRowSet>) | undefined;
}
export declare class DataTransferConfig implements IDataTransferConfig {
    type: DataManageType;
    export?: ExportTransferConfig | undefined;
    import?: ImportTransferConfig | undefined;
    exportFileName?: string | undefined;
    constructor(data: IDataTransferConfig, url: string);
    isSupportExport(): boolean;
    isSupportImport(): boolean;
    private isImportUpdateEnabled;
    withExportableFields(...exportableFields: DataField[]): DataTransferConfig;
    withImportableFields(...importableFields: DataField[]): DataTransferConfig;
    withExportUrl(exportUrl: string): DataTransferConfig;
    withImportUrl(importUrl: string): DataTransferConfig;
    withExportFileName(exportFileName: string): DataTransferConfig;
    withImportSampleData(importSampleData: SampleDataItem[][]): DataTransferConfig;
    withAddedExportFields(addedFields?: (row: DataRow) => Promise<DataRow>): DataTransferConfig;
    withAddedImportFields(addedFields?: (row: DataRow) => Promise<DataRow>): DataTransferConfig;
    withOverrideExportFormData(overrideFormData?: (formData: DataRowSet) => Promise<DataRowSet>): DataTransferConfig;
    withOverrideImportFormData(overrideFormData?: (formData: DataRowSet) => Promise<DataRowSet>): DataTransferConfig;
    getExportFileName(): string;
    setDataFields(dataFields: DataField[]): void;
    private updateFields;
    private applyIdPolicy;
    withExportDescription(description: ReactNode): DataTransferConfig;
    withImportDescription(description: ReactNode): DataTransferConfig;
    withImportOverrideParseResult(overrideParseResult: (formData: DataRowSet, response: unknown) => {
        success: boolean;
        result: DataTransferResult;
        error?: string;
        errorView?: ReactNode;
    }): DataTransferConfig;
    validateDataFields(defaultFields: DataField[]): void;
}
export interface DataTransferResult {
    requested: number;
    created?: number;
    updated?: number;
    failed?: number;
    errors?: DataTransferResultError[];
}
export interface DataTransferResultError {
    row?: number;
    field?: string;
    message?: string;
}
export interface DataTransferRule {
    changeValueOnExport?: (value: any) => Promise<any>;
    changeValueOnImport?: (value: any) => Promise<any>;
}
export interface DataFieldProps {
    name: string;
    label: string;
    type: FieldType;
    description?: string | undefined;
    required?: boolean | undefined;
    options?: SelectOption[] | undefined;
    dataTransferRule?: DataTransferRule | undefined;
}
export declare class DataField {
    private readonly name;
    private readonly label;
    private readonly type;
    private description?;
    private required?;
    private options?;
    private dataTransferRule?;
    constructor({ name, label, type, description, options, dataTransferRule, required, }: DataFieldProps);
    static create(props: DataFieldProps): DataField;
    equals(other: DataField): boolean;
    getName(): string;
    getLabel(): string;
    isRequired(): boolean;
    getType(): FieldType;
    getOptions(): SelectOption[];
    getValueOnExport(value: any): Promise<any>;
    getValueOnImport(value: any): Promise<any>;
    withRequired(required: boolean): DataField;
    withOptions(options: SelectOption[]): DataField;
    withChangeValueOnExport(changeValueOnExport: (value: any) => any): DataField;
    withChangeValueOnImport(changeValueOnImport: (value: any) => any): DataField;
    withDescription(description: string): DataField;
    getDescription(): string;
}
export interface DataExportCount {
    totalPage: number;
    totalCount?: number;
}
export interface DataExportResult {
    data: unknown;
    page: number;
}
export declare function createFieldMap(...fields: DataField[]): Map<string, DataField>;
export declare function getExportFileName(exportFileName: string | undefined, translation: (key: string) => string): string;
export declare function isDataColumn(value: unknown): value is DataColumn;
export declare function isDataRow(value: unknown): value is DataRow;
export declare function isDataRowSet(value: unknown): value is DataRowSet;
export declare function isSampleDataItem(value: unknown): value is SampleDataItem;
export declare function getRangeDateValue(value: any): Promise<any>;
export declare function getRangeDatetimeValue(value: any): Promise<any>;
export declare function getImportedRangeDateValue(value: any): Promise<any>;
export declare function getImportedRangeDatetimeValue(value: any): Promise<any>;
//# sourceMappingURL=Type.d.ts.map