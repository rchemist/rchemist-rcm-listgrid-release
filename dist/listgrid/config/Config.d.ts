import React, { ReactNode } from 'react';
import { EntityForm } from '../config/EntityForm';
import { FilterItem, SearchValue } from '../form/SearchForm';
import { IListConfig } from '../components/fields/abstract';
import { MinMaxLimit, SelectOption } from '../form/Type';
import { TreeNodeData } from '../ui';
import { Session } from '../auth/types';
import { ValidateResult } from '../validations/Validation';
export type FieldType = 'text' | 'number' | 'date' | 'datetime' | 'boolean' | 'select' | 'manyToOne' | 'email' | 'phone' | 'time' | 'month' | 'tag' | 'file' | 'year' | 'checkbox' | 'multiselect' | 'textarea' | 'password' | 'image' | 'html' | 'markdown' | 'inlineMap' | 'hidden' | 'custom' | 'xrefMapping' | 'xrefPriorityMapping' | 'xrefAvailableMapping' | 'revision' | 'contentAsset';
/**
 * LabelType 에 따라 라벨 표시 방법이 달라진다.
 * string 은 i18n 으로 라벨 처리
 * ReactNode 면 단순 표시
 * false 면 표시하지 않는다.
 */
export type LabelType = string | ReactNode | false;
export type PermissionType = 'ALL' | 'READ' | 'NONE';
/**
 * EntityForm 을 화면에 출력할 때 create 상황인지, update 상황인지에 대한 분기 처리를 위한 값
 */
export type RenderType = 'create' | 'update';
export type ConditionalReactNodeValue = ReactNode | OptionalReactNode | ValuedReactNode;
export type ConditionalStringValue = string | OptionalString | ValuedString;
export type ConditionalBooleanValue = boolean | OptionalBoolean | ValuedBoolean;
export type TooltipType = ConditionalReactNodeValue;
export type HelpTextType = ConditionalReactNodeValue;
export type PlaceHolderType = ConditionalStringValue;
export type HiddenType = ConditionalBooleanValue;
export type ReadOnlyType = ConditionalBooleanValue;
export type RequiredType = ConditionalBooleanValue;
export interface ConditionalValue {
    entityForm?: EntityForm | undefined;
    renderType?: RenderType | undefined;
    value?: FieldValue | undefined;
    session?: Session | undefined;
}
export type ValuedString = (props: ConditionalValue) => Promise<string>;
export type ValuedBoolean = (props: ConditionalValue) => Promise<boolean>;
export type ValuedReactNode = (props: ConditionalValue) => Promise<ReactNode>;
export interface FieldValue<TValue = any> {
    current?: TValue;
    fetched?: TValue;
    default?: TValue;
}
export interface OptionalBoolean {
    onCreate?: boolean;
    onUpdate?: boolean;
}
export interface OptionalReactNode {
    onCreate?: ReactNode;
    onUpdate?: ReactNode;
}
export interface OptionalString {
    onCreate?: string;
    onUpdate?: string;
}
export declare function getConditionalBoolean(props: ConditionalValue, condition: ConditionalBooleanValue | undefined): Promise<boolean>;
export declare function getConditionalString(props: ConditionalValue, condition: ConditionalStringValue | undefined): Promise<string>;
export declare function getConditionalReactNode(props: ConditionalValue, condition: ConditionalReactNodeValue | undefined): Promise<ReactNode>;
export type ViewPresetType = 'ALWAYS' | 'ADD_ONLY' | 'MODIFY_ONLY' | 'LIST_ONLY';
export declare const ViewPresetTypes: SelectOption[];
export declare function getViewPreset(type: ViewPresetType): ViewPreset;
export type ViewPreset = {
    readonly?: OptionalBoolean | ConditionalBooleanValue;
    hidden?: OptionalBoolean | ConditionalBooleanValue;
};
export declare const NO_FILTER_SORT_ON_LIST: IListConfig;
export declare const ALWAYS: ViewPreset;
export declare const HIDDEN: ViewPreset;
export declare const ADD_ONLY: ViewPreset;
export declare const MODIFY_ONLY: ViewPreset;
export declare const VIEW_ONLY: ViewPreset;
export declare const LIST_ONLY: ViewPreset;
export declare const VIEW_HIDDEN: ViewPreset;
export type ModifiableType = 'ALWAYS' | 'ADD_ONLY' | 'MODIFY_ONLY' | 'VIEW_ONLY' | 'VIEW_HIDDEN' | 'HIDDEN';
export declare const ModifiableTypes: SelectOption[];
export declare function getModifiableType(type: ModifiableType): ViewPreset;
export declare const HAS_VALUE_READONLY: ViewPreset;
export declare const HAS_VALUE_HIDDEN: ViewPreset;
export interface ManyToOneConfig {
    entityForm: EntityForm;
    tree?: ManyToOneTreeView;
    field?: {
        id?: string;
        name?: string | ((value: any) => string);
    };
    filter?: ManyToOneFilter[];
    filterable?: boolean;
    displayFunc?: (value: any) => Promise<string>;
    fetch?: (value: any) => Promise<any>;
    modifiable?: boolean | {
        roles: string[];
    };
    hideAdvancedSearch?: boolean;
}
export type ManyToOneFilter = (entityForm: EntityForm) => Promise<FilterItem[]>;
/**
 * 자기 자신을 ManyToOneField 로 가지고 있는 경우 (location.parentLocation 과 같이)
 * manyToOne 을 lookup 할 때 자기 자신을 제외하는 필터
 */
