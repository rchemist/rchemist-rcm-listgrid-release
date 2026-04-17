import { DataField, DataRowSet } from '../Type';
export interface ExcelDownloadLogOptions {
    condition?: Record<string, any> | string;
}
export interface ExcelDownloadProps {
    data: DataRowSet;
    fileName: string;
    excludeHeader?: boolean;
    password?: string;
    logOptions?: ExcelDownloadLogOptions;
    fields?: DataField[];
}
export declare function logExcelDownload(usePassword: boolean, condition?: Record<string, any> | string): Promise<void>;
export declare function registerExcelCrypto(impl: any): void;
export declare const ExcelDownload: (props: ExcelDownloadProps) => Promise<void>;
export declare function saveExcelFile(wb: any, fileName: string, password?: string, logOptions?: ExcelDownloadLogOptions): Promise<void>;
export default ExcelDownload;
//# sourceMappingURL=ExcelProvider.d.ts.map