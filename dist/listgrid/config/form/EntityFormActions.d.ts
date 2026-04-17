import { EntityFormData } from './EntityFormData';
import { IListConfig, ListableFormField } from '../../components/fields/abstract';
import { CreateStep } from '../../config/Config';
import { AddFieldItemProps, AlertMessage, DataTransferConfigProps } from '../../config/EntityFormTypes';
import { DataTransferConfig, DataField } from '../../transfer/Type';
export declare abstract class EntityFormActions extends EntityFormData {
    constructor(name: string, url: string);
    getListableFieldOrder(field: ListableFormField<any>): number;
    /**
       * Alert 메시지를 제거합니다.
       * @param includePersistent persistent 메시지도 제거할지 여부 (true면 persistent 메시지도 제거)
       * @returns EntityForm 인스턴스
       */
    clearAlertMessages(includePersistent?: boolean): this;
    /**
     * Alert 메시지를 추가합니다.
     * @param messages 추가할 Alert 메시지 배열
     * @returns EntityForm 인스턴스
     */
    withAlertMessages(messages: AlertMessage[]): this;
    /**
     * 특정 키의 Alert 메시지를 제거합니다.
     * @param key 제거할 메시지의 키
     * @returns EntityForm 인스턴스
     */
    removeAlertMessage(key: string): this;
    withExcludeListFields(...excludeListFields: string[]): this;
    /**
  * 현재 Alert 메시지들을 반환합니다.
  * @returns Alert 메시지 배열
  */
    getAlertMessages(): AlertMessage[];
    /**
       * 모든 메시지를 제거합니다. (현재는 Alert 메시지만 지원)
       * @param includePersistent persistent 메시지도 제거할지 여부 (true면 persistent 메시지도 제거)
       * @returns EntityForm 인스턴스
       */
    clearAllMessages(includePersistent?: boolean): this;
    withListConfig(fieldName: string, config: IListConfig): this;
    withCreatedAtField(): this;
    withCreatedAndUpdatedAtFields(): this;
    addFields(props: AddFieldItemProps): this;
    removeField(fieldName: string): void;
    /**
       * Field 와 Collection 모두 EntityItem 을 인수로 받기 때문에 둘 간의 차이는 없다.
       * @param props
       */
    addCollections(props: AddFieldItemProps): this;
    useListFields(...fieldNames: string[]): this;
    /**
       * ListGrid 를 그릴 때 getListField() 를 호출하면 자동으로 리스트 필드를 만든다.
       */
    getListFields(): ListableFormField<any>[];
    getFilterableFields(): ListableFormField<any>[];
    getViewOrder(tabId: string, fieldGroupId: string, fieldOrder: number): number;
    withDataTransferConfig(props: DataTransferConfigProps): this;
    private getDataFields;
    getExportableFields(): Promise<DataField[] | undefined>;
    getImportableFields(): Promise<DataField[] | undefined>;
    private getDataFieldsFromFields;
    getDataTransferConfig(): Promise<DataTransferConfig | undefined>;
    withFilterable(fieldName: string, filterable?: boolean): this;
    withNeverDelete(neverDelete?: boolean): this;
    withStatusCreatedAndUpdatedAtField(): this;
    withStatusCreatedAtField(): this;
    getCreateStep(): CreateStep[] | undefined;
    setCreateStep(createStep?: CreateStep[]): void;
    withCreateStep(createStep?: CreateStep[]): this;
}
//# sourceMappingURL=EntityFormActions.d.ts.map