import { Direction, FilterItem } from '../../../form/SearchForm';
/**
 * URL page parameter parser
 * URL: 1-indexed (user-friendly)
 * Internal: 0-indexed
 */
export declare const parseAsPage: import("../../../urlState").UrlParser<number>;
/**
 * URL pageSize parameter parser
 * Default: 20
 */
export declare const parseAsPageSize: import("../../../urlState").UrlParser<number>;
/**
 * URL sort parameter parser
 * Format: "field:direction" (e.g., "createdAt:DESC")
 */
export interface SortState {
    field: string;
    direction: Direction;
}
export declare const parseAsSort: import("../../../urlState").UrlParser<SortState | null>;
/**
 * URL filters parameter parser
 * Human-readable format: "field:value,field:op:value"
 *
 * Examples:
 *   ?filters=status:ACTIVE,type:FRESHMAN
 *   ?filters=status:ACTIVE,name:like:홍길동,createdAt:gte:2024-01-01
 *
 * Format:
 *   - Simple equality: field:value
 *   - With operator: field:operator:value
 *   - Multiple filters separated by comma
 *   - Supported operators: eq, ne, like, gt, gte, lt, lte, in, isnull
 */
export interface FiltersState {
    AND?: FilterItem[];
    OR?: FilterItem[];
}
export declare const parseAsFilters: import("../../../urlState").UrlParser<FiltersState | null>;
/**
 * URL quick search parameter parser
 * Simple string with URL encoding handled by nuqs
 */
export declare const parseAsQuickSearch: import("../../../urlState").UrlParser<string | null>;
/**
 * Type definitions for URL state
 */
export interface ListGridUrlState {
    page: number | null;
    pageSize: number | null;
    q: string | null;
    sort: SortState | null;
    filters: FiltersState | null;
}
/**
 * Default URL state
 */
export declare const defaultUrlState: ListGridUrlState;
/**
 * Check if URL has any ListGrid params
 */
export declare function hasUrlParams(urlState: ListGridUrlState): boolean;
//# sourceMappingURL=urlStateParsers.d.ts.map