import { FormField, FormFieldProps } from '../abstract';
import { FieldRenderParameters } from '../../../config/EntityField';
interface AddressMapFieldProps extends FormFieldProps {
    prefix?: string;
    showMap?: boolean;
}
export interface Address {
    state?: string;
    city?: string;
    address1: string;
    address2: string;
    postalCode: string;
    longitude?: number;
    latitude?: number;
}
export declare class AddressMapField extends FormField<AddressMapField> {
    showMap?: boolean;
    prefix?: string;
    constructor(name: string, order: number, showMap?: boolean, prefix?: string);
    static create(props: AddressMapFieldProps): AddressMapField;
    /**
     * AddressMapField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null | undefined>;
    /**
     * AddressMapField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): AddressMapField;
    withPrefix(prefix: string): AddressMapField;
    protected copyFields(origin: AddressMapFieldProps, includeValue?: boolean): this;
}
export declare function appendLastDot(str?: string): string;
export {};
//# sourceMappingURL=AddressMapField.d.ts.map