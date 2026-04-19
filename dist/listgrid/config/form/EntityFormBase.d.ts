import { Session } from '../../auth';
import { ResponseData } from '../../api';
import { ReactNode } from 'react';
import { ListableFormField } from '../../components/fields/abstract';
import { PostFetchListData } from '../../components/list/types/ViewListGrid.types';
import { ClientExtensionConfig, ExtensionPoint } from '../../extensions/EntityFormExtension.types';
import { DataTransferConfig } from '../../transfer/Type';
import { CreateStep, EntityFormActionResult, FieldGroupConfig, HelpTextType, ManageEntityForm, ModifyEntityFormFunc, ModifyFetchedEntityFormFunc, OnInitializeFunc, RenderType, TooltipType } from '../../config/Config';
import { EntityField } from '../../config/EntityField';
import { EntityForm } from '../../config/EntityForm';
import { EntityFormButtonType } from '../../config/EntityFormButton';
import { AlertMessage, FieldError } from '../../config/EntityFormTypes';
import { EntityTab } from '../../config/EntityTab';
import { SubCollectionField } from '../../config/SubCollectionField';
import { EntityFieldGroup } from '../../config/EntityFieldGroup';
import { SelectOption } from '../../form/Type';
export declare abstract class EntityFormBase<T extends object = any> {
    constructor(name: string, url: string);
    version: string;
    revisionEntityName?: string | undefined;
    parentId?: string | undefined;
    id?: string | undefined;
    name: string;
    title?: {
        title?: string;
        field?: string;
        view?: (entityForm: EntityForm<T>) => Promise<ReactNode>;
    } | undefined;
    url: string;
    menuUrl?: string | undefined;
    readonly?: boolean | undefined;
    session?: Session | undefined;
    createStep?: CreateStep[] | undefined;
    manageEntityForm: ManageEntityForm;
    tabs: Map<string, EntityTab>;
    fields: Map<string, EntityField>;
    collections: Map<string, SubCollectionField>;
    errors?: FieldError[] | undefined;
    shouldReload?: boolean | undefined;
    dataPreloaded?: boolean | undefined;
    fetchedEntity?: T | undefined;
    alertMessages: AlertMessage[];
    fieldValidationStates: Map<string, {
        validated: boolean;
        message?: string;
        color?: string;
    }>;
    appendAdvancedSearchFields?: ListableFormField<any>[] | undefined;
    clientExtensions: Map<ExtensionPoint, ClientExtensionConfig[]>;
    excludeListFields?: string[] | undefined;
    sessionRequired?: boolean | undefined;
    cacheKeyFunc?: ((entityForm: EntityForm<T>) => string) | undefined;
    onChanges?: ModifyEntityFormFunc<T>[] | undefined;
    onFetchData?: ModifyFetchedEntityFormFunc<T>[] | undefined;
    onInitialize?: OnInitializeFunc<T>[] | undefined;
    onFetchListData?: PostFetchListData[] | undefined;
    onSave?: ((entityForm: EntityForm<T>) => Promise<EntityFormActionResult>) | undefined;
    postSave?: ((result: EntityFormActionResult) => Promise<void>) | undefined;
    postDelete?: ((entityForm: EntityForm<T>, idList?: any[]) => Promise<void>) | undefined;
    overrideSubmitData?: ((entityForm: EntityForm<T>, data: any) => Promise<{
        data: any;
        modifiedFields?: string[];
        removePrevious?: boolean;
        error?: boolean;
        errors?: FieldError[];
    }>) | undefined;
    /**
     * Data 를 fetch 할 때 로직을 오버라이드 한다.
     * overrideFetchData 가 정의되어 있으면 메소드 fetchData 의 최상단에서 오버라이드 된다.
     */
    overrideFetchData?: ((url: string, entityForm: EntityForm<T>) => Promise<ResponseData>) | undefined;
    /**
     * data upload / download 설정
     */
    dataTransferConfig?: DataTransferConfig | undefined;
    /**
     * 삭제는 안 되고 active 값만 변경되는 경우
     * 삭제 모달의 메시지가 변경된다.
     */
    neverDelete?: boolean | undefined;
    /**
     * EntityForm 상태에 따른 동적 버튼 추가
     * EntityFormButton 또는 EntityFormReactNodeButton 타입을 반환
     */
    buttons?: ((entityForm: EntityForm<T>) => Promise<EntityFormButtonType[]>)[] | undefined;
    /**
     * ViewEntityForm 할 때 사용할 수 있다.
     * 엔티티폼을 커스텀으로 표시하게 하는데 필요한 여러 정보를 자유롭게 사용할 수 있다.
     * 이 정보는 저장 용도로는 사용되지 않는다.
     */
    attributes?: Map<string, any> | undefined;
    /**
     * ViewEntityForm에서 헤더 버튼과 Alert 영역 사이에 표시될 커스텀 영역
     * sticky 포지셔닝으로 스크롤 시 상단에 고정됨
     */
    headerArea?: ((entityForm: EntityForm<T>) => Promise<ReactNode>) | undefined;
    reload(): Promise<void>;
    abstract initialize(props: {
        session?: Session;
        list?: boolean;
    }): Promise<EntityFormActionResult>;
    abstract clone(includeValue?: boolean): EntityFormBase<T>;
    withMenuUrl(menuUrl?: string): this;
    withUrl(url: string): this;
    withTitle(title?: string | {
        title?: string;
        field?: string;
        view?: (entityForm: EntityForm<T>) => Promise<ReactNode>;
    }): this;
    withParentId(parentId?: string): this;
    withId(id?: string): this;
    getId(): string | undefined;
    getRenderType(): RenderType;
    /**
     * ID 와 URL 이 모두 존재해야만 FETCH 가 가능하다.
     */
    isAbleFetch(): boolean;
    getUrl(): string;
    getFetchUrl(): string;
    isSessionRequired(): boolean;
    withPostSave(postSave: (result: EntityFormActionResult) => Promise<void>): this;
    withPostDelete(postDelete: (entityForm: EntityForm<T>, idList?: any[]) => Promise<void>): this;
    getTitle(append?: string, appendPostfix?: boolean): Promise<string>;
    private getTitlePostfix;
    hasField(name: string): boolean;
    getField<K extends keyof T & string>(name: K): EntityField | undefined;
    getField(name: string): EntityField | undefined;
    getCollection(name: string): SubCollectionField | undefined;
    getValue<K extends keyof T & string>(name: K): Promise<T[K]>;
    getValue(name: string): Promise<any>;
    getFetchedEntity(): T | undefined;
    getValues(): Promise<Partial<T> & Record<string, any>>;
    hasTab(id: string): boolean;
    getTab(tabId: string): EntityTab | undefined;
    getViewableTabs(includeHide?: boolean, createStepFields?: string[], session?: Session): Promise<EntityTab[]>;
    /**
     * 모든 탭 목록을 반환합니다 (순서대로 정렬됨)
     */
    getTabs(): EntityTab[];
    /**
     * 지정한 탭들을 제거합니다
     * @param tabsToRemove 제거할 탭 배열 또는 탭 ID 배열
     */
    removeTabs(tabsToRemove: (EntityTab | string)[]): this;
    /**
     * 지정한 탭을 제거합니다
     * @param tab 제거할 탭 또는 탭 ID
     */
    removeTab(tab: EntityTab | string): this;
    getFieldGroup(tabId: string, fieldGroupId: string): EntityFieldGroup | undefined;
    getViewableFieldGroups(props: {
        tabId: string;
        session?: Session | undefined;
        createStepFields?: string[] | undefined;
    }): Promise<string[]>;
    isViewableFieldGroup(props: {
        tabId: string;
        fieldGroupId: string;
        session?: Session | undefined;
        createStepFields?: string[] | undefined;
    }): Promise<boolean>;
    getVisibleFields(tabId: string, fieldGroupId: string, session?: Session, createStepFields?: string[]): Promise<{
        fieldGroup?: EntityFieldGroup;
        fields?: EntityField[];
    }>;
    getVisibleCollections(tabId: string, fieldGroupId: string, session?: Session): Promise<{
        fieldGroup?: EntityFieldGroup;
        collections?: SubCollectionField[];
    }>;
    getSession(): Session | undefined;
    withSession(session: Session): this;
    withShouldReload(shouldReload?: boolean): this;
    withFieldGroupConfig(tabId: string, fieldGroupId: string, config: FieldGroupConfig): this;
    getLabel(name: string): ReactNode;
    getHelpText(name: string, session?: Session): Promise<ReactNode>;
    withHelpText(name: string, helpText: HelpTextType): this;
    withTooltip(name: string, tooltip: TooltipType): this;
    withReadonly(name: string, readonly: boolean): this;
    withOptions(name: string, options: SelectOption[]): this;
    /**
     * 특정 tab 의 하위의 모든 fields 를 하나의 [] 로 리턴, 필드그룹의 표시 순서를 고려해 field 의 order 를 변경하며 clone 을 통해 원래 필드에 영향을 주지 않는다.
     * @param tabId
     */
    getTabFields(tabId: string): EntityField[];
    withRevisionEntityName(revisionEntityName: string): this;
    getRevisionEntityName(): string;
    withButtons(buttons: (entityForm: EntityForm<T>) => Promise<EntityFormButtonType[]>): this;
    withOnChanges(...onChanges: ModifyEntityFormFunc<T>[]): this;
    withOnFetchData(...onLoad: ModifyFetchedEntityFormFunc<T>[]): this;
    withOnInitialize(...onInitialize: OnInitializeFunc<T>[]): this;
    withOnPostFetchListData(...postFetchListData: PostFetchListData[]): this;
    withOnSave(onSave?: (entityForm: EntityForm<T>) => Promise<EntityFormActionResult>): this;
    withAttributes(attributes?: Map<string, any>): this;
    withHeaderArea(headerArea: (entityForm: EntityForm<T>) => Promise<ReactNode>): this;
    getAttributes(): Map<string, any>;
    putAttribute(key: string, value: any): this;
    removeAttribute(key: string): this;
    hasAttribute(key: string): boolean;
    addAttributeToField(fieldName: string, key: string, value: any): void;
    removeAttributeToField(fieldName: string, key: string): void;
    getFieldAttributes(fieldName: string): Map<string, any> | undefined;
    setReadOnly(readonly?: boolean): void;
    setRevisionEntityNameIfBlank(path: string): void;
}
//# sourceMappingURL=EntityFormBase.d.ts.map