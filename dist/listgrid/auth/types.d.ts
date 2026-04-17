export interface SessionUser {
    id?: string | number;
    name?: string;
    roles?: string[];
    [key: string]: any;
}
export interface Session {
    roles?: string[];
    authentication?: {
        roles?: string[];
        [key: string]: any;
    };
    getUser: () => SessionUser | null | undefined;
    [key: string]: any;
}
//# sourceMappingURL=types.d.ts.map