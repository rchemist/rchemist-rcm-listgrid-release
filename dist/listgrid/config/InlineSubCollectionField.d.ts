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
 * `item` is a generic row payload — host apps know their own entity shape
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
 * Row action column configuration
 * Allows multiple action columns with different positions and labels
 */
export interface InlineRowActionColumn {
    /** Unique column identifier */
    id: string;
    /** Column header label (default: '작업') */
    label?: string | undefined;
    /** Column order in the list (default: 9999) */
    order?: number | undefined;
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
    tooltip?: TooltipType | undefined;
    fetchOptions?: InlineSubCollectionFetchOptions | undefined;
    /** List fields to display - can be field names or detailed config */
    inlineListFields?: (string | InlineListFieldConfig)[] | undefined;
    /** Row action columns - supports multiple action columns */
    inlineRowActionColumns?: InlineRowActionColumn[] | undefined;
    /** Pagination options */
    inlinePagination?: InlinePaginationOptions | undefined;
    /** Global ListConfig applied to all fields */
    inlineGlobalListConfig?: InlineGlobalListConfig | undefined;
    /** Hide title */
    hideTitle?: boolean | undefined;
    constructor(props: {
        entityForm: EntityForm;
        relation: InlineSubCollectionRelation;
        order: number;
        name: string;
        label?: LabelType | undefined;
        helpText?: HelpTextType | undefined;
        hidden?: HiddenType | undefined;
        readonly?: ReadOnlyType | undefined;
        listFields?: (string | InlineListFieldConfig)[] | undefined;
        /** Row action columns - supports multiple action columns */
        rowActionColumns?: InlineRowActionColumn[] | undefined;
        pagination?: InlinePaginationOptions | undefined;
        globalListConfig?: InlineGlobalListConfig | undefined;
        fetchOptions?: InlineSubCollectionFetchOptions | undefined;
        hideTitle?: boolean | undefined;
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