import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense, lazy } from 'react';
// intentional: generic component loading mirrors next/dynamic ComponentType<any> contract
export function lazyImport(loader, options = {}) {
    const Lazy = lazy(loader);
    const fallback = options.loading ? options.loading() : null;
    const Wrapped = (props) => (_jsx(Suspense, { fallback: fallback, children: _jsx(Lazy, { ...props }) }));
    Wrapped.displayName = 'LazyImport';
    return Wrapped;
}
// Named as `dynamic` so call sites can `import { dynamic } from '.../utils/lazy'`
// and preserve the original `dynamic(...)` call shape.
export { lazyImport as dynamic };
//# sourceMappingURL=lazy.js.map