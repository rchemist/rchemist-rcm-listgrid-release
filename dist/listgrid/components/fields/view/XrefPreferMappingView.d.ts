import { InputRendererProps } from '../../../config/Config';
import { EntityForm } from '../../../config/EntityForm';
import { FilterItem } from "../../../form/SearchForm";
interface XrefPreferMappingViewProps extends InputRendererProps {
    entityForm: EntityForm;
    showPreferred?: boolean;
    parentEntityForm?: EntityForm;
    filters?: FilterItem[] | ((entityForm: EntityForm, parentEntityForm?: EntityForm) => Promise<FilterItem[]>);
    preferredLabel?: string;
}
export interface XrefPreferMappingValue {
    mapped?: XrefPreferValue[];
}
interface XrefPreferValue {
    id: string;
    preferred?: boolean;
}
export declare const XrefPreferMappingView: ({ entityForm, ...props }: XrefPreferMappingViewProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=XrefPreferMappingView.d.ts.map