import React from "react";
import { OptionalField, OptionalFieldProps, ViewListProps, ViewListResult, ViewRenderProps, ViewRenderResult } from './abstract';
import { FieldInfoParameters, FieldRenderParameters, FilterRenderParameters } from '../../config/EntityField';
import { RenderType } from '../../config/Config';
interface BooleanFieldProps extends OptionalFieldProps {
    emptyLabel?: string;
}
export declare class BooleanField extends OptionalField<BooleanField> {
    emptyLabel?: string;
    constructor(name: string, order: number, emptyLabel?: string);
    /**
     * BooleanField 핵심 렌더링 로직
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * BooleanField 리스트 필터 렌더링 로직
     * Chip 스타일의 Radio 버튼으로 "예/아니오/전체" 세 가지 옵션 제공
     */
    protected renderListFilterInstance(params: FilterRenderParameters): Promise<React.ReactNode | null>;
    /**
     * BooleanField 핵심 리스트 아이템 렌더링 로직
     */
    protected renderListItemInstance(props: ViewListProps): Promise<ViewListResult>;
    /**
     * BooleanField View 모드 렌더링 - 아이콘으로 true/false 표시
     * cardIcon이 설정된 경우 해당 아이콘을 우선 사용
     */
    protected renderViewInstance(props: ViewRenderProps): Promise<ViewRenderResult>;
    /**
     * BooleanField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): BooleanField;
    static create(props: BooleanFieldProps): BooleanField;
    getCurrentValue(renderType?: RenderType): Promise<boolean | undefined>;
    isRequired(props: FieldInfoParameters): Promise<boolean>;
    withEmptyLabel(emptyLabel?: string): this;
}
export {};
//# sourceMappingURL=BooleanField.d.ts.map