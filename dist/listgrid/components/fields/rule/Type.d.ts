import { QueryConditionType } from "../../../form/SearchForm";
import { FormField } from '../abstract';
import { EntityForm } from '../../../config/EntityForm';
export interface RuleFieldValue {
    id: number;
    name: string;
    queryConditionType: QueryConditionType;
    values?: any[];
    subConditions?: Map<'AND' | 'OR', RuleFieldValue[]>;
}
export type RuleFieldType = 'add' | 'remove';
export declare class RuleConditionValue {
    id: number;
    condition: 'AND' | 'OR';
    targetEntityPrefix: string;
    values: RuleFieldValue[];
    constructor(id: number, condition: "AND" | "OR", targetEntityPrefix: string);
    static create(data: unknown): RuleConditionValue;
    addValues(...values: RuleFieldValue[]): void;
    withValues(values: RuleFieldValue[]): this;
    isEmpty(): boolean;
}
export type ResultByCount = (count: number) => void;
export type ResultByRuleCondition = (result: Map<number, RuleConditionValue>) => void;
export interface RuleBasedFieldProps {
    value?: Map<number, RuleConditionValue>;
    onRefresh?: () => void;
    setNotifications?: (notifications: string[]) => void;
    parentId?: string;
    fieldName?: string;
}
/**
 * Rule 이 항상 동일한 엔티티를 대상으로 적용되지는 않는다.
 * 예를 들어 주문 상품 오퍼라면
 * 상품에 대한 Rule 이 있을 수도 있고
 * 주문에 대한 Rule 이 있을 수도 있다.
 * 또 Category 에 대한 Rule 이 있을 수도 있다.
 * 따라서 여러 엔티티폼을 전달할 수 있어야 한다.
 * 또 각 엔티티폼에 대해 prefix 와 name 을 지정해 어떤 필드의 값인지 구분할 수 있어야 한다.
 * 엔티티폼을 통째로 넘기거나 필요한 필드를 지정해 넘길 수 있다.
 */
export type RuleFieldEntityForm = {
    prefix: string;
    label: string;
    entityForm?: EntityForm;
    fields?: FormField<any>[];
};
export declare function getConfiguredFields(targetEntityForm: RuleFieldEntityForm): FormField<any>[];
/**
 * 엔티티폼에서 Rule 필드를 자동으로 추출할 때 무조건 제거해야 할 대상 필드를 지정한다.
 * 여러 조건이 있을 수 있으니 함수로 따로 뺀다.
 * @param field
 */
export declare function isIgnoreField(field: FormField<any>): boolean;
//# sourceMappingURL=Type.d.ts.map