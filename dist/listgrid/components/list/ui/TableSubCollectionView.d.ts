import React, { ReactNode } from 'react';
import { EntityForm } from '../../../config/EntityForm';
import { CardSubCollectionFetchOptions, CardSubCollectionRelation } from '../../../config/CardSubCollectionField';
import { TableConfig } from '../../../config/TableSubCollectionField';
import { Session } from '../../../auth/types';
import { SearchForm } from '../../../form/SearchForm';
export interface TableSubCollectionViewProps {
    parentEntityForm: EntityForm;
    parentId: string;
    entityForm: EntityForm;
    fetchUrl: string | ((parentForm: EntityForm) => string);
    tableConfig?: TableConfig;
    relation: CardSubCollectionRelation;
    readonly?: boolean;
    session?: Session;
    fetchOptions?: CardSubCollectionFetchOptions;
    initialSearchForm?: SearchForm;
    tooltip?: ReactNode;
}
/**
 * TableSubCollectionView
 * Displays a collection of items in a table format
 */
export declare const TableSubCollectionView: React.FC<TableSubCollectionViewProps>;
export default TableSubCollectionView;
//# sourceMappingURL=TableSubCollectionView.d.ts.map