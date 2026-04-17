import { FC, ReactNode } from "react";
import { DataField, DataTransferResult } from '../transfer/Type';
import { DataRowSet } from "./Type";
interface DataImportPreviewViewerProps {
    resultView: boolean;
    data: DataRowSet;
    fields: DataField[];
    onSubmit: () => void;
    cancelImport: () => void;
    onImportSuccess?: () => void;
    importResult?: DataTransferResult;
    preview: boolean;
    importError?: string;
    errorMessage?: string;
    viewError: boolean;
    importErrorView?: ReactNode;
}
export declare const DataImportProcessor: ({ resultView, data, importResult, onSubmit, cancelImport, onImportSuccess, viewError, importErrorView, importError, errorMessage, preview, ...props }: DataImportPreviewViewerProps) => import("react/jsx-runtime").JSX.Element;
export interface DataImportPreviewProps {
    fields: DataField[];
    data: DataRowSet;
}
export declare const DataImportPreview: FC<DataImportPreviewProps>;
export {};
//# sourceMappingURL=DataImportProcessor.d.ts.map