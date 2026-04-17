import React from 'react';
import { EntityForm } from '../../../config/EntityForm';
import { EntityField } from '../../../config/EntityField';
import { EntityFieldGroup } from '../../../config/EntityFieldGroup';
import { Session } from '../../../auth/types';
/**
 * CardFieldSection - Renders a FieldGroup as an independent card
 * Each FieldGroup is visually separated with its own container
 * Follows ViewFieldGroup logic for:
 * - Collapsable support
 * - Description with help icon
 * - Session-aware visibility
 */
export interface CardFieldSectionProps {
    /** EntityFieldGroup to render */
    fieldGroup: EntityFieldGroup;
    /** Fields within this group */
    fields: EntityField[];
    /** Item data */
    item: any;
    /** EntityForm instance (with id set for proper visibility) */
    entityForm: EntityForm;
    /** Session for permission/visibility checks */
    session?: Session;
}
export declare const CardFieldSection: React.FC<CardFieldSectionProps>;
export default CardFieldSection;
//# sourceMappingURL=CardFieldSection.d.ts.map