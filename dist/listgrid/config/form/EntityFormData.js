import { isBlank, isEmpty, isTrue } from '../../utils';
import { EntityFormValidation } from './EntityFormValidation';
import { DEFAULT_FIELD_GROUP_INFO, DEFAULT_TAB_INFO, } from '../../config/Config';
import { EntityFieldGroup } from '../../config/EntityFieldGroup';
import { EntityTab } from '../../config/EntityTab';
export class EntityFormData extends EntityFormValidation {
    constructor(name, url) {
        super(name, url);
    }
    resetValue(fieldName, loadOnChanges = true) {
        const field = this.getField(fieldName);
        if (field) {
            field.resetValue(this.getRenderType());
            if (loadOnChanges) {
                this.executeOnChanges(fieldName);
            }
        }
        return this;
    }
    setValue(fieldName, value) {
        const field = this.getField(fieldName);
        if (field) {
            this.fields.set(field.getName(), field.withValue(value));
        }
        return this;
    }
    setValues(cloned) {
        // fields 의 value 를 복사해 붙인다.
        this.fields.forEach((field, key) => {
            const clonedField = cloned.getField(key);
            if (clonedField) {
                field.value = clonedField.value;
            }
        });
        return this;
    }
    changeValue(fieldName, value) {
        const field = this.getField(fieldName);
        if (field) {
            this.fields.set(field.getName(), field.withValue(value));
            this.executeOnChanges(fieldName);
        }
        return this;
    }
    clearOnChanges() {
        this.onChanges = [];
        return this;
    }
    clearOnFetchData() {
        this.onFetchData = [];
        return this;
    }
    clearOnInitialize() {
        this.onInitialize = [];
        return this;
    }
    clearOnPostFetchListData() {
        this.onFetchListData = [];
        return this;
    }
    isDirty() {
        // 모든 필드 요소를 순회하며 dirty 여부를 확인한다.
        for (const field of this.fields.values()) {
            if (!isTrue(field.hidden) && field.isDirty()) {
                return true;
            }
        }
        return false;
    }
    isDirtyField(name) {
        const field = this.getField(name);
        return field ? field.isDirty() : false;
    }
    copyEntityFormToInnerFields({ prefix, entityForm, ...props }) {
        const fields = entityForm.getFields();
        if (isEmpty(fields)) {
            return;
        }
        const excludeFields = props.excludeFields ?? [];
        const explicitFields = props.explicitFields ?? [];
        let tab = props.tab ?? DEFAULT_TAB_INFO;
        if (props.tab) {
            if (!this.hasTab(props.tab.id)) {
                tab = props.tab;
                this.tabs.set(props.tab.id, new EntityTab(tab));
            }
        }
        let fieldGroup = props.fieldGroup ?? DEFAULT_FIELD_GROUP_INFO;
        let entityFieldGroup;
        if (this.tabs.get(tab.id)?.fieldGroups.find((group) => group.id === fieldGroup.id)) {
            entityFieldGroup = this.tabs
                .get(tab.id)
                .fieldGroups.find((group) => group.id === fieldGroup.id);
        }
        else {
            entityFieldGroup = new EntityFieldGroup(fieldGroup);
            this.tabs.get(tab.id)?.fieldGroups.push(entityFieldGroup);
        }
        for (const field of fields) {
            if (excludeFields.includes(field.getName())) {
                continue;
            }
            let includeField = isEmpty(explicitFields);
            let explicitFieldInfo = undefined;
            if (!includeField) {
                for (const explicitField of explicitFields) {
                    if (typeof explicitField === 'string') {
                        if (explicitField === field.getName()) {
                            includeField = true;
                            break;
                        }
                    }
                    else {
                        if (explicitField.name === field.getName()) {
                            includeField = true;
                            explicitFieldInfo = explicitField;
                            break;
                        }
                    }
                }
            }
            if (includeField) {
                let newName = `${explicitFieldInfo?.name ?? field.getName()}`;
                if (!isBlank(prefix)) {
                    newName = `${prefix}.${newName}`;
                }
                const newField = field.clone(true);
                if (explicitFieldInfo?.order) {
                    newField.withOrder(explicitFieldInfo.order);
                }
                if (explicitFieldInfo?.label) {
                    newField.withLabel(explicitFieldInfo.label);
                }
                if (explicitFieldInfo?.helpText) {
                    newField.withHelpText(explicitFieldInfo.helpText);
                }
                if (explicitFieldInfo?.hidden) {
                    newField.withHidden(explicitFieldInfo.hidden);
                }
                if (explicitFieldInfo?.readonly) {
                    newField.withReadOnly(explicitFieldInfo.readonly);
                }
                if (explicitFieldInfo?.required) {
                    newField.withRequired(explicitFieldInfo.required);
                }
                newField.name = newName;
                newField.withTabId(explicitFieldInfo?.tab?.id ?? tab.id);
                newField.withFieldGroupId(explicitFieldInfo?.fieldGroup?.id ?? fieldGroup.id);
                // 탭 정보가 필드 단위로 변경된 경우
                if (explicitFieldInfo?.tab || explicitFieldInfo?.fieldGroup) {
                    let newTab = tab;
                    if (tab.id !== newField.getTabId()) {
                        if (this.tabs.has(newField.getTabId())) {
                            newTab = this.tabs.get(newField.getTabId());
                        }
                        // 기존 탭이 없는 경우에는 추가해야 한다.
                        if (!newTab) {
                            newTab = explicitFieldInfo.tab;
                            this.tabs.set(newTab.id, new EntityTab(newTab));
                        }
                    }
                    // 필드 그룹 정보가 필드 단위로 변경된 경우
                    let newFieldGroup;
                    if (this.tabs
                        .get(newTab.id)
                        ?.fieldGroups.find((group) => group.id === newField.getFieldGroupId())) {
                        newFieldGroup = this.tabs
                            .get(newTab.id)
                            .fieldGroups.find((group) => group.id === newField.getFieldGroupId());
                    }
                    else {
                        newFieldGroup = new EntityFieldGroup(explicitFieldInfo?.fieldGroup ?? fieldGroup);
                        this.tabs.get(newTab.id)?.fieldGroups.push(newFieldGroup);
                    }
                    newFieldGroup.fields.push(newField);
                }
                else {
                    entityFieldGroup.fields.push(newField);
                }
                this.fields.set(newName, newField);
            }
        }
    }
}
//# sourceMappingURL=EntityFormData.js.map