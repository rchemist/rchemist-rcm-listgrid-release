import { EntityForm } from './EntityForm';
import { HelpTextType, HiddenType, LabelType, ReadOnlyType, TooltipType } from './Config';
import { ReactNode } from 'react';
import { FieldInfoParameters } from './EntityField';
import { Session } from '../auth/types';
import { FilterItem, SearchForm } from '../form/SearchForm';
import { SubCollectionField } from './SubCollectionField';
import { IListConfig } from '../components/fields/abstract/ListableFormField';
/**
 * Inline list field configuration
 * Allows overriding ListConfig per field
 */
export interface InlineListFieldConfig {
    /** Field name from EntityForm */
    name: string;
    /** Override ListConfig options */
    listConfig?: Partial<IListConfig>;
}
/**
 * Row action button configuration
 */
export interface InlineRowAction {
    /** Unique action identifier */
    id: string;
    /** Button label - static string or function receiving row item */
    label: string | ((item: any) => string);
    /** Button icon */
    icon?: ReactNode;
    /** Additional CSS classes */
    className?: string;
    /** Click handler - receives row item and entityForm */
    onClick: (item: any, entityForm: EntityForm, refresh: () => void) => Promise<void>;
    /** Disable condition */
    disabled?: (item: any) => boolean;
    /** Hide condition */
    hidden?: (item: any) => boolean;
    /** Confirmation message before execution */
    confirm?: string | ((item: any) => string);
}
/**
 * Row actions column configuration
 * @deprecated Use InlineRowActionColumn instead
 */
export interface InlineRowActionsConfig {
    /** Column order (default: 9999 - last column) */
    order?: number;
    /** Column header label (default: '작업') */
    label?: string;
}
/**
 * Row action column configuration
 * Allows multiple action columns with different positions and labels
 */
export interface InlineRowActionColumn {
    /** Unique column identifier */
    id: string;
    /** Column header label (default: '작업') */
    label?: string;
    /** Column order in the list (default: 9999) */
    order?: number;
    /** Actions to display in this column */
    actions: InlineRowAction[];
}
/**
 * InlineSubCollectionRelation configuration
 * Same as SubCollectionRelation but explicitly typed
 */
export interface InlineSubCollectionRelation {
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
 * Pagination options for InlineSubCollectionField
 */
export interface InlinePaginationOptions {
    /** Page size (default: 10) */
    pageSize?: number;
    /** Use client-side pagination (load all data first) */
    clientSide?: boolean;
}
/**
 * Global ListConfig options applied to all fields
 */
export interface InlineGlobalListConfig {
    /** Enable/disable filtering for all fields */
    filterable?: boolean;
    /** Enable/disable sorting for all fields */
    sortable?: boolean;
    /** Enable/disable quick search */
    quickSearch?: boolean;
}
/**
 * Fetch options for InlineSubCollectionField
 */
export interface InlineSubCollectionFetchOptions {
    /** Whether to use SearchForm-based fetching (POST request) */
    useSearchForm?: boolean;
    /** Page size for fetching */
    pageSize?: number;
    /** Whether to use viewDetail mode */
    viewDetail?: boolean;
    /** Additional filters to apply */
    filters?: (entityForm: EntityForm) => Promise<{
        condition: 'AND' | 'OR';
        items: FilterItem[];
    }[]>;
}
/**
 * InlineSubCollectionField configuration
 * Extends SubCollectionField to display items in a simple list table format
 * without detail view - only shows list with optional row actions
 */
export declare class InlineSubCollectionField extends SubCollectionField {
    tooltip?: TooltipType;
    fetchOptions?: InlineSubCollectionFetchOptions;
    /** List fields to display - can be field names or detailed config */
    inlineListFields?: (string | InlineListFieldConfig)[];
    /** Row action buttons @deprecated Use rowActionColumns instead */
    inlineRowActions?: InlineRowAction[];
    /** Row actions column configuration @deprecated Use rowActionColumns instead */
    inlineRowActionsConfig?: InlineRowActionsConfig;
    /** Row action columns - supports multiple action columns */
    inlineRowActionColumns?: InlineRowActionColumn[];
    /** Pagination options */
    inlinePagination?: InlinePaginationOptions;
    /** Global ListConfig applied to all fields */
    inlineGlobalListConfig?: InlineGlobalListConfig;
    /** Hide title */
    hideTitle?: boolean;
    constructor(props: {
        entityForm: EntityForm;
        relation: InlineSubCollectionRelation;
        order: number;
        name: string;
        label?: LabelType;
        helpText?: HelpTextType;
        hidden?: HiddenType;
        readonly?: ReadOnlyType;
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
        hideTitle?: boolean;
    });
    /**
     * Override withTooltip to support tooltips
     */
    withTooltip(tooltip?: TooltipType): this;
    getTooltip(props: FieldInfoParameters): Promise<ReactNode>;
    /**
     * Set list fields to display
     */
    withListFields(...fields: (string | InlineListFieldConfig)[]): this;
    /**
     * Set row actions
     * @deprecated Use withRowActionColumns instead
     */
    withRowActions(...actions: InlineRowAction[]): this;
    /**
     * Set row actions column configuration
     * @deprecated Use withRowActionColumns instead
     */
    withRowActionsConfig(config: InlineRowActionsConfig): this;
    /**
     * Set row action columns - supports multiple action columns
     */
    withRowActionColumns(...columns: InlineRowActionColumn[]): this;
    /**
     * Set pagination options
     */
    withPagination(options: InlinePaginationOptions): this;
    /**
     * Set global ListConfig
     */
    withGlobalListConfig(config: InlineGlobalListConfig): this;
    /**
     * Set fetch options
     */
    withFetchOptions(options: InlineSubCollectionFetchOptions): this;
    /**
     * Hide title
     */
    withHideTitle(hide?: boolean): this;
    /**
     * Override clone to include inline-specific properties
     */
    clone(): InlineSubCollectionField;
    /**
     * Build the SearchForm for fetching data
     */
    buildSearchForm(parentEntityForm: EntityForm): Promise<SearchForm>;
    /**
     * Override render to display inline list table
     */
    render({ entityForm, session, }: {
        entityForm: EntityForm;
        session?: Session;
    }): Promise<ReactNode | null>;
}
//# sourceMappingURL=InlineSubCollectionField.d.ts.map