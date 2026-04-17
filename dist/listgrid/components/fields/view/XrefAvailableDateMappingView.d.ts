import { InputRendererProps } from '../../../config/Config';
import { EntityForm } from '../../../config/EntityForm';
import { FilterItem } from "../../../form/SearchForm";
interface XrefAvailableDateMappingViewProps extends InputRendererProps {
    entityForm: EntityForm;
    requiredAvailable?: boolean;
    parentEntityForm?: EntityForm;
    filters?: FilterItem[] | ((entityForm: EntityForm, parentEntityForm?: EntityForm) => Promise<FilterItem[]>);
}
export interface XrefAvailableDateMappingValue {
    mapped?: XrefAvailableDateValue[];
}
export interface XrefAvailableDateValue {
    id: string;
    availableAt?: string;
    availableUntil?: string;
}
export declare const XrefAvailableDateMappingView: ({ entityForm, ...props }: XrefAvailableDateMappingViewProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=XrefAvailableDateMappingView.d.ts.map