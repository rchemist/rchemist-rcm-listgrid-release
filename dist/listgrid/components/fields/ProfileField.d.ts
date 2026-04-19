import { ReactNode } from 'react';
import { FieldRenderParameters } from '../../config/EntityField';
import { FormField } from './abstract';
export declare class ProfileField extends FormField<ProfileField> {
    constructor(name: string, order: number);
    /**
     * ProfileField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    protected renderInstance(params: FieldRenderParameters): Promise<ReactNode | null | undefined>;
    /**
     * ProfileField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): ProfileField;
}
//# sourceMappingURL=ProfileField.d.ts.map