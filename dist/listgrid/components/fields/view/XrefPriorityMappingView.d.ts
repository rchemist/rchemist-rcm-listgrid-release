import { InputRendererProps } from '../../../config/Config';
import { EntityForm } from '../../../config/EntityForm';
import { FilterItem } from '../../../form/SearchForm';
interface XrefPriorityMappingViewProps extends InputRendererProps {
    entityForm: EntityForm;
    excludeId?: string | undefined;
    add?: boolean | undefined;
    parentEntityForm?: EntityForm | undefined;
    filters?: FilterItem[] | ((entityForm: EntityForm, parentEntityForm?: EntityForm) => Promise<FilterItem[]>) | undefined;
}
export interface XrefPriorityMappingValue {
    mapped?: XrefPriorityValue[] | undefined;
}
interface XrefPriorityValue {
    id: string;
    priority: number;
}
export declare const XrefPriorityMappingView: ({ entityForm, excludeId, add, parentEntityForm, ...props }: XrefPriorityMappingViewProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=XrefPriorityMappingView.d.ts.map