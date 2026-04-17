import { cn } from './cn';
/**
 * Merge a component's built-in default class for a slot with a host override
 * from the `classNames` prop. Built-ins come first so host overrides can win
 * on the right when using tailwind-merge / plain cascade.
 *
 * Example:
 *   <input className={mergeSlot('rcm-field-input', classNames?.input)} />
 */
export function mergeSlot(base, override) {
    if (!override)
        return base;
    return cn(base, override);
}
/**
 * Convenience when a component wants to expose a `classNames` slot map and
 * resolve it up-front rather than calling `mergeSlot` per slot.
 */
export function resolveSlots(defaults, overrides) {
    if (!overrides)
        return defaults;
    const out = { ...defaults };
    for (const key of Object.keys(overrides)) {
        const value = overrides[key];
        if (value)
            out[key] = cn(defaults[key], value);
    }
    return out;
}
//# sourceMappingURL=classNames.js.map