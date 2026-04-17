// Stage 5 — Backend contract types.
//
// The RCM-framework backend returns a consistent response shape across
// CRUD endpoints. `ResponseData` wraps the payload + metadata and
// exposes `isError()` as a convenience for call sites that predate the
// optional `error` / `entityError` fields.
//
// Host applications inject a concrete ApiClient (see ApiClient.ts) that
// produces ResponseData instances from HTTP calls; listgrid code consumes
// the shape but never constructs a real HTTP layer.
// ResponseData is a class so call sites can `new ResponseData()` to construct
// synthetic responses (e.g. client-side 500s when session is missing).
// The original @gjcu/ui ResponseData was also a class; instance methods like
// `isError()` are preserved.
export class ResponseData {
    constructor(init) {
        this.data = null;
        if (init)
            Object.assign(this, init);
    }
    isError() {
        return !!(this.error || this.entityError || (this.status && this.status >= 400));
    }
}
export function createResponseData(init) {
    return new ResponseData(init);
}
//# sourceMappingURL=types.js.map