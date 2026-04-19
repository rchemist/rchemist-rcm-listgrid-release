import { ManyToOneConfig } from '../../../config/Config';
import { EntityForm } from '../../../config/EntityForm';
interface ManyToOneMultiFilterViewProps {
    name: string;
    label?: string | undefined;
    config: ManyToOneConfig;
    parentEntityForm: EntityForm;
    value?: string[] | undefined;
    onChange: (value: string[]) => void;
}
export declare const ManyToOneMultiFilterView: ({ name, label, config, parentEntityForm, value, onChange, }: ManyToOneMultiFilterViewProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=ManyToOneMultiFilterView.d.ts.map