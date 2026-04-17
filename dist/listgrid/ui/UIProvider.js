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
export class FileFieldValue {
    constructor() {
        this.existFiles = [];
        this.newFiles = [];
        this.deleteFiles = [];
    }
    static create(data) {
        const value = new FileFieldValue();
        if (!data)
            return value;
        if (data instanceof FileFieldValue) {
            value.newFiles = [...(data.newFiles || [])];
            value.existFiles = [...(data.existFiles || [])];
            value.deleteFiles = [...(data.deleteFiles || [])];
            return value;
        }
        value.newFiles = data.newFiles ?? [];
        value.existFiles = data.existFiles ?? [];
        value.deleteFiles = data.deleteFiles ?? [];
        return value;
    }
    addNewValue(fileInfo) {
        if (fileInfo.id === undefined || fileInfo.id === null || fileInfo.id === '')
            return false;
        const exist = this.newFiles.some(v => v.url === fileInfo.url);
        if (!exist) {
            this.newFiles.push(fileInfo);
            return true;
        }
        return false;
    }
    addExistValue(fileInfo) {
        if (fileInfo.id === undefined || fileInfo.id === null || fileInfo.id === '')
            return false;
        const inNew = this.newFiles.some(v => v.url === fileInfo.url);
        if (inNew)
            return false;
        const inExist = this.existFiles.some(v => v.url === fileInfo.url);
        if (inExist)
            return false;
        this.existFiles.push(fileInfo);
        return true;
    }
    addDeleteValue(fileInfo) {
        const already = this.deleteFiles.some(v => v.url === fileInfo.url);
        if (already)
            return undefined;
        let exist = false;
        let result = 'none';
        for (let i = 0; i < this.existFiles.length; i++) {
            if (this.existFiles[i].url === fileInfo.url) {
                fileInfo.id = this.existFiles[i].id;
                this.existFiles.splice(i, 1);
                exist = true;
                result = 'exist';
                break;
            }
        }
        for (let i = 0; i < this.newFiles.length; i++) {
            if (this.newFiles[i].url === fileInfo.url) {
                fileInfo.id = this.newFiles[i].id;
                this.newFiles.splice(i, 1);
                exist = true;
                result = 'new';
                break;
            }
        }
        if (exist) {
            this.deleteFiles.push({ ...fileInfo, deleteType: result });
        }
        return { ...fileInfo, deleteType: result };
    }
    getValue() {
        try {
            return JSON.stringify(this);
        }
        catch {
            return '';
        }
    }
    getCurrentFileList() {
        const all = [...this.existFiles, ...this.newFiles];
        return all.filter(file => !this.deleteFiles.some(d => d.url === file.url));
    }
    isDirty() {
        return (this.newFiles.length > 0 ||
            (this.deleteFiles.length > 0 && this.existFiles.length > 0));
    }
    hasValue() {
        return (this.existFiles.length > 0 ||
            this.newFiles.length > 0 ||
            this.deleteFiles.length > 0);
    }
    rollbackDeleteFile(file) {
        for (let i = 0; i < this.deleteFiles.length; i++) {
            if (this.deleteFiles[i].url === file.url) {
                this.deleteFiles.splice(i, 1);
                if (file.deleteType === 'new') {
                    this.newFiles.push({ ...file, deleteType: undefined });
                }
                else if (file.deleteType === 'exist') {
                    this.existFiles.push({ ...file, deleteType: undefined });
                }
                break;
            }
        }
    }
    getRenderKey() {
        let key = '';
        this.existFiles.forEach(v => { key += 'exist_' + v.id; });
        this.newFiles.forEach(v => { key += 'new_' + v.id; });
        this.deleteFiles.forEach(v => { key += 'delete_' + v.id; });
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = ((hash << 5) - hash) + key.charCodeAt(i);
            hash = hash & hash;
        }
        return String(hash);
    }
    clone() {
        const c = new FileFieldValue();
        c.deleteFiles = [...this.deleteFiles];
        c.existFiles = [...this.existFiles];
        c.newFiles = [...this.newFiles];
        return c;
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
// Previously returned the Tailwind string "bg-gray-100 opacity-60 cursor-not-allowed".
// Now returns the library's scoped class so hosts without Tailwind still get
// the readonly visual via @rcm/listgrid/styles.css.
export function readonlyClass(readonly, extra = '') {
    return readonly ? `rcm-readonly ${extra}`.trim() : extra;
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