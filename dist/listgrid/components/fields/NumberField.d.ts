import React from "react";
import { ListableFormField, ListableFormFieldProps, ViewListProps, ViewListResult, ViewRenderProps, ViewRenderResult } from './abstract';
import { MinMaxLimit } from "../../form/Type";
import { Currency, Double } from "../../ui";
import { FieldRenderParameters, FilterRenderParameters } from '../../config/EntityField';
import { EntityForm } from "../../config/EntityForm";
import { Session } from '../../auth/types';
import { ValidateResult } from "../../validations/Validation";
interface NumberFieldProps extends ListableFormFieldProps {
    currency?: Currency;
    double?: Double;
    limit?: MinMaxLimit;
}
export declare class NumberField extends ListableFormField<NumberField> {
    currency?: Currency;
    double?: Double;
    limit?: MinMaxLimit;
    withMin(min?: number): this;
    withMax(max?: number): this;
    withLimit(limit?: MinMaxLimit): this;
    withCurrency(currency?: Currency): this;
    withDouble(double?: Double): this;
    constructor(name: string, order: number, props?: {
        limit?: MinMaxLimit;
        currency?: Currency;
        double?: Double;
    });
    /**
     * NumberField 핵심 렌더링 로직
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * NumberField 핵심 리스트 필터 렌더링 로직
     */
    protected renderListFilterInstance(params: FilterRenderParameters): Promise<React.ReactNode | null>;
    /**
     * NumberField 핵심 리스트 아이템 렌더링 로직
     */
    protected renderListItemInstance(props: ViewListProps): Promise<ViewListResult>;
    /**
     * NumberField View 모드 렌더링 - 숫자 포맷팅
     * compact 모드: 아이콘 없이 깔끔한 텍스트만 표시
     * 일반 모드: 아이콘 + 포맷된 숫자 표시
     */
    protected renderViewInstance(props: ViewRenderProps): Promise<ViewRenderResult>;
    /**
     * NumberField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): NumberField;
    static create(props: NumberFieldProps): NumberField;
    validate(entityForm: EntityForm, session?: Session): Promise<ValidateResult | ValidateResult[]>;
    private hasError;
}
export {};
//# sourceMappingURL=NumberField.d.ts.map