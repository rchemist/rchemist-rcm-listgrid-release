import { SpanValue } from '../common/type';
import { FieldGroupInfo, FieldGroupConfig } from '../config/Config';
export declare class EntityFieldGroup {
    id: string;
    label: string;
    order: number;
    span?: {
        base?: SpanValue;
        xs?: SpanValue;
        sm?: SpanValue;
        md?: SpanValue;
        lg?: SpanValue;
        xl?: SpanValue;
    } | undefined;
    fields: FieldGroupItem[];
    description?: string | undefined;
    config?: FieldGroupConfig | undefined;
    requiredPermissions?: string[] | undefined;
    constructor(config?: FieldGroupInfo);
    static create(id: string, label: string, order: number): EntityFieldGroup;
    /**
     * 이 필드그룹을 보기 위해 필요한 권한을 설정합니다.
     * 사용자가 지정된 권한 중 하나라도 가지고 있으면 필드그룹이 표시됩니다.
     */
    withRequiredPermissions(...permissions: string[]): this;
    /**
     * 사용자가 이 필드그룹을 볼 수 있는 권한이 있는지 확인합니다.
     * requiredPermissions가 없거나 비어있으면 true를 반환합니다.
     * 사용자가 requiredPermissions 중 하나라도 가지고 있으면 true를 반환합니다.
     */
    isPermitted(userPermissions?: string[]): boolean;
    clone(): EntityFieldGroup;
}
export interface FieldGroupItem {
    name: string;
    order: number;
}
//# sourceMappingURL=EntityFieldGroup.d.ts.map