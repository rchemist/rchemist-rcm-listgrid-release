import { EntityFormBase } from './EntityFormBase';
import { EntityFormValidation } from './EntityFormValidation';
import { CopyEntityFormToInnerFieldsProps } from '../../config/EntityFormTypes';
export declare abstract class EntityFormData extends EntityFormValidation {
    constructor(name: string, url: string);
    resetValue(fieldName: string, loadOnChanges?: boolean): this;
    abstract executeOnChanges(fieldName: string): Promise<void>;
    /**
     * 필드값을 변경한다.
     * @param fieldName
     * @param value
     * @returns
     */
    setValue(fieldName: string, value: any): this;
    setValues(cloned: EntityFormBase): this;
    /**
     * 단순히 필드값을 변경하는 setValue 와는 다르게 필드값이 변경되면 onChanges 에 등록된 함수를 실행한다.
     * @param fieldName
     * @param value
     * @returns
     */
    changeValue(fieldName: string, value: any): this;
    clearOnChanges(): this;
    clearOnFetchData(): this;
    clearOnInitialize(): this;
    clearOnPostFetchListData(): this;
    isDirty(): boolean;
    isDirtyField(name: string): boolean;
    copyEntityFormToInnerFields({ prefix, entityForm, ...props }: CopyEntityFormToInnerFieldsProps): void;
}
//# sourceMappingURL=EntityFormData.d.ts.map