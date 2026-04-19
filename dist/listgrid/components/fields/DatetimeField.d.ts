import { AbstractDateField, AbstractDateFieldProps, ViewListProps, ViewListResult } from './abstract';
import React from 'react';
import { FieldRenderParameters, FilterRenderParameters } from '../../config/EntityField';
import { RenderType } from '../../config/Config';
import { MinMaxStringLimit } from '../../form/Type';
interface DatetimeFieldProps extends AbstractDateFieldProps {
}
export declare class DatetimeField extends AbstractDateField<DatetimeField> {
    constructor(name: string, order: number, limit?: MinMaxStringLimit, range?: boolean);
    getCurrentValue(renderType?: RenderType): Promise<string | undefined | string[]>;
    /**
     * DatetimeField 핵심 렌더링 로직
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * DatetimeField 핵심 리스트 필터 렌더링 로직
     */
    protected renderListFilterInstance(params: FilterRenderParameters): Promise<React.ReactNode | null>;
    /**
     * DatetimeField 핵심 리스트 아이템 렌더링 로직
     */
    protected renderListItemInstance(props: ViewListProps): Promise<ViewListResult>;
    /**
     * DatetimeField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): DatetimeField;
    static create(props: DatetimeFieldProps): DatetimeField;
}
export {};
//# sourceMappingURL=DatetimeField.d.ts.map