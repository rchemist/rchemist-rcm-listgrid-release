import { SearchForm } from '../../../form/SearchForm';
/**
 * Configuration for card subcollection data fetching
 */
export interface CardSubCollectionDataConfig {
    /** Field name that maps the child to parent (e.g., 'parentId') */
    mappedBy: string;
    /** Filter field name (defaults to mappedBy) */
    filterBy?: string;
    /** Optional filters to apply */
    filters?: Record<string, any>;
    /** Whether to use SearchForm-based fetching (POST request) */
    useSearchForm?: boolean;
    /** SearchForm instance for fetching (when useSearchForm is true) */
    searchForm?: SearchForm;
}
/**
 * Hook for fetching card subcollection data
 * Fetches all data at once (no pagination) from the specified URL
 *
 * Supports two modes:
 * 1. Simple GET request (default) - fetches from URL directly
 * 2. SearchForm-based POST request - uses PageResult.fetchListData
 *
 * @param fetchUrl - String URL or function returning URL
 * @param config - Card subcollection configuration
 * @returns Object with data, loading, error states and refresh function
 */
export declare function useCardSubCollectionData(fetchUrl: string | (() => string), config: CardSubCollectionDataConfig): {
    data: any[];
    loading: boolean;
    error: Error | null;
    refresh: () => Promise<void>;
};
//# sourceMappingURL=useCardSubCollectionData.d.ts.map