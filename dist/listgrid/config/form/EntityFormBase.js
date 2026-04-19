import { defaultString, isBlank, isEmpty, isTrue } from '../../utils';
import { FormField, OptionalField } from '../../components/fields/abstract';
import { MANAGE_ENTITY_ALL, } from '../../config/Config';
import { EntityForm } from '../../config/EntityForm';
export class EntityFormBase {
    constructor(name, url) {
        // 필드가 표시될 탭 구성
        this.tabs = new Map();
        // 필드
        this.fields = new Map();
        // 서브콜렉션
        this.collections = new Map();
        // Alert 메시지 관리
        this.alertMessages = [];
        // CheckButtonValidation 필드의 검증 상태 저장
        this.fieldValidationStates = new Map();
        // Extension 관련 속성 - Client only
        this.clientExtensions = new Map();
        this.name = name;
        this.url = url;
        this.version = new Date().getTime().toString();
        // 깊은 복사로 할당하여 원본이 변경되지 않도록 함
        this.manageEntityForm = {
            ...MANAGE_ENTITY_ALL,
        };
    }
    async reload() {
        this.initialize({});
    }
    withMenuUrl(menuUrl) {
        this.menuUrl = menuUrl;
        return this;
    }
    withUrl(url) {
        this.url = url;
        return this;
    }
    withTitle(title) {
        if (typeof title === 'string') {
            this.title = {
                title: title,
            };
        }
        else {
            this.title = title;
        }
        return this;
    }
    withParentId(parentId) {
        this.parentId = parentId;
        return this;
    }
    withId(id) {
        this.id = id;
        return this;
    }
    getId() {
        return this.id;
    }
    getRenderType() {
        return this.getId() ? 'update' : 'create';
    }
    /**
     * ID 와 URL 이 모두 존재해야만 FETCH 가 가능하다.
     */
    isAbleFetch() {
        return !isBlank(this.url) && !isBlank(this.id);
    }
    getUrl() {
        let url = this.url;
        // remove trailing slash
        if (url && url.endsWith('/')) {
            url = url.substring(0, url.length - 1);
        }
        return url;
    }
    getFetchUrl() {
        if (this.isAbleFetch()) {
            return `${this.getUrl()}/${this.id}`;
        }
        throw new Error('EntityForm is not able to fetch entity');
    }
    isSessionRequired() {
        return isTrue(this.sessionRequired);
    }
    withPostSave(postSave) {
        this.postSave = postSave;
        return this;
    }
    withPostDelete(postDelete) {
        this.postDelete = postDelete;
        return this;
    }
    async getTitle(append, appendPostfix) {
        append = defaultString(append);
        const postFix = isTrue(appendPostfix) ? ' / ' + (await this.getTitlePostfix()) : '';
        return isBlank(append) ? `${postFix}` : `${append}${postFix}`;
    }
    async getTitlePostfix() {
        if (this.title) {
            if (this.title.title) {
                return this.title.title;
            }
            else if (this.title.field) {
                const field = this.getField(this.title.field);
                if (field) {
                    return await field.getCurrentValue(this.getRenderType());
                }
            }
        }
        return ((await this.getField('name')?.getCurrentValue(this.getRenderType())) ?? this.id ?? '신규 입력');
    }
    hasField(name) {
        return this.fields.has(name);
    }
    getField(name) {
        return this.fields.get(name);
    }
    getCollection(name) {
        return this.collections.get(name);
    }
    async getValue(name) {
        return this.getField(name)?.getCurrentValue(this.getRenderType());
    }
    getFetchedEntity() {
        return this.fetchedEntity;
    }
    // intentional: values object is a generic entity payload (shape driven by registered fields)
    async getValues() {
        const values = {};
        for (const field of this.fields.values()) {
            values[field.getName()] = await field.getCurrentValue(this.getRenderType());
        }
        return values;
    }
    hasTab(id) {
        return this.tabs.has(id);
    }
    getTab(tabId) {
        return this.tabs.get(tabId);
    }
    async getViewableTabs(includeHide, createStepFields, session) {
        const tabs = [];
        // 권한 체크를 위해 session에서 userPermissions를 가져온다.
        const userPermissions = session?.roles ??
            session?.authentication?.roles ??
            this.session?.roles ??
            this.session?.authentication?.roles;
        for (const tab of this.tabs.values()) {
            const append = isTrue(includeHide) || !isTrue(tab.hidden);
            if (append) {
                // 탭에 requiredPermissions가 설정되어 있고, 사용자에게 권한이 없으면 숨김
                if (!tab.isPermitted(userPermissions)) {
                    continue;
                }
                const fieldGroups = await this.getViewableFieldGroups({
                    tabId: tab.id,
                    session,
                    createStepFields: createStepFields,
                });
                if (fieldGroups.length > 0) {
                    tabs.push(tab);
                }
            }
        }
        // sort tab by tab.order
        tabs.sort((a, b) => a.order - b.order);
        return tabs;
    }
    /**
     * 모든 탭 목록을 반환합니다 (순서대로 정렬됨)
     */
    getTabs() {
        const tabs = Array.from(this.tabs.values());
        tabs.sort((a, b) => a.order - b.order);
        return tabs;
    }
    /**
     * 지정한 탭들을 제거합니다
     * @param tabsToRemove 제거할 탭 배열 또는 탭 ID 배열
     */
    removeTabs(tabsToRemove) {
        for (const tab of tabsToRemove) {
            const tabId = typeof tab === 'string' ? tab : tab.id;
            this.tabs.delete(tabId);
        }
        return this;
    }
    /**
     * 지정한 탭을 제거합니다
     * @param tab 제거할 탭 또는 탭 ID
     */
    removeTab(tab) {
        const tabId = typeof tab === 'string' ? tab : tab.id;
        this.tabs.delete(tabId);
        return this;
    }
    getFieldGroup(tabId, fieldGroupId) {
        const tab = this.getTab(tabId);
        if (tab) {
            return tab.fieldGroups.find((fieldGroup) => fieldGroup.id === fieldGroupId);
        }
        return undefined;
    }
    async getViewableFieldGroups(props) {
        const tabId = props.tabId;
        const session = props.session;
        const createStepFields = props.createStepFields ?? [];
        const tab = this.getTab(tabId);
        if (tab) {
            const viewableFieldGroups = [];
            for (const fieldGroup of tab.fieldGroups) {
                if (await this.isViewableFieldGroup({
                    tabId,
                    fieldGroupId: fieldGroup.id,
                    session,
                    createStepFields,
                })) {
                    viewableFieldGroups.push(fieldGroup.id);
                }
            }
            return Promise.resolve(viewableFieldGroups);
        }
        return Promise.resolve([]);
    }
    async isViewableFieldGroup(props) {
        const tabId = props.tabId;
        const fieldGroupId = props.fieldGroupId;
        const session = props.session;
        const tab = this.getTab(tabId);
        const renderType = this.getRenderType();
        // 권한 체크를 위해 session에서 userPermissions를 가져온다.
        const userPermissions = session?.roles ?? session?.authentication?.roles;
        let viewable = false;
        if (tab) {
            const fieldGroup = tab.fieldGroups.find((group) => group.id === fieldGroupId);
            if (fieldGroup && this instanceof EntityForm) {
                // 필드그룹에 requiredPermissions가 설정되어 있고, 사용자에게 권한이 없으면 숨김
                if (!fieldGroup.isPermitted(userPermissions)) {
                    return Promise.resolve(false);
                }
                for (const field of fieldGroup.fields) {
                    if (!isEmpty(props.createStepFields) && !props.createStepFields.includes(field.name)) {
                        continue;
                    }
                    const entityField = this.fields.get(field.name);
                    if (entityField) {
                        // 권한이 없는 필드는 건너뛴다.
                        if (!entityField.isPermitted(userPermissions)) {
                            continue;
                        }
                        const hidden = await entityField.isHidden({
                            entityForm: this,
                            renderType: this.getRenderType(),
                            session: session,
                        });
                        if (!hidden) {
                            viewable = true;
                            break;
                        }
                    }
                    // SubCollection 은 update 시점에만 설정할 수 있다.
                    if (!viewable && renderType === 'update') {
                        const collection = this.collections.get(field.name);
                        if (collection !== undefined) {
                            const hidden = await collection.isHidden({
                                entityForm: this,
                                renderType: this.getRenderType(),
                                session: session,
                            });
                            if (!hidden) {
                                viewable = true;
                                break;
                            }
                        }
                    }
                }
                return Promise.resolve(viewable);
            }
        }
        return Promise.resolve(viewable);
    }
    async getVisibleFields(tabId, fieldGroupId, session, createStepFields) {
        const fieldGroup = this.getFieldGroup(tabId, fieldGroupId);
        if (fieldGroup && fieldGroup.fields.length > 0) {
            const fields = [];
            // 권한 체크를 위해 session에서 userPermissions를 가져온다.
            const userPermissions = session?.roles ?? session?.authentication?.roles;
            for (const f of fieldGroup.fields) {
                const field = this.getField(f.name);
                if (field && field instanceof FormField) {
                    if (this instanceof EntityForm) {
                        // 권한이 없는 필드는 표시하지 않는다.
                        if (!field.isPermitted(userPermissions)) {
                            continue;
                        }
                        const hidden = await field.isHidden({
                            entityForm: this,
                            renderType: this.getRenderType(),
                            session: session,
                        });
                        if (!hidden &&
                            (isEmpty(createStepFields) || createStepFields?.includes(field.getName()))) {
                            fields.push(field);
                        }
                    }
                }
            }
            // fields 의 order 순으로 정렬한다.
            fields.sort((a, b) => a.order - b.order);
            return { fieldGroup: fieldGroup, fields: fields };
        }
        return {};
    }
    async getVisibleCollections(tabId, fieldGroupId, session) {
        const fieldGroup = this.getFieldGroup(tabId, fieldGroupId);
        if (fieldGroup && fieldGroup.fields.length > 0) {
            const collections = [];
            for (const f of fieldGroup.fields) {
                const field = this.getCollection(f.name);
                if (field) {
                    if (this instanceof EntityForm) {
                        const hidden = await field.isHidden({
                            entityForm: this,
                            renderType: this.getRenderType(),
                            session: session,
                        });
                        if (!hidden) {
                            collections.push(field);
                        }
                    }
                }
            }
            collections.sort((a, b) => a.order - b.order);
            return { fieldGroup: fieldGroup, collections: collections };
        }
        return {};
    }
    getSession() {
        return this.session;
    }
    withSession(session) {
        this.session = session;
        return this;
    }
    withShouldReload(shouldReload) {
        this.shouldReload = shouldReload;
        return this;
    }
    withFieldGroupConfig(tabId, fieldGroupId, config) {
        const tab = this.getTab(tabId);
        if (tab) {
            const fieldGroup = tab.fieldGroups.find((group) => group.id === fieldGroupId);
            if (fieldGroup) {
                fieldGroup.config = { ...fieldGroup.config, ...config };
            }
        }
        return this;
    }
    getLabel(name) {
        const field = this.getField(name);
        if (field) {
            return field.getLabel();
        }
        return '';
    }
    getHelpText(name, session) {
        const field = this.getField(name);
        if (field && this instanceof EntityForm) {
            return field.getHelpText({ entityForm: this, session });
        }
        return Promise.resolve('');
    }
    withHelpText(name, helpText) {
        const field = this.getField(name);
        if (field) {
            this.fields.set(name, field.withHelpText(helpText));
        }
        return this;
    }
    withTooltip(name, tooltip) {
        const field = this.getField(name);
        if (field) {
            this.fields.set(name, field.withTooltip(tooltip));
        }
        return this;
    }
    withReadonly(name, readonly) {
        const field = this.getField(name);
        if (field) {
            this.fields.set(name, field.withReadOnly(readonly));
        }
        return this;
    }
    withOptions(name, options) {
        const field = this.getField(name);
        if (field instanceof OptionalField) {
            this.fields.set(name, field.withOptions(options));
        }
        else {
            console.error(name, ' field is not optional field.');
        }
        return this;
    }
    /**
     * 특정 tab 의 하위의 모든 fields 를 하나의 [] 로 리턴, 필드그룹의 표시 순서를 고려해 field 의 order 를 변경하며 clone 을 통해 원래 필드에 영향을 주지 않는다.
     * @param tabId
     */
    getTabFields(tabId) {
        const tab = this.getTab(tabId);
        if (tab) {
            const fields = [];
            for (const fieldGroup of tab.fieldGroups) {
                for (const f of fieldGroup.fields) {
                    const field = this.getField(f.name)?.clone(true);
                    if (field) {
                        const newOrder = f.order * 1000 + field.order;
                        fields.push(field.withOrder(newOrder));
                    }
                }
            }
            if (fields.length > 0) {
                // sort by order
                fields.sort((a, b) => a.order - b.order);
            }
            return fields;
        }
        return [];
    }
    withRevisionEntityName(revisionEntityName) {
        this.revisionEntityName = revisionEntityName;
        return this;
    }
    getRevisionEntityName() {
        // 저장/조회 시 동일한 값을 사용하도록 fallback 적용
        return this.revisionEntityName || this.menuUrl || this.name;
    }
    withButtons(buttons) {
        this.buttons = [...(this.buttons ?? []), buttons];
        return this;
    }
    withOnChanges(...onChanges) {
        this.onChanges = [...(this.onChanges ?? []), ...onChanges];
        return this;
    }
    withOnFetchData(...onLoad) {
        this.onFetchData = [...(this.onFetchData ?? []), ...onLoad];
        return this;
    }
    withOnInitialize(...onInitialize) {
        this.onInitialize = [...(this.onInitialize ?? []), ...onInitialize];
        return this;
    }
    withOnPostFetchListData(...postFetchListData) {
        this.onFetchListData = [...(this.onFetchListData ?? []), ...postFetchListData];
        return this;
    }
    withOnSave(onSave) {
        this.onSave = onSave;
        return this;
    }
    withAttributes(attributes) {
        this.attributes = attributes;
        return this;
    }
    withHeaderArea(headerArea) {
        this.headerArea = headerArea;
        return this;
    }
    getAttributes() {
        // 새 Map 을 생성해 내보낸다.
        return this.attributes ? new Map(this.attributes) : new Map();
    }
    putAttribute(key, value) {
        if (this.attributes === undefined) {
            this.attributes = new Map();
        }
        this.attributes.set(key, value);
        return this;
    }
    removeAttribute(key) {
        if (this.attributes) {
            this.attributes.delete(key);
        }
        return this;
    }
    hasAttribute(key) {
        return this.attributes ? this.attributes.has(key) : false;
    }
    addAttributeToField(fieldName, key, value) {
        const field = this.getField(fieldName);
        if (field) {
            const attributes = field.attributes ?? new Map();
            attributes.set(key, value);
            field.attributes = attributes;
            this.fields.set(field.name, field);
        }
    }
    removeAttributeToField(fieldName, key) {
        const field = this.getField(fieldName);
        if (field) {
            const attributes = field.attributes ?? new Map();
            attributes.delete(key);
            field.attributes = attributes;
            this.fields.set(field.name, field);
        }
    }
    getFieldAttributes(fieldName) {
        const field = this.getField(fieldName);
        return field?.attributes;
    }
    setReadOnly(readonly = true) {
        this.readonly = readonly;
        this.fields.forEach((value) => {
            value.withReadOnly(readonly);
        });
        this.collections.forEach((value) => {
            value.withReadOnly(readonly);
        });
    }
    setRevisionEntityNameIfBlank(path) {
        if (isBlank(this.revisionEntityName)) {
            this.revisionEntityName = path;
        }
    }
}
//# sourceMappingURL=EntityFormBase.js.map