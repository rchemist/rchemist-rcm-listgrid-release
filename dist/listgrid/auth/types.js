// Auth contract consumed by @rcm/listgrid.
//
// Host applications provide a concrete Session implementation via <AuthProvider>.
// The shape mirrors the original listgrid usage: roles can live directly on
// the session or under `authentication.roles`, and `getUser()` is expected
// to be present (host apps with plain session objects should wrap their data
// before passing to AuthProvider).
//
// The [key: string]: unknown index signature lets host apps pass richer Session
// objects without type errors. ListGrid itself only reads the fields declared
// explicitly below.
export {};
//# sourceMappingURL=types.js.map