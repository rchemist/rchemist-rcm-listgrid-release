import React from 'react';
import { FormField, FormFieldProps, ViewRenderProps, ViewRenderResult } from './FormField';
import { EntityField, FilterRenderParameters } from '../../../config/EntityField';
import { EntityForm } from '../../../config/EntityForm';
import { LabelType, RenderType } from '../../../config/Config';
import { TextAlignType } from '../../../common/type';
import { QueryConditionType } from '../../../form/SearchForm';
/**
 * 중첩 객체에서 dot notation 경로로 값을 가져온다.
 * 예: getNestedValue(item, 'score.student.name') -> item.score.student.name
 * @param obj 대상 객체
 * @param path dot notation 경로 (예: 'score.student.name')
 * @returns 경로에 해당하는 값 또는 undefined
 */
export declare function getNestedValue(obj: any, path: string): any;
export interface ViewListProps {
    entityForm: EntityForm;
    item: any;
    router: any;
    viewUrl: string;
}
export interface ViewListResult {
    result: React.ReactNode | null;
    linkOnCell?: boolean;
}
export interface IListConfig {
    support?: boolean | undefined;
    quickSearch?: boolean | undefined;
    filterable?: boolean | undefined;
    sortable?: boolean | undefined;
    order?: number | undefined;
    label?: LabelType | undefined;
    align?: TextAlignType | undefined;
    viewRaw?: boolean | undefined;
    op?: QueryConditionType | undefined;
    multiFilter?: boolean | undefined;
}
export interface UserListFieldProps {
    order?: number;
    quickSearch?: boolean;
    sortable?: boolean;
    filterable?: boolean;
    multiFilter?: boolean;
}
export interface ListableFormFieldProps<TValue = any, TForm extends object = any> extends FormFieldProps<TValue, TForm> {
    listConfig?: IListConfig;
    showList?: boolean;
    overrideRenderListItem?: (props: ViewListProps) => Promise<ViewListResult>;
    overrideRenderListFilter?(params: FilterRenderParameters<TForm, TValue>): Promise<React.ReactNode | null>;
}
export declare abstract class ListableFormField<TSelf extends ListableFormField<TSelf, TValue, TForm>, TValue = any, TForm extends object = any> extends FormField<TSelf, TValue, TForm> {
    listConfig?: IListConfig;
    overrideRenderListItem?: (props: ViewListProps) => Promise<ViewListResult>;
    overrideRenderListFilter?(params: FilterRenderParameters<TForm, TValue>): Promise<React.ReactNode | null>;
    /**
     * 각 필드의 핵심 리스트 필터 렌더링 로직을 구현하는 추상 메소드
     * null을 반환하면 기본 필터 로직(원본 renderListFilter)을 적용
     */
    protected renderListFilterInstance(params: FilterRenderParameters<TForm, TValue>): Promise<React.ReactNode | null>;
    /**
     * 각 필드의 핵심 리스트 아이템 렌더링 로직을 구현하는 추상 메소드
     * null을 반환하면 기본 리스트 아이템 로직(원본 renderListItem)을 적용
     */
    protected renderListItemInstance(props: ViewListProps): Promise<ViewListResult | null>;
    /**
     * ListGrid 에서 List 를 출력할 때 각 항목을 출력하는 방식.
     * EntityForm 설정에서 overrideRenderList 를 이용해 오버라이드 할 수 있다.
     * @param props
     */
    viewListItem(props: ViewListProps): Promise<ViewListResult>;
    /**
     * 목록의 통합 검색 표시
     * EntityForm 을 설정할 때 overrideRenderListFilter 를 통해 override 할 수도 있다.
     * 설정된 오버라이드가 없으면 #renderListFilter 를 실행한다.
     * @param params
     */
    viewListFilter(params: FilterRenderParameters<TForm, TValue>): Promise<React.ReactNode | null>;
    /**
     * 리스트 필터 렌더링 - renderListFilterInstance가 null이면 원본 기본 로직 사용
     */
    protected renderListFilter(params: FilterRenderParameters<TForm, TValue>): Promise<React.ReactNode | null>;
    /**
     * 각 필드 별로 목록에 필터 처리가 될 때 어떻게 표시해야 하는지에 대한 기본 설정.
     * ListableFormField 를 구현한 필드들에서 기본적인 렌더링 외에 필요한 처리가 있다면 이 메소드를 오버라이드 한다.
     * 예를 들어, 날짜 필드는 단순 날짜 입력이 아니라 날짜 범위 입력이 가능하게 해야 한다든가 하는 등의 처리를 한다.
     * @param onChange
     * @param params
     * @protected
     */
    protected renderListFilterOriginal({ onChange, ...params }: FilterRenderParameters<TForm, TValue>): Promise<React.ReactNode | null>;
    /**
     * 리스트 아이템 렌더링 - renderListItemInstance가 null이면 원본 기본 로직 사용
     */
    protected renderListItem(props: ViewListProps): Promise<ViewListResult>;
    /**
     * 각 필드 별로 목록에 표시할 때 어떻게 표시해야 하는지 처리한다.
     * 기본적으로는 단순 문자열로 취급하지만,
     * Boolean 타입인 경우 Badge 로 표시한다든가 날짜일 때는 몇 시간 전, 등의 표시로 바꾼다든가 각 필드 별로 이 메소드를 오버라이드 해 사용한다.
     * @param props
     * @protected
     */
    protected renderListItemOriginal(props: ViewListProps): Promise<ViewListResult>;
    /**
     * View 모드에서 필드 값을 렌더링하는 메소드 (ListableFormField 오버라이드)
     * renderListItemInstance의 로직을 재사용하여 일관된 포맷 제공
     *
     * @param props View 렌더링에 필요한 파라미터
     * @returns 렌더링 결과
     */
    protected renderViewInstance(props: ViewRenderProps): Promise<ViewRenderResult>;
    useListField(props?: number | UserListFieldProps): this;
    withListConfig(list?: IListConfig): this;
    withOverrideRenderListItem(overrideRenderList?: (props: ViewListProps) => Promise<ViewListResult>): this;
    withOverrideRenderListFilter(overrideRenderFilter?: (params: FilterRenderParameters<TForm, TValue>) => Promise<React.ReactNode | null>): this;
    isSupportList(): boolean;
    getListConfig(): IListConfig | undefined;
    getListFieldAlignType(): TextAlignType;
    /**
     * 목록 필터 사용 여부 설정.
     * 설정이 없는 한 필터 사용은 true 이다.
     * 하지만 필터 처리를 하지 말아야 하는 경우에는 이 값을 false 로 명시적으로 선언해야 한다.
     * @param filterable
     */
    withFilterable(filterable?: boolean): this;
    /**
     * EntityForm 이 저장될 때 서버로 전송할 값을 override 하는 메소드
     * @param saveValue
     */
    withSaveValue(saveValue: (entityForm: EntityForm<TForm>, field: EntityField, renderType?: RenderType) => Promise<TValue>): this;
    /**
     * 목록 정렬 사용 여부 설정
     * 설정이 없는 한 정렬 사용은 true 이다.
     * 하지만 정렬을 하지 말아야 하는 경우에는 이 값을 false 로 명시적으로 선언해야 한다.
     * @param sortable
     */
    withSortable(sortable?: boolean): this;
    isFilterable(): boolean;
    isSortable(): boolean;
    protected copyFields(origin: ListableFormFieldProps<TValue, TForm>, includeValue?: boolean): this;
}
//# sourceMappingURL=ListableFormField.d.ts.map