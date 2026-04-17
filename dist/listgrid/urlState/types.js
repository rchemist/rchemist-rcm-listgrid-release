// Stage 7d — Framework-agnostic URL state contract.
//
// Host adapters (e.g. @rcm/listgrid-next using nuqs) implement the
// `useQueryStates` hook. Listgrid code defines its parsers via
// `createParser` and consumes them through the adapter-provided hook.
/** Framework-agnostic factory mirroring nuqs's `createParser`. */
export function createParser(config) {
    return { ...config };
}
/** Simple pass-through string parser matching nuqs's `parseAsString`. */
export const parseAsString = {
    parse: (v) => v,
    serialize: (v) => v,
};
//# sourceMappingURL=types.js.map