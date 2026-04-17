import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
// Sentinel for "no provider" so undefined can legitimately mean "no session".
const NO_PROVIDER = Symbol('rcm-listgrid-no-auth-provider');
const AuthContext = createContext(NO_PROVIDER);
export function AuthProvider({ session, children }) {
    return (_jsx(AuthContext.Provider, { value: { session }, children: children }));
}
export function useSession() {
    const ctx = useContext(AuthContext);
    if (ctx === NO_PROVIDER) {
        throw new Error('[@rcm/listgrid] useSession must be called within an <AuthProvider>. ' +
            'Wrap your app with <AuthProvider session={...}> imported from @rcm/listgrid.');
    }
    return ctx.session;
}
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (ctx === NO_PROVIDER) {
        throw new Error('[@rcm/listgrid] useAuth must be called within an <AuthProvider>. ' +
            'Wrap your app with <AuthProvider session={...}> imported from @rcm/listgrid.');
    }
    return ctx;
}
//# sourceMappingURL=AuthContext.js.map