import { InlineExpansionState, ViewRowItemProps } from "../types/RowItem.types";
import { SelectionOptions } from "../types/ViewListGrid.types";
export interface ViewRowsProps extends ViewRowItemProps {
    item: any;
    index: number;
    checkItem: (id: string) => void;
    draggable: boolean;
    totalCount: number;
    sortableList: any[];
    selectionOptions?: SelectionOptions;
    showCheckboxInput?: boolean;
    /** SubCollection 인라인 확장 상태 */
    inlineExpansion?: InlineExpansionState;
}
export declare const ViewRows: (props: ViewRowsProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ViewRows.d.ts.map