'use client';
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { useCallback, useRef } from 'react';
import { parseAsString, useQueryStates } from "../../../urlState";
import { hasUrlParams, parseAsFilters, parseAsPage, parseAsPageSize, parseAsSort, } from './urlStateParsers';
import { areUrlStatesEqual, mergeUrlAndSessionState, searchFormToUrlState, } from './searchFormUrlSync';
/**
 * Resolve UrlSyncOptions from boolean or object
 */
function resolveUrlSyncOptions(urlSync, isMainEntity) {
    // If explicitly false, disable
    if (urlSync === false) {
        return { enabled: false };
    }
    // If true or undefined, use defaults
    if (urlSync === true || urlSync === undefined) {
        return {
            enabled: isMainEntity, // Default: enabled only for main entities
            includeFilters: true,
            includeSort: true,
            includePageSize: true,
            sessionStorageFallback: true,
        };
    }
    // Merge provided options with defaults
    return {
        enabled: urlSync.enabled ?? isMainEntity,
        includeFilters: urlSync.includeFilters ?? true,
        includeSort: urlSync.includeSort ?? true,
        includePageSize: urlSync.includePageSize ?? true,
        sessionStorageFallback: urlSync.sessionStorageFallback ?? true,
    };
}
/**
 * Custom hook for ListGrid URL state synchronization using nuqs
 */
export function useListGridUrlState(options) {
    const { urlSync, isMainEntity, quickSearchPropertyName, orFields, sessionSearchForm } = options;
    const resolvedOptions = resolveUrlSyncOptions(urlSync, isMainEntity);
    const isEnabled = resolvedOptions.enabled ?? false;
    // Track last synced state to prevent unnecessary updates
    const lastSyncedStateRef = useRef(null);
    // Use nuqs for URL state management
    const [urlState, setUrlState] = useQueryStates({
        page: parseAsPage,
        pageSize: parseAsPageSize,
        q: parseAsString,
        sort: parseAsSort,
        filters: parseAsFilters,
    }, {
        // Use replace instead of push to avoid polluting browser history
        history: 'replace',
        // Shallow routing to avoid full page reload
        shallow: true,
    });
    // Check if URL has any ListGrid params
    const urlHasParams = hasUrlParams(urlState);
    /**
     * Sync SearchForm state to URL
     */
    const syncToUrl = useCallback((searchForm) => {
        if (!isEnabled)
            return;
        const newUrlState = searchFormToUrlState(searchForm, quickSearchPropertyName, orFields);
        // Apply options to filter what goes to URL
        const filteredState = {
            page: newUrlState.page,
            pageSize: resolvedOptions.includePageSize ? newUrlState.pageSize : null,
            q: newUrlState.q,
            sort: resolvedOptions.includeSort ? newUrlState.sort : null,
            filters: resolvedOptions.includeFilters ? newUrlState.filters : null,
        };
        // Skip if state hasn't changed
        if (lastSyncedStateRef.current &&
            areUrlStatesEqual(lastSyncedStateRef.current, filteredState)) {
            return;
        }
        lastSyncedStateRef.current = filteredState;
        // Update URL
        setUrlState({
            page: filteredState.page,
            pageSize: filteredState.pageSize,
            q: filteredState.q,
            sort: filteredState.sort,
            filters: filteredState.filters,
        });
    }, [isEnabled, quickSearchPropertyName, orFields, resolvedOptions, setUrlState]);
    /**
     * Get initial SearchForm from URL or session storage
     */
    const getInitialSearchForm = useCallback((baseSearchForm) => {
        if (!isEnabled) {
            // URL sync disabled, use session if available
            return sessionSearchForm?.clone() ?? baseSearchForm.clone();
        }
        // Merge URL state with session state (URL priority)
        const mergedForm = mergeUrlAndSessionState(urlState, resolvedOptions.sessionStorageFallback ? sessionSearchForm : undefined, quickSearchPropertyName, orFields);
        // Apply base form settings if merged form is empty
        if (!hasUrlParams(urlState) && !sessionSearchForm) {
            return baseSearchForm.clone();
        }
        // Copy settings from base form that aren't in URL
        if (!urlState.pageSize && baseSearchForm.getPageSize()) {
            mergedForm.withPageSize(baseSearchForm.getPageSize());
        }
        return mergedForm;
    }, [isEnabled, urlState, sessionSearchForm, quickSearchPropertyName, orFields, resolvedOptions]);
    /**
     * Clear all URL params
     */
    const clearUrlParams = useCallback(() => {
        if (!isEnabled)
            return;
        lastSyncedStateRef.current = null;
        setUrlState({
            page: null,
            pageSize: null,
            q: null,
            sort: null,
            filters: null,
        });
    }, [isEnabled, setUrlState]);
    return {
        urlState: urlState,
        isEnabled,
        hasUrlParams: urlHasParams,
        syncToUrl,
        getInitialSearchForm,
        clearUrlParams,
    };
}
export default useListGridUrlState;
//# sourceMappingURL=useListGridUrlState.js.map