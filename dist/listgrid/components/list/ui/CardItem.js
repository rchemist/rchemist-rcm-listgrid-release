'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useEffect, useState, useCallback } from 'react';
import { IconPencil, IconTrash, IconChevronRight } from '@tabler/icons-react';
import { EntityFieldGroup } from '../../../config/EntityFieldGroup';
import { FormField } from '../../fields/abstract';
import { CardFieldSection } from './CardFieldSection';
// Status badge color mapping
const STATUS_COLORS = {
    ACTIVE: { bg: 'bg-emerald-50 dark:bg-emerald-950/50', text: 'text-emerald-700 dark:text-emerald-400', ring: 'ring-emerald-600/20' },
    COMPLETED: { bg: 'bg-blue-50 dark:bg-blue-950/50', text: 'text-blue-700 dark:text-blue-400', ring: 'ring-blue-600/20' },
    CANCELLED: { bg: 'bg-red-50 dark:bg-red-950/50', text: 'text-red-700 dark:text-red-400', ring: 'ring-red-600/20' },
    PENDING: { bg: 'bg-amber-50 dark:bg-amber-950/50', text: 'text-amber-700 dark:text-amber-400', ring: 'ring-amber-600/20' },
    ENROLLED: { bg: 'bg-emerald-50 dark:bg-emerald-950/50', text: 'text-emerald-700 dark:text-emerald-400', ring: 'ring-emerald-600/20' },
    GRADUATED: { bg: 'bg-blue-50 dark:bg-blue-950/50', text: 'text-blue-700 dark:text-blue-400', ring: 'ring-blue-600/20' },
    ON_LEAVE: { bg: 'bg-amber-50 dark:bg-amber-950/50', text: 'text-amber-700 dark:text-amber-400', ring: 'ring-amber-600/20' },
    GIVE_UP: { bg: 'bg-orange-50 dark:bg-orange-950/50', text: 'text-orange-700 dark:text-orange-400', ring: 'ring-orange-600/20' },
    EXPELLED: { bg: 'bg-red-50 dark:bg-red-950/50', text: 'text-red-700 dark:text-red-400', ring: 'ring-red-600/20' },
    PAID: { bg: 'bg-emerald-50 dark:bg-emerald-950/50', text: 'text-emerald-700 dark:text-emerald-400', ring: 'ring-emerald-600/20' },
    UNPAID: { bg: 'bg-rose-50 dark:bg-rose-950/50', text: 'text-rose-700 dark:text-rose-400', ring: 'ring-rose-600/20' },
    PARTIAL: { bg: 'bg-amber-50 dark:bg-amber-950/50', text: 'text-amber-700 dark:text-amber-400', ring: 'ring-amber-600/20' },
};
const DEFAULT_STATUS_COLOR = { bg: 'bg-gray-50 dark:bg-gray-800', text: 'text-gray-700 dark:text-gray-300', ring: 'ring-gray-600/20' };
/**
 * StatusBadge - Tremor-style status indicator
 */
const StatusBadge = ({ status, label }) => {
    const upperStatus = status?.toUpperCase() ?? '';
    const colors = STATUS_COLORS[upperStatus] || DEFAULT_STATUS_COLOR;
    return (_jsx("span", { className: `
      inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset
      ${colors.bg} ${colors.text} ${colors.ring}
    `, children: label || status }));
};
/**
 * CardItem - Tremor-inspired Card Design with Tab → FieldGroup → Field hierarchy
 *
 * IMPORTANT: This component follows ViewEntityForm's logic exactly:
 * 1. Clone entityForm and set item.id so getRenderType() returns 'update'
 * 2. Use setFetchedValues() to populate all field values from item
 * 3. Use getViewableTabs(), getViewableFieldGroups(), getVisibleFields() for visibility
 * 4. All field settings (hidden, readonly, helpText, tooltip) are respected
 */
