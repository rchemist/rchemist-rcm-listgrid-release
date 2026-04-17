export type { Session, SessionUser } from './types';
export { AuthProvider, useSession, useAuth } from './AuthContext';
export type { AuthContextValue, AuthProviderProps } from './AuthContext';
export { registerSignOut, signOut } from './SessionProvider';
import type { Session } from './types';
export declare function hasAnyRole(session: Session | undefined | null | any, ...allowedRoles: string[]): boolean;
//# sourceMappingURL=index.d.ts.map