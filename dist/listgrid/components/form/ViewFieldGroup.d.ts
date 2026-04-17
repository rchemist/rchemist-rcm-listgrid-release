import { EntityFormManageable } from './types/ViewEntityForm.types';
import { Session } from '../../auth/types';
/**
 * ViewFieldGroup component
 * - Renders a group of fields and sub-collections for a given tab/group in EntityForm.
 * - Handles collapsible panels, help text, and readonly/sub-collection logic.
 *
 * ViewFieldGroup 컴포넌트
 * - EntityForm의 탭/그룹별 필드 및 서브콜렉션을 렌더링합니다.
 * - 접기/펼치기, 도움말, 읽기전용/서브콜렉션 로직을 처리합니다.
 *
 * @param props {ViewFieldGroupProps} - 탭/그룹/EntityForm 정보 등
 * @returns {JSX.Element|null} - 렌더링 결과 또는 null
 */
interface ViewFieldGroupProps extends EntityFormManageable {
    groupId: string;
    tabId: string;
    readonly: boolean;
    subCollectionEntity?: boolean;
    session?: Session;
    createStepFields?: string[];
    resetEntityForm?: (delay?: number, preserveState?: boolean) => Promise<void>;
    /** MappedBy field name for hiding parent reference fields in SubCollection */
    hideMappedByFields?: string;
}
export declare const ViewFieldGroup: ({ entityForm, setEntityForm, readonly, subCollectionEntity, session, createStepFields, hideMappedByFields, ...props }: ViewFieldGroupProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=ViewFieldGroup.d.ts.map