export declare function excludeSelfOnManyToOneLookup(): ManyToOneFilter;
export declare function excludeIdListOnManyToOneLookUp(idList?: string[]): ManyToOneFilter;
export interface ManyToOneTreeView {
    icon?: ReactNode | ReactNode[];
    exceptId?: string;
    rootSelectable?: boolean;
    leafSelectable?: boolean;
    fetch?: {
        url: string;
        method?: 'GET' | 'POST';
        convert?: (item: any) => TreeNodeData[];
        requestBody?: any;
    };
    treeData?: TreeNodeData[];
    onSelectConvert?: (data: TreeNodeData) => any;
}
/**
 * many to one 필드에 대해 필터를 적용할 때, ManyToOne 필드의 fieldValue 를 그대로 searchForm 에 넣으면 안 되는 문제가 있다. 보통 ManyToOne 필드의 FieldValue 는 id 만 있지 않기 때문이다.
 * 이럴 때 FieldValue 를 꺼내서 parent의 SearchForm에 맞게 변형해 주고, 필터가 해제되면 다시 해당 필드를 제거하는 처리가 필요하다.
 */
export interface ParentSearchWith {
    append?: (name: string, value: any, entityForm?: EntityForm) => Promise<SearchValue>;
    clear?: string[];
}
export interface IAssetConfig {
    maxSize?: number | undefined;
    maxCount?: number | undefined;
    extensions?: string[] | undefined;
    fileTypes?: string[] | undefined;
}
export declare class AssetConfig implements IAssetConfig {
    maxSize?: number | undefined;
    maxCount?: number | undefined;
    extensions?: string[] | undefined;
    static create(maxSize?: number, maxCount?: number, ...extensions: string[]): AssetConfig;
    withMaxSize(maxSize?: number): AssetConfig;
    withMaxCount(maxCount?: number): AssetConfig;
    withExtensions(...extensions: string[]): this;
}
export interface ComboProps {
    direction?: 'column' | 'row';
    columns?: number;
}
export type MapKey = {
    key: string;
    label?: string;
    required?: boolean;
};
export type InlineMapConfig = {
    keys?: MapKey[];
    limit?: MinMaxLimit;
    resultType?: 'KeyValue' | 'Map';
    label?: {
        key?: string;
        value?: string;
    };
};
export type ModifyEntityFormFunc<T extends object = any> = (entityForm: EntityForm<T>, name?: string) => Promise<EntityForm<T>>;
export type ModifyFetchedEntityFormFunc<T extends object = any> = (entityForm: EntityForm<T>, response?: any) => Promise<EntityForm<T>>;
export type OnInitializeFunc<T extends object = any> = (entityForm: EntityForm<T>, session?: Session) => Promise<EntityForm<T>>;
export type TabInfo = {
    id: string;
    label: string;
    order: number;
    hidden?: boolean | undefined;
    description?: string | React.ReactNode | undefined;
    requiredPermissions?: string[] | undefined;
};
export type FieldGroupConfig = {
    open?: boolean;
};
export type FieldGroupInfo = {
    id: string;
    label: string;
    order: number;
    description?: string | undefined;
    config?: FieldGroupConfig | undefined;
    requiredPermissions?: string[] | undefined;
};
export declare const DEFAULT_TAB_INFO: TabInfo;
export declare const DEFAULT_FIELD_GROUP_INFO: FieldGroupInfo;
export declare const STATUS_TAB_INFO: TabInfo;
export interface InputProps extends AbstractInputProps {
    value?: any;
    onChange: (value: any, propagation?: boolean) => void;
}
export interface InputRendererProps extends InputProps {
    onError?: (message: string) => void;
    clearError?: () => void;
    regex?: {
        pattern: RegExp;
        message: string;
    };
}
export interface AbstractInputProps {
    name: string;
    label?: LabelType;
    errors?: string[];
    required?: boolean;
    readonly?: boolean;
    placeHolder?: string;
    attributes?: Map<string, any>;
    subCollectionEntity?: boolean;
}
export interface EntityFormActionResult {
    entityForm: EntityForm;
    actionType?: RenderType;
    errors?: string[];
    redirectUrl?: string;
    refreshOrList?: boolean;
    messages?: string[];
    modifiedFields?: string[];
}
export type EntityButtonLinkProps = {
    onClickList?: () => Promise<void>;
    onSave?: EntityButtonResultProps;
    onDelete?: EntityButtonResultProps;
};
interface EntityButtonResultProps {
    success?: (result: EntityFormActionResult) => void;
    failed?: (result: EntityFormActionResult) => void;
}
export interface CreateStep {
    id: string;
    label: string;
    order: number;
    hidden?: boolean;
    description?: string;
    fields: string[];
}
export interface ManageEntityForm {
    create: boolean;
    update: boolean;
    delete: boolean;
}
export declare const MANAGE_ENTITY_ALL: ManageEntityForm;
export declare const MANAGE_ENTITY_CREATE: ManageEntityForm;
export declare const MANAGE_ENTITY_UPDATE: ManageEntityForm;
export declare const MANAGE_ENTITY_NOT_DELETE: ManageEntityForm;
export declare function onChangeNameToSlug(entityForm: EntityForm, fieldName: string, targetFieldName: string): Promise<EntityForm<any>>;
export interface CheckButtonValidationFieldProps {
    url: string;
    fieldName: string;
    label: string;
    parent?: {
        fieldName: string;
        value?: string;
    };
}
export declare function checkDuplicateValueProcess({ url, fieldName, label, ...props }: CheckButtonValidationFieldProps): (entityForm: EntityForm, value: any) => Promise<ValidateResult>;
export {};
//# sourceMappingURL=Config.d.ts.map