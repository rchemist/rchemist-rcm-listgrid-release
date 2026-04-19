import { InputRendererProps } from '../../../config/Config';
import { EntityForm } from '../../../config/EntityForm';
import { FilterItem } from '../../../form/SearchForm';
interface XrefPreferMappingViewProps extends InputRendererProps {
    entityForm: EntityForm;
    showPreferred?: boolean | undefined;
    parentEntityForm?: EntityForm | undefined;
    filters?: FilterItem[] | ((entityForm: EntityForm, parentEntityForm?: EntityForm) => Promise<FilterItem[]>) | undefined;
    preferredLabel?: string | undefined;
}
export interface XrefPreferMappingValue {
    mapped?: XrefPreferValue[] | undefined;
}
interface XrefPreferValue {
    id: string;
    preferred?: boolean | undefined;
}
export declare const XrefPreferMappingView: ({ entityForm, ...props }: XrefPreferMappingViewProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=XrefPreferMappingView.d.ts.map