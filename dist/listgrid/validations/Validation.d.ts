import { EntityForm } from '../config/EntityForm';
import { FieldValue } from '../config/Config';
export interface Validation {
    id: string;
    message?: string;
    /**
     * 실제 검증 로직
     * @param entityForm - 현재의 엔티티폼 상태
     * @param value - 현재 필드의 필드값. FieldValue 타입인 경우 value.currentValue 가 현재 값
     * @param message - 상위 폼에서 넘어 온 기본 오류 메시지
     */
    validate(entityForm: EntityForm, value: FieldValue | undefined, message?: string): Promise<ValidateResult>;
    /**
     * 에러 메시지 반환
     */
    getErrorMessage(): string;
}
export declare class ValidateResult {
    error: boolean;
    message: string;
    constructor(error: boolean, message: string);
    static fail(message: string): ValidateResult;
    static success(): ValidateResult;
    hasError(): boolean;
    withMessage(message: string): this;
}
export declare abstract class ValidationItem implements Validation {
    protected constructor(id: string, message?: string);
    id: string;
    message?: string;
    /**
     * 검증 로직
     * @param entityForm
     * @param value
     * @param message
     */
    abstract validate(entityForm: EntityForm, value: FieldValue, message?: string): Promise<ValidateResult>;
    getErrorMessage(): string;
    /**
     * 현재 필드값을 string 으로 반환하는 편의성 메소드
     * @param entityForm
     * @param value
     */
    getValueAsString(entityForm: EntityForm, value: FieldValue): string;
    /**
     * 현재 필드값을 number 로 반환하는 편의성 메소드
     * @param entityForm
     * @param value
     */
    getValueAsNumber(entityForm: EntityForm, value: FieldValue): number;
    /**
     * 현재 필드값을 boolean 로 반환하는 편의성 메소드.
     * @param entityForm
     * @param value
     */
    getValueAsBoolean(entityForm: EntityForm, value: FieldValue): boolean;
    /**
     * ValidateResult 를 반환하는 편의성 메소드.
     * @param error
     * @param message
     */
    returnValidateResult(error: boolean, message?: string): ValidateResult;
}
//# sourceMappingURL=Validation.d.ts.map