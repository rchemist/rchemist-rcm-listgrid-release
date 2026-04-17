// Stage 5 — Host-supplied API client contract.
//
// Listgrid needs to call the RCM-framework backend but cannot itself know
// about HTTP transport concerns (auth headers, CSRF, base URL, logging,
// retries). Host apps inject an ApiClient via `configureApiClient(client)`;
// library code uses the module-level `callExternalHttpRequest` /
// `getExternalApiData` / `getExternalApiDataWithError` wrappers that
// delegate to the configured client.
//
// This is a module-scope registry (not React Context) because the API is
// called from static class methods (PageResult.fetchListData, EntityForm
// initialize) where Context is unavailable.
let _client;
export function configureApiClient(client) {
    _client = client;
}
function mustClient(caller) {
    if (!_client) {
        throw new Error(`[@rcm/listgrid] ${caller} called but no ApiClient has been configured. ` +
            'Call configureApiClient(yourClient) at app bootstrap.');
    }
    return _client;
}
export function callExternalHttpRequest(options) {
    return mustClient('callExternalHttpRequest').callExternalHttpRequest(options);
}
export function getExternalApiData(urlOrOptions) {
    return mustClient('getExternalApiData').getExternalApiData(urlOrOptions);
}
export function getExternalApiDataWithError(urlOrOptions) {
    return mustClient('getExternalApiDataWithError').getExternalApiDataWithError(urlOrOptions);
}
//# sourceMappingURL=ApiClient.js.map