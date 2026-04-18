/**
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import React, { ReactNode } from 'react';
import { EntityForm } from '../../../config/EntityForm';
export interface EntityFormScopeContextValue {
    depth: number;
    maxInlineDepth: number;
    isInlineMode: boolean;
    forceModalMode: boolean;
    expandedItems: string[];
    maxExpandedItems: number;
    expansionMode: 'single' | 'multiple';
    canExpand: boolean;
    toggleExpansion?: (id: string) => void;
    collapseItem?: (id: string) => void;
    collapseAll?: () => void;
    parentEntityForm?: EntityForm;
}
declare const EntityFormScopeContext: React.Context<EntityFormScopeContextValue>;
export interface EntityFormScopeProviderProps {
    children: ReactNode;
    depth?: number;
    maxInlineDepth?: number;
    maxExpandedItems?: number;
    expansionMode?: 'single' | 'multiple';
    forceModalMode?: boolean;
    parentEntityForm?: EntityForm;
}
/**
 * Provider component for EntityFormScope context
 *
 * Manages nesting depth, inline/modal mode, and expansion state
 */
export declare function EntityFormScopeProvider({ children, depth, maxInlineDepth, maxExpandedItems, expansionMode, forceModalMode, parentEntityForm, }: EntityFormScopeProviderProps): import("react/jsx-runtime").JSX.Element;
/**
 * Hook to access EntityFormScope context
 *
 * @returns Current scope context value
 */
export declare function useEntityFormScope(): EntityFormScopeContextValue;
export default EntityFormScopeContext;
//# sourceMappingURL=EntityFormScopeContext.d.ts.map