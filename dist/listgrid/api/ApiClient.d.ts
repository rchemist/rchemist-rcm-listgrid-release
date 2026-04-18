import type { ResponseData } from './types';
export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export interface ApiRequestOptions {
    url: string;
    method?: ApiMethod;
    formData?: unknown;
    entityFormName?: string;
    extensionPoint?: string;
    serverProxy?: boolean;
    [key: string]: unknown;
}
export interface ApiClient {
    callExternalHttpRequest<T = any>(options: ApiRequestOptions): Promise<ResponseData<T>>;
    getExternalApiData<T = any>(urlOrOptions: string | ApiRequestOptions): Promise<ResponseData<T>>;
    getExternalApiDataWithError<T = any>(urlOrOptions: string | ApiRequestOptions): Promise<ResponseData<T>>;
}
export declare function configureApiClient(client: ApiClient): void;
export declare function callExternalHttpRequest<T = any>(options: ApiRequestOptions): Promise<ResponseData<T>>;
export declare function getExternalApiData<T = any>(urlOrOptions: string | ApiRequestOptions): Promise<ResponseData<T>>;
export declare function getExternalApiDataWithError<T = any>(urlOrOptions: string | ApiRequestOptions): Promise<ResponseData<T>>;
//# sourceMappingURL=ApiClient.d.ts.map