import { InputRendererProps } from '../../../config/Config';
import { EntityForm } from '../../../config/EntityForm';
import { FilterItem } from "../../../form/SearchForm";
interface XrefMappingViewProps extends InputRendererProps {
    entityForm: EntityForm;
    excludeId?: string;
    add?: boolean;
    parentEntityForm?: EntityForm;
    filters?: FilterItem[] | ((entityForm: EntityForm, parentEntityForm?: EntityForm) => Promise<FilterItem[]>);
}
export interface XrefMappingValue {
    mapped?: string[];
    deleted?: string[];
}
export declare const XrefMappingView: ({ entityForm, excludeId, add, parentEntityForm, ...props }: XrefMappingViewProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=XrefMappingView.d.ts.map