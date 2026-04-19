import { AbstractManyToOneField, AbstractManyToOneFieldProps, CardViewConfig, SelectBoxViewConfig, UserListFieldProps, ViewListProps, ViewListResult, ViewRenderProps, ViewRenderResult } from './abstract';
import React from 'react';
import { ManyToOneConfig } from '../../config/Config';
import { FieldRenderParameters, FilterRenderParameters } from '../../config/EntityField';
export interface ManyToOneFieldProps extends AbstractManyToOneFieldProps {
}
export declare class ManyToOneField extends AbstractManyToOneField<ManyToOneField> {
    constructor(name: string, order: number, manyToOne: ManyToOneConfig);
    /**
     * ManyToOneField 핵심 렌더링 로직 (원본 render 로직 보존)
     * useCardView가 활성화된 경우 CardManyToOneView로 렌더링
     * useSelectBoxView가 활성화된 경우 SelectBoxManyToOneView로 렌더링
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * ManyToOneField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): ManyToOneField;
    /**
     * ManyToOneField 리스트 필터 렌더링
     * multiFilter가 true이면 다중 선택 UI를 렌더링
     */
    protected renderListFilterInstance(params: FilterRenderParameters): Promise<React.ReactNode | null>;
    /**
     * ManyToOneField 리스트 아이템 렌더링 (원본 renderListItem 로직 보존)
     * 중첩 경로 지원: score.course.semester 같은 경로를 처리할 수 있음
     */
    protected renderListItemInstance(props: ViewListProps): Promise<ViewListResult>;
    /**
     * ManyToOneField View 모드 렌더링 - 연관 엔티티의 이름/제목 표시
     * 중첩 경로 지원: score.course.semester 같은 경로를 처리할 수 있음
     * cardIcon이 설정된 경우 아이콘과 함께 표시
     */
    protected renderViewInstance(props: ViewRenderProps): Promise<ViewRenderResult>;
    useListField(props?: number | UserListFieldProps): this;
    static create(props: ManyToOneFieldProps): ManyToOneField;
    withManyToOneConfig(config: ManyToOneConfig): this;
    /**
     * 카드뷰 렌더링 활성화
     * EntityFormThemeProvider 없이도 CardManyToOneView로 렌더링 가능
     *
     * @example
     * ```tsx
     * ManyToOneField.create({
     *   name: 'syllabus',
     *   order: 1,
     *   config: { entityForm: SyllabusEntityForm() }
     * })
     * .withCardView({
     *   columns: 3,
     *   mobileColumns: 2,
     *   cardConfig: {
     *     titleField: 'name',
     *     descriptionField: (item) => `입학지원기간: ${formatDate(item.availableDate[0])}`,
     *   }
     * })
     * ```
     */
    withCardView(config?: CardViewConfig): this;
    /**
     * 셀렉트박스뷰 렌더링 활성화
     * ManyToOne 필드를 드롭다운 SelectBox로 렌더링
     *
     * @example
     * ```tsx
     * ManyToOneField.create({
     *   name: 'country',
     *   order: 1,
     *   config: { entityForm: CountryEntityForm() }
     * })
     * .withSelectBoxView({
     *   labelField: 'name',
     *   placeholder: '국가를 선택하세요',
     *   isSearchable: true,
     * })
     * ```
     */
    withSelectBoxView(config?: SelectBoxViewConfig): this;
}
export declare function getManyToOneEntityValue(name: string, value: any, config: ManyToOneConfig): Promise<any>;
//# sourceMappingURL=ManyToOneField.d.ts.map