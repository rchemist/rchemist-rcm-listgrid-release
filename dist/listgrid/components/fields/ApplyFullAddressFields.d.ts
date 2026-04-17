import { EntityForm } from '../../config/EntityForm';
import { AbstractAddFieldProps } from '../../config/EntityFormTypes';
type AddressFieldType = 'state' | 'city' | 'address1' | 'address2' | 'postalCode' | 'longitude' | 'latitude';
interface AddressFieldMessage {
    address?: string;
    state?: string;
    city?: string;
    address1?: string;
    address2?: string;
    postalCode?: string;
    longitude?: string;
    latitude?: string;
}
interface AddressListFields {
    state?: boolean;
    city?: boolean;
    address1?: boolean;
    address2?: boolean;
    postalCode?: boolean;
    longitude?: boolean;
    latitude?: boolean;
}
interface AddressListOrder {
    address?: number;
    state?: number;
    city?: number;
    address1?: number;
    address2?: number;
    postalCode?: number;
    longitude?: number;
    latitude?: number;
}
interface FullAddressFieldsProps extends AbstractAddFieldProps {
    showMap?: boolean;
    fields?: AddressFieldType[];
    required?: boolean;
    helpText?: AddressFieldMessage;
    label?: AddressFieldMessage;
    list?: AddressListFields;
    order?: AddressListOrder;
    showLongitudeLatitude?: boolean;
    prefix?: string;
}
export declare const applyFullAddressFields: (entityForm: EntityForm, props?: FullAddressFieldsProps) => void;
export {};
//# sourceMappingURL=ApplyFullAddressFields.d.ts.map