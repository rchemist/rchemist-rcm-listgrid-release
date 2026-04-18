/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { parse } from '../utils/jsonUtils';
import { isEmpty } from "../utils";
import { v1 } from "uuid";
import { isTrue } from '../utils/BooleanUtil';
// Removed BooleanField and StringField imports to fix circular dependency
import { isBlank } from '../utils/StringUtil';
/**
 * QueryConditionType 에 따른 QueryConditionValueType 을 반환한다.
 * @param type
 */
export function getQueryConditionValueType(type) {
    if (type === 'IN' || type === 'NOT_IN') {
        return 'MULTIPLE';
    }
    else if (type === 'BETWEEN' || type === 'NOT_BETWEEN') {
        return 'RANGE';
    }
    else if (type === 'NULL' || type === 'NOT_NULL') {
        return 'NONE';
    }
    else {
        return 'SINGLE';
    }
}
// FormField is generic over the underlying value type — keep the <any> argument
// for backwards compat with call sites that don't thread the value type through
export function getQueryConditionTypes(field) {
    const types = [];
    if (field.type === 'text') {
        types.push({ value: 'EQUAL', label: 'Equals' }, { value: 'NOT_EQUAL', label: 'Not equals' }, { value: 'NULL', label: 'Is null' }, { value: 'NOT_NULL', label: 'Is not null' }, { value: 'LIKE', label: 'Like' }, { value: 'START_WITH', label: 'Starts with' }, { value: 'NOT_START_WITH', label: 'Not starts with' }, { value: 'END_WITH', label: 'Ends with' }, { value: 'NOT_END_WITH', label: 'Not ends with' }, { value: 'IN', label: 'In' }, { value: 'NOT_IN', label: 'Not In' });
    }
    else if (field.type === 'boolean') {
        types.push({ value: 'EQUAL', label: 'Equals' }, { value: 'NOT_EQUAL', label: 'Not equals' }, { value: 'NULL', label: 'Is null' }, { value: 'NOT_NULL', label: 'Is not null' });
        //} else if (field instanceof NumberField || field instanceof DateField || field instanceof DatetimeField) {
    }
    else if (field.type === 'manyToOne') {
        types.push({ value: 'EQUAL', label: 'Equals' }, { value: 'NOT_EQUAL', label: 'Not equals' }, { value: 'NULL', label: 'Is null' }, { value: 'NOT_NULL', label: 'Is not null' });
    }
    else {
        types.push({ value: 'EQUAL', label: 'Equals' }, { value: 'NOT_EQUAL', label: 'Not equals' }, { value: 'NULL', label: 'Is null' }, { value: 'NOT_NULL', label: 'Is not null' }, { value: 'BETWEEN', label: 'Between' }, { value: 'NOT_BETWEEN', label: 'Not between' }, { value: 'GREATER', label: 'Greater' }, { value: 'GREATER_THAN_EQUAL', label: 'Greater and equals' }, { value: 'LESS_THAN', label: 'Less' }, { value: 'LESS_THAN_EQUAL', label: 'Less and equals' }, { value: 'IN', label: 'In' }, { value: 'NOT_IN', label: 'Not In' });
    }
    return types;
}
// intentional: name is a heterogeneous LabelType (string | number | null | undefined | ReactNode) rendered into help text
export function getQueryConditionHelpText(name, type) {
    switch (type) {
        case 'EQUAL':
            return `'${name}' 의 값이 입력한 값과 일치하는 대상을 검색합니다.`;
        case 'NOT_EQUAL':
            return `'${name}' 의 값이 입력한 값과 일치하지 않는 대상을 검색합니다.`;
        case 'EQUAL_IGNORECASE':
            return `'${name}' 의 값이 입력한 값과 일치하는 대상을 검색합니다.(대소문자 구분 없음)`;
        case 'IN':
            return `'${name}' 의 값에 입력한 값 중 하나 이상이 일치하는 대상을 검색합니다.`;
        case 'NOT_IN':
            return `'${name}' 의 값이 입력한 값 중 어떤 것에도 일치하지 않는 대상을 검색합니다.`;
        case 'NULL':
            return `'${name}' 의 값이 존재하지 않는 대상을 검색합니다.`;
        case 'NOT_NULL':
            return `'${name}' 의 값이 존재하는 대상을 검색합니다.`;
        case 'LIKE':
            return `'${name}' 의 값이 입력한 값 중 일부를 포함하고 있는 대상을 검색합니다.`;
        case 'NOT_LIKE':
            return `'${name}' 의 값이 입력한 값 중 일부를 포함하지 않는 대상을 검색합니다.`;
        case 'START_WITH':
            return `'${name}' 의 값이 입력한 값으로 시작하는 대상을 검색합니다.`;
        case 'NOT_START_WITH':
            return `'${name}' 의 값이 입력한 값으로 시작하지 않는 대상을 검색합니다.`;
        case 'END_WITH':
            return `'${name}' 의 값이 입력한 값으로 끝나는 대상을 검색합니다.`;
        case 'NOT_END_WITH':
            return `'${name}' 의 값이 입력한 값으로 끝나지 않는 대상을 검색합니다.`;
        case 'LESS_THAN':
            return `'${name}' 의 값이 입력한 값보다 작은 대상을 검색합니다.`;
        case 'LESS_THAN_EQUAL':
            return `'${name}' 의 값이 입력한 값보다 작거나 같은 대상을 검색합니다.`;
        case 'GREATER':
            return `'${name}' 의 값이 입력한 값보다 큰 대상을 검색합니다.`;
        case 'GREATER_THAN_EQUAL':
            return `'${name}' 의 값이 입력한 값보다 크거나 같은 대상을 검색합니다.`;
        case 'NOT_LESS_THAN':
            return `'${name}' 의 값이 입력한 값보다 작지 않은 대상을 검색합니다.`;
        case 'NOT_LESS_THAN_EQUAL':
            return `'${name}' 의 값이 입력한 값보다 작거나 같지 않은 대상을 검색합니다.`;
        case 'NOT_GREATER':
            return `'${name}' 의 값이 입력한 값보다 크지 않은 대상을 검색합니다.`;
        case 'NOT_GREATER_THAN_EQUAL':
            return `'${name}' 의 값이 입력한 값보다 크거나 같지 않은 대상을 검색합니다.`;
        case 'BETWEEN':
            return `'${name}' 의 값이 입력한 두 값의 사이에 있는 대상을 검색합니다.`;
        case 'NOT_BETWEEN':
            return `'${name}' 의 값이 입력한 두 값의 사이에 있지 않은 대상을 검색합니다.`;
        case 'ID_EQUAL':
            return `'${name}' 의 ID 값이 입력한 값과 같은 대상을 검색합니다.`;
        default:
            return 'Unknown';
    }
}
export class SearchForm {
    constructor() {
        this.cacheKey = ''; // constructor 를 통해 생성될 때 단 하나의 유니크한 값을 가진다.
        // 페이지 당 보여 줄 게시물의 수
        this.pageSize = 20;
        // 현재 페이지, 0 부터 시작
        this.page = 0;
        // 정렬 필드
        this.sorts = new Map();
        // 필터
        this.filters = new Map();
        // Backend API 에서 캐시를 사용할지 여부
        this.ignoreCache = false;
        // 목록을 조회할 때 상세 view 를 리턴받을지 여부
        this.viewDetail = false;
        // 이 값은 필터링된 결과가 없을 때, 빈 결과를 반환할지 여부를 결정한다.
        this.shouldReturnEmpty = false;
        // ListGrid 의 필터를 일시적으로 변경했다가 fetch 후 다시 복구할 때 사용한다.
        this.preservedFilters = [];
        // 빠른검색 대상 필드 목록 (OR 필터와 구분하기 위해 사용)
        this.quickSearchFields = [];
    }
    static create(props) {
        const form = new SearchForm();
        form.page = props?.page ?? 0;
        form.pageSize = props?.pageSize ?? 20;
        form.cacheKey = v1();
        return form;
    }
    /**
     * JSON 객체에서 FilterItem을 복원 (subFilters Map 재구성 포함)
     * @param item 역직렬화된 FilterItem 객체
     * @returns Map 구조가 복원된 FilterItem
     */
    // deserialize input — JSON.parsed shape from backend (arbitrary fields)
    static reconstructFilterItem(item) {
        const reconstructed = {
            name: item.name,
            value: item.value,
            values: item.values,
            queryConditionType: item.queryConditionType,
            not: item.not,
        };
        // subFilters가 있으면 Map으로 재구성
        if (item.subFilters) {
            reconstructed.subFilters = new Map();
            // JSON에서는 Map이 일반 객체로 직렬화됨
            Object.entries(item.subFilters).forEach(([condition, subItems]) => {
                if (Array.isArray(subItems)) {
                    const reconstructedSubItems = subItems.map(subItem => SearchForm.reconstructFilterItem(subItem));
                    reconstructed.subFilters.set(condition, reconstructedSubItems);
                }
            });
        }
        return reconstructed;
    }
    // deserialize input — JSON.parsed shape from backend (arbitrary fields)
    static createByObject(data) {
        const searchForm = Object.assign(new SearchForm(), data);
        // object 가 assign 되면서 sorts 와 filters 가 {} 로 덮어써져 있는 상태다. Map 데이터이기 때문에 제대로 맞춰 줘야 한다.
        searchForm.sorts = new Map();
        searchForm.filters = new Map();
        // Handle sorts - supports both object and array formats from backend
        // Object format: { "studentName": "DESC" }
        // Array format: [["studentName", "DESC"]] (Java Map serialization)
        if (data.sorts) {
            if (Array.isArray(data.sorts)) {
                // Array format: each element is [key, value] pair
                data.sorts.forEach((entry) => {
                    if (Array.isArray(entry) && entry.length === 2) {
                        const [key, value] = entry;
                        if (typeof key === 'string' && (value === 'ASC' || value === 'DESC')) {
                            searchForm.withSort(key, value);
                        }
                    }
                });
            }
            else if (typeof data.sorts === 'object') {
                // Object format: { fieldName: direction }
                Object.entries(data.sorts).forEach(([key, value]) => {
                    // Filter out numeric keys (array indices from malformed data)
                    if (!/^\d+$/.test(key) && (value === 'ASC' || value === 'DESC')) {
                        searchForm.withSort(key, value);
                    }
                });
            }
        }
        if (data.filters && typeof data.filters === 'object') {
            Object.entries(data.filters).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    // FilterItem의 subFilters를 Map으로 재구성
                    const reconstructedItems = value.map(item => SearchForm.reconstructFilterItem(item));
                    searchForm.withFilter(key, ...reconstructedItems);
                }
            });
        }
        // quickSearchFields 복원 (배열 복사)
        searchForm.quickSearchFields = Array.isArray(data.quickSearchFields)
            ? [...data.quickSearchFields]
            : [];
        return searchForm;
    }
    /**
     * 검색 결과에서 반환된 JSON 을 SearchForm 객체로 만든다.
     * @param data
     */
    // intentional: deserialization entry point — accepts arbitrary parsed input
    static deserialize(data) {
        try {
            if (data) {
                const obj = (typeof data === 'string') ? parse(data) : data;
                return this.createByObject(obj);
            }
            else {
                return SearchForm.create();
            }
        }
        catch (e) {
            return SearchForm.create();
        }
    }
    withPage(page) {
        this.page = page;
        return this;
    }
    hasPreservedFilters() {
        return !isEmpty(this.preservedFilters);
    }
    getPreservedFilters() {
        return this.preservedFilters;
    }
    withPreservedFilters(...filters) {
        this.preservedFilters = filters;
        return this;
    }
    withPageSize(pageSize) {
        this.pageSize = pageSize;
        return this;
    }
    withSort(fieldName, direction) {
        if (direction === undefined || direction == null) {
            this.sorts.delete(fieldName);
        }
        else {
            if (this.sorts.size > 0) {
                // 나중에 들어온 정렬 값이 맨 앞으로 가야 하므로 기존 정렬을 제거하고 새로운 정렬을 추가한다.
                // 아래와 같이 입력 순서에 유의해야 한다.
                const newSorts = new Map();
                newSorts.set(fieldName, direction);
                this.sorts.forEach((value, key) => {
                    if (key !== fieldName) {
                        newSorts.set(key, value);
                    }
                });
                this.sorts = newSorts;
            }
            else {
                this.sorts.set(fieldName, direction);
            }
        }
        return this;
    }
    // value can be a primitive string/number/boolean or an array of them
    handleAndFilter(fieldName, value, op, not) {
        if (value === undefined || value === null) {
            if (op === 'NULL') {
                this.handleAndFilter(fieldName, '', op, not);
            }
            else {
                // 무시한다.
                return this;
            }
        }
        else {
            let duplicated = false;
            const filterValue = Array.isArray(value) ? undefined : String(value);
            const filterValues = Array.isArray(value) ? value : undefined;
            this.filters.forEach((filterItems) => {
                filterItems.forEach((filterItem) => {
                    if (filterItem.name === fieldName) {
                        filterItem.value = filterValue;
                        filterItem.values = filterValues;
                        filterItem.queryConditionType = op ?? 'EQUAL';
                        filterItem.not = isTrue(not);
                        duplicated = true;
                        return;
                    }
                });
            });
            if (!duplicated) {
                let values = this.filters.get('AND') || [];
                values.push({ name: fieldName, value: filterValue, values: filterValues, queryConditionType: op, not: not });
                this.filters.set('AND', values);
            }
        }
        return this;
    }
    withFilter(condition, ...filterItems) {
        if (filterItems.length > 0) {
            const values = [];
            if (this.filters.has(condition)) {
                for (const item of this.filters.get(condition) || []) {
                    if (!isBlank(item.name)) {
                        values.push(item);
                    }
                }
            }
            const existingNames = new Set(values.map(value => value.name));
            filterItems.forEach(item => {
                if (!isBlank(item.name)) {
                    if (existingNames.has(item.name)) {
                        // 기존 필터 제거 후 새로운 필터 추가
                        const index = values.findIndex(value => value.name === item.name);
                        values.splice(index, 1);
                    }
                    values.push(item);
                }
            });
            this.filters.set(condition, values);
        }
        return this;
    }
    withFilterIgnoreDuplicate(condition, ...filterItems) {
        if (filterItems.length > 0) {
            let values = this.filters.get(condition) || [];
            // remove duplicated
            for (const item of filterItems) {
                values.push(item);
            }
            this.filters.set(condition, values);
        }
        return this;
    }
    isShouldReturnEmpty() {
        return isTrue(this.shouldReturnEmpty);
    }
    withShouldReturnEmpty(shouldReturnEmpty) {
        this.shouldReturnEmpty = shouldReturnEmpty;
        return this;
    }
    removeFilter(fieldName) {
        if (this.filters) {
            let newFilters = new Map();
            this.filters.forEach((filterItems, condition) => {
                newFilters.set(condition, filterItems.filter(filterItem => filterItem.name !== fieldName));
            });
            this.filters = newFilters;
        }
        return this;
    }
    withIgnoreCache(ignoreCache) {
        this.ignoreCache = ignoreCache ?? true;
        return this;
    }
    clearFilters() {
        this.filters = new Map();
        return this;
    }
    clearSorts() {
        this.sorts = new Map();
        return this;
    }
    getFilters() {
        return this.filters;
    }
    getSorts() {
        return this.sorts;
    }
    filterValues() {
        let filterValues = new Map();
        this.getFilters().forEach((filterItems) => {
            filterItems.forEach((filterItem) => {
                if (filterItem.values && filterItem.values.length > 0) {
                    filterValues.set(filterItem.name, filterItem.values);
                }
                else {
                    filterValues.set(filterItem.name, filterItem.value ?? '');
                }
            });
        });
        return filterValues;
    }
    filterItems() {
        let filterItems = new Map();
        this.getFilters().forEach((items) => {
            items.forEach((filterItem) => {
                if (filterItem.values && filterItem.values.length > 0) {
                    filterItems.set(filterItem.name, {
                        value: filterItem.values,
                        operator: filterItem.queryConditionType ?? 'EQUAL'
                    });
                }
                else {
                    filterItems.set(filterItem.name, { value: filterItem.value || '', operator: filterItem.queryConditionType ?? 'EQUAL' });
                }
            });
        });
        return filterItems;
    }
    getPage() {
        return this?.page || 0;
    }
    getPageSize() {
        return this?.pageSize || 20;
    }
    getFilter(name) {
        const result = [];
        if (this.hasFilters()) {
            this.getFilters().forEach((filterItems, condition) => {
                const filters = filterItems.filter(filterItem => filterItem.name === name);
                if (filters.length > 0) {
                    result.push({ condition: condition, filters: [...filters] });
                }
            });
        }
        return result;
    }
    isFilteredOrSorted(...fieldNames) {
        if (isEmpty(fieldNames) || (this.getFilters().size === 0 && this.getSorts().size === 0)) {
            return false;
        }
        // tenantAlias 에 대한 조건인 경우만 제외하고 필터 여부를 확인한다.
        if (Array.from(this.getFilters().values()).some(filterItems => filterItems.some(filterItem => fieldNames.includes(filterItem.name) &&
            !(filterItem.name === 'tenantAlias' &&
                (filterItem.value === 'defaultTenant' || (filterItem.values?.includes('defaultTenant'))))))) {
            return true;
        }
        // 기본 정렬 요소인 createdAt 을 제외한 나머지가 있으면 true 를 반환한다.
        return Array.from(this.getSorts().keys()).some(name => name !== 'createdAt');
    }
    clearFilterAndSort() {
        this.clearFilters();
        this.clearSorts();
        return this;
    }
    getSortDirection(name) {
        if (this.sorts) {
            return this.getSorts().get(name) ?? null;
        }
        return null;
    }
    getSearchValue(name) {
        let filterItem = this.getFilters().get('AND')?.find(filterItem => filterItem.name === name);
        return filterItem ? (filterItem.values && filterItem.values.length > 0) ? filterItem.values : filterItem.value : null;
    }
    // ============================================================
    // 신규 메서드: OR 조건 확장 및 빠른검색 지원 (SPEC-SEARCH-001)
    // ============================================================
    /**
     * 조건 유형별 필터 조회
     * @param condition 'AND' 또는 'OR'
     * @returns 해당 조건의 FilterItem 배열
     */
    getFiltersByCondition(condition) {
        return this.filters.get(condition) ?? [];
    }
    /**
     * AND/OR 양쪽 조건에서 값 조회 (AND 우선)
     * @param name 필드명
     * @returns 필터 값 또는 null
     */
    getSearchValueFromAnyCondition(name) {
        // AND 조건 우선 검색
        const andValue = this.getSearchValue(name);
        if (andValue !== null) {
            return andValue;
        }
        // OR 조건 검색
        const orFilterItem = this.filters.get('OR')?.find(item => item.name === name);
        if (orFilterItem) {
            return (orFilterItem.values && orFilterItem.values.length > 0) ? orFilterItem.values : orFilterItem.value;
        }
        return null;
    }
    /**
     * 다중 필드 OR 검색 필터 생성
     * @param value 검색값
     * @param fields 검색 대상 필드 배열
     * @returns subFilters를 포함한 FilterItem
     */
    buildQuickSearchFilter(value, fields) {
        const subFilters = new Map();
        const orFilters = fields.map(field => ({
            name: field,
            value: value,
            queryConditionType: 'LIKE',
        }));
        subFilters.set('OR', orFilters);
        return {
            name: '_quickSearch',
            value: value,
            queryConditionType: 'LIKE',
            subFilters: subFilters,
        };
    }
    /**
     * 빠른검색 처리 (AND 조건에 subFilters(OR)를 추가)
     *
     * 결과 쿼리 예시:
     * (name LIKE '%검색어%' OR studentNumber LIKE '%검색어%') AND isActive = true
     *
     * @param value 검색값 (빈 문자열이면 필터 제거)
     * @param fields 검색 대상 필드 배열
     */
    handleQuickSearch(value, fields) {
        // 1. 퀵서치 관련 필드들의 Set 생성 (ManyToOne 필드 지원)
        const fieldsToRemove = new Set();
        // 기존 quickSearchFields와 새 fields 모두에서 제거
        [...this.quickSearchFields, ...fields].forEach(field => {
            fieldsToRemove.add(field);
            fieldsToRemove.add(`${field}.id`);
        });
        // 2. 기존 AND 필터에서 퀵서치 관련 필드 제거 (subFilters가 있는 필터 포함)
        const existingAndFilters = this.filters.get('AND') ?? [];
        const remainingAndFilters = existingAndFilters.filter(filter => {
            // subFilters가 있는 경우: subFilters 내 필드가 퀵서치 필드인지 확인
            if (filter.subFilters && filter.subFilters.size > 0) {
                const orSubFilters = filter.subFilters.get('OR') ?? [];
                return !orSubFilters.some(subFilter => fieldsToRemove.has(subFilter.name));
            }
            return !fieldsToRemove.has(filter.name);
        });
        // 3. 기존 OR 필터에서 퀵서치 관련 필드 제거
        const existingOrFilters = this.filters.get('OR') ?? [];
        const remainingOrFilters = existingOrFilters.filter(filter => !fieldsToRemove.has(filter.name));
        // 4. 필드 목록 업데이트
        this.quickSearchFields = [...fields];
        // 빈 값이면 제거만 하고 종료
        if (isBlank(value)) {
            if (remainingAndFilters.length > 0) {
                this.filters.set('AND', remainingAndFilters);
            }
            else {
                this.filters.delete('AND');
            }
            if (remainingOrFilters.length > 0) {
                this.filters.set('OR', remainingOrFilters);
            }
            else {
                this.filters.delete('OR');
            }
            this.quickSearchFields = [];
            return this;
        }
        // 5. subFilters(OR)를 가진 FilterItem 생성
        // 상위 FilterItem의 name은 퀵서치 필드 중 첫 번째 사용 (백엔드 호환성)
        const subFilters = new Map();
        const orFilters = fields.map(field => ({
            name: field,
            value: value,
            queryConditionType: 'LIKE',
        }));
        subFilters.set('OR', orFilters);
        const quickSearchFilter = {
            name: fields[0], // 퀵서치 가능 필드 중 첫 번째 사용
            value: undefined,
            subFilters: subFilters,
        };
        // 6. AND 필터에 추가 (기존 필터 유지 + 퀵서치 필터)
        this.filters.set('AND', [...remainingAndFilters, quickSearchFilter]);
        // 7. OR 필터 정리 (퀵서치는 더 이상 OR에 직접 추가되지 않음)
        if (remainingOrFilters.length > 0) {
            this.filters.set('OR', remainingOrFilters);
        }
        else {
            this.filters.delete('OR');
        }
        return this;
    }
    /**
     * 빠른검색 값 조회
     * @returns 빠른검색 값 또는 null
     */
    getQuickSearchValue() {
        // quickSearchFields를 사용하여 빠른검색 필터 식별
        if (this.quickSearchFields.length === 0) {
            return null;
        }
        // AND 필터에서 subFilters가 있는 퀵서치 필터 찾기
        const andFilters = this.filters.get('AND') ?? [];
        const quickSearchFilter = andFilters.find(filter => {
            // 퀵서치 필드 중 하나가 name이고 subFilters가 있는 필터
            if (filter.subFilters && filter.subFilters.size > 0 &&
                this.quickSearchFields.includes(filter.name)) {
                return true;
            }
            return false;
        });
        // subFilters 내 OR 조건에서 값 조회
        if (quickSearchFilter?.subFilters) {
            const orSubFilters = quickSearchFilter.subFilters.get('OR') ?? [];
            const firstSubFilter = orSubFilters[0];
            return firstSubFilter?.value ?? null;
        }
        return null;
    }
    /**
     * 빠른검색 대상 필드 목록 조회
     * @returns 빠른검색 대상 필드 배열
     */
    getQuickSearchFields() {
        return [...this.quickSearchFields];
    }
    clone() {
        const searchForm = SearchForm.create({ page: this.page, pageSize: this.pageSize });
        // copy values
        searchForm.ignoreCache = this.ignoreCache;
        searchForm.viewDetail = this.viewDetail;
        searchForm.shouldReturnEmpty = this.shouldReturnEmpty;
        // clone sorts
        searchForm.sorts = new Map(this.sorts);
        // clone filters (deep clone including subFilters)
        searchForm.filters = new Map();
        this.filters.forEach((filterItems, key) => {
            const clonedItems = filterItems.map(item => this.cloneFilterItem(item));
            searchForm.filters.set(key, clonedItems);
        });
        searchForm.preservedFilters = [...this.preservedFilters];
        // clone quickSearchFields
        searchForm.quickSearchFields = [...this.quickSearchFields];
        return searchForm;
    }
    /**
     * FilterItem 깊은 복사 (subFilters 포함)
     * @param item 복사할 FilterItem
     * @returns 복사된 FilterItem
     */
    cloneFilterItem(item) {
        const cloned = {
            name: item.name,
            value: item.value,
            values: item.values ? [...item.values] : undefined,
            queryConditionType: item.queryConditionType,
            not: item.not,
        };
        // subFilters 깊은 복사
        if (item.subFilters) {
            cloned.subFilters = new Map();
            item.subFilters.forEach((subItems, condition) => {
                const clonedSubItems = subItems.map(subItem => this.cloneFilterItem(subItem));
                cloned.subFilters.set(condition, clonedSubItems);
            });
        }
        return cloned;
    }
    getFilterOperator(fieldName) {
        if (this.filters === undefined || this.filters.size === 0) {
            return undefined;
        }
        const filterItems = this.filters.get('AND') || [];
        const filterItem = filterItems.find(filterItem => filterItem.name === fieldName);
        if (filterItem) {
            return filterItem.queryConditionType;
        }
        return undefined;
    }
    withViewDetail(viewDetail) {
        this.viewDetail = viewDetail;
        return this;
    }
    hasFilters() {
        if (this.filters === undefined || this.filters.size === 0)
            return false;
        const andConditionSize = this.filters.get('AND')?.length ?? 0;
        const orConditionSize = this.filters.get('OR')?.length ?? 0;
        return andConditionSize + orConditionSize > 0;
    }
    getCacheKey() {
        return this.cacheKey;
    }
}
//# sourceMappingURL=SearchForm.js.map