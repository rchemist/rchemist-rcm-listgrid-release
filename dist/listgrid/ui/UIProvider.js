import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
const UIContext = createContext(null);
export function UIProvider({ components, children }) {
    return _jsx(UIContext.Provider, { value: components, children: children });
}
export function useUI() {
    const ctx = useContext(UIContext);
    if (ctx === null) {
        throw new Error('[@rcm/listgrid] useUI must be called within a <UIProvider>. ' +
            'Wrap your app with <UIProvider components={...}> imported from @rcm/listgrid.');
    }
    return ctx;
}
// Thin wrapper factory — each wrapper defers to the host-provided component
// at render time via Context lookup. Typed as `any` so wrappers can carry
// compound sub-components (e.g. Table.Th) as static properties without TS
// complaining, matching the original @gjcu/ui API surface.
// React inspects components for these properties during rendering. If our
// Proxy intercepts them and returns wrapper components, React mistakes the
// function component for a class component and emits noisy warnings. Only
// PascalCase names (conventional compound children like Table.Th) are
// forwarded through the compound mechanism; everything else falls through
// to the real wrapper function's own properties.
const REACT_INTROSPECTION_PROPS = new Set([
    'childContextTypes',
    'contextTypes',
    'contextType',
    'getDerivedStateFromProps',
    'defaultProps',
    'propTypes',
    'displayName',
    'render',
    'type',
    '$$typeof',
    'compare',
    'name',
    'length',
    'prototype',
    'call',
    'apply',
    'bind',
    'toString',
]);
function makeWrapper(name) {
    const Wrapper = (props) => {
        const comps = useUI();
        const Component = comps[name];
        if (!Component) {
            throw new Error(`[@rcm/listgrid] UI component "${String(name)}" missing from UIProvider.`);
        }
        return _jsx(Component, { ...props });
    };
    Wrapper.displayName = `rcm.${String(name)}`;
    return new Proxy(Wrapper, {
        get(target, prop, receiver) {
            if (prop in target)
                return Reflect.get(target, prop, receiver);
            if (typeof prop === 'symbol')
                return Reflect.get(target, prop, receiver);
            if (REACT_INTROSPECTION_PROPS.has(prop))
                return undefined;
            // Only treat PascalCase names as compound children. Lowercase access
            // (React internal checks, stray property access) returns undefined.
            const key = prop;
            if (!/^[A-Z]/.test(key))
                return undefined;
            const SubWrapper = (subProps) => {
                const comps = useUI();
                const Parent = comps[name];
                if (!Parent) {
                    throw new Error(`[@rcm/listgrid] UI component "${String(name)}" missing from UIProvider.`);
                }
                const Sub = Parent[key];
                if (!Sub) {
                    throw new Error(`[@rcm/listgrid] Compound "${String(name)}.${key}" missing on host component.`);
                }
                return _jsx(Sub, { ...subProps });
            };
            SubWrapper.displayName = `rcm.${String(name)}.${key}`;
            return SubWrapper;
        },
    });
}
export const Alert = makeWrapper('Alert');
export const Badge = makeWrapper('Badge');
export const BooleanRadio = makeWrapper('BooleanRadio');
export const Box = makeWrapper('Box');
export const Breadcrumb = makeWrapper('Breadcrumb');
export const BreadcrumbItem = makeWrapper('BreadcrumbItem');
export const Button = makeWrapper('Button');
export const CheckBox = makeWrapper('CheckBox');
export const CheckBoxChip = makeWrapper('CheckBoxChip');
export const CheckButtonValidationInput = makeWrapper('CheckButtonValidationInput');
export const ColorInput = makeWrapper('ColorInput');
export const Dropdown = makeWrapper('Dropdown');
export const EmailDomainCheckButtonInput = makeWrapper('EmailDomainCheckButtonInput');
export const EmailDomainInput = makeWrapper('EmailDomainInput');
export const FileUploadInput = makeWrapper('FileUploadInput');
export const Flex = makeWrapper('Flex');
export const FlatPickrDateField = makeWrapper('FlatPickrDateField');
export const Grid = makeWrapper('Grid');
export const Group = makeWrapper('Group');
export const Indicator = makeWrapper('Indicator');
export const InlineMap = makeWrapper('InlineMap');
export const LazyFileUploadInput = makeWrapper('LazyFileUploadInput');
export const LinearIndicator = makeWrapper('LinearIndicator');
export const LoadingOverlay = makeWrapper('LoadingOverlay');
export const MarkdownEditor = makeWrapper('MarkdownEditor');
export const Modal = makeWrapper('Modal');
export const MultiSelectBox = makeWrapper('MultiSelectBox');
export const NumberInput = makeWrapper('NumberInput');
export const Pagination = makeWrapper('Pagination');
export const Paper = makeWrapper('Paper');
export const PasswordStrength = makeWrapper('PasswordStrength');
export const PasswordStrengthView = makeWrapper('PasswordStrengthView');
export const Popover = makeWrapper('Popover');
export const RadioChip = makeWrapper('RadioChip');
export const RadioInput = makeWrapper('RadioInput');
export const SafePerfectScrollbar = makeWrapper('SafePerfectScrollbar');
export const SelectBox = makeWrapper('SelectBox');
export const SimpleGrid = makeWrapper('SimpleGrid');
export const Skeleton = makeWrapper('Skeleton');
export const Stack = makeWrapper('Stack');
export const Stepper = makeWrapper('Stepper');
export const Table = makeWrapper('Table');
export const TagsInput = makeWrapper('TagsInput');
export const Textarea = makeWrapper('Textarea');
export const TextInput = makeWrapper('TextInput');
export const Tooltip = makeWrapper('Tooltip');
export const TooltipCard = makeWrapper('TooltipCard');
export const Tree = makeWrapper('Tree');
export const UserView = makeWrapper('UserView');
// FileFieldValue is used both as a type annotation AND with `instanceof` in the
// original source (e.g., FileField.tsx). Ship a class so instanceof checks work;
// the class itself is a minimal any-shape holder.
export class FileFieldValue {
    constructor() {
        this.existFiles = [];
        this.newFiles = [];
    }
    static create(...args) {
        const v = new FileFieldValue();
        // Minimal behavior: host can override via subclass if richer factory
        // semantics are needed. Args ignored here.
        void args;
        return v;
    }
}
// Constants whose concrete values host apps may override through other means.
export const DEFAULT_EMAIL_DOMAINS = [
    'gmail.com',
    'naver.com',
    'daum.net',
    'kakao.com',
    'hanmail.net',
    'nate.com',
];
export function readonlyClass(readonly, extra = '') {
    return readonly ? `bg-gray-100 opacity-60 cursor-not-allowed ${extra}`.trim() : extra;
}
// NumberInput-adjacent value helpers. Kept as any wrappers.
export const Currency = {};
export const Double = {};
// Tiptap-adjacent helper used in validations.
export function getPlainText(html) {
    if (!html)
        return '';
    return String(html).replace(/<[^>]*>/g, '');
}
//# sourceMappingURL=UIProvider.js.map