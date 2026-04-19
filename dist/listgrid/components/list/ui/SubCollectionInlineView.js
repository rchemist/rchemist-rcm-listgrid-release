/**
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import { ViewEntityForm } from '../../form/ViewEntityForm';
/**
 * Inline view component for SubCollection expansion
 *
 * Renders ViewEntityForm in an elegant inline panel with:
 * - Smooth expand/collapse animation
 * - Refined panel styling with shadow and border
 * - Custom header with collapse button
 * - No "목록" button (replaced with close functionality)
 */
export const SubCollectionInlineView = memo(({ entityForm, itemId, isExpanded, onCollapse, readonly = false, onSave, onDelete, mappedBy, }) => {
    // buttonLinks에서 onClickList를 onCollapse로 대체
    const buttonLinks = {
        onClickList: async () => {
            onCollapse();
        },
        ...(onSave
            ? {
                onSave: {
                    success: () => {
                        onSave();
                    },
                },
            }
            : {}),
        ...(onDelete
            ? {
                onDelete: {
                    success: () => {
                        onDelete();
                        onCollapse();
                    },
                },
            }
            : {}),
    };
    return (_jsx("div", { "data-testid": "subcollection-inline-view", className: `
          subcollection-inline-view
          transition-all duration-300 ease-in-out
          overflow-hidden
          ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
        `, children: _jsxs("div", { className: "\n          ml-4\n          border-l-4 border-primary/30\n          bg-white/50 dark:bg-gray-900/50\n          rounded-r-lg\n          overflow-x-hidden\n          max-w-full\n        ", children: [_jsx("div", { className: "\n            bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary-light\n            text-xs font-medium\n            px-3 py-1.5\n            border-b border-primary/10\n          ", children: "\uC0C1\uC138 \uC815\uBCF4" }), _jsx("div", { className: "pl-4 pt-2", children: _jsx(ViewEntityForm, { entityForm: entityForm, readonly: readonly, excludeButtons: ['list'], hideTitle: true, buttonLinks: buttonLinks, buttonPosition: "header", subCollection: true, inlineMode: true, ...(mappedBy !== undefined ? { hideMappedByFields: mappedBy } : {}) }) })] }) }));
});
SubCollectionInlineView.displayName = 'SubCollectionInlineView';
//# sourceMappingURL=SubCollectionInlineView.js.map