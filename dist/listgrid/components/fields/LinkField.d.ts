import React from "react";
import { CheckButtonValidationField, CheckButtonValidationFieldProps, ViewListProps, ViewListResult } from './abstract';
import { FieldRenderParameters, FilterRenderParameters } from '../../config/EntityField';
interface LinkFieldProps extends CheckButtonValidationFieldProps {
}
export declare class LinkField extends CheckButtonValidationField<LinkField> {
    constructor(name: string, order: number);
    /**
     * LinkField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * LinkField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): LinkField;
    /**
     * LinkField 리스트 필터 렌더링 (원본 renderListFilter 로직 보존)
     */
    protected renderListFilterInstance(params: FilterRenderParameters): Promise<React.ReactNode | null>;
    /**
     * LinkField 리스트 아이템 렌더링 (원본 renderListItem 로직 보존)
     */
    protected renderListItemInstance(props: ViewListProps): Promise<ViewListResult>;
    static create(props: LinkFieldProps): LinkField;
}
export {};
//# sourceMappingURL=LinkField.d.ts.map