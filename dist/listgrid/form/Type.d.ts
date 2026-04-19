import { AdditionalColorType, ColorType } from '../common/type';
import { SearchForm } from './SearchForm';
export interface SelectOption {
    label?: string;
    listLabel?: string;
    value: any;
    color?: ColorType | AdditionalColorType;
    /**
     * 이 옵션값이 현재 필드의 값일 때 필드를 읽기 전용으로 설정할지 여부.
     * true이면 해당 값이 선택되었을 때 변경이 불가능합니다.
     */
    readonly?: boolean;
    /**
     * 이 옵션값에서 전이 가능한 대상 옵션 값 목록.
     * 이 값이 설정되면 현재 옵션에서 targets 배열에 포함된 값으로만 변경할 수 있습니다.
     * 이 값이 없으면 모든 옵션으로 변경 가능합니다.
     */
    targets?: string[];
}
export type MinMaxLimit = {
    min?: number;
    max?: number;
};
export type MinMaxStringLimit = {
    min?: string;
    max?: string;
};
export type EntityWithId = {
    id?: string | bigint;
    [key: string]: any;
};
export declare class PageResult {
    list: EntityWithId[];
    totalCount: number;
    totalPage: number;
    searchForm: SearchForm;
    errors?: string[];
    constructor(props: {
        list: EntityWithId[];
        totalCount: number;
        totalPage: number;
        searchForm: SearchForm;
    });
    static createEmptyResult(searchForm?: SearchForm): PageResult;
    withErrors(...errors: string[]): this;
    static fetchListData(url: string, searchForm: SearchForm, extensionOptions?: {
        entityFormName?: string;
        extensionPoint?: string;
    }, serverProxy?: boolean): Promise<PageResult>;
}
//# sourceMappingURL=Type.d.ts.map