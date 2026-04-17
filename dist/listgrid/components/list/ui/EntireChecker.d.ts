import { ItemCheckable } from "../types/ViewListGrid.types";
interface EntireCheckerProps extends ItemCheckable {
    total: number;
    listIds: any[];
    subCollection?: boolean;
    selectionOptions?: any;
    rows?: any[];
    showCheckboxInput?: boolean;
}
export declare const EntireChecker: ({ total, listIds, checkedItems, setCheckedItems, subCollection, selectionOptions, rows, showCheckboxInput }: EntireCheckerProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=EntireChecker.d.ts.map