import { DataField, DataRow, DataRowSet, SampleDataItem } from '../transfer/Type';
import { SearchForm } from '../form/SearchForm';
interface ExportProcessorProps {
    process: boolean;
    fields: DataField[];
    url?: string | undefined;
    onProcessed: () => void;
    maxCount?: number | undefined;
    countPerPage?: number | undefined;
    searchForm?: SearchForm | undefined;
    exportFileName?: string | undefined;
    data?: SampleDataItem[][] | undefined;
    password?: string | undefined;
    addedFields?: ((row: DataRow) => Promise<DataRow>) | undefined;
    overrideFormData?: ((formData: DataRowSet) => Promise<DataRowSet>) | undefined;
}
export declare const DataExportProcessor: ({ process, url, fields, onProcessed, maxCount, countPerPage, searchForm, exportFileName, data: initialData, password, addedFields, overrideFormData, }: ExportProcessorProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=DataExportProcessor.d.ts.map