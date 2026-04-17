import { SearchForm } from '../../../form/SearchForm';
import { ListGridUrlState } from './urlStateParsers';
export interface UrlSyncOptions {
    /** Enable URL sync (default: true for main entities) */
    enabled?: boolean;
    /** Include filters in URL (default: true) */
    includeFilters?: boolean;
    /** Include sort in URL (default: true) */
    includeSort?: boolean;
    /** Include pageSize in URL (default: true) */
    includePageSize?: boolean;
    /** Use sessionStorage as fallback (default: true) */
    sessionStorageFallback?: boolean;
}
export interface UseListGridUrlStateOptions {
    /** URL sync configuration */
    urlSync?: UrlSyncOptions | boolean;
    /** Whether this is a main entity (not subCollection) */
    isMainEntity: boolean;
    /** Quick search property name */
    quickSearchPropertyName?: string;
    /** Additional fields for OR condition quick search */
    orFields?: string[];
    /** Session storage SearchForm (for fallback) */
    sessionSearchForm?: SearchForm;
}
export interface UseListGridUrlStateReturn {
    /** Current URL state */
    urlState: ListGridUrlState;
    /** Whether URL sync is enabled */
    isEnabled: boolean;
    /** Whether URL has params (user navigated via deep link) */
    hasUrlParams: boolean;
    /** Sync SearchForm state to URL */
    syncToUrl: (searchForm: SearchForm) => void;
    /** Get initial SearchForm from URL or session */
    getInitialSearchForm: (baseSearchForm: SearchForm) => SearchForm;
    /** Clear all URL params */
    clearUrlParams: () => void;
}
/**
 * Custom hook for ListGrid URL state synchronization using nuqs
 */
export declare function useListGridUrlState(options: UseListGridUrlStateOptions): UseListGridUrlStateReturn;
export default useListGridUrlState;
//# sourceMappingURL=useListGridUrlState.d.ts.map