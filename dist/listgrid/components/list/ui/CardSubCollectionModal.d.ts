import React from 'react';
import { EntityForm } from '../../../config/EntityForm';
import { CardSubCollectionRelation } from '../../../config/CardSubCollectionField';
export type CardSubCollectionModalMode = 'view' | 'edit' | 'create' | null;
export interface CardSubCollectionModalProps {
    /** Is modal opened */
    isOpen: boolean;
    /** Entity form definition for the subcollection */
    entityForm: EntityForm;
    /** Parent entity form */
    parentEntityForm: EntityForm;
    /** Item ID being edited (null for create mode) */
    itemId?: string | null;
    /** Relation configuration */
    relation: CardSubCollectionRelation;
    /** Modal mode: view, edit, or create */
    mode?: CardSubCollectionModalMode;
    /** Called when modal closes */
    onClose: () => void;
    /** Called after successful save */
    onSave?: () => void;
    /** Called after successful delete */
    onDelete?: () => void;
    /** Readonly mode (for view mode) */
    readonly?: boolean;
    /** Allow delete action */
    allowDelete?: boolean;
}
/**
 * CardSubCollectionModal
 * Modal for viewing/editing/creating a card subcollection item
 * Supports three modes:
 * - view: Read-only display of item data
 * - edit: Edit existing item
 * - create: Create new item with mappedBy field auto-populated
 */
export declare const CardSubCollectionModal: React.FC<CardSubCollectionModalProps>;
export default CardSubCollectionModal;
//# sourceMappingURL=CardSubCollectionModal.d.ts.map