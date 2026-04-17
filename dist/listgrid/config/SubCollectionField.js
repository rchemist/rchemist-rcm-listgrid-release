import { jsx as _jsx } from "react/jsx-runtime";
import { DEFAULT_FIELD_GROUP_INFO, DEFAULT_TAB_INFO, getConditionalBoolean, getConditionalReactNode } from '../config/Config';
import { ListGrid } from '../config/ListGrid';
import { isEmpty } from "../utils";
import { AbstractManyToOneField, ListableFormField } from '../components/fields/abstract';
import { ViewListGrid } from "../components/list/ViewListGrid";
export class SubCollectionField {
    constructor(props) {
        this.entityForm = props.entityForm;
        this.relation = props.relation;
        this.order = props.order;
        this.name = props.name;
        this.label = props.label;
        this.helpText = props.helpText;
        this.hidden = props.hidden;
        this.readonly = props.readonly;
        this.viewListOptions = props.viewListOptions;
        this.dynamicUrl = props.dynamicUrl;
    }
    withTooltip(tooltip) {
        console.error('not supported');
        return this;
    }
    clone() {
        const collectionField = new SubCollectionField({
            entityForm: this.entityForm,
            relation: this.relation,
            order: this.order,
            name: this.name,
            label: this.label,
            helpText: this.helpText,
            hidden: this.hidden,
            readonly: this.readonly,
            viewListOptions: this.viewListOptions,
            dynamicUrl: this.dynamicUrl,
        });
        collectionField.form = this.form;
        collectionField.listViewFields = this.listViewFields;
        return collectionField;
    }
    getTabId() {
        return this.form?.tabId ?? DEFAULT_TAB_INFO.id;
    }
    getFieldGroupId() {
        return this.form?.fieldGroupId ?? DEFAULT_FIELD_GROUP_INFO.id;
    }
    withTabId(tabId) {
        if (this.form) {
            this.form.tabId = tabId;
        }
        else {
            this.form = { tabId: tabId, fieldGroupId: DEFAULT_FIELD_GROUP_INFO.id };
        }
        return this;
    }
    withFieldGroupId(fieldGroupId) {
        if (this.form) {
            this.form.fieldGroupId = fieldGroupId;
        }
        else {
            this.form = { tabId: DEFAULT_TAB_INFO.id, fieldGroupId };
        }
        return this;
    }
    withHelpText(helpText) {
        this.helpText = helpText;
        return this;
    }
    withHidden(hidden) {
        this.hidden = hidden;
        return this;
    }
    withLabel(label) {
        this.label = label;
        return this;
    }
    withReadOnly(readOnly) {
        this.readonly = readOnly;
        return this;
    }
    withHideLabel(hideLabel) {
        this.hideLabel = hideLabel;
        return this;
    }
    withOrder(order) {
        this.order = order;
        return this;
    }
    withViewListGridOptionProps(props) {
        this.viewListOptions = props;
        return this;
    }
    getViewListGridOptionProps() {
        return this.viewListOptions ?? {};
    }
    getOrder() {
        return this.order;
    }
    getName() {
        return this.name;
    }
    getLabel() {
        if (this.label) {
            return this.label;
        }
        return this.name;
    }
    async getHelpText(props) {
        return await getConditionalReactNode(props, this.helpText);
    }
    async isHidden(props) {
        return await getConditionalBoolean(props, this.hidden);
    }
    async isReadonly(props) {
        return await getConditionalBoolean(props, this.readonly);
    }
    withForm(form) {
        this.form = form;
        return this;
    }
    withViewPreset(type) {
        this.hidden = type.hidden;
        this.readonly = type.readonly;
        return this;
    }
    withListViewFields(...listViewFields) {
        this.listViewFields = listViewFields;
        return this;
    }
    withDynamicUrl(props) {
        this.dynamicUrl = props;
        return this;
    }
    getListGrid(parentEntityForm) {
        const entityForm = this.entityForm.clone(true).withParentId(parentEntityForm.id);
        if (this.listViewFields !== undefined && !isEmpty(this.listViewFields)) {
            entityForm.fields.forEach((field, key) => {
                if (field instanceof ListableFormField) {
                    if (this.listViewFields.includes(field.name)) {
                        field.useListField();
                    }
                    else {
                        field.listConfig = undefined;
                    }
                }
            });
        }
        return new ListGrid(entityForm);
    }
    async render({ entityForm, session }) {
        const listGrid = this.getListGrid(entityForm);
        const collectionEntityForm = listGrid.getEntityForm();
        if (this.relation?.subCollectionEntityForm?.manyToOneFilter) {
            collectionEntityForm.fields.forEach((field, key) => {
                if (field instanceof AbstractManyToOneField) {
                    if (this.relation.subCollectionEntityForm?.manyToOneFilter?.[key] !== undefined) {
                        const filters = this.relation.subCollectionEntityForm.manyToOneFilter[key];
                        if (!isEmpty(filters)) {
                            field.config.filter = [...(field.config.filter ?? []), ...filters];
                            console.log('field.config.filter', field);
                        }
                    }
                }
            });
        }
        if (this.dynamicUrl !== undefined) {
            const url = this.dynamicUrl(entityForm);
            if (url !== undefined) {
                // url override
                listGrid.getEntityForm().withUrl(url);
            }
        }
        const readonly = await this.isReadonly({ entityForm, session });
        const options = this.getViewListGridOptionProps();
        // 사용자 정의 filters를 저장
        const userFilters = options.filters;
        // mappedBy 필터를 항상 포함하도록 filters를 재정의
        // 서브 콜렉션의 필터에 들어가는 id는 Subcollection 엔티티의 entityForm 의 id 가 아니라 부모의 entityForm 의 id 이다.
        options.filters = async (ef) => {
            const mappedByFilter = this.getMappedByFilter(entityForm);
            if (userFilters) {
                // 사용자 정의 filters가 있으면 실행하고 mappedBy 필터를 첫 번째 조건에 추가
                const additionalFilters = await userFilters(ef);
                if (additionalFilters.length > 0 && additionalFilters[0].items) {
                    // mappedBy 필터가 이미 있는지 확인하고 없으면 추가
                    const hasMappedByFilter = additionalFilters[0].items.some((item) => item.name === mappedByFilter.name);
                    if (!hasMappedByFilter) {
                        additionalFilters[0].items.unshift(mappedByFilter);
                    }
                }
                return additionalFilters;
            }
            // 기본: mappedBy 필터만 반환
            return [{
                    condition: 'AND',
                    items: [mappedByFilter]
                }];
        };
        if (options.readonly === undefined) {
            options.readonly = readonly;
        }
        const subCollection = {
            ...this.viewListOptions?.subCollection,
            name: this.getName(),
            mappedBy: this.viewListOptions?.subCollection?.mappedBy ?? this.relation.mappedBy,
            mappedValue: this.viewListOptions?.subCollection?.mappedValue ?? this.getMappedByValue(entityForm)
        };
        return Promise.resolve(_jsx(ViewListGrid, { listGrid: listGrid, parentId: entityForm.id, options: {
                ...options,
                subCollection: subCollection
            } }));
    }
    getMappedByFilter(entityForm) {
        const mappedBy = this.relation.mappedBy;
        // mappedBy 가 entityId 일 때 이걸 entity.id 로 변환해야 한다.
        // 연산자 우선순위: ?? 보다 삼항연산자가 먼저 평가되도록 괄호 추가
        const filterBy = this.relation.filterBy ?? (mappedBy.endsWith('Id') ? mappedBy.replace('Id', '') + '.id' : mappedBy);
        const mappedValue = { name: filterBy };
        const mappedByValue = this.getMappedByValue(entityForm);
        if (mappedByValue !== undefined) {
            mappedValue.value = String(mappedByValue);
        }
        return mappedValue;
    }
    getMappedByValue(entityForm) {
        const valueProperty = this.relation.valueProperty ?? 'id';
        if (valueProperty === 'id') {
            return entityForm.id;
        }
        else {
            const value = entityForm.getValue(valueProperty);
            // 타입 안정성: string 또는 number만 반환
            if (typeof value === 'string' || typeof value === 'number') {
                return value;
            }
            return undefined;
        }
    }
}
//# sourceMappingURL=SubCollectionField.js.map