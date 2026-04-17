import React from 'react';
import { EntityForm } from '../../../config/EntityForm';
import { EntityField } from '../../../config/EntityField';
import { FieldType } from '../../../config/Config';
import { Session } from '../../../auth/types';
export interface CardFieldRendererProps {
    /** Form field to render */
    field: EntityField;
    /** Item data */
    item: any;
    /** Entity form instance for the item */
    itemEntityForm: EntityForm;
    /** Parent entity form */
    parentEntityForm: EntityForm;
    /** User session */
    session?: Session;
    /** Whether this field should use full width (col-span-2) */
    isFullWidth?: boolean;
}
/**
 * Determines if a field type should span the full width of the card
 */
export declare const isFullWidthFieldType: (fieldType: FieldType) => boolean;
/**
 * CardFieldRenderer
 * Displays a field value in VIEW mode (read-only formatted)
 * Uses field.viewValue() to leverage each field type's formatting logic
 * (e.g., NumberField uses formatPrice, SelectField uses Badge)
 */
export declare const CardFieldRenderer: React.FC<CardFieldRendererProps>;
export default CardFieldRenderer;
//# sourceMappingURL=CardFieldRenderer.d.ts.map