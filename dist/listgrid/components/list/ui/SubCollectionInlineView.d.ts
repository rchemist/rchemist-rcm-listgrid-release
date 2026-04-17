/**
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import React from 'react';
import { EntityForm } from '../../../config/EntityForm';
export interface SubCollectionInlineViewProps {
    entityForm: EntityForm;
    itemId: string;
    isExpanded: boolean;
    onCollapse: () => void;
    readonly?: boolean;
    onSave?: () => void;
    onDelete?: () => void;
    /** SubCollection mappedBy 필드 - ViewEntityForm에서 부모 참조 필드 자동 숨김 */
    mappedBy?: string;
}
/**
 * Inline view component for SubCollection expansion
 *
 * Renders ViewEntityForm in an elegant inline panel with:
 * - Smooth expand/collapse animation
 * - Refined panel styling with shadow and border
 * - Custom header with collapse button
 * - No "목록" button (replaced with close functionality)
 */
export declare const SubCollectionInlineView: React.MemoExoticComponent<({ entityForm, itemId, isExpanded, onCollapse, readonly, onSave, onDelete, mappedBy, }: SubCollectionInlineViewProps) => import("react/jsx-runtime").JSX.Element>;
//# sourceMappingURL=SubCollectionInlineView.d.ts.map