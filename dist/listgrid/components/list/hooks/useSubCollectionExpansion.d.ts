/**
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
export interface UseSubCollectionExpansionOptions {
    maxExpandedItems?: number;
    expansionMode?: 'single' | 'multiple';
    onExpand?: (id: string) => void;
    onCollapse?: (id: string) => void;
}
export interface UseSubCollectionExpansionReturn {
    expandedItems: string[];
    isExpanded: (id: string) => boolean;
    toggleExpansion: (id: string) => void;
    collapseItem: (id: string) => void;
    collapseAll: () => void;
    canExpand: boolean;
}
/**
 * Hook to manage SubCollection expansion state with FIFO auto-collapse
 *
 * @param options Configuration options
 * @returns Expansion state and control functions
 */
export declare function useSubCollectionExpansion(options?: UseSubCollectionExpansionOptions): UseSubCollectionExpansionReturn;
//# sourceMappingURL=useSubCollectionExpansion.d.ts.map