import { ExportTransferConfig } from '../transfer/Type';
import { SearchForm } from '../form/SearchForm';
interface ExporterProps {
    config?: ExportTransferConfig;
    fileName: string;
    searchForm: SearchForm;
    onClose: () => void;
}
export declare const DataExporter: ({ config, searchForm, fileName, onClose }: ExporterProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=DataExporter.d.ts.map