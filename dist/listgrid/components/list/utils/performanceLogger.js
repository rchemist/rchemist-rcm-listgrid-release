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
import { getRuntimeConfig } from '../../../config/RuntimeConfig';
const isEnabled = () => {
    if (typeof window === 'undefined')
        return false;
    const cfg = getRuntimeConfig();
    if (cfg.debugListGridPerformance === false)
        return false;
    if (cfg.debugListGridPerformance === true)
        return true;
    return cfg.isDevelopment;
};
const PREFIX = '[ListGrid Performance]';
export const perfLog = {
    // ==================== Component Lifecycle ====================
    mounted: (duration, context) => {
        if (!isEnabled())
            return;
        console.log(`${PREFIX} [Component] Mounted in ${duration.toFixed(2)}ms`, context);
    },
    unmounted: (context) => {
        if (!isEnabled())
            return;
        console.log(`${PREFIX} [Component] Unmounted`, context);
    },
    rowsRendered: (context) => {
        if (!isEnabled())
            return;
        console.log(`${PREFIX} [Component] Rows rendered`, context);
    },
    // ==================== Data Loading (React State) ====================
    loadingStarted: (context) => {
        if (!isEnabled())
            return;
        console.log(`${PREFIX} [State] Loading started`, context);
    },
    loadingCompleted: (duration, context) => {
        if (!isEnabled())
            return;
        console.log(`${PREFIX} [State] Loading completed in ${duration.toFixed(2)}ms`, context);
    },
    // ==================== API Call (Network) ====================
    apiStarted: (context) => {
        if (!isEnabled())
            return;
        console.log(`${PREFIX} [API] Request started`, context);
    },
    apiCompleted: (duration, context) => {
        if (!isEnabled())
            return;
        console.log(`${PREFIX} [API] Response received in ${duration.toFixed(2)}ms`, context);
    },
    apiError: (duration, context) => {
        if (!isEnabled())
            return;
        console.log(`${PREFIX} [API] Error after ${duration.toFixed(2)}ms`, context);
    },
};
//# sourceMappingURL=performanceLogger.js.map