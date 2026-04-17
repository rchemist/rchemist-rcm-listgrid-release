import { ListableFormField } from '../fields/abstract';
import { ViewFieldManageable } from "./types/ViewListGrid.types";
interface ViewFieldSelectorProps extends ViewFieldManageable {
    fields: ListableFormField<any>[];
    disabled: boolean;
    entityUrl: string;
    subCollectionName?: string;
}
export declare const ViewFieldSelector: ({ viewFields, setViewFields, ...props }: ViewFieldSelectorProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=ViewFieldSelector.d.ts.map