import { jsx as _jsx } from "react/jsx-runtime";
import { getConditionalReactNode, } from './Config';
import React from 'react';
import { SearchForm } from '../form/SearchForm';
import { SubCollectionField } from './SubCollectionField';
/**
 * CardSubCollectionField configuration
 * Extends SubCollectionField to display items in a card grid format
 */
export class CardSubCollectionField extends SubCollectionField {
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
        // Set default fetchOptions (same as SubCollectionField behavior)
        // Default: useSearchForm: true, viewDetail: true, pageSize: 10000
        const defaultFetchOptions = {
            useSearchForm: true,
            viewDetail: true,
            pageSize: 10000,
        };
        // Merge user-provided fetchOptions with defaults
        this.fetchOptions = props.fetchOptions
            ? { ...defaultFetchOptions, ...props.fetchOptions }
            : defaultFetchOptions;
        // Handle fetchUrl - can be string or function
        // When useSearchForm is true (default), use the entityForm's URL
        if (this.fetchOptions.useSearchForm) {
            this.fetchUrl = props.entityForm.getUrl();
        }
        else if (typeof props.fetchUrl === 'function') {
            this.fetchUrl = props.entityForm.getUrl(); // Default to entityForm URL
            this.fetchUrlFunction = props.fetchUrl;
        }
        else {
            this.fetchUrl = props.fetchUrl ?? props.entityForm.getUrl();
        }
        this.cardConfig = props.cardConfig;
    }
    /**
     * Override withTooltip to support tooltips (parent class doesn't support it)
     */
    withTooltip(tooltip) {
        this.tooltip = tooltip;
        return this;
    }
    async getTooltip(props) {
        return await getConditionalReactNode(props, this.tooltip);
    }
    /**
     * Override clone to include card-specific properties
     */
    clone() {
        const cloned = new CardSubCollectionField({
            entityForm: this.entityForm,
            relation: this.relation,
            order: this.order,
            name: this.name,
            label: this.label,
            helpText: this.helpText,
            hidden: this.hidden,
            readonly: this.readonly,
            fetchUrl: this.fetchUrl,
            cardConfig: this.cardConfig,
            fetchOptions: this.fetchOptions,
        });
        cloned.form = this.form;
        cloned.hideLabel = this.hideLabel;
        cloned.tooltip = this.tooltip;
        return cloned;
    }
    withFetchOptions(fetchOptions) {
        // Merge with existing fetchOptions (which already has defaults)
        this.fetchOptions = { ...this.fetchOptions, ...fetchOptions };
        return this;
    }
    withCardConfig(cardConfig) {
        this.cardConfig = cardConfig;
        return this;
    }
    /**
     * Build the SearchForm for fetching data
     * Note: getMappedByFilter() and getMappedByValue() are inherited from SubCollectionField
     */
    async buildSearchForm(parentEntityForm) {
        const searchForm = new SearchForm();
        // Set page size (default: 10000 to fetch all data at once)
        searchForm.withPageSize(this.fetchOptions?.pageSize ?? 10000);
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
                additionalFilters.forEach((filterGroup) => {
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
     * Override render to display card grid instead of list grid
     */
    async render({ entityForm, session, }) {
        // Lazy load the CardSubCollectionView component
        const CardSubCollectionView = React.lazy(() => import('../components/list/ui/CardSubCollectionView').then((m) => ({
            default: m.CardSubCollectionView,
        })));
        // Get the fetch URL
        let fetchUrl;
        if (this.fetchUrlFunction) {
            fetchUrl = this.fetchUrlFunction(entityForm);
        }
        else {
            fetchUrl = this.fetchUrl;
        }
        // Determine readonly status
        const readonly = await this.isReadonly({ entityForm, session });
        // Get tooltip
        const tooltip = await this.getTooltip({ entityForm, session });
        // Build initial SearchForm if using SearchForm-based fetching
        let initialSearchForm;
        if (this.fetchOptions?.useSearchForm) {
            initialSearchForm = await this.buildSearchForm(entityForm);
        }
        const viewProps = {
            parentEntityForm: entityForm,
            parentId: entityForm.id,
            entityForm: this.entityForm,
            fetchUrl,
            ...(this.cardConfig !== undefined ? { cardConfig: this.cardConfig } : {}),
            relation: this.relation,
            readonly,
            ...(session !== undefined ? { session } : {}),
            ...(this.fetchOptions !== undefined ? { fetchOptions: this.fetchOptions } : {}),
            ...(initialSearchForm !== undefined ? { initialSearchForm } : {}),
            tooltip,
        };
        return (_jsx(React.Suspense, { fallback: _jsx("div", { className: "rcm-loading-overlay", children: _jsx("div", { className: "rcm-spinner" }) }), children: _jsx(CardSubCollectionView, { ...viewProps }) }));
    }
}
//# sourceMappingURL=CardSubCollectionField.js.map