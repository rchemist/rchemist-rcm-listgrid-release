// Stage 8 — runtime configuration.
//
// Replaces hard-coded `process.env.NEXT_PUBLIC_*` access with a
// framework-agnostic registry. Host apps call `configureRuntime({...})`
// at bootstrap with their platform-specific values (from Next env vars,
// Vite import.meta.env, custom config, etc.).
const DEFAULT = {
    cacheControl: false,
    useServerSideCache: false,
    searchFormHashKey: 'rcm-searchform',
    debugListGridPerformance: false,
    isDevelopment: false,
    kakaoMapAppKey: '',
    cryptKey: '',
};
let _config = { ...DEFAULT };
export function configureRuntime(config) {
    _config = { ...DEFAULT, ..._config, ...config };
}
export function getRuntimeConfig() {
    return _config;
}
//# sourceMappingURL=RuntimeConfig.js.map