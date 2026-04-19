import { FieldType, FieldValue, HelpTextType, HiddenType, LabelType, PlaceHolderType, ReadOnlyType, RenderType, RequiredType, TooltipType, ViewPreset } from '../../../config/Config';
import { ValidateResult, Validation } from '../../../validations/Validation';
import { EntityForm } from '../../../config/EntityForm';
import React, { ReactNode } from 'react';
import { EntityField, FieldInfoParameters, FieldRenderParameters } from '../../../config/EntityField';
import { Session } from '../../../auth/types';
/**
 * Card View 아이콘 타입
 * Tabler Icons 등의 아이콘 컴포넌트를 지원
 */
export type CardIconType = React.ComponentType<{
    className?: string;
    stroke?: number;
}>;
/**
 * View 모드 렌더링을 위한 파라미터
 * CardSubCollectionField 등에서 필드 값을 View 모드로 표시할 때 사용
 *
 * TForm 은 item 타입 (entity row) 으로, FormField<TSelf, TValue, TForm>
 * 의 TForm 과 동일 의미. default `any` 로 소비자 무수정 호환 (Task G).
 */
export interface ViewRenderProps<TForm extends object = any> {
    /** 아이템 데이터 (필드 값을 포함한 객체) */
    item: TForm;
    /** 엔티티 폼 인스턴스 (옵션) */
    entityForm?: EntityForm<TForm>;
    /**
     * Compact 모드 - 아이콘 없이 깔끔한 텍스트만 표시
     * CardSubCollectionField 등에서 여러 필드를 나열할 때 사용
     */
    compact?: boolean;
}
/**
 * View 모드 렌더링 결과
 */
export interface ViewRenderResult {
    /** 렌더링된 React 노드 */
    result: React.ReactNode | null;
}
/**
 * 필드 레이아웃 타입
 * - 'auto': 필드 타입에 따라 자동 결정 (기본값)
 * - 'full': 항상 전체 너비 (2열 모드에서도 한 줄 전체 사용)
 * - 'half': 항상 절반 너비 (2열 모드에서 한 칸만 차지)
 */
export type FieldLayoutType = 'auto' | 'full' | 'half';
/**
 * 전체 너비(full)를 기본으로 사용하는 필드 타입 목록
 * 이 타입들은 UI 크기가 커서 2열 레이아웃에서 한 줄 전체를 차지하는 것이 적합함
 */
