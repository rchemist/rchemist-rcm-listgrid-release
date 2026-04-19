'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useMemo } from 'react';
import { FormField } from '../../fields/abstract';
import { IconChevronUp, IconInfoCircle, IconHelp } from '@tabler/icons-react';
import { Tooltip } from '../../../ui';
import { Icon } from '@iconify/react';
import { isBlank } from '../../../utils/StringUtil';
const CardFieldRow = ({ field, item, entityForm, session }) => {
    const [renderedValue, setRenderedValue] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [required, setRequired] = useState(false);
    const [tooltip, setTooltip] = useState('');
    const [helpText, setHelpText] = useState('');
    const label = useMemo(() => {
        const fieldLabel = field.getLabel();
        return typeof fieldLabel === 'string' ? fieldLabel : field.getName();
    }, [field]);
    // Load field properties (required, tooltip, helpText) following FieldRenderer pattern
    useEffect(() => {
        let isMounted = true;
        const loadFieldProperties = async () => {
            try {
                // Get required status
                const isRequired = await field.isRequired({ entityForm, session });
                if (isMounted)
                    setRequired(isRequired);
                // Get tooltip
                const tooltipValue = await field.getTooltip({ entityForm, session });
                if (isMounted)
                    setTooltip(tooltipValue);
                // Get helpText
                const helpTextValue = await field.getHelpText({ entityForm, session });
                if (isMounted)
                    setHelpText(helpTextValue);
            }
            catch (error) {
                console.error('Error loading field properties:', error);
            }
        };
        loadFieldProperties();
        return () => {
            isMounted = false;
        };
    }, [field, entityForm, session]);
    // Render field value
    useEffect(() => {
        let isMounted = true;
        const renderValue = async () => {
            try {
                // Pass compact: true to skip icons in card context
                const result = await field.viewValue({ item, entityForm, compact: true });
                if (isMounted) {
                    // Keep the result as-is; show placeholder for empty values
                    if (result.result === null ||
                        result.result === '—' ||
                        result.result === '-' ||
                        result.result === '') {
                        setRenderedValue('—'); // Show placeholder for empty values
                    }
                    else {
                        setRenderedValue(result.result);
                    }
                    setIsLoading(false);
                }
            }
            catch (error) {
                if (isMounted) {
                    setRenderedValue('—'); // Show placeholder on error
                    setIsLoading(false);
                }
            }
        };
        renderValue();
        return () => {
            isMounted = false;
        };
    }, [field, item, entityForm]);
    const showTooltip = !isBlank(tooltip);
    const showHelpText = !isBlank(helpText);
    return (_jsxs("div", { className: "rcm-card-field-row", children: [_jsxs("dt", { className: "rcm-card-field-label", children: [_jsx("span", { children: label }), required && (_jsx(Tooltip, { label: "\uD544\uC218\uAC12", color: "red", withArrow: true, children: _jsx(Icon, { icon: "healthicons:star-small", className: "rcm-field-icon rcm-field-icon-required" }) })), showTooltip && (_jsx(Tooltip, { label: tooltip, color: "gray", withArrow: true, position: "top-end", children: _jsx(IconHelp, { className: "rcm-card-field-help-icon" }) }))] }), _jsx("dd", { className: "rcm-card-field-value", children: isLoading ? (_jsx("span", { className: "rcm-card-field-loading" })) : (_jsxs("div", { className: "rcm-card-field-value-inner", children: [_jsx("div", { children: renderedValue }), showHelpText && _jsx("div", { className: "rcm-card-field-help-text", children: helpText })] })) })] }));
};
export const CardFieldSection = ({ fieldGroup, fields, item, entityForm, session, }) => {
    // Collapsable state (following ViewFieldGroup pattern)
    const [isOpen, setIsOpen] = useState(() => fieldGroup.config?.open ?? true);
    // Filter to only FormFields (visibility is already determined by EntityForm.getVisibleFields())
    // Do NOT filter by value - EntityForm's visibility settings should be respected
    const visibleFields = useMemo(() => {
        return fields.filter((field) => {
            return field instanceof FormField;
        });
    }, [fields]);
    // Don't render empty sections
    if (visibleFields.length === 0) {
        return null;
    }
    // Check if this is a labeled group (has a non-empty label)
    const hasLabel = fieldGroup.label && fieldGroup.label.trim() !== '';
    // Check if group has description for help icon
    const hasDescription = !isBlank(fieldGroup.description);
    // Toggle collapse state
    const handleToggle = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };
    return (_jsxs("div", { className: "rcm-card-section", children: [hasLabel && (_jsx("div", { className: "rcm-card-section-header", onClick: handleToggle, children: _jsxs("div", { className: "rcm-card-section-header-row", children: [_jsx("h4", { className: "rcm-card-section-title", children: fieldGroup.label }), _jsxs("div", { className: "rcm-card-section-header-actions", children: [hasDescription && (_jsx(Tooltip, { label: fieldGroup.description, color: "gray", withArrow: true, position: "top-end", children: _jsx(IconInfoCircle, { className: "rcm-card-section-help-icon" }) })), _jsx("button", { type: "button", className: "rcm-card-section-toggle", "aria-label": isOpen ? 'Collapse' : 'Expand', children: _jsx(IconChevronUp, { className: `rcm-card-section-chevron ${isOpen ? '' : 'rcm-rotate-180'}` }) })] })] }) })), isOpen && (_jsx("dl", { className: "rcm-card-section-body", children: visibleFields.map((field) => (_jsx(CardFieldRow, { field: field, item: item, entityForm: entityForm, ...(session !== undefined ? { session } : {}) }, field.getName()))) }))] }));
};
export default CardFieldSection;
//# sourceMappingURL=CardFieldSection.js.map