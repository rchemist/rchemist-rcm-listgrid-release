import { MultipleOptionalField, MultipleOptionalFieldProps, ViewListProps, ViewListResult } from './abstract';
import React from "react";
import { MinMaxLimit, SelectOption } from "../../form/Type";
import { FieldRenderParameters, FilterRenderParameters } from '../../config/EntityField';
import { TagValidationResult } from "../../form/TagsInput/types";
interface TagFieldProps extends MultipleOptionalFieldProps {
    tagValidation?: (value: string) => TagValidationResult | Promise<TagValidationResult>;
}
export declare class TagField extends MultipleOptionalField<TagField> {
    tagValidation?: (value: string) => TagValidationResult | Promise<TagValidationResult>;
    constructor(name: string, order: number, options?: SelectOption[], limit?: MinMaxLimit);
    /**
     * 태그 추가 시 실시간 검증 함수를 설정합니다.
     * @param validation 검증 함수 (태그 값을 받아 TagValidationResult 반환)
     */
    withTagValidation(validation: (value: string) => TagValidationResult | Promise<TagValidationResult>): TagField;
    /**
     * TagField 핵심 렌더링 로직
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * TagField 핵심 리스트 필터 렌더링 로직 (기본 renderInstance 사용)
     */
    protected renderListFilterInstance(params: FilterRenderParameters): Promise<React.ReactNode | null>;
    /**
     * TagField 핵심 리스트 아이템 렌더링 로직
     */
    protected renderListItemInstance(props: ViewListProps): Promise<ViewListResult>;
    /**
     * TagField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): TagField;
    static create(props: TagFieldProps): TagField;
}
export {};
//# sourceMappingURL=TagField.d.ts.map