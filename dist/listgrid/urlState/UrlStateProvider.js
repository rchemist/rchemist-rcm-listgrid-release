import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
const UrlStateContext = createContext(null);
export function UrlStateProvider({ value, children }) {
    return _jsx(UrlStateContext.Provider, { value: value, children: children });
}
function mustUrlState() {
    const ctx = useContext(UrlStateContext);
    if (!ctx) {
        throw new Error('[@rcm/listgrid] useQueryStates must be called within a <UrlStateProvider>. ' +
            'Wrap your app with <UrlStateProvider value={...}> imported from @rcm/listgrid. ' +
            'See @rcm/listgrid-next for a Next.js (nuqs) adapter.');
    }
    return ctx;
}
export function useQueryStates(parsers, options) {
    return mustUrlState().useQueryStates(parsers, options);
}
//# sourceMappingURL=UrlStateProvider.js.map