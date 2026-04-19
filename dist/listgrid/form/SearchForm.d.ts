import { FormField } from '../components/fields/abstract';
import { SelectOption } from './Type';
export type QueryConditionType = 'EQUAL' | 'NOT_EQUAL' | 'EQUAL_IGNORECASE' | 'IN' | 'NOT_IN' | 'NULL' | 'NOT_NULL' | 'LIKE' | 'NOT_LIKE' | 'START_WITH' | 'NOT_START_WITH' | 'END_WITH' | 'NOT_END_WITH' | 'LESS_THAN' | 'LESS_THAN_EQUAL' | 'GREATER' | 'GREATER_THAN_EQUAL' | 'NOT_LESS_THAN' | 'NOT_LESS_THAN_EQUAL' | 'NOT_GREATER' | 'NOT_GREATER_THAN_EQUAL' | 'BETWEEN' | 'NOT_BETWEEN' | 'ID_EQUAL';
/**
 * 값이 몇개가 필요한지 - Rule Field 를 렌더링 할 때 사용한다.
 * NONE: 필요 없음
 * SINGLE: 하나만 필요
 * RANGE: 두개 필요
 * MULTIPLE: 복수 입력 가능
 */
export type QueryConditionValueType = 'NONE' | 'SINGLE' | 'RANGE' | 'MULTIPLE';
/**
 * QueryConditionType 에 따른 QueryConditionValueType 을 반환한다.
 * @param type
 */
export declare function getQueryConditionValueType(type: QueryConditionType): QueryConditionValueType;
export declare function getQueryConditionTypes(field: FormField<any>): SelectOption[];
export declare function getQueryConditionHelpText(name: any, type: QueryConditionType): string;
export interface SearchValue {
    name: string;
    value: any;
    op?: QueryConditionType;
    shouldReturnEmpty?: boolean;
    remove?: boolean;
    excludePreserve?: boolean;
}
export declare class SearchForm {
    private cacheKey;
    private pageSize;
    private page;
    private sorts;
    private filters;
    private ignoreCache;
    private viewDetail;
    private shouldReturnEmpty;
    private preservedFilters;
    private quickSearchFields;
    static create(props?: {
        page?: number;
        pageSize?: number;
    }): SearchForm;
    /**
     * JSON 객체에서 FilterItem을 복원 (subFilters Map 재구성 포함)
     * @param item 역직렬화된 FilterItem 객체
     * @returns Map 구조가 복원된 FilterItem
     */
    private static reconstructFilterItem;
    private static createByObject;
    /**
     * 검색 결과에서 반환된 JSON 을 SearchForm 객체로 만든다.
     * @param data
     */
    static deserialize(data: any): SearchForm;
    withPage(page: number): this;
    hasPreservedFilters(): boolean;
    getPreservedFilters(): SearchValueConfig[];
    withPreservedFilters(...filters: SearchValueConfig[]): this;
    withPageSize(pageSize: number): this;
    withSort(fieldName: string, direction?: Direction): this;
    handleAndFilter(fieldName: string, value: string | number | boolean | string[] | null | undefined, op?: QueryConditionType, not?: boolean): this;
    withFilter(condition: 'AND' | 'OR', ...filterItems: FilterItem[]): this;
    withFilterIgnoreDuplicate(condition: 'AND' | 'OR', ...filterItems: FilterItem[]): this;
    isShouldReturnEmpty(): boolean;
    withShouldReturnEmpty(shouldReturnEmpty: boolean): this;
    removeFilter(fieldName: string): this;
    withIgnoreCache(ignoreCache?: boolean): this;
    clearFilters(): SearchForm;
    clearSorts(): SearchForm;
    getFilters(): Map<'AND' | 'OR', FilterItem[]>;
    getSorts(): Map<string, Direction>;
    filterValues(): Map<string, string | string[]>;
    filterItems(): Map<string, {
        value: string | string[];
        operator: QueryConditionType;
    }>;
    getPage(): number;
    getPageSize(): number;
    getFilter(name: string): {
        condition: 'AND' | 'OR';
        filters: FilterItem[];
    }[];
    isFilteredOrSorted(...fieldNames: string[]): boolean;
    clearFilterAndSort(): this;
    getSortDirection(name: string): Direction | null;
    getSearchValue(name: string): string | string[] | null | undefined;
    /**
     * 조건 유형별 필터 조회
     * @param condition 'AND' 또는 'OR'
     * @returns 해당 조건의 FilterItem 배열
     */
    getFiltersByCondition(condition: 'AND' | 'OR'): FilterItem[];
    /**
     * AND/OR 양쪽 조건에서 값 조회 (AND 우선)
     * @param name 필드명
     * @returns 필터 값 또는 null
     */
    getSearchValueFromAnyCondition(name: string): string | string[] | null | undefined;
    /**
     * 다중 필드 OR 검색 필터 생성
     * @param value 검색값
     * @param fields 검색 대상 필드 배열
     * @returns subFilters를 포함한 FilterItem
     */
    buildQuickSearchFilter(value: string, fields: string[]): FilterItem;
    /**
     * 빠른검색 처리 (AND 조건에 subFilters(OR)를 추가)
     *
     * 결과 쿼리 예시:
     * (name LIKE '%검색어%' OR studentNumber LIKE '%검색어%') AND isActive = true
     *
     * @param value 검색값 (빈 문자열이면 필터 제거)
     * @param fields 검색 대상 필드 배열
     */
    handleQuickSearch(value: string, fields: string[]): this;
    /**
     * 빠른검색 값 조회
     * @returns 빠른검색 값 또는 null
     */
    getQuickSearchValue(): string | null;
    /**
     * 빠른검색 대상 필드 목록 조회
     * @returns 빠른검색 대상 필드 배열
     */
    getQuickSearchFields(): string[];
    clone(): SearchForm;
    /**
     * FilterItem 깊은 복사 (subFilters 포함)
     * @param item 복사할 FilterItem
     * @returns 복사된 FilterItem
     */
    private cloneFilterItem;
    getFilterOperator(fieldName: string): QueryConditionType | undefined;
    withViewDetail(viewDetail: boolean): this;
    hasFilters(): boolean;
    getCacheKey(): string;
}
export interface FilterItem {
    name: string;
    value?: string | undefined;
    values?: string[] | undefined;
    queryConditionType?: QueryConditionType | undefined;
    not?: boolean | undefined;
    subFilters?: Map<'AND' | 'OR', FilterItem[]> | undefined;
}
export type Direction = 'ASC' | 'DESC';
export interface SearchValueConfig {
    name: string;
    value: any;
    op?: QueryConditionType;
    shouldReturnEmpty?: boolean;
    remove?: boolean;
    excludePreserve?: boolean;
}
//# sourceMappingURL=SearchForm.d.ts.map