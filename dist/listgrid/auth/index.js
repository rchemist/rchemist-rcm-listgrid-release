export { AuthProvider, useSession, useAuth } from './AuthContext';
export { registerSignOut, signOut } from './SessionProvider';
export function hasAnyRole(session, ...allowedRoles) {
    if (!session)
        return false;
    const user = typeof session.getUser === 'function' ? session.getUser() : undefined;
    const roles = user?.roles ?? session.roles ?? session.authentication?.roles;
    if (Array.isArray(roles)) {
        return roles.some((role) => allowedRoles.includes(role));
    }
    const userType = user?.userType ?? session.userType;
    if (userType) {
        const normalized = userType.startsWith('ROLE_') ? userType : `ROLE_${userType}`;
        return allowedRoles.includes(normalized);
    }
    return false;
}
//# sourceMappingURL=index.js.map