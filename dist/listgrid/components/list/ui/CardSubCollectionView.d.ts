import React, { ReactNode } from 'react';
import { EntityForm } from '../../../config/EntityForm';
import { CardSubCollectionRelation, CardConfig, CardSubCollectionFetchOptions } from '../../../config/CardSubCollectionField';
import { Session } from '../../../auth/types';
import { SearchForm } from '../../../form/SearchForm';
export interface CardSubCollectionViewProps {
    /** Parent entity form */
    parentEntityForm: EntityForm;
    /** Parent entity ID */
    parentId: string;
    /** Entity form for the collection items */
    entityForm: EntityForm;
    /** Fetch URL (string or function) */
    fetchUrl: string | ((parentForm: EntityForm) => string);
    /** Card subcollection configuration */
    cardConfig?: CardConfig;
    /** Relation configuration */
    relation: CardSubCollectionRelation;
    /** Readonly mode */
    readonly?: boolean;
    /** User session */
    session?: Session;
    /** Called when item is edited (optional external handler) */
    onItemEdit?: (item: any) => void;
    /** Called when item is deleted (optional external handler) */
    onItemDelete?: (item: any) => void;
    /** Called when item is added (optional external handler) */
    onItemAdd?: () => void;
    /** Fetch options for SearchForm-based fetching */
    fetchOptions?: CardSubCollectionFetchOptions;
    /** Initial SearchForm for SearchForm-based fetching */
    initialSearchForm?: SearchForm;
    /** Whether to show view detail modal on card click */
    viewDetail?: boolean;
    /** Tooltip content to display next to the section */
    tooltip?: ReactNode;
}
/**
 * CardSubCollectionView
 * Displays a collection of items in a professional card grid format
 * Features: Client-side search, responsive grid, CRUD operations
 */
export declare const CardSubCollectionView: React.FC<CardSubCollectionViewProps>;
export default CardSubCollectionView;
//# sourceMappingURL=CardSubCollectionView.d.ts.map