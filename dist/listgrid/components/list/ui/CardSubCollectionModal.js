'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Modal } from '../../../ui';
import { ViewEntityForm } from '../../form/ViewEntityForm';
/**
 * CardSubCollectionModal
 * Modal for viewing/editing/creating a card subcollection item
 * Supports three modes:
 * - view: Read-only display of item data
 * - edit: Edit existing item
 * - create: Create new item with mappedBy field auto-populated
 */
export const CardSubCollectionModal = ({ isOpen, entityForm, parentEntityForm, itemId, relation, mode = 'view', onClose, onSave, onDelete, readonly = false, allowDelete = true, }) => {
    // Don't render if not open
    if (!isOpen)
        return null;
    // For view/edit mode, itemId is required
    if ((mode === 'view' || mode === 'edit') && !itemId)
        return null;
    // Get the mappedBy field name (first part of the path)
    const mappedByFieldName = useMemo(() => {
        const mappedBy = relation.mappedBy;
        return mappedBy.split('.')[0];
    }, [relation.mappedBy]);
    // Get the value to set for mappedBy field
    const mappedByValue = useMemo(() => {
        const valueProperty = relation.valueProperty ?? 'id';
        if (valueProperty === 'id') {
            return parentEntityForm.id;
        }
        return parentEntityForm.getValue(valueProperty);
    }, [relation.valueProperty, parentEntityForm]);
    // Create entity form instance for the item
    const itemEntityForm = useMemo(() => {
        if (mode === 'create') {
            // Create mode: clone the form and set mappedBy value
            const cloned = entityForm.clone(true);
            // Set the mappedBy field value for the new item
            if (mappedByFieldName && mappedByValue) {
                cloned.setValue(mappedByFieldName, mappedByValue);
            }
            return cloned;
        }
        else {
            // View/Edit mode: clone with the existing item ID
            return entityForm.clone(true).withId(itemId);
        }
    }, [entityForm, itemId, mode, mappedByFieldName, mappedByValue]);
    // Determine exclude buttons based on mode
    const excludeButtons = [];
    if (!allowDelete || mode === 'view' || mode === 'create') {
        excludeButtons.push('delete');
    }
    // Modal title based on mode
    const modalTitle = useMemo(() => {
        switch (mode) {
            case 'create':
                return 'Add New Item';
            case 'edit':
                return 'Edit Item';
            case 'view':
            default:
                return 'View Item';
        }
    }, [mode]);
    return (_jsx(Modal, { opened: true, view: { title: false }, size: "5xl", animation: "none", position: "center", closeOnClickOutside: false, closeOnEscape: true, onClose: onClose, children: _jsx(ViewEntityForm, { entityForm: itemEntityForm, subCollection: true, readonly: readonly || mode === 'view', excludeButtons: excludeButtons, hideMappedByFields: mappedByFieldName, buttonLinks: {
                onClickList: async () => {
                    onClose();
                },
            }, postSave: async (entityForm) => {
                onSave?.();
                onClose();
                return entityForm;
            }, postDelete: async () => {
                onDelete?.();
                onClose();
            } }, mode === 'create' ? 'create-new' : itemId) }));
};
export default CardSubCollectionModal;
//# sourceMappingURL=CardSubCollectionModal.js.map