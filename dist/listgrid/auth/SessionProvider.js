// Stage 3a placeholder for host-supplied signOut().
// Non-component code (e.g. PageResult.fetchListData) cannot read React context,
// so sign-out needs a module-scope registry. Full integration lands in Stage 5
// (ApiClientProvider / host services registry).
let _signOut;
export function registerSignOut(fn) {
    _signOut = fn;
}
export async function signOut() {
    if (_signOut) {
        await _signOut();
        return;
    }
    console.warn('[@rcm/listgrid] signOut() called but no host implementation is registered. ' +
        'Call registerSignOut(yourImpl) at app bootstrap.');
}
//# sourceMappingURL=SessionProvider.js.map