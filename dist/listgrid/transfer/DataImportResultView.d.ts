import { FC, ReactNode } from 'react';
import { DataField, DataTransferResult } from '../transfer/Type';
export interface DataImportResultViewProps {
    result: DataTransferResult;
    fields: DataField[];
}
export declare const DataImportResultView: FC<DataImportResultViewProps>;
export interface ImportErrorViewProps {
    importError?: string;
    errorMessage?: string;
    importErrorView?: ReactNode;
}
export declare const ImportErrorView: FC<ImportErrorViewProps>;
//# sourceMappingURL=DataImportResultView.d.ts.map