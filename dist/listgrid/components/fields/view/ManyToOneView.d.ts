import { InputRendererProps, ManyToOneConfig } from '../../../config/Config';
import { EntityForm } from '../../../config/EntityForm';
interface ManyToOneViewProps extends InputRendererProps {
    config: ManyToOneConfig;
    parentEntityForm: EntityForm;
}
export declare const ManyToOneView: ({ config, required, parentEntityForm, ...props }: ManyToOneViewProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=ManyToOneView.d.ts.map