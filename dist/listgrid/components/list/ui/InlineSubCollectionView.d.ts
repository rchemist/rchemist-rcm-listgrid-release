import React, { ReactNode } from 'react';
import { EntityForm } from '../../../config/EntityForm';
import { Session } from '../../../auth/types';
import { SearchForm } from '../../../form/SearchForm';
import { ViewListGridOptionProps } from '../types/ViewListGrid.types';
import { InlineGlobalListConfig, InlineListFieldConfig, InlinePaginationOptions, InlineRowAction, InlineRowActionColumn, InlineRowActionsConfig, InlineSubCollectionFetchOptions, InlineSubCollectionRelation } from '../../../config/InlineSubCollectionField';
export interface InlineSubCollectionViewProps {
    parentEntityForm: EntityForm;
    parentId: string;
    entityForm: EntityForm;
    relation: InlineSubCollectionRelation;
    readonly?: boolean;
    session?: Session;
    listFields?: (string | InlineListFieldConfig)[];
    /** @deprecated Use rowActionColumns instead */
    rowActions?: InlineRowAction[];
    /** @deprecated Use rowActionColumns instead */
    rowActionsConfig?: InlineRowActionsConfig;
    /** Row action columns - supports multiple action columns */
    rowActionColumns?: InlineRowActionColumn[];
    pagination?: InlinePaginationOptions;
    globalListConfig?: InlineGlobalListConfig;
    fetchOptions?: InlineSubCollectionFetchOptions;
    initialSearchForm?: SearchForm;
    tooltip?: ReactNode;
    hideTitle?: boolean;
    viewListOptions?: ViewListGridOptionProps;
}
/**
 * InlineSubCollectionView component
 * Renders a simple list table without detail view
 * Supports row actions and field overrides
 */
export declare const InlineSubCollectionView: React.FC<InlineSubCollectionViewProps>;
//# sourceMappingURL=InlineSubCollectionView.d.ts.map