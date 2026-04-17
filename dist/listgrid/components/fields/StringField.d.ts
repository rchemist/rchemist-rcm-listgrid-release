import React from "react";
import { CheckButtonValidationField, CheckButtonValidationFieldProps, ViewListProps, ViewListResult, ViewRenderProps, ViewRenderResult } from '../../components/fields/abstract';
import { FieldRenderParameters, FilterRenderParameters } from '../../config/EntityField';
interface StringFieldProps extends CheckButtonValidationFieldProps {
    useCopy?: boolean;
}
export declare class StringField extends CheckButtonValidationField<StringField> {
    useCopy?: boolean;
    constructor(name: string, order: number, useCopy?: boolean);
    /**
     * Enable copy button in list view
     */
    withCopy(enabled?: boolean): this;
    /**
     * StringField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    protected renderListFilterInstance(params: FilterRenderParameters): Promise<React.ReactNode | null>;
    /**
     * StringField View 모드 렌더링 - 텍스트 표시
     * cardIcon이 설정된 경우 아이콘과 함께 표시
     */
    protected renderViewInstance(props: ViewRenderProps): Promise<ViewRenderResult>;
    /**
     * StringField 리스트 아이템 렌더링 (복사 기능 지원)
     */
    protected renderListItemInstance(props: ViewListProps): Promise<ViewListResult>;
    /**
     * StringField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): StringField;
    static create(props: StringFieldProps): StringField;
}
export {};
//# sourceMappingURL=StringField.d.ts.map