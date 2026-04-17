import { SelectOption } from "../../form/Type";
export interface ApiSpecification {
    url: string;
    authorized?: boolean;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    formData?: ApiFormData | string;
    response: string;
}
export interface ApiFormData {
    type: 'Request Body' | 'Query Parameters' | 'None';
    body?: string;
    fields?: ApiDataField[];
}
export interface ApiDataField {
    name: string;
    label: string;
    defaultValue?: string;
    type: string;
    description?: string;
    required?: boolean;
    options?: SelectOption[];
}
export declare function isApiSpecification(obj: any): obj is ApiSpecification;
//# sourceMappingURL=Type.d.ts.map