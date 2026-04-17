export declare const DEFAULT_MENU_ALIAS = "default";
/**
 * Permission level returned by menu permission checks. Matches the
 * `PermissionType` enum used by ViewListGridWrapper / ViewEntityFormWrapper
 * (config/Config.ts).
 */
import type { PermissionType } from '../config/Config';
export interface MenuPermissionCheckArgs {
    url: string;
    alias?: string;
    [key: string]: any;
}
export type MenuPermissionChecker = (args: MenuPermissionCheckArgs) => PermissionType | Promise<PermissionType>;
export declare function registerMenuPermissionChecker(checker: MenuPermissionChecker): void;
export declare function checkAdminMenuPermission(args: MenuPermissionCheckArgs): PermissionType | Promise<PermissionType>;
//# sourceMappingURL=MenuPermissionChecker.d.ts.map