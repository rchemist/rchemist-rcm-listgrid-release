import { EntityForm } from '../config/EntityForm';
import { SearchForm } from '../form/SearchForm';
import { ListableFormField } from '../components/fields/abstract';
import { LabelType } from '../config/Config';
import { PageResult } from '../form/Type';
import { ReactNode } from 'react';
import { SubCollectionBaseButtonProps } from '../components/list/types/SubCollectionButtons.type';
export declare class ListGrid {
    private readonly entityForm;
    private searchForm?;
    private listFields?;
    private overrideFetch?;
    private overrideFetchResult?;
    constructor(entityForm: EntityForm);
    withOverrideFetch(overrideFetch?: (url: string, searchForm: SearchForm) => Promise<PageResult>): this;
    withOverrideFetchResult(overrideFetchResult?: (result: PageResult) => Promise<PageResult>): this;
    getListFields(): ListableFormField<any>[];
    getQuickSearchProperty(findAllFields?: boolean): QuickSearchProps | undefined;
    getSearchForm(): SearchForm;
    getEntityForm(): EntityForm;
    withSearchForm(searchForm: SearchForm): this;
    fetchData(fetchSearchForm?: SearchForm, extensionOptions?: {
        entityFormName?: string;
        extensionPoint?: string;
    }): Promise<PageResult>;
    getAdvancedSearchFields(): ListableFormField<any>[];
}
export interface SubCollectionProps {
    name?: string;
    /**
     * 이 콜렉션의 엔티티에 상위 엔티티가 어떤 필드명으로 매핑되어 있는지.
     * 예를 들어 one Plant : many Transceivers 관계에서
     * Transceiver 엔티티에 plantId = 1 이라는 값으로 매핑되어 있다고 하면 mappedBy 는 plantId 가 되고 mappedValue 는 1이 된다.
     */
    mappedBy?: string;
    mappedValue?: any;
    buttons?: ((props: SubCollectionBaseButtonProps) => ReactNode)[];
    add?: boolean;
    delete?: boolean;
    modifyOnView?: boolean;
}
export interface QuickSearchProps {
    name: string;
    label: LabelType;
    /**
     * Additional fields to search with OR condition
     * When specified, quick search will search across all fields using OR condition
     * @example ['name', 'email', 'phone'] - searches all three fields
     */
    orFields?: string[] | undefined;
    /**
     * Labels for orFields, used to generate combined placeholder text
     * @example ['이메일', '전화번호'] for orFields ['email', 'phone']
     */
    orFieldLabels?: LabelType[] | undefined;
}
//# sourceMappingURL=ListGrid.d.ts.map