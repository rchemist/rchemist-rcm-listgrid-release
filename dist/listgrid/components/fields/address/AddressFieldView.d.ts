import { InputRendererProps } from '../../../config/Config';
import { EntityForm } from '../../../config/EntityForm';
interface AddressFieldViewProps extends InputRendererProps {
    showMap?: boolean;
    prefix?: string;
    entityForm: EntityForm;
}
export declare const AddressFieldView: ({ entityForm, onChange, ...props }: AddressFieldViewProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=AddressFieldView.d.ts.map