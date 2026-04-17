// i18n contract: library emits translation keys (e.g. "common.save",
// "menu.academic.admission.notice"), host maps them to strings.
//
// Usage:
//   import { configureTranslator } from '@rcm/listgrid';
//   configureTranslator(() => ({ t: myI18n.t, i18n: myI18n, initLocale: ... }));
//
// Library code then calls `getTranslation().t('key')` and gets the host's
// translation. When no host is configured, `t(key)` returns the key itself
// (identity translator) so UI is still renderable.
let _factory;
export function configureTranslator(factory) {
    _factory = factory;
}
const DEFAULT_TRANSLATOR = {
    t: (key, fallback) => fallback ?? key,
    i18n: {},
    initLocale: () => { },
};
export function getTranslation() {
    if (_factory) {
        try {
            return _factory();
        }
        catch (e) {
            console.warn('[@rcm/listgrid] configured translator factory threw; falling back to identity.', e);
            return DEFAULT_TRANSLATOR;
        }
    }
    return DEFAULT_TRANSLATOR;
}
//# sourceMappingURL=i18n.js.map