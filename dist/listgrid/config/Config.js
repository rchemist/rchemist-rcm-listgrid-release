/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import React from "react";
import { SearchForm } from "../form/SearchForm";
import { PageResult } from "../form/Type";
import { isEmpty } from "../utils";
import { generateSlug, isBlank } from '../utils/StringUtil';
import { ValidateResult } from "../validations/Validation";
function isOptionalReactNode(condition) {
    return condition && (typeof condition.onCreate !== 'undefined' || typeof condition.onUpdate !== 'undefined');
}
export async function getConditionalBoolean(props, condition) {
    // console.log('getConditionalBoolean', props, condition);
    if (!condition) {
        return false;
    }
    if (typeof condition === 'function') {
        return await condition(props) ?? false;
    }
    if (typeof condition === 'boolean') {
        return condition;
    }
    const renderTypeValue = props.renderType ?? props.entityForm?.getRenderType();
    const result = renderTypeValue ?
        (renderTypeValue === 'create' ? condition.onCreate : condition.onUpdate) :
        (condition.onCreate ?? condition.onUpdate);
    return result ?? false;
}
export async function getConditionalString(props, condition) {
    if (!condition) {
        return '';
    }
    if (typeof condition === 'function') {
        return await condition(props) ?? '';
    }
    if (typeof condition === 'string') {
        return condition;
    }
    const renderTypeValue = props.renderType ?? props.entityForm?.getRenderType();
    const result = renderTypeValue !== undefined ?
        (renderTypeValue === 'update' ? condition.onUpdate : condition.onCreate) :
        (condition.onCreate ?? condition.onUpdate);
    return result ?? '';
}
export async function getConditionalReactNode(props, condition) {
    if (!condition) {
        return '';
    }
    if (typeof condition === 'function') {
        return await condition(props) ?? '';
    }
    // 이 부분이 질문
    // condition 이 ReactNode 타입인걸 어떻게 확인할 수 있어?
    if (typeof condition === 'string' || typeof condition === 'number' || React.isValidElement(condition)) {
        return condition;
    }
    if (isOptionalReactNode(condition)) {
        const renderTypeValue = props.renderType ?? props.entityForm?.getRenderType();
        const hidden = renderTypeValue ?
            (renderTypeValue === 'create' ? condition.onCreate : condition.onUpdate) :
            (condition.onCreate ?? condition.onUpdate);
        return hidden ?? '';
    }
    return null;
}
export const ViewPresetTypes = [
    { value: 'ALWAYS', label: '항상 표시' },
    { value: 'ADD_ONLY', label: '신규 입력만' },
    { value: 'MODIFY_ONLY', label: '수정만 가능' },
];
export function getViewPreset(type) {
    if (type === 'ALWAYS') {
        return ALWAYS;
    }
    else if (type === 'MODIFY_ONLY') {
        return MODIFY_ONLY;
    }
    else {
        return ADD_ONLY;
    }
}
export const NO_FILTER_SORT_ON_LIST = { support: true, sortable: false, filterable: false };
export const ALWAYS = {
    hidden: {
        onCreate: false,
        onUpdate: false
    },
};
export const HIDDEN = {
    hidden: {
        onCreate: true,
        onUpdate: true
    },
};
export const ADD_ONLY = {
    readonly: {
        onCreate: false,
        onUpdate: true
    },
};
export const MODIFY_ONLY = {
    readonly: {
        onCreate: true,
        onUpdate: false
    },
    hidden: {
        onCreate: true,
        onUpdate: false
    },
};
export const VIEW_ONLY = {
    readonly: {
        onCreate: true,
        onUpdate: true
    },
    hidden: {
        onCreate: true,
        onUpdate: false
    },
};
export const LIST_ONLY = {
    readonly: {
        onCreate: true,
        onUpdate: true
    },
    hidden: {
        onCreate: true,
        onUpdate: true
    },
};
export const VIEW_HIDDEN = {
    readonly: {
        onCreate: false,
        onUpdate: true
    },
    hidden: {
        onCreate: false,
        onUpdate: true
    },
};
export const ModifiableTypes = [
    { value: 'ALWAYS', label: '항상 표시' },
    { value: 'ADD_ONLY', label: '신규 입력만' },
    { value: 'MODIFY_ONLY', label: '수정만 가능' },
    { value: 'VIEW_ONLY', label: '읽기만 가능' },
    { value: 'VIEW_HIDDEN', label: '읽기만 표시' },
    { value: 'HIDDEN', label: '숨김' },
];
export function getModifiableType(type) {
    if (type === 'ALWAYS') {
        return ALWAYS;
    }
    else if (type === 'ADD_ONLY') {
        return ADD_ONLY;
    }
    else if (type === 'MODIFY_ONLY') {
        return MODIFY_ONLY;
    }
    else if (type === 'VIEW_ONLY') {
        return VIEW_ONLY;
    }
    else if (type === 'VIEW_HIDDEN') {
        return VIEW_HIDDEN;
    }
    else if (type === 'HIDDEN') {
        return HIDDEN;
    }
    else {
        return ALWAYS;
    }
}
export const HAS_VALUE_READONLY = {
    readonly: (props) => {
        return (props.value?.current || props.value?.fetched) ? Promise.resolve(true) : Promise.resolve(false);
    },
};
export const HAS_VALUE_HIDDEN = {
    hidden: (props) => {
        return (props.value?.current || props.value?.fetched) ? Promise.resolve(true) : Promise.resolve(false);
    }
};
/**
 * 자기 자신을 ManyToOneField 로 가지고 있는 경우 (location.parentLocation 과 같이)
 * manyToOne 을 lookup 할 때 자기 자신을 제외하는 필터
 */
