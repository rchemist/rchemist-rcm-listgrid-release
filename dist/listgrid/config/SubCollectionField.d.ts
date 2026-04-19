import { EntityItem } from '../config/EntityItem';
import { EntityForm } from '../config/EntityForm';
import { ConditionalReactNodeValue, HelpTextType, HiddenType, LabelType, ManyToOneFilter, OptionalBoolean, ReadOnlyType, ViewPreset } from '../config/Config';
import { ListGrid } from '../config/ListGrid';
import { ReactNode } from 'react';
import { ViewListGridOptionProps } from '../components/list/types/ViewListGrid.types';
import { FilterItem } from '../form/SearchForm';
import { FieldInfoParameters } from './EntityField';
import { Session } from '../auth/types';
export declare class SubCollectionField implements EntityItem {
    order: number;
    name: string;
    label?: LabelType | undefined;
    helpText?: HelpTextType | undefined;
    hidden?: HiddenType | undefined;
    readonly?: ReadOnlyType | undefined;
    dynamicUrl?: ((parentEntityForm: EntityForm) => string) | undefined;
    form?: {
        tabId: string;
        fieldGroupId: string;
    } | undefined;
    entityForm: EntityForm;
    hideLabel?: boolean | undefined;
    relation: SubCollectionRelation;
    listViewFields?: string[] | undefined;
    viewListOptions?: ViewListGridOptionProps | undefined;
    constructor(props: {
        entityForm: EntityForm;
        relation: SubCollectionRelation;
        order: number;
        name: string;
        label?: LabelType | undefined;
        helpText?: HelpTextType | undefined;
        hidden?: HiddenType | undefined;
        readonly?: ReadOnlyType | undefined;
        dynamicUrl?: ((parentEntityForm: EntityForm) => string) | undefined;
        viewListOptions?: ViewListGridOptionProps | undefined;
    });
    withTooltip(tooltip?: ConditionalReactNodeValue): this;
    clone(): SubCollectionField;
    getTabId(): string;
    getFieldGroupId(): string;
    withTabId(tabId: string): this;
    withFieldGroupId(fieldGroupId: string): this;
    withHelpText(helpText?: HelpTextType): this;
    withHidden(hidden?: boolean | OptionalBoolean): this;
    withLabel(label?: LabelType): this;
    withReadOnly(readOnly?: boolean | OptionalBoolean): this;
    withHideLabel(hideLabel?: boolean): this;
    withOrder(order: number): this;
    withViewListGridOptionProps(props: ViewListGridOptionProps): this;
    getViewListGridOptionProps(): ViewListGridOptionProps;
    getOrder(): number;
    getName(): string;
    getLabel(): LabelType;
    getHelpText(props: FieldInfoParameters): Promise<ReactNode>;
    isHidden(props: FieldInfoParameters): Promise<boolean>;
    isReadonly(props: FieldInfoParameters): Promise<boolean>;
    withForm(form: {
        tabId: string;
        fieldGroupId: string;
    }): this;
    withViewPreset(type: ViewPreset): this;
    withListViewFields(...listViewFields: string[]): this;
    withDynamicUrl(props: (parentEntityForm: EntityForm) => string): this;
    getListGrid(parentEntityForm: EntityForm): ListGrid;
    render({ entityForm, session, }: {
        entityForm: EntityForm;
        session?: Session;
    }): Promise<ReactNode | null>;
    protected getMappedByFilter(entityForm: EntityForm): FilterItem;
    protected getMappedByValue(entityForm: EntityForm): string | number | undefined;
}
interface SubCollectionRelation {
    /**
     * Create/Update Form 전송 시 부모 엔티티 ID를 담을 필드명.
     *
     * [주의] JPA의 @ManyToOne mappedBy와 다른 개념입니다!
     *
     * - 용도: 백엔드 CreateForm/UpdateForm에 전송되는 필드명
     * - 형식: 보통 'parentEntityId' 형태 (예: 'practiceId', 'syllabusId')
     * - 조회 필터 변환: 'xxxId' 형태면 자동으로 'xxx.id'로 변환되어 조회 필터에 사용됨
     *
     * 예시:
     * - mappedBy: 'practiceId' → Create 시 { practiceId: '...' } 전송
     *                          → 조회 시 practice.id 필터로 자동 변환
     */
    mappedBy: string;
    /**
     * 조회 필터에 사용할 필드명 (선택사항).
     *
     * - 용도: 서브 콜렉션 목록 조회 시 부모 ID로 필터링할 필드명
     * - 형식: 보통 'entity.id' 형태 (예: 'practice.id', 'syllabus.id')
     * - 미지정 시: mappedBy가 'xxxId' 형태면 자동으로 'xxx.id'로 변환
     *
     * 명시적 지정이 필요한 경우:
     * - mappedBy와 다른 필드명으로 조회해야 할 때
     * - 자동 변환 규칙이 맞지 않을 때
     */
    filterBy?: string;
    /**
     * 부모 엔티티에서 mappedBy 값으로 사용할 프로퍼티명.
     *
     * - 미지정 시: 부모 entityForm의 'id' 사용
     * - 지정 시: 부모 entityForm에서 해당 프로퍼티 값 사용
     */
    valueProperty?: string;
    /**
     * 서브콜렉션 내부에서 사용할 추가 속성.
     *
     * 예: 서브콜렉션 내 ManyToOneField의 필터에 최상위 엔티티 값이 필요할 때
     * (Syllabus - SyllabusPrivileged 관계에서 admission 필터가 syllabus.id일 때 등)
     */
    attributes?: Record<string, any>;
    subCollectionEntityForm?: {
        manyToOneFilter?: Record<string, ManyToOneFilter[]>;
    };
}
export {};
//# sourceMappingURL=SubCollectionField.d.ts.map