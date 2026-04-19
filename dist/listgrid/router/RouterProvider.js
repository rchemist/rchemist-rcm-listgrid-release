import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
const RouterContext = createContext(null);
export function RouterProvider({ value, children }) {
    return _jsx(RouterContext.Provider, { value: value, children: children });
}
function mustRouter(caller) {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- assertion helper always invoked from within hooks/components below
    const ctx = useContext(RouterContext);
    if (!ctx) {
        throw new Error(`[@rcm/listgrid] ${caller} must be called within a <RouterProvider>. ` +
            'Wrap your app with <RouterProvider value={...}> imported from @rcm/listgrid. ' +
            'See @rcm/listgrid-next for a Next.js adapter.');
    }
    return ctx;
}
export function useRouter() {
    return mustRouter('useRouter').useRouter();
}
export function usePathname() {
    return mustRouter('usePathname').usePathname();
}
export function useParams() {
    return mustRouter('useParams').useParams();
}
export function useSearchParams() {
    return mustRouter('useSearchParams').useSearchParams();
}
export function Link(props) {
    const services = mustRouter('Link');
    const Impl = services.Link;
    return _jsx(Impl, { ...props });
}
//# sourceMappingURL=RouterProvider.js.map