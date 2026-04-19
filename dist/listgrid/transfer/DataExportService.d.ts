import { SearchForm } from '../form/SearchForm';
import { DataExportCount, DataField, DataRow, DataRowSet, SampleDataItem } from '../transfer/Type';
export interface ExportServiceProps {
    searchForm?: SearchForm | undefined;
    url?: string | undefined;
    fields: DataField[];
    restrictCount?: number | undefined;
    pagePerCount?: number | undefined;
    setExportable?: ((exportable: boolean) => void) | undefined;
    setFailedCount?: ((count: number) => void) | undefined;
    setProgress?: ((progress: number) => void) | undefined;
    data?: SampleDataItem[][] | undefined;
    setData?: ((data: DataRowSet) => void) | undefined;
    setError?: ((errorMessage: string) => void) | undefined;
    editorFields?: string[] | undefined;
    addedFields?: ((row: DataRow) => Promise<DataRow>) | undefined;
}
export declare class DataExportService {
    searchForm?: SearchForm | undefined;
    url?: string | undefined;
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
    total?: DataExportCount | undefined;
    editorFields: string[];
    addedFields?: ((row: DataRow) => Promise<DataRow>) | undefined;
    constructor({ searchForm, url, fields, restrictCount, pagePerCount, setExportable, setFailedCount, setProgress, data, setData, setError, editorFields, addedFields, }: ExportServiceProps);
    process(): (() => void) | undefined;
}
export default DataExportService;
//# sourceMappingURL=DataExportService.d.ts.map