import { EntityForm } from '../../../config/EntityForm';
import { ReactNode } from 'react';
/**
 * EntityForm의 타이틀을 동적으로 계산해 반환하는 커스텀 훅
 * @param entityForm - 기준 EntityForm
 * @param customTitle - 커스텀 타이틀(옵션)
 * @returns (form?: EntityForm) => Promise<ReactNode>
 */
export declare const useEntityFormTitle: ({ entityForm, customTitle, }: {
    entityForm: EntityForm;
    customTitle?: string;
}) => (form?: EntityForm) => Promise<ReactNode>;
//# sourceMappingURL=useEntityFormTitle.d.ts.map