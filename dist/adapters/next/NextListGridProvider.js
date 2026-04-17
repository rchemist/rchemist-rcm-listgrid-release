import { jsx as _jsx } from "react/jsx-runtime";
import { RouterProvider, UrlStateProvider } from '../../listgrid';
import { nextRouterServices } from './NextRouterAdapter';
import { nextUrlStateServices } from './NextUrlStateAdapter';
export function NextListGridProvider({ children }) {
    return (_jsx(RouterProvider, { value: nextRouterServices, children: _jsx(UrlStateProvider, { value: nextUrlStateServices, children: children }) }));
}
//# sourceMappingURL=NextListGridProvider.js.map