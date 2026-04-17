// @rcm/listgrid-next — Next.js/nuqs adapter for UrlStateServices.
//
// Consumers import from '@rcm/listgrid/next' and wire into <UrlStateProvider>:
//   import { nextUrlStateServices } from '@rcm/listgrid/next';
//   <UrlStateProvider value={nextUrlStateServices}>
//
// Bridges the library's framework-agnostic `UrlParser` shape into nuqs's
// own parser factory so `useQueryStates` reads/writes Next's router state.
import { useQueryStates as nuqsUseQueryStates, createParser as nuqsCreateParser, } from 'nuqs';
function toNuqsParsers(parsers) {
    const out = {};
    for (const key of Object.keys(parsers)) {
        const p = parsers[key];
        out[key] = nuqsCreateParser({
            parse: p.parse,
            serialize: p.serialize,
            eq: p.eq,
        });
    }
    return out;
}
export const nextUrlStateServices = {
    useQueryStates(parsers, options) {
        const nuqsParsers = toNuqsParsers(parsers);
        const [state, setState] = nuqsUseQueryStates(nuqsParsers, options);
        return [state, setState];
    },
};
//# sourceMappingURL=NextUrlStateAdapter.js.map