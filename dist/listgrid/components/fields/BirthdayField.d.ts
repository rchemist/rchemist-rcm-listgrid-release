import React from 'react';
import { ListableFormField, ListableFormFieldProps, ViewListProps, ViewListResult } from './abstract';
import { FieldRenderParameters } from '../../config/EntityField';
interface BirthdayFieldProps extends ListableFormFieldProps {
    /** 반환값에 하이픈(-) 포함 여부 (기본값: false) */
    includeHyphen?: boolean;
}
/**
 * 생년월일 입력 필드
 *
 * - 숫자만 입력 가능
 * - YYYY-MM-DD 형식으로 자동 포맷팅
 * - 실시간 유효성 검증
 * - includeHyphen 옵션으로 반환값 형식 설정 (기본값: false → YYYYMMDD)
 */
export declare class BirthdayField extends ListableFormField<BirthdayField> {
    /** 반환값에 하이픈(-) 포함 여부 */
    includeHyphen: boolean;
    constructor(name: string, order: number, includeHyphen?: boolean);
    /**
     * BirthdayField 핵심 렌더링 로직
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * 목록에 표시될 때의 렌더링 로직
     */
    protected renderListItemInstance(props: ViewListProps): Promise<ViewListResult>;
    /**
     * BirthdayField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): BirthdayField;
    /**
     * includeHyphen 설정
     * @param includeHyphen 하이픈 포함 여부
     */
    withIncludeHyphen(includeHyphen: boolean): this;
    static create(props: BirthdayFieldProps): BirthdayField;
}
export {};
//# sourceMappingURL=BirthdayField.d.ts.map