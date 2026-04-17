/**
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { useState, useCallback } from 'react';
/**
 * Hook to manage SubCollection expansion state with FIFO auto-collapse
 *
 * @param options Configuration options
 * @returns Expansion state and control functions
 */
export function useSubCollectionExpansion(options = {}) {
    const { maxExpandedItems = 3, expansionMode = 'multiple', onExpand, onCollapse, } = options;
    const [expandedItems, setExpandedItems] = useState([]);
    const isExpanded = useCallback((id) => expandedItems.includes(id), [expandedItems]);
    const canExpand = expandedItems.length < maxExpandedItems;
    const toggleExpansion = useCallback((id) => {
        setExpandedItems(prev => {
            const isCurrentlyExpanded = prev.includes(id);
            if (isCurrentlyExpanded) {
                // Collapse
                onCollapse?.(id);
                return prev.filter(item => item !== id);
            }
            else {
                // Expand
                let newExpandedItems;
                if (expansionMode === 'single') {
                    // Single mode: only one item expanded at a time
                    newExpandedItems = [id];
                }
                else {
                    // Multiple mode: maintain multiple expansions
                    newExpandedItems = [...prev, id];
                    // Enforce max expanded items with FIFO
                    if (newExpandedItems.length > maxExpandedItems) {
                        newExpandedItems = newExpandedItems.slice(-maxExpandedItems);
                    }
                }
                // Trigger expand callback
                onExpand?.(id);
                return newExpandedItems;
            }
        });
    }, [expansionMode, maxExpandedItems, onExpand, onCollapse]);
    const collapseItem = useCallback((id) => {
        setExpandedItems(prev => {
            if (prev.includes(id)) {
                onCollapse?.(id);
                return prev.filter(item => item !== id);
            }
            return prev;
        });
    }, [onCollapse]);
    const collapseAll = useCallback(() => {
        setExpandedItems([]);
    }, []);
    return {
        expandedItems,
        isExpanded,
        toggleExpansion,
        collapseItem,
        collapseAll,
        canExpand,
    };
}
//# sourceMappingURL=useSubCollectionExpansion.js.map