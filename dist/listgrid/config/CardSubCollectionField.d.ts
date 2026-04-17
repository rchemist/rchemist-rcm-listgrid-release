import { EntityForm } from './EntityForm';
import { HelpTextType, HiddenType, LabelType, ReadOnlyType, TooltipType } from './Config';
import { ReactNode } from 'react';
import { FieldInfoParameters } from './EntityField';
import { Session } from '../auth/types';
import { FilterItem, SearchForm } from '../form/SearchForm';
import { SubCollectionField } from './SubCollectionField';
/**
 * Columns configuration type
 * - number: Field columns only, card grid is auto-calculated
 * - {card, field}: Explicit card grid and field columns
 */
export type ColumnsConfig = number | {
    card: number;
    field: number;
};
/**
 * Card configuration for CardSubCollectionField
 */
export interface CardConfig {
    /**
     * Column configuration for card grid and field layout
     * - number: Field columns only (card grid auto-calculated based on layout)
     * - {card, field}: Explicit card grid columns and field columns
     * - Mobile is always 1 column for both cards and fields
     * @default 2
     */
    columns?: ColumnsConfig;
    /**
     * Page size for client-side pagination
     * - If set, enables client-side pagination with the specified page size
     * - If not set or 0, all items are displayed without pagination
     * @default undefined (no pagination)
     */
    pageSize?: number;
    /** Fields to display on each card (whitelist) */
    displayFields?: string[];
    /** Fields to exclude from card display (blacklist) - useful when titleField is a function */
    excludeFields?: string[];
    /** Field name or function for card title */
    titleField?: string | ((item: any) => string);
    /** CSS class name for card container */
    containerClassName?: string;
    /** CSS class name for selected card container */
    selectedContainerClassName?: string;
    /** CSS class name for card title */
    titleClassName?: string;
    /** Custom render function for entire card */
    renderCard?: (item: any, isSelected: boolean, onSelect: () => void) => ReactNode;
}
/**
 * CardSubCollectionRelation configuration
 * Defines the relationship between parent and child entities
 */
export interface CardSubCollectionRelation {
    /** ManyToOne field name in the child entity */
    mappedBy: string;
    /** Filter field name (defaults to mappedBy) */
    filterBy?: string;
    /** Property to get the value from parent entity (default: 'id') */
    valueProperty?: string;
    /** Additional attributes for the subcollection */
    attributes?: Record<string, any>;
}
/**
 * Filter configuration for CardSubCollectionField
 * Same format as ViewListGridOptionProps.filters
 */
export type CardSubCollectionFilters = (entityForm: EntityForm) => Promise<{
    condition: 'AND' | 'OR';
    items: FilterItem[];
}[]>;
/**
 * Fetch options for CardSubCollectionField
 * Controls how data is fetched (SearchForm-based vs simple URL)
 */
export interface CardSubCollectionFetchOptions {
    /** Whether to use SearchForm-based fetching (POST request) */
    useSearchForm?: boolean;
    /** Page size for fetching all data (default: 10000) */
    pageSize?: number;
    /** Whether to use viewDetail mode */
    viewDetail?: boolean;
    /** Additional filters to apply */
    filters?: CardSubCollectionFilters;
}
/**
 * CardSubCollectionField configuration
 * Extends SubCollectionField to display items in a card grid format
 */
export declare class CardSubCollectionField extends SubCollectionField {
    tooltip?: TooltipType;
    fetchUrl: string;
    fetchUrlFunction?: (parentEntityForm: EntityForm) => string;
    cardConfig?: CardConfig;
    fetchOptions?: CardSubCollectionFetchOptions;
    constructor(props: {
        entityForm: EntityForm;
        relation: CardSubCollectionRelation;
        order: number;
        name: string;
        label?: LabelType;
        helpText?: HelpTextType;
        hidden?: HiddenType;
        readonly?: ReadOnlyType;
        fetchUrl?: string | ((parentEntityForm: EntityForm) => string);
        cardConfig?: CardConfig;
        fetchOptions?: CardSubCollectionFetchOptions;
    });
    /**
     * Override withTooltip to support tooltips (parent class doesn't support it)
     */
    withTooltip(tooltip?: TooltipType): this;
    getTooltip(props: FieldInfoParameters): Promise<ReactNode>;
    /**
     * Override clone to include card-specific properties
     */
    clone(): CardSubCollectionField;
    withFetchOptions(fetchOptions: CardSubCollectionFetchOptions): this;
    withCardConfig(cardConfig: CardConfig): this;
    /**
     * Build the SearchForm for fetching data
     * Note: getMappedByFilter() and getMappedByValue() are inherited from SubCollectionField
     */
    buildSearchForm(parentEntityForm: EntityForm): Promise<SearchForm>;
    /**
     * Override render to display card grid instead of list grid
     */
    render({ entityForm, session, }: {
        entityForm: EntityForm;
        session?: Session;
    }): Promise<ReactNode | null>;
}
//# sourceMappingURL=CardSubCollectionField.d.ts.map