export declare const FULL_WIDTH_FIELD_TYPES: FieldType[];
export interface FormFieldProps<TValue = any, TForm extends object = any> {
    value?: FieldValue<TValue>;
    placeHolder?: PlaceHolderType;
    required?: RequiredType;
    validations?: Validation[];
    /**
     * display value 를 변조할 수 있다.
     * @param field
     * @param renderType
     */
    displayFunc?: (entityForm: EntityForm<TForm>, field: EntityField, renderType?: RenderType) => Promise<TValue>;
    overrideRender?: (params: FieldRenderParameters<TForm, TValue>) => Promise<ReactNode | null | undefined>;
    order: number;
    name: string;
    label?: LabelType;
    tooltip?: TooltipType;
    helpText?: HelpTextType;
    hidden?: HiddenType;
    readonly?: ReadOnlyType;
    attributes?: Map<string, unknown>;
    hideLabel?: boolean;
    requiredPermissions?: string[];
    layout?: FieldLayoutType;
    lineBreak?: boolean;
    cardIcon?: CardIconType;
    viewPreset?: ViewPreset;
    form?: {
        tabId: string;
        fieldGroupId: string;
    };
    saveValue?: (entityForm: EntityForm<TForm>, field: EntityField, renderType?: RenderType) => Promise<TValue>;
    maskedValueFunc?: (entityForm: EntityForm<TForm>, value: TValue) => Promise<string>;
    exceptOnSave?: boolean;
}
export declare abstract class FormField<TSelf extends FormField<TSelf, TValue, TForm>, TValue = any, TForm extends object = any> implements EntityField {
    order: number;
    name: string;
    type: FieldType;
    exceptOnSave?: boolean;
    constructor(name: string, order: number, type: FieldType);
    value?: FieldValue<TValue>;
    tooltip?: TooltipType;
    helpText?: HelpTextType;
    placeHolder?: PlaceHolderType;
    hidden?: HiddenType;
    label: LabelType;
    readonly?: ReadOnlyType;
    required?: RequiredType;
    hideLabel?: boolean;
    attributes?: Map<string, unknown>;
    requiredPermissions?: string[];
    cardIcon?: CardIconType;
    layout?: FieldLayoutType;
    lineBreak?: boolean;
    form?: {
        tabId: string;
        fieldGroupId: string;
    };
    validations?: Validation[];
    overrideRender?: (params: FieldRenderParameters<TForm, TValue>) => Promise<React.ReactNode | null | undefined>;
    saveValue?: (entityForm: EntityForm<TForm>, field: EntityField, renderType?: RenderType) => Promise<TValue>;
    displayFunc?: (entityForm: EntityForm<TForm>, field: EntityField, renderType?: RenderType) => Promise<TValue>;
    maskedValueFunc?: (entityForm: EntityForm<TForm>, value: TValue) => Promise<string>;
    /**
     * 새로운 필드 인스턴스를 생성하는 추상 메소드
     * 각 구체 클래스에서 자신의 타입으로 구현해야 함
     */
    protected abstract createInstance(name: string, order: number): TSelf;
    /**
     * 각 필드의 핵심 렌더링 로직을 구현하는 추상 메소드
     * 기존 render() 메소드의 핵심 부분만 구현
     */
    protected abstract renderInstance(params: FieldRenderParameters<TForm, TValue>): Promise<React.ReactNode | null>;
    /**
     * View 모드에서 필드 값을 렌더링하는 메소드
     * 기본 구현은 단순 문자열 변환. 각 필드에서 오버라이드하여 적절한 포맷 적용.
     * 예: NumberField는 formatPrice(), SelectField는 Badge 컴포넌트 사용
     *
     * @param props View 렌더링에 필요한 파라미터
     * @returns 렌더링 결과
     */
    protected renderViewInstance(props: ViewRenderProps<TForm>): Promise<ViewRenderResult>;
    /**
     * cardIcon이 설정된 경우 값을 아이콘과 함께 감싸서 반환
     * compact 모드이거나 아이콘이 없으면 텍스트만 반환
     *
     * @param text 표시할 텍스트
     * @param compact true이면 아이콘 없이 텍스트만 반환
     */
    protected wrapWithCardIcon(text: string, compact?: boolean): ViewRenderResult;
    /**
     * View 모드에서 필드 값을 렌더링하는 공개 메소드
     * CardSubCollectionField 등에서 호출하여 사용
     *
     * @param props View 렌더링에 필요한 파라미터
     * @returns 렌더링 결과
     */
    viewValue(props: ViewRenderProps<TForm>): Promise<ViewRenderResult>;
    /**
     * 공통 clone 로직 - 모든 필드에서 사용
     * StateTracker 로직 포함
     */
    clone(includeValue?: boolean): TSelf;
    protected copyFields(origin: FormFieldProps<TValue, TForm>, includeValue?: boolean): this;
    getTabId(): string;
    getFieldGroupId(): string;
    withTabId(tabId: string): this;
    withFieldGroupId(fieldGroupId: string): this;
    getDisplayValue(entityForm: EntityForm<TForm>, renderType?: RenderType): Promise<any>;
    withDisplayFunc(fn: (entityForm: EntityForm<TForm>, field: EntityField, renderType?: RenderType) => Promise<TValue>): this;
    /**
     * Set a masking function for readonly display.
     * When the field is readonly and has a value, the maskedValueFunc is called
     * to produce a masked display string. The original value is never modified.
     */
    withMaskedValue(fn: (entityForm: EntityForm<TForm>, value: TValue) => Promise<string>): this;
    withAddOnly(): this;
    withModifyOnly(): this;
    withViewHidden(): this;
    withListOnly(): this;
    withViewPreset(type?: ViewPreset): this;
    withHideLabel(hideLabel?: boolean): this;
    /**
     * Card View 모드에서 표시할 커스텀 아이콘을 설정합니다.
     * Tabler Icons 등의 아이콘 컴포넌트를 전달할 수 있습니다.
     *
     * @example
     * ```typescript
     * import { IconUser, IconMail } from '@tabler/icons-react';
     *
     * TextField.create({ name: 'email', order: 1 })
     *   .withCardIcon(IconMail)
     *   .withLabel('이메일');
     * ```
     */
    withCardIcon(icon?: CardIconType): this;
    withLayout(layout: FieldLayoutType): this;
    withLineBreak(lineBreak?: boolean): this;
    view(params: FieldRenderParameters<TForm, TValue>): Promise<React.ReactNode | null | undefined>;
    /**
     * 공통 render 로직 - 모든 필드에서 사용
     * StateTracker, Performance tracking, Error handling 포함
     */
    render(params: FieldRenderParameters<TForm, TValue>): Promise<React.ReactNode | null | undefined>;
    /**
     * 이 필드를 View 화면에서 렌더링하는 로직을 override 할 수 있습니다.
     * @param fn
     */
    withOverrideRender(fn: (params: FieldRenderParameters<TForm, TValue>) => Promise<React.ReactNode | null | undefined>): this;
    withOrder(order: number): this;
    isBlank(renderType?: RenderType): Promise<boolean>;
    isDirty(): boolean;
    /**
     * 빈값을 undefined로 정규화하는 헬퍼 메서드
     * isDirty() 비교 시 빈 문자열, null, 빈 객체 등을 undefined로 통일
     */
    private normalizeEmptyValue;
    withTooltip(tooltip?: TooltipType): this;
    withHelpText(helpText?: HelpTextType): this;
    withPlaceHolder(placeHolder?: PlaceHolderType): this;
    withHidden(hidden?: HiddenType): this;
    withLabel(label?: LabelType): this;
    withReadOnly(readOnly?: ReadOnlyType): this;
    withRequired(required?: RequiredType): this;
    withValue(value: TValue | FieldValue<TValue> | any): this;
    getOrder(): number;
    getName(): string;
    getLabel(): LabelType;
    withAttributes(attributes: Map<string, unknown>): this;
    viewLabel(t: any): ReactNode;
    getTooltip(props: FieldInfoParameters<TForm>): Promise<ReactNode>;
    getHelpText(props: FieldInfoParameters<TForm>): Promise<ReactNode>;
    getPlaceHolder(props: FieldInfoParameters<TForm>): Promise<string>;
    isRequired(props: FieldInfoParameters<TForm>): Promise<boolean>;
    isHidden(props: FieldInfoParameters<TForm>): Promise<boolean>;
    isReadonly(props: FieldInfoParameters<TForm>): Promise<boolean>;
    getCurrentValue(renderType?: RenderType): Promise<TValue | undefined>;
    getSaveValue(entityForm: EntityForm<TForm>, renderType?: RenderType): Promise<TValue | undefined>;
    getFetchedValue(): Promise<TValue | undefined>;
    resetValue(renderType?: RenderType): void;
    withForm(form: {
        tabId: string;
        fieldGroupId: string;
    }): this;
    withValidations(...validation: (Validation | undefined)[]): this;
    validate(entityForm: EntityForm<TForm>, session?: Session): Promise<ValidateResult | ValidateResult[]>;
    withDefaultValue(value: TValue | any): this;
    /**
     * 이 필드를 보기 위해 필요한 권한을 설정합니다.
     * 사용자가 지정된 권한 중 하나라도 가지고 있으면 필드가 표시됩니다.
     */
    withRequiredPermissions(...permissions: string[]): this;
    /**
     * 사용자가 이 필드를 볼 수 있는 권한이 있는지 확인합니다.
     * requiredPermissions가 없거나 비어있으면 true를 반환합니다.
     * 사용자가 requiredPermissions 중 하나라도 가지고 있으면 true를 반환합니다.
     */
    isPermitted(userPermissions?: string[]): boolean;
}
//# sourceMappingURL=FormField.d.ts.map