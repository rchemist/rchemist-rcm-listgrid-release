import { InlineExpansionState, ViewRowItemProps } from "../types/RowItem.types";
export interface ViewRowsProps extends ViewRowItemProps {
    item: any;
    index: number;
    checkItem: (id: any) => void;
    draggable: boolean;
    totalCount: number;
    sortableList: any[];
    selectionOptions?: any;
    showCheckboxInput?: boolean;
    /** SubCollection 인라인 확장 상태 */
    inlineExpansion?: InlineExpansionState;
}
export declare const ViewRows: (props: ViewRowsProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ViewRows.d.ts.map