export const CardItem = ({ item, entityForm, 
// parentEntityForm and parentId are passed by parent but not used in card rendering
// eslint-disable-next-line @typescript-eslint/no-unused-vars
parentEntityForm: _parentEntityForm, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
parentId: _parentId, cardConfig, relation, readonly = false, session, onClick, onEdit, onDelete, }) => {
    // Cloned entityForm with item data (for proper visibility calculation)
    const [itemEntityForm, setItemEntityForm] = useState(null);
    // Tab state
    const [tabs, setTabs] = useState([]);
    const [selectedTabId, setSelectedTabId] = useState(null);
    // FieldGroups state for selected tab
    const [fieldGroups, setFieldGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // SubCollections state for selected tab (following ViewFieldGroup pattern)
    const [subCollections, setSubCollections] = useState([]);
    const [subCollectionViews, setSubCollectionViews] = useState(new Map());
    // Clone entityForm and set item data on mount/item change
    useEffect(() => {
        let isMounted = true;
        const initializeEntityForm = async () => {
            try {
                // Clone the entityForm to avoid mutating the original
                const cloned = entityForm.clone(true);
                // Set the item's id so getRenderType() returns 'update'
                cloned.id = item.id;
                // Set all field values from item using setFetchedValues
                // This properly populates all fields including nested objects
                await cloned.setFetchedValues(item);
                if (isMounted) {
                    setItemEntityForm(cloned);
                }
            }
            catch (error) {
                console.error('Error initializing entityForm:', error);
                if (isMounted) {
                    // Fallback: use cloned form without setFetchedValues
                    const cloned = entityForm.clone(true);
                    cloned.id = item.id;
                    setItemEntityForm(cloned);
                }
            }
        };
        initializeEntityForm();
        return () => { isMounted = false; };
    }, [entityForm, item]);
    // Get title
    const title = useMemo(() => {
        if (cardConfig?.titleField) {
            if (typeof cardConfig.titleField === 'function') {
                return cardConfig.titleField(item);
            }
            return item[cardConfig.titleField] ?? 'Untitled';
        }
        return item.name ?? item.title ?? 'Untitled';
    }, [item, cardConfig]);
    // Get status field info
    const statusInfo = useMemo(() => {
        if (!itemEntityForm)
            return null;
        const statusField = itemEntityForm.fields.get('status');
        if (statusField && item.status) {
            const options = statusField.options;
            if (options && Array.isArray(options)) {
                const option = options.find((opt) => opt.value === item.status);
                if (option) {
                    return { value: item.status, label: option.label };
                }
            }
            return { value: item.status, label: item.status };
        }
        return null;
    }, [item.status, itemEntityForm]);
    /**
     * hideMappedByFields pattern matching logic (same as ViewFieldGroup)
     * Generates patterns to exclude:
     * 1. Exact mappedBy field (e.g., "studentId", "enrollment.student.id")
     * 2. Base field without Id/.id suffix (e.g., "student" from "studentId")
     * 3. Nested pattern prefix (e.g., "student.*" fields)
     */
    const mappedByPatterns = useMemo(() => {
        const mappedBy = relation.mappedBy;
        const patternsToExclude = new Set();
        // 1. Exact mappedBy field
        patternsToExclude.add(mappedBy);
        // 2. Base field without Id/.id suffix
        let baseField = mappedBy;
        if (mappedBy.endsWith('Id')) {
            baseField = mappedBy.slice(0, -2);
        }
        else if (mappedBy.endsWith('.id')) {
            baseField = mappedBy.slice(0, -3);
        }
        patternsToExclude.add(baseField);
        // Also add the first segment for nested paths
        const firstSegment = mappedBy.split('.')[0];
        if (firstSegment !== mappedBy) {
            patternsToExclude.add(firstSegment);
        }
        return {
            exactPatterns: patternsToExclude,
            nestedPrefix: `${baseField}.`,
        };
    }, [relation.mappedBy]);
    // Fields to exclude (mappedBy patterns, title, and user-specified excludeFields)
    // Following ViewFieldGroup's filteredFields logic exactly
    const shouldExcludeField = useCallback((fieldName) => {
        // User-specified excludeFields
        if (cardConfig?.excludeFields?.includes(fieldName))
            return true;
        // Title field (shown separately in card header)
        const titleFieldName = typeof cardConfig?.titleField === 'string' ? cardConfig.titleField : null;
        if (titleFieldName && fieldName === titleFieldName)
            return true;
        // Exact pattern match
        if (mappedByPatterns.exactPatterns.has(fieldName))
            return true;
        // Nested pattern match (e.g., student.name when mappedBy is studentId)
        if (fieldName.startsWith(mappedByPatterns.nestedPrefix))
            return true;
        return false;
    }, [cardConfig, mappedByPatterns]);
    // Load all tabs when itemEntityForm is ready
    useEffect(() => {
        if (!itemEntityForm)
            return;
        let isMounted = true;
        const loadTabs = async () => {
            try {
                // Use itemEntityForm (with id set) for proper visibility calculation
                const viewableTabs = await itemEntityForm.getViewableTabs(false, undefined, session) ?? [];
                if (isMounted && viewableTabs.length > 0) {
                    setTabs(viewableTabs);
                    setSelectedTabId(viewableTabs[0].id);
                }
                else if (isMounted) {
                    setIsLoading(false);
                }
            }
            catch (error) {
                console.error('Error loading tabs:', error);
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };
        loadTabs();
        return () => { isMounted = false; };
    }, [itemEntityForm, session]);
    // Load FieldGroups and SubCollections when tab changes (following ViewTabPanel/ViewFieldGroup logic)
    const loadFieldGroupsForTab = useCallback(async (tabId) => {
        if (!itemEntityForm)
            return;
        setIsLoading(true);
        try {
            // Following ViewTabPanel.tsx: use getViewableFieldGroups
            const viewableFieldGroupIds = await itemEntityForm.getViewableFieldGroups({ tabId });
            if (viewableFieldGroupIds.length === 0) {
                setFieldGroups([]);
                setSubCollections([]);
                setIsLoading(false);
                return;
            }
            const allFieldGroups = [];
            const allSubCollections = [];
            // If displayFields is specified, create a single "virtual" group
            if (cardConfig?.displayFields) {
                const fields = cardConfig.displayFields
                    .filter(name => itemEntityForm.fields.has(name) && !shouldExcludeField(name))
                    .map(name => itemEntityForm.fields.get(name))
                    .filter(Boolean);
                if (fields.length > 0) {
                    allFieldGroups.push({
                        fieldGroup: new EntityFieldGroup({ id: 'display', label: '', order: 0 }),
                        fields,
                    });
                }
            }
            else {
                // Following ViewFieldGroup.tsx: use getVisibleFields and getVisibleCollections for each group
                for (const groupId of viewableFieldGroupIds) {
                    // Load fields
                    const fieldInfo = await itemEntityForm.getVisibleFields(tabId, groupId, session);
                    if (fieldInfo?.fieldGroup && fieldInfo?.fields && fieldInfo.fields.length > 0) {
                        const visibleFields = fieldInfo.fields.filter(field => {
                            if (!(field instanceof FormField))
                                return false;
                            const fieldName = field.getName();
                            return !shouldExcludeField(fieldName);
                        });
                        if (visibleFields.length > 0) {
                            allFieldGroups.push({
                                fieldGroup: fieldInfo.fieldGroup,
                                fields: visibleFields,
                            });
                        }
                    }
                    // Load subCollections (following ViewFieldGroup pattern)
                    // Only load if itemEntityForm has an id (existing entity)
                    if (itemEntityForm.id) {
                        const collectionInfo = await itemEntityForm.getVisibleCollections(tabId, groupId, session);
                        if (collectionInfo?.collections && collectionInfo.collections.length > 0) {
                            allSubCollections.push(...collectionInfo.collections);
                        }
                    }
                }
            }
            setFieldGroups(allFieldGroups);
            setSubCollections(allSubCollections);
            // Render subCollections asynchronously (following SubCollectionRenderer pattern)
            if (allSubCollections.length > 0) {
                const views = new Map();
                for (const collection of allSubCollections) {
                    try {
                        const view = await collection.render({ entityForm: itemEntityForm, session });
                        views.set(collection.getName(), view);
                    }
                    catch (error) {
                        console.error(`Error rendering subcollection ${collection.getName()}:`, error);
                    }
                }
                setSubCollectionViews(views);
            }
            else {
                setSubCollectionViews(new Map());
            }
        }
        catch (error) {
            console.error('Error loading field groups:', error);
            setFieldGroups([]);
            setSubCollections([]);
        }
        finally {
            setIsLoading(false);
        }
    }, [itemEntityForm, cardConfig, shouldExcludeField, session]);
    // Load FieldGroups when selectedTabId changes
    useEffect(() => {
        if (selectedTabId && itemEntityForm) {
            loadFieldGroupsForTab(selectedTabId);
        }
    }, [selectedTabId, itemEntityForm, loadFieldGroupsForTab]);
    const handleEditClick = (e) => {
        e.stopPropagation();
        onEdit?.();
    };
    const handleDeleteClick = (e) => {
        e.stopPropagation();
        onDelete?.();
    };
    const handleTabClick = (e, tabId) => {
        e.stopPropagation();
        setSelectedTabId(tabId);
    };
    // Don't render until itemEntityForm is ready
    if (!itemEntityForm) {
        return (_jsx("article", { className: `
        rcm-card-item ${cardConfig?.containerClassName ?? ''}
      `, children: _jsx("div", { className: "rcm-card-item-body", children: _jsxs("div", { className: "rcm-card-item-skel-stack", children: [_jsx("div", { className: "rcm-card-item-skel-line rcm-card-item-skel-line-title" }), _jsx("div", { className: "rcm-card-item-skel-line rcm-card-item-skel-line-subtitle" })] }) }) }));
    }
    return (_jsxs("article", { className: `rcm-card-item rcm-card-item-hover ${onClick ? 'rcm-card-item-clickable' : ''} ${cardConfig?.containerClassName ?? ''}`, onClick: onClick, role: onClick ? 'button' : undefined, tabIndex: onClick ? 0 : undefined, onKeyDown: onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ')
            onClick(); } : undefined, children: [_jsx("div", { className: "rcm-card-item-header", children: _jsxs("div", { className: "rcm-card-item-header-row", children: [_jsx("div", { className: "rcm-card-item-header-left", children: _jsxs("div", { className: "rcm-card-item-title-row", children: [_jsx("h3", { className: `rcm-card-item-title ${cardConfig?.titleClassName ?? ''}`, children: title }), statusInfo && (_jsx(StatusBadge, { status: statusInfo.value, label: statusInfo.label }))] }) }), _jsxs("div", { className: "rcm-card-item-actions", children: [!readonly && onEdit && (_jsx("button", { onClick: handleEditClick, className: "rcm-icon-btn", "data-size": "sm", "aria-label": "Edit", children: _jsx(IconPencil, { className: "rcm-icon", "data-size": "sm", stroke: 1.5 }) })), !readonly && onDelete && (_jsx("button", { onClick: handleDeleteClick, className: "rcm-icon-btn", "data-size": "sm", "data-color": "error", "aria-label": "Delete", children: _jsx(IconTrash, { className: "rcm-icon", "data-size": "sm", stroke: 1.5 }) })), onClick && (_jsx("div", { className: "rcm-card-item-chevron-wrap", children: _jsx(IconChevronRight, { className: "rcm-card-item-chevron-icon", stroke: 2 }) }))] })] }) }), tabs.length > 1 && (_jsx("div", { className: "rcm-card-item-tabbar", children: _jsx("nav", { className: "rcm-card-item-tabnav", "aria-label": "Tabs", children: tabs.map((tab) => (_jsx("button", { onClick: (e) => handleTabClick(e, tab.id), className: `rcm-card-item-tab ${selectedTabId === tab.id ? 'rcm-card-item-tab-active' : ''}`, children: tab.label }, tab.id))) }) })), _jsx("div", { className: "rcm-card-item-body", children: isLoading ? (_jsx("div", { className: "rcm-card-item-skel-stack", children: [1, 2].map((i) => (_jsxs("div", { className: "rcm-card-item-skel-group", children: [_jsx("div", { className: "rcm-card-item-skel-line rcm-card-item-skel-line-title" }), _jsx("div", { className: "rcm-card-item-skel-rows", children: [1, 2, 3].map((j) => (_jsxs("div", { className: "rcm-card-item-skel-row", children: [_jsx("div", { className: "rcm-card-item-skel-line rcm-card-item-skel-line-label" }), _jsx("div", { className: "rcm-card-item-skel-line rcm-card-item-skel-line-value" })] }, j))) })] }, i))) })) : fieldGroups.length === 0 && subCollections.length === 0 ? (_jsx("p", { className: "rcm-card-item-empty", children: "\uD45C\uC2DC\uD560 \uD544\uB4DC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4" })) : (_jsxs("div", { className: "rcm-card-item-sections", children: [fieldGroups.map((group) => (_jsx(CardFieldSection, { fieldGroup: group.fieldGroup, fields: group.fields, item: item, entityForm: itemEntityForm, session: session }, group.fieldGroup.id))), subCollections.length > 0 && (_jsx("div", { className: "rcm-card-item-subcollections", children: subCollections.map((collection) => {
                                const view = subCollectionViews.get(collection.getName());
                                const label = collection.getLabel();
                                const hideLabel = collection.hideLabel;
                                return (_jsxs("div", { className: "rcm-card-item-sub", children: [!hideLabel && label && (_jsx("h4", { className: "rcm-card-item-sub-label", children: typeof label === 'string' ? label : label })), view ? (_jsx("div", { className: "rcm-card-item-sub-view", children: view })) : (_jsx("div", { className: "rcm-card-item-sub-loading-wrap", children: _jsx("div", { className: "rcm-card-item-sub-loading", children: _jsx("div", { className: "rcm-card-item-sub-spinner" }) }) }))] }, `subcollection_${collection.getName()}`));
                            }) }))] })) })] }));
};
export default CardItem;
//# sourceMappingURL=CardItem.js.map