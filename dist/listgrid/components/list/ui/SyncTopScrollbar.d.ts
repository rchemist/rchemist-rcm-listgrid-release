import React from 'react';
interface SyncTopScrollbarProps {
    /** Target element ref to sync scroll with */
    targetRef: React.RefObject<HTMLDivElement | null>;
    /** Minimum content width to show scrollbar (default: 0, always show if scrollable) */
    minWidthToShow?: number;
    /** Additional className for the scrollbar container */
    className?: string;
}
/**
 * Synchronized top scrollbar component
 *
 * Creates a scrollbar at the top of the table that syncs with the bottom scrollbar.
 * This improves UX for long lists where users would otherwise need to scroll
 * down to access the horizontal scrollbar.
 */
export declare const SyncTopScrollbar: React.FC<SyncTopScrollbarProps>;
export {};
//# sourceMappingURL=SyncTopScrollbar.d.ts.map