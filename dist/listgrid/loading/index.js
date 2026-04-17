// Stage 3c — optional host-supplied global loading state.
//
// The original @gjcu/ui/layout/BaseLoading exposed a zustand store with
// `setOpenBaseLoading`. Host apps that want a global spinner overlay call
// `configureLoading({ setOpenBaseLoading })`; otherwise calls no-op.
let _store = {
    openBaseLoading: false,
    setOpenBaseLoading: (open) => {
        _store.openBaseLoading = open;
    },
};
export function configureLoading(store) {
    _store = store;
}
export function useLoadingStore() {
    return _store;
}
//# sourceMappingURL=index.js.map