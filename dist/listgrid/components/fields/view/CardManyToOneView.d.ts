import React from "react";
import { CustomFieldRendererProps } from "../../form/types/ViewEntityFormTheme.types";
/**
 * 카드 아이템의 스타일/렌더링 설정
 */
export interface CardItemConfig {
    /** 카드 컨테이너 className */
    containerClassName?: string;
    /** 선택된 카드 컨테이너 className */
    selectedContainerClassName?: string;
    /** 카드 타이틀 className */
    titleClassName?: string;
    /** 카드 라벨(뱃지) className */
    labelClassName?: string;
    /** 카드 설명 className */
    descriptionClassName?: string;
    /** 선택 아이콘 className */
    checkIconClassName?: string;
    /** 카드 아이템 렌더링 함수 (완전 커스텀) */
    renderCard?: (item: any, isSelected: boolean, onSelect: () => void) => React.ReactNode;
    /** 카드 타이틀 필드 이름 또는 함수 */
    titleField?: string | ((item: any) => string);
    /** 카드 라벨(뱃지) 필드 이름 또는 함수 */
    labelField?: string | ((item: any) => string);
    /** 카드 설명 필드 이름 또는 함수 */
    descriptionField?: string | ((item: any) => string);
    /** 카드 이미지 필드 이름 또는 함수 */
    imageField?: string | ((item: any) => string | undefined);
    /** 카드 하단 액션 영역 렌더링 함수 */
    renderAction?: (item: any) => React.ReactNode;
}
/**
 * CardManyToOneView Props
 */
export interface CardManyToOneViewProps extends CustomFieldRendererProps {
    /** 카드 그리드 컬럼 수 (기본: 3) */
    columns?: number;
    /** 모바일(sm) 화면에서의 컬럼 수 (기본: columns와 동일) */
    mobileColumns?: number;
    /** 카드 그리드 className */
    gridClassName?: string;
    /** 카드 아이템 설정 */
    cardConfig?: CardItemConfig;
    /** 선택 가능한 아이템 목록 (직접 제공하는 경우) */
    items?: any[];
    /** 아이템 목록 로드 함수 (커스텀 로드 로직) */
    loadItems?: () => Promise<any[]>;
    /** 빈 상태 메시지 */
    emptyMessage?: string;
    /** 검색 버튼 표시 여부 */
    showSearchButton?: boolean;
    /** 선택되지 않은 상태에서 전체 목록 표시 여부 (기본: true) */
    showAllWhenEmpty?: boolean;
    /** 페이지당 카드 수 (기본: 6). 이 숫자를 초과하면 페이징+검색 UI 표시 */
    pageSize?: number;
    /** 검색 우선 모드: true면 검색 전까지 카드 목록 숨김 (서버 검색) */
    searchFirst?: boolean;
    /** 검색 입력란 플레이스홀더 */
    searchPlaceholder?: string;
    /** 검색 필드 지정 (기본: ['name']) */
    searchFields?: string[];
}
/**
 * CardManyToOneView
 *
 * ManyToOne 필드를 카드 형태로 표시하는 커스텀 렌더러입니다.
 * - readonly 모드: 선택된 카드만 표시
 * - 편집 모드: 선택된 카드 + 변경 버튼으로 다른 옵션 선택 가능
 *
 * @example
 * ```tsx
 * <EntityFormThemeProvider
 *   fieldRenderers={{
 *     syllabus: CardManyToOneView,
 *     selection: (props) => (
 *       <CardManyToOneView
 *         {...props}
 *         columns={3}
 *         cardConfig={{
 *           titleField: 'name',
 *           labelField: (item) => item.term?.name,
 *           descriptionField: (item) => `${item.year}년도 ${item.semester}학기`,
 *         }}
 *       />
 *     ),
 *   }}
 * >
 *   {children}
 * </EntityFormThemeProvider>
 * ```
 */
export declare const CardManyToOneView: React.FC<CardManyToOneViewProps>;
export default CardManyToOneView;
//# sourceMappingURL=CardManyToOneView.d.ts.map