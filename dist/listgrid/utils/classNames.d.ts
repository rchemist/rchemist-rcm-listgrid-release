/**
 * Per-slot override map accepted by field components.
 * Keys are component-defined slot names (e.g. `root`, `input`, `label`, `error`).
 * Values are any className string — Tailwind, scoped `rcm-*` classes, or CSS
 * module identifiers; the merger treats them as opaque strings.
 */
export type ClassNamesMap<K extends string> = Partial<Record<K, string>>;
/**
 * Merge a component's built-in default class for a slot with a host override
 * from the `classNames` prop. Built-ins come first so host overrides can win
 * on the right when using tailwind-merge / plain cascade.
 *
 * Example:
 *   <input className={mergeSlot('rcm-field-input', classNames?.input)} />
 */
export declare function mergeSlot(base: string, override?: string): string;
/**
 * Convenience when a component wants to expose a `classNames` slot map and
 * resolve it up-front rather than calling `mergeSlot` per slot.
 */
export declare function resolveSlots<K extends string>(defaults: Record<K, string>, overrides?: ClassNamesMap<K>): Record<K, string>;
//# sourceMappingURL=classNames.d.ts.map