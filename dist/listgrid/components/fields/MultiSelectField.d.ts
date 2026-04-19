import { MultipleOptionalField, MultipleOptionalFieldProps, ViewListProps, ViewListResult } from './abstract';
import React from 'react';
import { MinMaxLimit, SelectOption } from '../../form/Type';
import { FieldRenderParameters } from '../../config/EntityField';
import { StatusChangeReason, StatusChangeValidation } from './SelectField';
export interface MultiSelectFieldProps extends MultipleOptionalFieldProps {
    /**
     * 즉시 변경 기능 활성화 여부.
     * true로 설정하면 옵션 선택 즉시 API를 호출하여 상태를 변경합니다.
     */
    enableImmediateChange?: boolean | undefined;
    /**
     * 상태 변경 시 사유 입력 설정.
     * 특정 상태로 변경 시 사유 입력을 요구할 수 있습니다.
     */
    reason?: StatusChangeReason[] | undefined;
    /**
     * 상태 변경 시 검증 로직 설정.
     * 상태 변경 전에 추가적인 검증을 수행할 수 있습니다.
     */
    validateStatusChange?: StatusChangeValidation | undefined;
}
export declare class MultiSelectField extends MultipleOptionalField<MultiSelectField> {
    /** 즉시 변경 기능 활성화 여부 */
    enableImmediateChange?: boolean | undefined;
    /** 상태 변경 시 사유 입력 설정 */
    reason?: StatusChangeReason[] | undefined;
    /** 상태 변경 시 검증 로직 */
    validateStatusChange?: StatusChangeValidation | undefined;
    constructor(name: string, order: number, options: SelectOption[], limit?: MinMaxLimit, reason?: StatusChangeReason[], validateStatusChange?: StatusChangeValidation);
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * MultiSelectField 핵심 리스트 아이템 렌더링 로직
     */
    protected renderListItemInstance(props: ViewListProps): Promise<ViewListResult>;
    /**
     * MultiSelectField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): MultiSelectField;
    static create(props: MultiSelectFieldProps): MultiSelectField;
    /**
     * 즉시 변경 기능 활성화.
     * 옵션을 선택하면 즉시 API를 호출하여 상태를 변경합니다.
     * @param enable 활성화 여부 (기본값: true)
     */
    withImmediateChange(enable?: boolean): this;
    /**
     * 상태 변경 시 사유 입력 설정.
     * 특정 상태로 변경할 때 사유 입력을 요구합니다.
     * @param reason 사유 입력 설정 배열
     */
    withReason(reason?: StatusChangeReason[]): this;
    /**
     * 상태 변경 시 검증 로직 설정.
     * 상태 변경 전에 추가적인 검증을 수행합니다.
     * @param validateStatusChange 검증 로직 설정
     */
    withValidateStatusChange(validateStatusChange?: StatusChangeValidation): this;
}
//# sourceMappingURL=MultiSelectField.d.ts.map