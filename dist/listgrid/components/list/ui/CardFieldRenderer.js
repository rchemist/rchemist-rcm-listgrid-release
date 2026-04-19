'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useMemo } from 'react';
// Field types that should span full width in the card grid
const FULL_WIDTH_FIELD_TYPES = ['textarea', 'html', 'markdown', 'contentAsset'];
/**
 * Determines if a field type should span the full width of the card
 */
export const isFullWidthFieldType = (fieldType) => {
    return FULL_WIDTH_FIELD_TYPES.includes(fieldType);
};
/**
 * CardFieldRenderer
 * Displays a field value in VIEW mode (read-only formatted)
 * Uses field.viewValue() to leverage each field type's formatting logic
 * (e.g., NumberField uses formatPrice, SelectField uses Badge)
 */
export const CardFieldRenderer = ({ field, item, itemEntityForm, parentEntityForm, session, isFullWidth, }) => {
    // State for the rendered value
    const [renderedValue, setRenderedValue] = useState('—');
    const [isLoading, setIsLoading] = useState(true);
    // Determine if this field should be full width
    const shouldBeFullWidth = useMemo(() => {
        return isFullWidth ?? isFullWidthFieldType(field.type);
    }, [field.type, isFullWidth]);
    // Get field label
    const label = useMemo(() => {
        const fieldLabel = field.getLabel();
        if (typeof fieldLabel === 'string') {
            return fieldLabel;
        }
        return field.getName();
    }, [field]);
    // Use field.viewValue() to get properly formatted value
    useEffect(() => {
        let isMounted = true;
        const renderValue = async () => {
            try {
                // Call field's viewValue method for proper formatting
                const result = await field.viewValue({
                    item,
                    entityForm: itemEntityForm,
                });
                if (isMounted) {
                    setRenderedValue(result.result ?? '—');
                    setIsLoading(false);
                }
            }
            catch (error) {
                console.error('CardFieldRenderer: Error rendering field value:', error);
                if (isMounted) {
                    // Fallback to raw value display
                    const rawValue = item[field.getName()];
                    setRenderedValue(rawValue !== undefined && rawValue !== null ? String(rawValue) : '—');
                    setIsLoading(false);
                }
            }
        };
        renderValue();
        return () => {
            isMounted = false;
        };
    }, [field, item, itemEntityForm]);
    return (_jsxs("div", { className: `
        group/field flex flex-col py-2.5
        ${shouldBeFullWidth ? 'col-span-2' : ''}
      `, children: [_jsx("dt", { className: "\n        text-[11px] font-medium uppercase tracking-wider\n        text-gray-400\n        mb-1\n        transition-colors duration-150\n        group-hover/field:text-gray-500\n        dark:text-gray-500\n        dark:group-hover/field:text-gray-400\n      ", children: label }), _jsx("dd", { className: "\n        text-[13px] font-medium leading-relaxed\n        text-gray-700 dark:text-gray-200\n        min-h-[20px]\n      ", children: isLoading ? (_jsx("span", { className: "\n            inline-block h-5 w-24\n            animate-pulse rounded-md\n            bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100\n            dark:from-gray-800 dark:via-gray-700 dark:to-gray-800\n            bg-[length:200%_100%]\n          " })) : (_jsx("span", { className: `
            ${shouldBeFullWidth ? 'whitespace-pre-wrap break-words' : 'line-clamp-2'}
          `, children: renderedValue })) })] }));
};
export default CardFieldRenderer;
//# sourceMappingURL=CardFieldRenderer.js.map