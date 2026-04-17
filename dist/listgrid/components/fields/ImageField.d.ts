import { ListableFormField, ListableFormFieldProps, ViewListProps, ViewListResult } from './abstract';
import React from "react";
import { IAssetConfig } from '../../config/Config';
import { FieldRenderParameters, FilterRenderParameters } from '../../config/EntityField';
interface ImageFieldProps extends ListableFormFieldProps {
    config?: IAssetConfig;
}
export declare class ImageField extends ListableFormField<ImageField> {
    config?: IAssetConfig;
    constructor(name: string, order: number, config?: IAssetConfig);
    withConfig(config?: IAssetConfig): this;
    withMaxSize(maxSize?: number): this;
    withMaxCount(maxCount?: number): this;
    withExtensions(...extension: string[]): this;
    withFileTypes(...fileTypes: string[]): this;
    /**
     * ImageField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * ImageField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): ImageField;
    /**
     * ImageField 리스트 필터 렌더링 (기본 텍스트 입력)
     */
    protected renderListFilterInstance(params: FilterRenderParameters): Promise<React.ReactNode | null>;
    /**
     * ImageField 리스트 아이템 렌더링 (원본 renderListItem 로직 보존)
     */
    protected renderListItemInstance(props: ViewListProps): Promise<ViewListResult>;
    static create(props: ImageFieldProps): ImageField;
}
export {};
//# sourceMappingURL=ImageField.d.ts.map