import { FormField } from '../fields/abstract';
import { EntityFormManageable } from './types/ViewEntityForm.types';
import { Session } from '../../auth/types';
/**
 * FieldRenderer component
 * - Renders a single FormField in EntityForm, including label, tooltip, help, error, and value view.
 * - Handles value change, validation, error display, and many-to-one link rendering.
 *
 * FieldRenderer 컴포넌트
 * - EntityForm의 단일 FormField를 렌더링합니다. (라벨, 툴팁, 도움말, 에러, 값 뷰 포함)
 * - 값 변경, 검증, 에러 표시, many-to-one 링크 렌더링을 처리합니다.
 *
 * @param props {FieldRendererProps} - 필드, EntityForm, 상태 setter 등
 * @returns {JSX.Element} - 렌더링 결과
 */
interface FieldRendererProps extends EntityFormManageable {
    field: FormField<any>;
    subCollectionEntity?: boolean;
    session?: Session;
    resetEntityForm?: (delay?: number, preserveState?: boolean) => Promise<void>;
}
export declare const FieldRenderer: (props: FieldRendererProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FieldRenderer.d.ts.map