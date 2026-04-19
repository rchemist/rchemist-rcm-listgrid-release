import { ListableFormField, ListableFormFieldProps, ViewListProps, ViewListResult } from './abstract';
import { FieldRenderParameters } from '../../config/EntityField';
import React from 'react';
import { Validation } from '../../validations/Validation';
import { RenderType } from '../../config/Config';
import { EntityForm } from '../../config/EntityForm';
interface TelephoneNumberFieldProps extends ListableFormFieldProps {
    validations?: Validation[];
}
export declare class TelephoneNumberField extends ListableFormField<TelephoneNumberField> {
    validations?: Validation[];
    constructor(name: string, order: number, validations?: Validation[]);
    /**
     * TelephoneNumberField 핵심 렌더링 로직
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * TelephoneNumberField 표시값 가져오기 (하이픈 포맷팅)
     */
    getDisplayValue(entityForm: EntityForm, renderType?: RenderType): Promise<any>;
    /**
     * TelephoneNumberField 저장값 가져오기 (하이픈 제거)
     */
    getSaveValue(entityForm: EntityForm, renderType?: RenderType): Promise<any>;
    /**
     * TelephoneNumberField 리스트 아이템 렌더링 (하이픈 포맷팅)
     */
    protected renderListItemInstance(props: ViewListProps): Promise<ViewListResult>;
    /**
     * TelephoneNumberField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): TelephoneNumberField;
    static create(props: TelephoneNumberFieldProps): TelephoneNumberField;
}
export {};
//# sourceMappingURL=TelephoneNumberField.d.ts.map