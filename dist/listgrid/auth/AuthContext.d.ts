import { ReactNode } from 'react';
import type { Session } from './types';
export interface AuthContextValue {
    readonly session: Session | undefined;
}
export interface AuthProviderProps {
    session: Session | undefined;
    children: ReactNode;
}
export declare function AuthProvider({ session, children }: AuthProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useSession(): Session | undefined;
export declare function useAuth(): AuthContextValue;
//# sourceMappingURL=AuthContext.d.ts.map