import { jsx as _jsx } from "react/jsx-runtime";
import { getConditionalReactNode, } from './Config';
import React from 'react';
import { SearchForm } from '../form/SearchForm';
import { SubCollectionField } from './SubCollectionField';
/**
 * InlineSubCollectionField configuration
 * Extends SubCollectionField to display items in a simple list table format
 * without detail view - only shows list with optional row actions
 */
export class InlineSubCollectionField extends SubCollectionField {
    constructor(props) {
        // Call parent constructor
        super({
            entityForm: props.entityForm,
            relation: props.relation,
            order: props.order,
            name: props.name,
            label: props.label,
            helpText: props.helpText,
            hidden: props.hidden,
            readonly: props.readonly,
        });
        // Set inline-specific properties
        this.inlineListFields = props.listFields;
        this.inlinePagination = props.pagination;
        this.inlineGlobalListConfig = props.globalListConfig;
        this.hideTitle = props.hideTitle;
        // Always set deprecated props for backward compatibility
        this.inlineRowActions = props.rowActions;
        this.inlineRowActionsConfig = props.rowActionsConfig;
        // Handle rowActionColumns with backward compatibility
        if (props.rowActionColumns && props.rowActionColumns.length > 0) {
            // Use new rowActionColumns format
            this.inlineRowActionColumns = props.rowActionColumns;
        }
        else if (props.rowActions && props.rowActions.length > 0) {
            // Convert deprecated rowActions to rowActionColumns for backward compatibility
            this.inlineRowActionColumns = [{
                    id: '_default',
                    label: props.rowActionsConfig?.label ?? '작업',
                    order: props.rowActionsConfig?.order ?? 9999,
                    actions: props.rowActions,
                }];
        }
        // Set default fetchOptions
        const defaultFetchOptions = {
            useSearchForm: true,
            viewDetail: false,
            pageSize: props.pagination?.pageSize ?? 10,
        };
        this.fetchOptions = props.fetchOptions
            ? { ...defaultFetchOptions, ...props.fetchOptions }
            : defaultFetchOptions;
    }
    /**
     * Override withTooltip to support tooltips
     */
    withTooltip(tooltip) {
        this.tooltip = tooltip;
        return this;
    }
    async getTooltip(props) {
        return await getConditionalReactNode(props, this.tooltip);
    }
    /**
     * Set list fields to display
     */
    withListFields(...fields) {
        this.inlineListFields = fields;
        return this;
    }
    /**
     * Set row actions
     * @deprecated Use withRowActionColumns instead
     */
    withRowActions(...actions) {
        this.inlineRowActions = actions;
        // Convert to rowActionColumns for backward compatibility
        this.inlineRowActionColumns = [{
                id: '_default',
                label: this.inlineRowActionsConfig?.label ?? '작업',
                order: this.inlineRowActionsConfig?.order ?? 9999,
                actions: actions,
            }];
        return this;
    }
    /**
     * Set row actions column configuration
     * @deprecated Use withRowActionColumns instead
     */
    withRowActionsConfig(config) {
        this.inlineRowActionsConfig = config;
        // Update existing rowActionColumns if present
        if (this.inlineRowActionColumns && this.inlineRowActionColumns.length > 0) {
            const defaultColumn = this.inlineRowActionColumns.find(col => col.id === '_default');
            if (defaultColumn) {
                defaultColumn.label = config.label ?? defaultColumn.label;
                defaultColumn.order = config.order ?? defaultColumn.order;
            }
        }
        return this;
    }
    /**
     * Set row action columns - supports multiple action columns
     */
    withRowActionColumns(...columns) {
        this.inlineRowActionColumns = columns;
        return this;
    }
    /**
     * Set pagination options
     */
    withPagination(options) {
        this.inlinePagination = options;
        return this;
    }
    /**
     * Set global ListConfig
     */
    withGlobalListConfig(config) {
        this.inlineGlobalListConfig = config;
        return this;
    }
    /**
     * Set fetch options
     */
    withFetchOptions(options) {
        this.fetchOptions = { ...this.fetchOptions, ...options };
        return this;
    }
    /**
     * Hide title
     */
    withHideTitle(hide) {
        this.hideTitle = hide ?? true;
        return this;
    }
    /**
     * Override clone to include inline-specific properties
     */
    clone() {
        const cloned = new InlineSubCollectionField({
            entityForm: this.entityForm,
            relation: this.relation,
            order: this.order,
            name: this.name,
            label: this.label,
            helpText: this.helpText,
            hidden: this.hidden,
            readonly: this.readonly,
            listFields: this.inlineListFields,
            rowActions: this.inlineRowActions,
            rowActionsConfig: this.inlineRowActionsConfig,
            rowActionColumns: this.inlineRowActionColumns,
            pagination: this.inlinePagination,
            globalListConfig: this.inlineGlobalListConfig,
            fetchOptions: this.fetchOptions,
            hideTitle: this.hideTitle,
        });
        cloned.form = this.form;
        cloned.hideLabel = this.hideLabel;
        cloned.tooltip = this.tooltip;
        cloned.listViewFields = this.listViewFields;
        cloned.viewListOptions = this.viewListOptions;
        cloned.dynamicUrl = this.dynamicUrl;
        return cloned;
    }
    /**
     * Build the SearchForm for fetching data
     */
    async buildSearchForm(parentEntityForm) {
        const searchForm = new SearchForm();
        // Set page size
        searchForm.withPageSize(this.fetchOptions?.pageSize ?? this.inlinePagination?.pageSize ?? 10);
        // Set viewDetail mode
        if (this.fetchOptions?.viewDetail) {
            searchForm.withViewDetail(true);
        }
        // Get the mappedBy filter
        const mappedByFilter = this.getMappedByFilter(parentEntityForm);
        // Apply user-defined filters if any
        if (this.fetchOptions?.filters) {
            const additionalFilters = await this.fetchOptions.filters(parentEntityForm);
            if (additionalFilters.length > 0 && additionalFilters[0].items) {
                // Check if mappedBy filter already exists
                const hasMappedByFilter = additionalFilters[0].items.some((item) => item.name === mappedByFilter.name);
                if (!hasMappedByFilter) {
                    additionalFilters[0].items.unshift(mappedByFilter);
                }
                // Apply all filters
                additionalFilters.forEach(filterGroup => {
                    searchForm.withFilter(filterGroup.condition, ...filterGroup.items);
                });
            }
        }
        else {
            // Apply only mappedBy filter
            searchForm.handleAndFilter(mappedByFilter.name, mappedByFilter.value);
        }
        return searchForm;
    }
    /**
     * Override render to display inline list table
     */
    async render({ entityForm, session, }) {
        // Lazy load the InlineSubCollectionView component
        const InlineSubCollectionView = React.lazy(() => import('../components/list/ui/InlineSubCollectionView').then(m => ({ default: m.InlineSubCollectionView })));
        // Determine readonly status
        const readonly = await this.isReadonly({ entityForm, session });
        // Get tooltip
        const tooltip = await this.getTooltip({ entityForm, session });
        // Build initial SearchForm
        let initialSearchForm;
        if (this.fetchOptions?.useSearchForm) {
            initialSearchForm = await this.buildSearchForm(entityForm);
        }
        return (_jsx(React.Suspense, { fallback: _jsx("div", { className: "flex items-center justify-center py-8", children: _jsx("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" }) }), children: _jsx(InlineSubCollectionView, { parentEntityForm: entityForm, parentId: entityForm.id, entityForm: this.entityForm, relation: this.relation, readonly: readonly, session: session, listFields: this.inlineListFields, rowActions: this.inlineRowActions, rowActionsConfig: this.inlineRowActionsConfig, rowActionColumns: this.inlineRowActionColumns, pagination: this.inlinePagination, globalListConfig: this.inlineGlobalListConfig, fetchOptions: this.fetchOptions, initialSearchForm: initialSearchForm, tooltip: tooltip, hideTitle: this.hideTitle, viewListOptions: this.viewListOptions }) }));
    }
}
//# sourceMappingURL=InlineSubCollectionField.js.map