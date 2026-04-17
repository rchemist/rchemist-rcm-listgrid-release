import { DataField, DataRow, DataRowSet, SampleDataItem } from '../transfer/Type';
import { SearchForm } from "../form/SearchForm";
interface ExportProcessorProps {
    process: boolean;
    fields: DataField[];
    url?: string;
    onProcessed: () => void;
    maxCount?: number;
    countPerPage?: number;
    searchForm?: SearchForm;
    exportFileName?: string;
    data?: SampleDataItem[][];
    password?: string;
    addedFields?: (row: DataRow) => Promise<DataRow>;
    overrideFormData?: (formData: DataRowSet) => Promise<DataRowSet>;
}
export declare const DataExportProcessor: ({ process, url, fields, onProcessed, maxCount, countPerPage, searchForm, exportFileName, data: initialData, password, addedFields, overrideFormData }: ExportProcessorProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=DataExportProcessor.d.ts.map