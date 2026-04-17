import { SearchForm } from '../../../form/SearchForm';
import { ListGridUrlState } from './urlStateParsers';
/**
 * Convert SearchForm to URL state object
 * @param searchForm - The SearchForm instance to convert
 * @param quickSearchPropertyName - Name of the quick search field (for backward compatibility)
 * @param orFields - Additional fields that are searched with OR condition in quick search
 * @returns URL state object
 */
export declare function searchFormToUrlState(searchForm: SearchForm, quickSearchPropertyName?: string, orFields?: string[]): ListGridUrlState;
/**
 * Convert URL state to SearchForm
 * @param urlState - URL state object
 * @param quickSearchPropertyName - Name of the quick search field
 * @param baseSearchForm - Optional base SearchForm to clone
 * @param orFields - Additional fields that are searched with OR condition in quick search
 * @returns New SearchForm instance
 */
export declare function urlStateToSearchForm(urlState: ListGridUrlState, quickSearchPropertyName?: string, baseSearchForm?: SearchForm, orFields?: string[]): SearchForm;
/**
 * Merge URL state with sessionStorage state
 * Priority: URL > sessionStorage > default
 *
 * @param urlState - State from URL
 * @param sessionSearchForm - SearchForm from sessionStorage (can be undefined)
 * @param quickSearchPropertyName - Quick search field name
 * @param orFields - Additional fields that are searched with OR condition in quick search
 * @returns Merged SearchForm
 */
export declare function mergeUrlAndSessionState(urlState: ListGridUrlState, sessionSearchForm: SearchForm | undefined, quickSearchPropertyName?: string, orFields?: string[]): SearchForm;
/**
 * Extract quick search value from SearchForm
 * @param searchForm - SearchForm to extract from
 * @param quickSearchPropertyName - Quick search field name
 * @param orFields - Additional fields that are searched with OR condition (for determining mode)
 * @returns Quick search value or empty string
 */
export declare function getQuickSearchFromSearchForm(searchForm: SearchForm, quickSearchPropertyName?: string, orFields?: string[]): string;
/**
 * Check if two URL states are equal
 */
export declare function areUrlStatesEqual(a: ListGridUrlState, b: ListGridUrlState): boolean;
//# sourceMappingURL=searchFormUrlSync.d.ts.map