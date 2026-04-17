import { EntityForm } from '../../../config/EntityForm';
import { ManyToOneTreeView } from '../../../config/Config';
interface TreeSelectViewProps {
    entityForm: EntityForm;
    tree: ManyToOneTreeView;
    onSelect: (item: any) => void;
    selectable?: boolean;
    readonly?: boolean;
}
export declare const TreeSelectView: ({ readonly, ...props }: TreeSelectViewProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TreeSelectView.d.ts.map