import { EntityFormActionResult, FieldType } from './Config';
import { EntityField } from './EntityField';
import { ListableFormField } from '../components/fields/abstract';
import { ResponseData } from '../api';
import { Session } from '../auth';
import { EntityFormExtensions } from './form/EntityFormExtensions';
import { FieldError, SubmitFormData } from './EntityFormTypes';
import { ValidateResult } from '../validations/Validation';
export declare class EntityForm extends EntityFormExtensions {
    constructor(name: string, url: string);
    clone(includeValue?: boolean): EntityForm;
    cloneWithEntityForm(entityForm: EntityForm, includeValue?: boolean): EntityForm;
    executeOnChanges(fieldName: string): Promise<void>;
    merge(origin: EntityForm): this;
    setFetchedValue(fieldName: string, value: any): this;
    withAppendAdvancedSearchFields(...fields: ListableFormField<any>[]): this;
    /**
     * ViewEntityForm 에서 최초 setEntityForm 을 할 때 initialize 를 호출해야 한다.
     */
    initialize(props: {
        session?: Session;
        list?: boolean;
    }): Promise<EntityFormActionResult>;
    /**
     * 필드, 필드그룹, 탭의 숨김 상태를 설정합니다.
     *
     * 이 메소드는 세 가지 타입의 숨김 처리를 통합하여 제공합니다:
     * - FIELD: 개별 필드나 컬렉션의 숨김 상태 설정
     * - GROUP: 특정 탭 내 필드그룹의 모든 필드를 일괄 숨김 처리
     * - TAB: 탭 전체와 그 하위 모든 필드를 일괄 숨김 처리
     *
     * @param props 숨김 설정 옵션 또는 필드명 (기존 호환성용)
     * @param props.type 숨김 대상 타입 ('FIELD' | 'GROUP' | 'TAB')
     * @param props.hidden 숨김 여부 (true: 숨김, false: 표시)
     * @param props.fieldName [FIELD 타입] 대상 필드 또는 컬렉션의 이름
     * @param props.tabId [GROUP/TAB 타입] 대상 탭 ID
     * @param props.fieldGroupId [GROUP 타입] 대상 필드그룹 ID
     * @param hidden 기존 API 호환성을 위한 숨김 여부 (props가 string일 때만 사용)
     *
     * @returns EntityForm 인스턴스 (메소드 체이닝 지원)
     *
     * @example
     * // 개별 필드 숨김
     * entityForm.withHidden({ type: 'FIELD', hidden: true, fieldName: 'email' });
     *
     * @example
     * // 필드그룹 전체 숨김
     * entityForm.withHidden({
     *   type: 'GROUP',
     *   hidden: true,
     *   tabId: 'education',
     *   fieldGroupId: 'university'
     * });
     *
     * @example
     * // 탭 전체 숨김
     * entityForm.withHidden({ type: 'TAB', hidden: true, tabId: 'advancedSettings' });
     *
     * @example
     * // 기존 API 호환성 (deprecated)
     * entityForm.withHidden('fieldName', true);
     *
     * @since 1.0.0
     */
    withHidden(props: {
        type: 'FIELD';
        hidden: boolean;
        fieldName: string;
    } | {
        type: 'GROUP';
        hidden: boolean;
        tabId: string;
        fieldGroupId: string;
    } | {
        type: 'TAB';
        hidden: boolean;
        tabId: string;
    } | string, hidden?: boolean): this;
    delete(): Promise<EntityFormActionResult>;
    deleteAll(idList: any[]): Promise<EntityFormActionResult>;
    getFields(type?: FieldType, orderByView?: boolean): EntityField[];
    withOverrideSubmitData(fn: (entityForm: EntityForm, data: any) => Promise<{
        data: any;
        modifiedFields?: string[];
        removePrevious?: boolean;
        error?: boolean;
        errors?: FieldError[];
    }>): this;
    setFetchedValues(entity: any): Promise<EntityForm>;
    fetchData(fetchUrl?: string): Promise<ResponseData>;
    internalSave(session?: Session, skipValidation?: boolean, forceIncludeExceptOnSave?: boolean): Promise<EntityFormActionResult>;
    save(session?: Session, skipValidation?: boolean, forceIncludeExceptOnSave?: boolean): Promise<EntityFormActionResult>;
    getSubmitFormData(forceIncludeExceptOnSave?: boolean): Promise<SubmitFormData>;
    validate(props?: {
        fieldNames?: string[];
        session?: Session;
    }): Promise<FieldError[]>;
    withCheckDuplicate(fieldName: string, checkDuplicate: (entityForm: EntityForm, value: string) => Promise<ValidateResult>): this;
    withFieldToLayout(layout: 'full' | 'half'): this;
}
//# sourceMappingURL=EntityForm.d.ts.map