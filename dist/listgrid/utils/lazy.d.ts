import React, { ComponentType } from 'react';
export interface LazyImportOptions {
    loading?: () => React.ReactNode;
    /** Ignored. Kept for next/dynamic API parity. */
    ssr?: boolean;
}
export declare function lazyImport<P = any>(loader: () => Promise<{
    default: ComponentType<any>;
}>, options?: LazyImportOptions): ComponentType<P>;
export { lazyImport as dynamic };
//# sourceMappingURL=lazy.d.ts.map