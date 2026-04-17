import React from 'react';
import { EntityForm } from '../../../config/EntityForm';
import { CardSubCollectionRelation, CardConfig } from '../../../config/CardSubCollectionField';
import { Session } from '../../../auth/types';
export interface CardItemProps {
    item: any;
    entityForm: EntityForm;
    parentEntityForm: EntityForm;
    parentId: string;
    cardConfig?: CardConfig;
    relation: CardSubCollectionRelation;
    readonly?: boolean;
    session?: Session;
    onClick?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}
/**
 * CardItem - Tremor-inspired Card Design with Tab → FieldGroup → Field hierarchy
 *
 * IMPORTANT: This component follows ViewEntityForm's logic exactly:
 * 1. Clone entityForm and set item.id so getRenderType() returns 'update'
 * 2. Use setFetchedValues() to populate all field values from item
 * 3. Use getViewableTabs(), getViewableFieldGroups(), getVisibleFields() for visibility
 * 4. All field settings (hidden, readonly, helpText, tooltip) are respected
 */
export declare const CardItem: React.FC<CardItemProps>;
export default CardItem;
//# sourceMappingURL=CardItem.d.ts.map