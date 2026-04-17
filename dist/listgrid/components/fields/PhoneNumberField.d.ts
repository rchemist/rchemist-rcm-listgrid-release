import { ListableFormField, ListableFormFieldProps, ViewListProps, ViewListResult } from './abstract';
import React from "react";
import { Validation } from '../../validations/Validation';
import { FieldRenderParameters } from '../../config/EntityField';
import { RenderType } from '../../config/Config';
interface PhoneNumberFieldProps extends ListableFormFieldProps {
    enableSms?: boolean;
}
export declare class PhoneNumberField extends ListableFormField<PhoneNumberField> {
    enableSms?: boolean;
    constructor(name: string, order: number, validations?: Validation[], enableSms?: boolean);
    /**
     * Enable SMS functionality
     */
    withSms(enabled?: boolean): this;
    /**
     * PhoneNumberField 핵심 렌더링 로직
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * PhoneNumberField 표시값 가져오기 (하이픈 포맷팅)
     */
    getDisplayValue(entityForm: any, renderType?: RenderType): Promise<any>;
    /**
     * PhoneNumberField 저장값 가져오기 (하이픈 제거)
     */
    getSaveValue(entityForm: any, renderType?: RenderType): Promise<any>;
    /**
     * PhoneNumberField 리스트 아이템 렌더링 (하이픈 포맷팅 + SMS 기능)
     */
    protected renderListItemInstance(props: ViewListProps): Promise<ViewListResult>;
    /**
     * PhoneNumberField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): PhoneNumberField;
    static create(props: PhoneNumberFieldProps): PhoneNumberField;
}
export {};
//# sourceMappingURL=PhoneNumberField.d.ts.map