import React from 'react';
import { ListableFormField } from '../../fields/abstract';
interface FieldSelectorProps {
    availableFields: ListableFormField<any>[];
    selectedFieldNames: Set<string>;
    onToggleField: (fieldName: string) => void;
    onSelectAll: () => void;
    onDeselectAll: () => void;
}
export declare const FieldSelector: React.MemoExoticComponent<({ availableFields, selectedFieldNames, onToggleField, onSelectAll, onDeselectAll, }: FieldSelectorProps) => import("react/jsx-runtime").JSX.Element>;
export {};
//# sourceMappingURL=FieldSelector.d.ts.map