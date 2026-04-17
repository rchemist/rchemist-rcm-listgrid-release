import { AbstractDateField, AbstractDateFieldProps } from './abstract';
import React from "react";
import { FieldRenderParameters } from '../../config/EntityField';
import { RenderType } from '../../config/Config';
import { MinMaxStringLimit } from "../../form/Type";
interface TimeFieldProps extends AbstractDateFieldProps {
}
export declare class TimeField extends AbstractDateField<TimeField> {
    constructor(name: string, order: number, limit?: MinMaxStringLimit, range?: boolean);
    getCurrentValue(renderType?: RenderType): Promise<any>;
    /**
     * TimeField 핵심 렌더링 로직
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * TimeField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): TimeField;
    static create(props: TimeFieldProps): TimeField;
}
export {};
//# sourceMappingURL=TimeField.d.ts.map