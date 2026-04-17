/**
 * ListGrid Performance Logger
 *
 * Enable/disable via environment variable:
 * NEXT_PUBLIC_DEBUG_LISTGRID_PERFORMANCE=true (or false)
 *
 * To remove all performance logging:
 * 1. Delete this file
 * 2. Remove imports and usage from ViewListGrid.tsx and useListGridLogic.ts
 */
export declare const perfLog: {
    mounted: (duration: number, context: {
        entityUrl?: string;
        isSubCollection?: boolean;
    }) => void;
    unmounted: (context: {
        entityUrl?: string;
    }) => void;
    rowsRendered: (context: {
        entityUrl?: string;
        rowCount: number;
        totalCount?: number;
        timeSinceMount: string;
    }) => void;
    loadingStarted: (context: {
        entityUrl?: string;
    }) => void;
    loadingCompleted: (duration: number, context: {
        entityUrl?: string;
        rowCount: number;
        totalCount?: number;
    }) => void;
    apiStarted: (context: {
        entityUrl?: string;
        page?: number;
        pageSize?: number;
    }) => void;
    apiCompleted: (duration: number, context: {
        entityUrl?: string;
        rowCount: number;
        totalCount?: number;
        page?: number;
    }) => void;
    apiError: (duration: number, context: {
        entityUrl?: string;
        errors: string[];
    }) => void;
};
//# sourceMappingURL=performanceLogger.d.ts.map