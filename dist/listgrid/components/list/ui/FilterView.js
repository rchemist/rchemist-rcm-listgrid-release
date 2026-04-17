'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { isTrue } from '../../../utils/BooleanUtil';
import { useEffect, useState } from "react";
export const FilterView = ({ entityForm, field, value, resetValue, onChange }) => {
    const [view, setView] = useState(undefined);
    useEffect(() => {
        if (field.isFilterable()) {
            (async () => {
                const view = await field.viewListFilter({
                    entityForm: entityForm,
                    onChange: (value, op) => onChange(field.getName(), value, op),
                    value: isTrue(resetValue) ? undefined : value
                });
                setView(view);
            })();
        }
    }, []);
    if (view === undefined || view == null)
        return null;
    return (_jsx("div", { children: view }));
};
//# sourceMappingURL=FilterView.js.map