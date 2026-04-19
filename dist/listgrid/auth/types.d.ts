export interface SessionUser {
    id?: string | number;
    name?: string;
    roles?: string[];
    [key: string]: unknown;
}
export interface Session {
    roles?: string[];
    authentication?: {
        roles?: string[];
        [key: string]: unknown;
    };
    getUser?: () => SessionUser | null | undefined;
    [key: string]: unknown;
}
//# sourceMappingURL=types.d.ts.map