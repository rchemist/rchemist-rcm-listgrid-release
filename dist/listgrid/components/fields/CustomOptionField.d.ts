import { OptionalField, OptionalFieldProps, ViewListProps, ViewListResult } from '../../components/fields/abstract';
import React from 'react';
import { FieldRenderParameters, FilterRenderParameters } from '../../config/EntityField';
import { SelectOption } from '../../form/Type';
interface CustomOptionFieldProps extends OptionalFieldProps {
    alias: string;
    multiple?: boolean | undefined;
}
export declare class CustomOptionField extends OptionalField<CustomOptionField> {
    alias: string;
    multiple?: boolean | undefined;
    constructor(name: string, order: number, alias: string, multiple?: boolean);
    /**
     * CustomOptionField 핵심 렌더링 로직
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * CustomOptionField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): CustomOptionField;
    /**
     * CustomOptionField 리스트 필터 렌더링 (기본 renderInstance 사용)
     */
    protected renderListFilterInstance(params: FilterRenderParameters): Promise<React.ReactNode | null>;
    /**
     * CustomOptionField 리스트 아이템 렌더링
     */
    protected renderListItemInstance(props: ViewListProps): Promise<ViewListResult>;
    private createCacheKey;
    static create(props: CustomOptionFieldProps): CustomOptionField;
    useListField(order?: number): this;
    withMultiple(multiple?: boolean): this;
    isDirty(): boolean;
}
export declare function getCustomOptionValues(alias: string): Promise<SelectOption[]>;
/**
 * 여러 alias에 대한 옵션값을 일괄 조회하여 캐시에 저장
 * ViewListGrid에서 목록 렌더링 전에 호출하여 N+1 문제 방지
 */
export declare function prefetchCustomOptions(aliases: string[]): Promise<void>;
/**
 * 캐시 초기화 (필요시 사용)
 */
export declare function clearCustomOptionCache(): void;
export {};
//# sourceMappingURL=CustomOptionField.d.ts.map