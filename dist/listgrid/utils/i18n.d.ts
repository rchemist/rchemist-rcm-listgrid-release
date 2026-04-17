export interface TranslatorI18n {
    language?: string;
    changeLanguage?(lang: string): void;
}
export interface Translator {
    t: (key: string, fallback?: string) => string;
    i18n?: TranslatorI18n;
    initLocale?: (themeLocale: string) => void;
}
/**
 * Host apps pass a FACTORY (not a fixed translator) because language may
 * change per call. The factory is invoked on every `getTranslation()` call.
 */
export type TranslatorFactory = () => Translator;
export declare function configureTranslator(factory: TranslatorFactory): void;
export declare function getTranslation(): Translator;
//# sourceMappingURL=i18n.d.ts.map