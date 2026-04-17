import { ReactNode } from "react";
import { ListGridHeaderProps } from "../types/ListGridHeader.types";
export declare const HeaderActionButtons: React.FC<ListGridHeaderProps & {
    headerButtons: ReactNode[];
    checkedButtons: ReactNode[];
} & {
    setOpenDownload: (val: boolean) => void;
    setOpenUpload: (val: boolean) => void;
    neverDelete?: boolean;
}>;
//# sourceMappingURL=HeaderActionButtons.d.ts.map