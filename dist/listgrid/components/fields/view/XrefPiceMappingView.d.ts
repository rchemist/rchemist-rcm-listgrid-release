import { InputRendererProps } from '../../../config/Config';
import { EntityForm } from '../../../config/EntityForm';
import { FilterItem } from "../../../form/SearchForm";
interface XrefPriceMappingViewProps extends InputRendererProps {
    entityForm: EntityForm;
    parentEntityForm?: EntityForm;
    initPrice: (entityForm: EntityForm, rowValue: any) => Promise<void>;
    priceHelpText?: string;
    filters?: FilterItem[] | ((entityForm: EntityForm, parentEntityForm?: EntityForm) => Promise<FilterItem[]>);
}
export interface XrefPriceMappingValue {
    mapped?: XrefPriceValue[];
}
interface XrefPriceValue {
    id: string;
    price?: number;
}
export declare const XrefPriceMappingView: ({ entityForm, parentEntityForm, ...props }: XrefPriceMappingViewProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=XrefPiceMappingView.d.ts.map