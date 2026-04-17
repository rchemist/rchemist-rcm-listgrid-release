// Stage 3a stub — i18n integration deferred.
// The original packages/ui/utils/i18n.ts loads ~15 locale JSON assets which are
// overkill to inline here. Host apps that need translations will eventually pass
// a translator via a provider; this stub is the identity translator.
//
// Usage pattern from original codebase: `const { t } = getTranslation();`
// then `t('some.key')`. Our stub returns the key unchanged.
export function getTranslation(_locale) {
    return {
        t: (key, _fallback) => key,
    };
}
//# sourceMappingURL=i18n.js.map