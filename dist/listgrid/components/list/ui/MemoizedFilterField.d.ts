import React from 'react';
import { QueryConditionType } from '../../../form/SearchForm';
import { EntityForm } from '../../../config/EntityForm';
import { ListableFormField } from '../../fields/abstract';
interface MemoizedFilterFieldProps {
    entityForm: EntityForm;
    field: ListableFormField<any>;
    fieldName: string;
    value: any;
    onChange: (name: string, value: any, op?: QueryConditionType) => void;
    isCompact?: boolean;
}
export declare const MemoizedFilterField: React.MemoExoticComponent<({ entityForm, field, fieldName, value, onChange, isCompact, }: MemoizedFilterFieldProps) => import("react/jsx-runtime").JSX.Element | null>;
export {};
//# sourceMappingURL=MemoizedFilterField.d.ts.map