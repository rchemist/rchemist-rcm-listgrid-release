// Stage 6 — Host-supplied menu permission checker.
//
// Original host app used this to gate listgrid pages behind menu-level
// permissions. Generic library cannot assume host menu infrastructure;
// default implementation returns a permissive 'WRITE' level. Host apps
// register a real checker via `registerMenuPermissionChecker()`.
export const DEFAULT_MENU_ALIAS = 'default';
const DEFAULT_CHECKER = () => 'ALL';
let _checker = DEFAULT_CHECKER;
export function registerMenuPermissionChecker(checker) {
    _checker = checker;
}
export function checkAdminMenuPermission(args) {
    return _checker(args);
}
//# sourceMappingURL=MenuPermissionChecker.js.map