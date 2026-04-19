import { ColorType } from '../../../common/type';
import { FilterItem, SearchForm } from '../../../form/SearchForm';
import { PageResult } from '../../../form/Type';
import { EntityFormActionResult } from '../../../config/Config';
import { EntityForm } from '../../../config/EntityForm';
import { ListGrid, SubCollectionProps } from '../../../config/ListGrid';
import { ListableFormField } from '../../fields/abstract';
import { ListGridHeaderButtonProps } from './ListGridHeader.types';
import { ReactNode } from 'react';
import { Session } from '../../../auth/types';
export declare const searchFormHashKey: string;
export interface SelectionActionButton {
    label: string | ((checkedItems: string[]) => string);
    onClick: (entityForm: EntityForm, checkedItems: string[]) => Promise<void>;
    color?: ColorType;
    outline?: boolean;
    className?: string;
    icon?: ReactNode;
    show?: boolean | ((checkedItems: string[]) => boolean);
    confirmMessage?: string | ((checkedItems: string[]) => string);
    canExecute?: (checkedItems: string[]) => boolean;
}
export interface SelectionOptions {
    enabled?: boolean | ((entityForm: EntityForm) => boolean);
    selectableFilter?: (item: any) => boolean;
    onSelectionChange?: (checkedItems: string[], allItems: any[]) => void;
    maxSelection?: number;
    minSelection?: number;
    validateSelection?: (checkedItems: string[]) => {
        valid: boolean;
        message?: string;
    };
    actions?: SelectionActionButton[];
    deleteButton?: {
        show?: boolean | ((checkedItems: string[]) => boolean);
        label?: string | ((checkedItems: string[]) => string);
        confirmMessage?: string | ((checkedItems: string[]) => string);
        className?: string;
        icon?: ReactNode;
    } | false;
}
export interface ViewListGridOptionProps {
    hideTitle?: boolean;
    onDragPriority?: {
        support: boolean;
        onModify?: (changed: Map<string, number>) => Promise<void>;
    };
    onDrag?: (idList: string[]) => void;
    useAccordion?: {
        render: (item: any, router: any) => Promise<ReactNode | null | undefined>;
    };
    readonly?: boolean;
    subCollection?: SubCollectionProps;
    onSelect?: (item: any, setManagedId: (value: any) => void) => void;
    manyToOne?: {
        onSelect: (item: any, setManagedId: (value: any) => void) => void;
    };
    popup?: boolean;
    filterable?: boolean;
    sortable?: boolean;
    createOrUpdate?: CreateUpdateOptions;
    delete?: {
        onDelete?: (entityForm: EntityForm, rows: any[], checkedItems: string[]) => Promise<EntityFormActionResult>;
        postDelete?: (entityForm: EntityForm, rows: any[], checkedItems: string[]) => Promise<void>;
    };
    selection?: SelectionOptions;
    filters?: (entityForm: EntityForm) => Promise<{
        condition?: 'AND' | 'OR';
        items: FilterItem[];
    }[]>;
    fields?: ListableFormField<any>[];
    onFetched?: PostFetchListData;
    headerButtons?: ((props: ListGridHeaderButtonProps) => Promise<ReactNode>)[];
    cacheable?: boolean;
    messages?: {
        noData?: string;
    };
    topContent?: (parentId: string, searchForm?: SearchForm) => ReactNode;
    defaultPageSize?: number;
    hidePageSize?: boolean;
    hidePagination?: boolean;
    hideAdvancedSearch?: boolean;
    /**
     * 새창 열기 버튼 설정
     * 활성화 시 각 행의 오른쪽에 새창으로 열기 버튼이 표시됩니다.
     */
    openInNewWindow?: OpenInNewWindowOptions;
    /**
     * URL 동기화 설정
     * 페이징, 검색, 필터, 정렬 상태를 URL 쿼리 파라미터와 동기화
     * - true: 기본 옵션으로 활성화
     * - false: 비활성화
     * - UrlSyncOptions: 세부 옵션 지정
     * 기본값: 메인 엔티티(subCollection이 아닌)에서 자동 활성화
     */
    urlSync?: UrlSyncOptions | boolean;
}
/**
 * 새창 열기 옵션 인터페이스
 */
export interface OpenInNewWindowOptions {
    /** 활성화 여부 (기본값: false) */
    enabled: boolean;
    /** 버튼 툴팁 텍스트 */
    tooltip?: string;
    /** 새창 크기 설정 */
    windowFeatures?: {
        width?: number;
        height?: number;
    };
    /** 행별 표시 여부 필터 (특정 조건의 항목만 새창 버튼 표시) */
    showFilter?: (item: any) => boolean;
}
/**
 * URL 동기화 옵션 인터페이스
 * ListGrid의 페이징, 검색, 필터, 정렬 상태를 URL과 동기화
 */
export interface UrlSyncOptions {
    /** URL 동기화 활성화 여부 (기본값: isMainEntity일 때 true) */
    enabled?: boolean;
    /** 필터를 URL에 포함할지 여부 (기본값: true) */
    includeFilters?: boolean;
    /** 정렬을 URL에 포함할지 여부 (기본값: true) */
    includeSort?: boolean;
    /** 페이지 크기를 URL에 포함할지 여부 (기본값: false) */
    includePageSize?: boolean;
    /** sessionStorage 폴백 사용 여부 (기본값: true) */
    sessionStorageFallback?: boolean;
}
export type PostFetchListData = (pageResult: PageResult) => Promise<PageResult>;
export interface ViewListGridProps {
    listGrid: ListGrid;
    parentId?: string;
    options?: ViewListGridOptionProps;
    title?: string;
    viewMode?: 'popup' | 'page';
    session?: Session;
}
export interface CreateUpdateOptions {
    addNew?: boolean;
    modal?: boolean;
    onSave?: (entityForm: EntityForm) => Promise<void>;
    onClose?: () => void;
}
export interface ViewFieldManageable {
    viewFields: string[];
    setViewFields?: (viewFields: string[]) => void;
}
export interface ItemCheckable {
    checkedItems: any[];
    setCheckedItems?: (itemIds: any[]) => void;
}
//# sourceMappingURL=ViewListGrid.types.d.ts.map