import { RegexValidation } from '../validations/RegexValidation';
import { ValidateResult } from '../validations/Validation';
import { EntityForm } from '../config/EntityForm';
import { FieldValue } from '../config/Config';
export declare class PhoneNumberValidation extends RegexValidation {
    constructor(id?: string, regex?: RegExp, message?: string);
    /**
     * 전화번호 검증 시 하이픈을 제거한 후 검증합니다.
     * 빈 값인 경우 검증을 통과시킵니다 (required 검증은 필드의 required 설정으로 처리).
     */
    validate(entityForm: EntityForm, value: FieldValue, message?: string): Promise<ValidateResult>;
}
//# sourceMappingURL=PhoneNumberValidation.d.ts.map