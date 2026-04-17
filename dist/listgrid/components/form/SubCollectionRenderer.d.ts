import { SubCollectionField } from '../../config/SubCollectionField';
import { EntityForm } from '../../config/EntityForm';
import { Session } from '../../auth/types';
/**
 * SubCollectionRenderer component
 * - Renders a sub-collection field in EntityForm, including label, help text, and loading state.
 * - Handles async rendering and label translation.
 *
 * SubCollectionRenderer 컴포넌트
 * - EntityForm의 서브콜렉션 필드를 렌더링합니다. (라벨, 도움말, 로딩 상태 포함)
 * - 비동기 렌더링 및 라벨 번역을 처리합니다.
 *
 * @param props {SubCollectionRendererProps} - 서브콜렉션, EntityForm, 세션 등
 * @returns {JSX.Element} - 렌더링 결과
 */
interface SubCollectionRendererProps {
    collection: SubCollectionField;
    entityForm: EntityForm;
    session?: Session;
}
export declare const SubCollectionRenderer: ({ collection, entityForm, session }: SubCollectionRendererProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SubCollectionRenderer.d.ts.map