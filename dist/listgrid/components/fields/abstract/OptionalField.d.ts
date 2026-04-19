import { ListableFormField, ListableFormFieldProps, ViewListProps } from './ListableFormField';
import { ComboProps, FieldType, RenderType } from '../../../config/Config';
import { MinMaxLimit, SelectOption } from '../../../form/Type';
import { ValidateResult } from '../../../validations/Validation';
import { EntityForm } from '../../../config/EntityForm';
import { Session } from '../../../auth/types';
/**
 * Chip UI 설정
 */
export interface ChipConfig {
    enabled: boolean;
    maxOptions?: number;
    maxLabelLength?: number;
}
export interface OptionalFieldProps<TValue = any, TForm extends object = any> extends ListableFormFieldProps<TValue, TForm> {
    combo?: ComboProps;
    options?: SelectOption[];
    preservedOptions?: SelectOption[];
    chipConfig?: ChipConfig;
    singleFilter?: boolean;
}
export declare abstract class OptionalField<TSelf extends OptionalField<TSelf, TValue, TForm>, TValue = any, TForm extends object = any> extends ListableFormField<TSelf, TValue, TForm> {
    combo?: ComboProps;
    options?: SelectOption[];
    preservedOptions?: SelectOption[];
    chipConfig?: ChipConfig;
    singleFilter?: boolean;
    /**
     * 목록 필터에서 단일 선택만 허용하도록 설정합니다.
     * true로 설정하면 필터가 EQUAL 조건으로 동작하고, RadioChip으로 렌더링됩니다.
     * @param enabled 단일 선택 여부 (기본값: true)
     */
    withSingleFilter(enabled?: boolean): this;
    /**
     * 이 필드를 라디오 버튼이나 Checkbox 타입으로 표시하는 경우 이 메소드를 호출한다.
     * @param props direction 설정
     */
    withComboType(props?: ComboProps): this;
    withOptions(options?: SelectOption[]): this;
    withPreservedOptions(options?: SelectOption[]): this;
    /**
     * Chip UI를 사용하도록 설정
     * @param enabled Chip UI 활성화 여부 (기본값: true)
     * @param config 추가 설정 (maxOptions, maxLabelLength)
     */
    useChip(enabled?: boolean, config?: Partial<Omit<ChipConfig, 'enabled'>>): this;
    /**
     * Chip UI로 렌더링할 조건을 충족하는지 확인
     * - chipConfig가 undefined: 옵션 수/라벨 길이 조건 자동 체크
     * - useChip(true): 강제 Chip 사용
     * - useChip(false): 강제 Chip 사용 안 함
     */
    shouldRenderAsChip(): boolean;
    changeOptions(options: SelectOption[], defaultValue?: TValue): boolean;
    revertOptions(renderType?: RenderType): boolean;
    protected copyFields(origin: OptionalFieldProps<TValue, TForm>, includeValue?: boolean): this;
}
export interface MultipleOptionalFieldProps<TValue = any, TForm extends object = any> extends OptionalFieldProps<TValue, TForm> {
    limit?: MinMaxLimit;
}
export declare abstract class MultipleOptionalField<TSelf extends MultipleOptionalField<TSelf, TValue, TForm>, TValue = any, TForm extends object = any> extends OptionalField<TSelf, TValue, TForm> {
    limit?: MinMaxLimit;
    /**
     * 복수 선택할 수 있는 최소, 최대 개수 설정
     * 설정된 최소값이 있다면 해당 개수 미만을 선택하면 에러
     * 설정된 최대값이 있다면 해당 개수를 초과하면 에러
     * @param limit
     */
    withLimit(limit?: MinMaxLimit): this;
    /**
     * 복수 선택할 수 있는 최소 개수만 설정
     * @param min
     */
    withMin(min?: number): this;
    /**
     * 복수 선택할 수 있는 최대 개수 설정
     * @param max
     */
    withMax(max?: number): this;
    protected createCacheKey(renderType?: RenderType): string;
    protected constructor(name: string, order: number, type: FieldType, options?: SelectOption[], limit?: MinMaxLimit);
    protected copyFields(origin: OptionalFieldProps<TValue, TForm>, includeValue?: boolean): this;
    validate(entityForm: EntityForm<TForm>, session?: Session): Promise<ValidateResult | ValidateResult[]>;
    private validateWithLimit;
}
export declare function renderListOptionalField(field: OptionalField<any>, props: ViewListProps): Promise<{
    result: string;
}> | Promise<{
    result: import("react/jsx-runtime").JSX.Element;
    linkOnCell: boolean;
}>;
export declare function renderListMultipleOptionalField(field: OptionalField<any>, props: ViewListProps): Promise<{
    result: string;
}> | Promise<{
    result: import("react/jsx-runtime").JSX.Element;
}>;
//# sourceMappingURL=OptionalField.d.ts.map