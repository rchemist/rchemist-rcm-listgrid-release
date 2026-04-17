import { ListableFormField, ListableFormFieldProps, ViewListProps, ViewListResult } from './abstract';
import React from "react";
import { IAssetConfig, RenderType } from '../../config/Config';
import { FieldRenderParameters, FilterRenderParameters } from '../../config/EntityField';
interface FileFieldProps extends ListableFormFieldProps {
    config?: IAssetConfig;
}
export declare class FileField extends ListableFormField<FileField> {
    config?: IAssetConfig;
    constructor(name: string, order: number, config?: IAssetConfig);
    withConfig(config?: IAssetConfig): this;
    withMaxSize(maxSize?: number): this;
    withMaxCount(maxCount?: number): this;
    withExtensions(...extension: string[]): this;
    withFileTypes(...fileTypes: string[]): this;
    /**
     * FileField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * FileField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): FileField;
    /**
     * FileField 리스트 필터 렌더링 (기본 텍스트 입력)
     */
    protected renderListFilterInstance(params: FilterRenderParameters): Promise<React.ReactNode | null>;
    /**
     * FileField 리스트 아이템 렌더링 (원본 renderListItem 로직 보존)
     */
    protected renderListItemInstance(props: ViewListProps): Promise<ViewListResult>;
    static create(props: FileFieldProps): FileField;
    isBlank(renderType?: RenderType): Promise<boolean>;
    isDirty(): boolean;
}
export {};
//# sourceMappingURL=FileField.d.ts.map