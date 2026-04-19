import { FormField, FormFieldProps } from './abstract';
import React from 'react';
import { InlineMapConfig, MapKey } from '../../config/Config';
import { FieldRenderParameters } from '../../config/EntityField';
import { InlineMapPendingRef, KeyValue } from '../../ui';
import { MinMaxLimit } from '../../form/Type';
import { EntityForm } from '../../config/EntityForm';
import { RenderType } from '../../config/Config';
interface InlineMapFieldProps extends FormFieldProps {
    config?: InlineMapConfig | undefined;
}
export declare class InlineMapField extends FormField<InlineMapField> {
    config?: InlineMapConfig | undefined;
    pendingRef: {
        current: InlineMapPendingRef;
    };
    constructor(name: string, order: number, config?: InlineMapConfig);
    isDirty(): boolean;
    getSaveValue(entityForm: EntityForm, renderType?: RenderType): Promise<any>;
    /**
     * InlineMapField 핵심 렌더링 로직
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * InlineMapField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): InlineMapField;
    withKeys(keys?: MapKey[]): this;
    useResultMap(): this;
    useKeyValue(): this;
    withLimit(limit?: MinMaxLimit): this;
    withConfig(config?: InlineMapConfig): this;
    /**
     * Map 형태 또는 KeyValue[] 형태를 모두 지원한다.
     * @param value
     */
    withDefaultValue(value: KeyValue[] | Map<string, string>): this;
    static create(props: InlineMapFieldProps): InlineMapField;
}
export {};
//# sourceMappingURL=InlineMapField.d.ts.map