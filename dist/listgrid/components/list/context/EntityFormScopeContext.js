import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { createContext, useContext, useMemo } from 'react';
import { useSubCollectionExpansion } from '../hooks/useSubCollectionExpansion';
const defaultContextValue = {
    depth: 0,
    maxInlineDepth: 1,
    isInlineMode: true,
    forceModalMode: false,
    expandedItems: [],
    maxExpandedItems: 3,
    expansionMode: 'multiple',
    canExpand: true,
};
const EntityFormScopeContext = createContext(defaultContextValue);
/**
 * Provider component for EntityFormScope context
 *
 * Manages nesting depth, inline/modal mode, and expansion state
 */
export function EntityFormScopeProvider({ children, depth = 0, maxInlineDepth, maxExpandedItems, expansionMode, forceModalMode = false, parentEntityForm, }) {
    const parentScope = useContext(EntityFormScopeContext);
    // If nested, inherit some values from parent (use defaults only at root level)
    const effectiveDepth = depth;
    const effectiveMaxInlineDepth = maxInlineDepth ?? parentScope.maxInlineDepth;
    const effectiveMaxExpandedItems = maxExpandedItems ?? parentScope.maxExpandedItems;
    const effectiveExpansionMode = expansionMode ?? parentScope.expansionMode;
    const effectiveForceModalMode = forceModalMode || parentScope.forceModalMode;
    // Calculate isInlineMode based on depth and maxInlineDepth
    const isInlineMode = effectiveDepth <= effectiveMaxInlineDepth && !effectiveForceModalMode;
    // Use expansion hook for managing expanded items
    const { expandedItems, canExpand, toggleExpansion, collapseItem, collapseAll, } = useSubCollectionExpansion({
        maxExpandedItems: effectiveMaxExpandedItems,
        expansionMode: effectiveExpansionMode,
    });
    // Memoize context value to prevent unnecessary re-renders
    const value = useMemo(() => ({
        depth: effectiveDepth,
        maxInlineDepth: effectiveMaxInlineDepth,
        isInlineMode,
        forceModalMode: effectiveForceModalMode,
        expandedItems,
        maxExpandedItems: effectiveMaxExpandedItems,
        expansionMode: effectiveExpansionMode,
        canExpand,
        toggleExpansion,
        collapseItem,
        collapseAll,
        parentEntityForm,
    }), [
        effectiveDepth,
        effectiveMaxInlineDepth,
        isInlineMode,
        effectiveForceModalMode,
        expandedItems,
        effectiveMaxExpandedItems,
        effectiveExpansionMode,
        canExpand,
        toggleExpansion,
        collapseItem,
        collapseAll,
        parentEntityForm,
    ]);
    return (_jsx(EntityFormScopeContext.Provider, { value: value, children: children }));
}
/**
 * Hook to access EntityFormScope context
 *
 * @returns Current scope context value
 */
export function useEntityFormScope() {
    const context = useContext(EntityFormScopeContext);
    return context;
}
export default EntityFormScopeContext;
//# sourceMappingURL=EntityFormScopeContext.js.map