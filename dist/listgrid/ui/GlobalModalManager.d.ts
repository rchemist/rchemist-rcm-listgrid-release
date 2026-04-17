/**
 * GlobalModalManager — renders the library's modal stack.
 *
 * Library field components (e.g. `<ManyToOneField>`) call
 * `useModalManagerStore().openModal(...)` to push a modal onto the stack.
 * Without this renderer mounted in the tree, nothing displays — the store
 * updates but no component subscribes.
 *
 * Mount once in your app layout, ABOVE the pages that use listgrid forms:
 *
 *   import { GlobalModalManager } from '@rcm/listgrid';
 *
 *   <UIProvider components={...}>
 *     <GlobalModalManager />
 *     {children}
 *   </UIProvider>
 *
 * Host apps that already ship their own modal manager wired to a separate
 * store (e.g. `@gjcu/ui/modals/GlobalModalManager`) still need THIS component
 * — the two stores are independent zustand instances and do not share state.
 */
export declare const GlobalModalManager: () => import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=GlobalModalManager.d.ts.map