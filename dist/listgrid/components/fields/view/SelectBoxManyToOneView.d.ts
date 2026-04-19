import React from 'react';
import { CustomFieldRendererProps } from '../../form/types/ViewEntityFormTheme.types';
export declare function invalidateSelectBoxCache(urlPattern?: string): void;
/**
 * SelectBoxManyToOneView Props
 */
export interface SelectBoxManyToOneViewProps extends CustomFieldRendererProps {
    /** 표시할 라벨 필드 이름 또는 함수 (기본: 'name') */
    labelField?: string | ((item: any) => string);
    /** 값 필드 이름 (기본: 'id') */
    valueField?: string;
    /** 플레이스홀더 텍스트 */
    placeholder?: string;
    /** 선택 안함 옵션 라벨 */
    nullValueLabel?: string;
    /** 검색 가능 여부 */
    isSearchable?: boolean;
    /** 메뉴 포지션 */
    menuPosition?: 'fixed' | 'absolute';
    /** 메뉴 배치 */
    menuPlacement?: 'auto' | 'bottom' | 'top';
    /** 선택 가능한 아이템 목록 (직접 제공하는 경우) */
    items?: any[];
    /** 아이템 목록 로드 함수 (커스텀 로드 로직) */
    loadItems?: () => Promise<any[]>;
}
/**
 * SelectBoxManyToOneView
 *
 * ManyToOne 필드를 SelectBox(드롭다운) 형태로 표시하는 커스텀 렌더러입니다.
 * 전체 옵션을 미리 로딩하여 드롭다운으로 표시합니다.
 *
 * @example
 * ```tsx
 * ManyToOneField.create({
 *   name: 'country',
 *   order: 1,
 *   config: { entityForm: CountryEntityForm() }
 * })
 * .withSelectBoxView({
 *   labelField: 'name',
 *   placeholder: '국가를 선택하세요',
 * })
 * ```
 */
export declare const SelectBoxManyToOneView: React.FC<SelectBoxManyToOneViewProps>;
export default SelectBoxManyToOneView;
//# sourceMappingURL=SelectBoxManyToOneView.d.ts.map