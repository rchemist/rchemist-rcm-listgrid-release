import React from "react";
import { SelectOption } from "../../../form/Type";
import { EntityForm } from "../../../config/EntityForm";
import { InputRendererProps } from "../../../config/Config";
import { OptionsLoader } from "../SelectField";
export declare function getCachedOptions(cacheKey: string): SelectOption[] | null;
export declare function setCachedOptions(cacheKey: string, data: SelectOption[]): void;
export declare function invalidateDynamicSelectCache(keyPattern?: string): void;
export interface DynamicSelectFieldViewProps extends InputRendererProps {
    /** 필드명 (캐시 키로 사용) */
    fieldName: string;
    /** EntityForm 인스턴스 */
    entityForm: EntityForm;
    /** 옵션 로드 함수 */
    loadOptions: OptionsLoader;
    /** 정적 옵션 (loadOptions가 없을 때 사용) */
    staticOptions?: SelectOption[];
    /** 렌더링 타입: 'select' | 'chip' | 'radio' */
    renderType?: 'select' | 'chip' | 'radio';
    /** RadioInput용 combo 설정 */
    combo?: {
        direction?: 'row' | 'column';
    };
    /** 캐시 키 (동일한 loadOptions를 여러 필드에서 공유할 때) */
    cacheKey?: string;
}
export declare const DynamicSelectFieldView: React.FC<DynamicSelectFieldViewProps>;
export default DynamicSelectFieldView;
//# sourceMappingURL=DynamicSelectFieldView.d.ts.map