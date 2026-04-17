import { InputRendererProps } from '../../../config/Config';
import { EntityForm } from '../../../config/EntityForm';
import { FilterItem } from "../../../form/SearchForm";
interface XrefPriorityMappingViewProps extends InputRendererProps {
    entityForm: EntityForm;
    excludeId?: string;
    add?: boolean;
    parentEntityForm?: EntityForm;
    filters?: FilterItem[] | ((entityForm: EntityForm, parentEntityForm?: EntityForm) => Promise<FilterItem[]>);
}
export interface XrefPriorityMappingValue {
    mapped?: XrefPriorityValue[];
}
interface XrefPriorityValue {
    id: string;
    priority: number;
}
export declare const XrefPriorityMappingView: ({ entityForm, excludeId, add, parentEntityForm, ...props }: XrefPriorityMappingViewProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=XrefPriorityMappingView.d.ts.map