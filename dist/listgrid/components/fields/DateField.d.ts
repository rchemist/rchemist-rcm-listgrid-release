import { AbstractDateField, AbstractDateFieldProps, ViewListProps, ViewListResult, ViewRenderProps, ViewRenderResult } from './abstract';
import React from 'react';
import { FieldRenderParameters, FilterRenderParameters } from '../../config/EntityField';
import { RenderType } from '../../config/Config';
import { MinMaxStringLimit } from '../../form/Type';
interface DateFieldProps extends AbstractDateFieldProps {
}
export declare class DateField extends AbstractDateField<DateField> {
    constructor(name: string, order: number, limit?: MinMaxStringLimit, range?: boolean);
    getCurrentValue(renderType?: RenderType): Promise<string | undefined | string[]>;
    /**
     * DateField 핵심 렌더링 로직
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * DateField 핵심 리스트 필터 렌더링 로직
     */
    protected renderListFilterInstance(params: FilterRenderParameters): Promise<React.ReactNode | null>;
    /**
     * DateField 핵심 리스트 아이템 렌더링 로직
     */
    protected renderListItemInstance(props: ViewListProps): Promise<ViewListResult>;
    /**
     * DateField View 모드 렌더링 - 날짜 포맷팅 및 캘린더 아이콘 적용
     * cardIcon이 설정된 경우 해당 아이콘을 우선 사용
     */
    protected renderViewInstance(props: ViewRenderProps): Promise<ViewRenderResult>;
    /**
     * DateField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): DateField;
    static create(props: DateFieldProps): DateField;
}
export {};
//# sourceMappingURL=DateField.d.ts.map