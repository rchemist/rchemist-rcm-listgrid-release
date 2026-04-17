export interface IEntityError {
    error: IEntityErrorBody;
    [key: string]: any;
}
export interface IEntityErrorBody {
    error?: boolean | string;
    message?: string;
    fieldError?: Map<string, string[]> | Record<string, string[]>;
    [key: string]: any;
}
export declare class ResponseData<T = any> {
    data: T;
    status?: number;
    error?: string;
    entityError?: IEntityError;
    constructor(init?: Partial<ResponseData<T>>);
    isError(): boolean;
}
export declare function createResponseData<T = any>(init: Partial<ResponseData<T>> & {
    data?: T;
}): ResponseData<T>;
//# sourceMappingURL=types.d.ts.map