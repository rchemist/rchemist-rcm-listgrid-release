import { EntityForm } from './EntityForm';
import { HelpTextType, HiddenType, LabelType, ReadOnlyType, TooltipType } from './Config';
import { ReactNode } from 'react';
import { FieldInfoParameters } from './EntityField';
import { Session } from '../auth/types';
import { SearchForm } from '../form/SearchForm';
import { SubCollectionField } from './SubCollectionField';
import { CardSubCollectionFetchOptions, CardSubCollectionRelation } from './CardSubCollectionField';
/**
 * Table configuration for TableSubCollectionField
 */
export interface TableConfig {
    /**
     * Fields to display as columns (whitelist).
     * If not set, all list-enabled fields are shown.
     */
    displayFields?: string[];
    /**
     * Fields to exclude from columns (blacklist).
     */
    excludeFields?: string[];
    /**
     * Page size for client-side pagination.
     * @default undefined (no pagination)
     */
    pageSize?: number;
    /**
     * Whether to show row numbers as the first column.
     * @default true
     */
    showRowNumbers?: boolean;
}
/**
 * TableSubCollectionField configuration
 * Extends SubCollectionField to display items in a table format
 */
export declare class TableSubCollectionField extends SubCollectionField {
    tooltip?: TooltipType | undefined;
    fetchUrl: string;
    fetchUrlFunction?: ((parentEntityForm: EntityForm) => string) | undefined;
    tableConfig?: TableConfig | undefined;
    fetchOptions?: CardSubCollectionFetchOptions | undefined;
    constructor(props: {
        entityForm: EntityForm;
        relation: CardSubCollectionRelation;
        order: number;
        name: string;
        label?: LabelType | undefined;
        helpText?: HelpTextType | undefined;
        hidden?: HiddenType | undefined;
        readonly?: ReadOnlyType | undefined;
        fetchUrl?: string | ((parentEntityForm: EntityForm) => string) | undefined;
        tableConfig?: TableConfig | undefined;
        fetchOptions?: CardSubCollectionFetchOptions | undefined;
    });
    withTooltip(tooltip?: TooltipType): this;
    getTooltip(props: FieldInfoParameters): Promise<ReactNode>;
    clone(): TableSubCollectionField;
    withFetchOptions(fetchOptions: CardSubCollectionFetchOptions): this;
    withTableConfig(tableConfig: TableConfig): this;
    buildSearchForm(parentEntityForm: EntityForm): Promise<SearchForm>;
    render({ entityForm, session, }: {
        entityForm: EntityForm;
        session?: Session;
    }): Promise<ReactNode | null>;
}
//# sourceMappingURL=TableSubCollectionField.d.ts.map