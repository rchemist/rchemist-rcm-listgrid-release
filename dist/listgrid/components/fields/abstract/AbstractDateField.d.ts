import { ListableFormField, ListableFormFieldProps } from './ListableFormField';
import { FieldType } from '../../../config/Config';
import { MinMaxStringLimit } from '../../../form/Type';
export interface AbstractDateFieldProps<TValue = any, TForm extends object = any> extends ListableFormFieldProps<TValue, TForm> {
    limit?: MinMaxStringLimit;
    range?: boolean;
}
export declare abstract class AbstractDateField<TSelf extends AbstractDateField<TSelf, TValue, TForm>, TValue = any, TForm extends object = any> extends ListableFormField<TSelf, TValue, TForm> {
    limit?: MinMaxStringLimit;
    range?: boolean;
    protected constructor(name: string, order: number, type: FieldType, limit?: MinMaxStringLimit, range?: boolean);
    /**
     * range 가 true 면, 시작 시각 ~ 종료 시각 두 가지를 입력받게 됩니다.
     * @param range
     */
    withRange(range?: boolean): this;
    /**
     * 최소, 최대값 설정
     * @param limit
     */
    withLimit(limit?: MinMaxStringLimit): this;
    /**
     * 최소값 설정
     * @param min
     */
    withMin(min?: string): this;
    /**
     * 최대값 설정
     * @param max
     */
    withMax(max?: string): this;
    protected copyFields(origin: ListableFormFieldProps<TValue, TForm>, includeValue?: boolean): this;
}
//# sourceMappingURL=AbstractDateField.d.ts.map