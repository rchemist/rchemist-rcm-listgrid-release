import { SearchForm } from "../form/SearchForm";
import { DataExportCount, DataField, DataRow, DataRowSet, SampleDataItem } from '../transfer/Type';
export interface ExportServiceProps {
    searchForm?: SearchForm;
    url?: string;
    fields: DataField[];
    restrictCount?: number;
    pagePerCount?: number;
    setExportable?: (exportable: boolean) => void;
    setFailedCount?: (count: number) => void;
    setProgress?: (progress: number) => void;
    data?: SampleDataItem[][];
    setData?: (data: DataRowSet) => void;
    setError?: (errorMessage: string) => void;
    editorFields?: string[];
    addedFields?: (row: DataRow) => Promise<DataRow>;
}
export declare class DataExportService {
    searchForm?: SearchForm;
    url?: string;
    fields: DataField[];
    restrictCount: number;
    pagePerCount: number;
    setExportable: (exportable: boolean) => void;
    setFailedCount: (count: number) => void;
    setProgress: (progress: number) => void;
    data: SampleDataItem[][];
    setData: (data: DataRowSet) => void;
    setError: (errorMessage: string) => void;
    processing: boolean;
    total?: DataExportCount;
    editorFields: string[];
    addedFields?: (row: DataRow) => Promise<DataRow>;
    constructor({ searchForm, url, fields, restrictCount, pagePerCount, setExportable, setFailedCount, setProgress, data, setData, setError, editorFields, addedFields, }: ExportServiceProps);
    process(): (() => void) | undefined;
}
export default DataExportService;
//# sourceMappingURL=DataExportService.d.ts.map