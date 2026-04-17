import { jsx as _jsx } from "react/jsx-runtime";
import { getConditionalReactNode, } from './Config';
import React from 'react';
import { SearchForm } from '../form/SearchForm';
import { SubCollectionField } from './SubCollectionField';
/**
 * TableSubCollectionField configuration
 * Extends SubCollectionField to display items in a table format
 */
export class TableSubCollectionField extends SubCollectionField {
    constructor(props) {
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
        const defaultFetchOptions = {
            useSearchForm: true,
            viewDetail: true,
            pageSize: 10000,
        };
        this.fetchOptions = props.fetchOptions
            ? { ...defaultFetchOptions, ...props.fetchOptions }
            : defaultFetchOptions;
        if (this.fetchOptions.useSearchForm) {
            this.fetchUrl = props.entityForm.getUrl();
        }
        else if (typeof props.fetchUrl === 'function') {
            this.fetchUrl = props.entityForm.getUrl();
            this.fetchUrlFunction = props.fetchUrl;
        }
        else {
            this.fetchUrl = props.fetchUrl ?? props.entityForm.getUrl();
        }
        this.tableConfig = props.tableConfig;
    }
    withTooltip(tooltip) {
        this.tooltip = tooltip;
        return this;
    }
    async getTooltip(props) {
        return await getConditionalReactNode(props, this.tooltip);
    }
    clone() {
        const cloned = new TableSubCollectionField({
            entityForm: this.entityForm,
            relation: this.relation,
            order: this.order,
            name: this.name,
            label: this.label,
            helpText: this.helpText,
            hidden: this.hidden,
            readonly: this.readonly,
            fetchUrl: this.fetchUrl,
            tableConfig: this.tableConfig,
            fetchOptions: this.fetchOptions,
        });
        cloned.form = this.form;
        cloned.hideLabel = this.hideLabel;
        cloned.tooltip = this.tooltip;
        return cloned;
    }
    withFetchOptions(fetchOptions) {
        this.fetchOptions = { ...this.fetchOptions, ...fetchOptions };
        return this;
    }
    withTableConfig(tableConfig) {
        this.tableConfig = tableConfig;
        return this;
    }
    async buildSearchForm(parentEntityForm) {
        const searchForm = new SearchForm();
        searchForm.withPageSize(this.fetchOptions?.pageSize ?? 10000);
        if (this.fetchOptions?.viewDetail) {
            searchForm.withViewDetail(true);
        }
        const mappedByFilter = this.getMappedByFilter(parentEntityForm);
        if (this.fetchOptions?.filters) {
            const additionalFilters = await this.fetchOptions.filters(parentEntityForm);
            if (additionalFilters.length > 0 && additionalFilters[0].items) {
                const hasMappedByFilter = additionalFilters[0].items.some((item) => item.name === mappedByFilter.name);
                if (!hasMappedByFilter) {
                    additionalFilters[0].items.unshift(mappedByFilter);
                }
                additionalFilters.forEach(filterGroup => {
                    searchForm.withFilter(filterGroup.condition, ...filterGroup.items);
                });
            }
        }
        else {
            searchForm.handleAndFilter(mappedByFilter.name, mappedByFilter.value);
        }
        return searchForm;
    }
    async render({ entityForm, session, }) {
        const TableSubCollectionView = React.lazy(() => import('../components/list/ui/TableSubCollectionView').then(m => ({ default: m.TableSubCollectionView })));
        let fetchUrl;
        if (this.fetchUrlFunction) {
            fetchUrl = this.fetchUrlFunction(entityForm);
        }
        else {
            fetchUrl = this.fetchUrl;
        }
        const readonly = await this.isReadonly({ entityForm, session });
        const tooltip = await this.getTooltip({ entityForm, session });
        let initialSearchForm;
        if (this.fetchOptions?.useSearchForm) {
            initialSearchForm = await this.buildSearchForm(entityForm);
        }
        return (_jsx(React.Suspense, { fallback: _jsx("div", { className: "flex items-center justify-center py-8", children: _jsx("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" }) }), children: _jsx(TableSubCollectionView, { parentEntityForm: entityForm, parentId: entityForm.id, entityForm: this.entityForm, fetchUrl: fetchUrl, tableConfig: this.tableConfig, relation: this.relation, readonly: readonly, session: session, fetchOptions: this.fetchOptions, initialSearchForm: initialSearchForm, tooltip: tooltip }) }));
    }
}
//# sourceMappingURL=TableSubCollectionField.js.map