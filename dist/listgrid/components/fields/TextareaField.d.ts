import { FormField, FormFieldProps } from './abstract';
import React from "react";
import { RenderType } from '../../config/Config';
import { FieldRenderParameters } from '../../config/EntityField';
import { MinMaxLimit } from "../../form/Type";
interface TextareaFieldProps extends FormFieldProps {
    rows?: number;
    limit?: MinMaxLimit;
}
export declare class TextareaField extends FormField<TextareaField> {
    rows?: number;
    limit?: MinMaxLimit;
    constructor(name: string, order: number, rows?: number, limit?: MinMaxLimit);
    getCurrentValue(renderType?: RenderType): Promise<any>;
    /**
     * TextareaField 핵심 렌더링 로직
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * TextareaField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): TextareaField;
    withRows(rows?: number): this;
    withLimit(limit?: MinMaxLimit): this;
    static create(props: TextareaFieldProps): TextareaField;
}
export {};
//# sourceMappingURL=TextareaField.d.ts.map