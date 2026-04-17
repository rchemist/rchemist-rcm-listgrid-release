import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { DataExporter } from '../../../transfer/DataExporter';
import { DataImporter } from '../../../transfer/DataImporter';
import { isTrue } from '../../../utils/BooleanUtil';
export const DataTransferModals = ({ openDownload, setOpenDownload, openUpload, setOpenUpload, dataTransferConfig, searchForm, title, refresh }) => (_jsxs(_Fragment, { children: [openDownload && (_jsx(DataExporter, { config: dataTransferConfig?.export, searchForm: searchForm, fileName: dataTransferConfig?.getExportFileName() ?? "export", onClose: () => setOpenDownload(false) })), openUpload && (_jsx(DataImporter, { config: dataTransferConfig?.import, sampleFileName: `${title}_Sample`, onClose: (result) => {
                setOpenUpload(false);
                if (isTrue(result)) {
                    refresh();
                }
            } }))] }));
//# sourceMappingURL=DataTransferModal.js.map