import { ListableFormField, ListableFormFieldProps, UserListFieldProps } from './abstract';
import React from 'react';
import { FieldRenderParameters, FilterRenderParameters } from '../../config/EntityField';
import { MinMaxLimit } from '../../form/Type';
interface YearFieldProps extends ListableFormFieldProps {
    limit?: MinMaxLimit;
}
export declare class YearField extends ListableFormField<YearField> {
    limit?: MinMaxLimit;
    constructor(name: string, order: number, limit?: MinMaxLimit);
    /**
     * YearField 핵심 렌더링 로직
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * YearField 리스트 필터 렌더링 로직
     * 복수 년도 선택이 가능한 MultiSelectBox로 렌더링
     */
    protected renderListFilterInstance(params: FilterRenderParameters): Promise<React.ReactNode | null>;
    /**
     * YearField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): YearField;
    /**
     * YearField 목록 필드 설정
     * MultiSelectBox를 사용하므로 multiFilter를 true로 설정
     */
    useListField(props?: number | UserListFieldProps): this;
    withLimit(limit?: MinMaxLimit): this;
    static create(props: YearFieldProps): YearField;
}
export {};
//# sourceMappingURL=YearField.d.ts.map