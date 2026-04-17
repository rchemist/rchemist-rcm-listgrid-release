import { ManyToOneConfig } from '../../../config/Config';
import { EntityForm } from '../../../config/EntityForm';
interface ManyToOneMultiFilterViewProps {
    name: string;
    label?: string;
    config: ManyToOneConfig;
    parentEntityForm: EntityForm;
    value?: string[];
    onChange: (value: string[]) => void;
}
export declare const ManyToOneMultiFilterView: ({ name, label, config, parentEntityForm, value, onChange, }: ManyToOneMultiFilterViewProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=ManyToOneMultiFilterView.d.ts.map