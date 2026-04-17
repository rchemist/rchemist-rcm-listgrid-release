export interface RuntimeConfig {
    /** Enables server-side-rendered list caching hints. */
    cacheControl?: boolean;
    /** Enables an alternate listgrid data pipeline (server-side cache). */
    useServerSideCache?: boolean;
    /** sessionStorage key prefix for SearchForm persistence. */
    searchFormHashKey?: string;
    /** Performance logging toggle for the listgrid engine. */
    debugListGridPerformance?: boolean;
    /** True when NODE_ENV === 'development' (used by perf logger). */
    isDevelopment?: boolean;
    /** Kakao Maps JS SDK app key. */
    kakaoMapAppKey?: string;
    /** simpleCrypt passphrase / secret (replaces NEXT_PUBLIC_CRYPT_KEY). */
    cryptKey?: string;
}
export declare function configureRuntime(config: RuntimeConfig): void;
export declare function getRuntimeConfig(): Required<RuntimeConfig>;
//# sourceMappingURL=RuntimeConfig.d.ts.map