export function excludeSelfOnManyToOneLookup() {
    return (entityForm) => {
        // 업데이트일 때 자기 자신은 대상에서 제외한다.
        const id = entityForm.getId();
        return Promise.resolve([
            // 여기서는 NOT_IN 으로 해야 한다. Backend 서버의 LocationController#search 메소드에서 id 에 대한 NOT_EQUALS 를 자동으로 parent Id 를 전부 제외하는 쿼리로 변경하기 때문이다.
            { name: 'id', queryConditionType: 'NOT_IN', values: [id] }
        ]);
    };
}
export function excludeIdListOnManyToOneLookUp(idList) {
    return async (entityForm) => {
        if (isEmpty(idList)) {
            return [{ name: '__blank__', queryConditionType: 'NULL' }];
        }
        return [{ name: 'id', queryConditionType: 'NOT_IN', values: idList }];
    };
}
export class AssetConfig {
    static create(maxSize, maxCount, ...extensions) {
        return new AssetConfig()
            .withMaxSize(maxSize ?? 10)
            .withMaxCount(maxCount ?? 1)
            .withExtensions(...extensions);
    }
    withMaxSize(maxSize) {
        this.maxSize = maxSize;
        return this;
    }
    withMaxCount(maxCount) {
        this.maxCount = maxCount;
        return this;
    }
    withExtensions(...extensions) {
        this.extensions = extensions;
        return this;
    }
}
export const DEFAULT_TAB_INFO = {
    id: 'default',
    label: '기본 정보',
    order: 1,
};
export const DEFAULT_FIELD_GROUP_INFO = {
    id: 'default',
    label: '기본 정보',
    order: 1,
};
export const STATUS_TAB_INFO = {
    id: 'status',
    label: '상태 정보',
    order: 1000000,
    hidden: false
};
export const MANAGE_ENTITY_ALL = Object.freeze({
    create: true,
    update: true,
    delete: true,
});
export const MANAGE_ENTITY_CREATE = {
    create: true,
    update: false,
    delete: false,
};
export const MANAGE_ENTITY_UPDATE = {
    create: false,
    update: true,
    delete: false,
};
export const MANAGE_ENTITY_NOT_DELETE = {
    create: true,
    update: true,
    delete: false,
};
export async function onChangeNameToSlug(entityForm, fieldName, targetFieldName) {
    if (entityForm.getRenderType() === 'create') {
        const nameValue = await entityForm.getValue(fieldName);
        const generatedSlug = generateSlug(nameValue);
        entityForm = entityForm.setValue(targetFieldName, generatedSlug)
            .withShouldReload(true);
    }
    return entityForm;
}
export function checkDuplicateValueProcess({ url, fieldName, label, ...props }) {
    return async (entityForm, value) => {
        const searchForm = SearchForm.create().handleAndFilter(fieldName, value);
        if (props.parent) {
            searchForm.handleAndFilter(props.parent.fieldName, props.parent.value ?? entityForm.parentId);
        }
        if (!isBlank(entityForm.id)) {
            searchForm.handleAndFilter('id', entityForm.id, "NOT_EQUAL");
        }
        const pageResult = await PageResult.fetchListData(url, searchForm);
        if ((pageResult?.totalCount ?? 0) > 0) {
            return ValidateResult.fail(`중복된 ${label} - '${value}' 가 존재합니다. 이 값은 중복될 수 없습니다.`);
        }
        else {
            return ValidateResult.success();
        }
    };
}
//# sourceMappingURL=Config.js.map