// Stage 3c — host-supplied messaging services.
//
// Called from both React components AND static class methods (e.g. PageResult.fetchListData),
// so we use a module-scope registry rather than React Context. Host apps invoke
// `configureMessages({ ... })` at app bootstrap to inject concrete implementations.
// Default no-op implementations with console warnings.
const DEFAULT = {
    showAlert: (o) => {
        console.warn('[@rcm/listgrid] showAlert called without configured implementation.', o);
        return Promise.resolve();
    },
    showConfirm: (o) => {
        console.warn('[@rcm/listgrid] showConfirm called without configured implementation.', o);
        return Promise.resolve(false);
    },
    showSuccess: (o) => {
        console.warn('[@rcm/listgrid] showSuccess called without configured implementation.', o);
    },
    showToast: (o) => {
        console.warn('[@rcm/listgrid] showToast called without configured implementation.', o);
    },
    showError: (m) => {
        console.warn('[@rcm/listgrid] showError called without configured implementation.', m);
    },
    openToast: (o) => {
        console.warn('[@rcm/listgrid] openToast called without configured implementation.', o);
    },
    clearAllToasts: () => {
        /* noop */
    },
};
let _services = { ...DEFAULT };
export function configureMessages(services) {
    _services = { ...DEFAULT, ..._services, ...services };
}
// Thin wrapper functions matching the original @gjcu/ui/message/messageUtils API.
export function showAlert(options) {
    return _services.showAlert(options);
}
export function showConfirm(options) {
    return _services.showConfirm(options);
}
export function showSuccess(options) {
    return _services.showSuccess(options);
}
export function showToast(options) {
    return _services.showToast(options);
}
export function showError(message) {
    return _services.showError(message);
}
export function openToast(options) {
    return _services.openToast(options);
}
export function clearAllToasts() {
    return _services.clearAllToasts();
}
// The original exported `ShowError` (PascalCase) as well — likely a React component.
// Stub it as a no-op renderless component for now; host apps that need a
// visual error display can override via showError or component props.
export const ShowError = () => null;
//# sourceMappingURL=MessageProvider.js.map