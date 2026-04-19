import { FieldGroupInfo, TabInfo } from '../config/Config';
import { EntityFieldGroup } from '../config/EntityFieldGroup';
import { EntityItem } from '../config/EntityItem';
export declare class EntityTab {
    id: string;
    label: string;
    order: number;
    hidden?: boolean | undefined;
    description?: string | React.ReactNode;
    fieldGroups: EntityFieldGroup[];
    requiredPermissions?: string[] | undefined;
    constructor(config?: TabInfo);
    /**
     * 이 탭을 보기 위해 필요한 권한을 설정합니다.
     * 사용자가 지정된 권한 중 하나라도 가지고 있으면 탭이 표시됩니다.
     */
    withRequiredPermissions(...permissions: string[]): this;
    /**
     * 사용자가 이 탭을 볼 수 있는 권한이 있는지 확인합니다.
     * requiredPermissions가 없거나 비어있으면 true를 반환합니다.
     * 사용자가 requiredPermissions 중 하나라도 가지고 있으면 true를 반환합니다.
     */
    isPermitted(userPermissions?: string[]): boolean;
    clone(): EntityTab;
    addField(fieldGroup: FieldGroupInfo, field: EntityItem): void;
}
//# sourceMappingURL=EntityTab.d.ts.map