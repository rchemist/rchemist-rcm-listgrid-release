import { InputRendererProps } from '../../../config/Config';
import { EntityForm } from '../../../config/EntityForm';
import { FilterItem } from '../../../form/SearchForm';
interface XrefMappingViewProps extends InputRendererProps {
    entityForm: EntityForm;
    excludeId?: string | undefined;
    add?: boolean | undefined;
    parentEntityForm?: EntityForm | undefined;
    filters?: FilterItem[] | ((entityForm: EntityForm, parentEntityForm?: EntityForm) => Promise<FilterItem[]>) | undefined;
}
export interface XrefMappingValue {
    mapped?: string[];
    deleted?: string[];
}
export declare const XrefMappingView: ({ entityForm, excludeId, add, parentEntityForm, ...props }: XrefMappingViewProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=XrefMappingView.d.ts.map