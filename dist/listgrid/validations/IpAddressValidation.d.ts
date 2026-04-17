import { ValidateResult, ValidationItem } from './Validation';
import { EntityForm } from '../config/EntityForm';
import { FieldValue } from '../config/Config';
import { TagValidationResult } from '../form/TagsInput/types';
export declare const RegexAllowedIpAddr: RegExp;
/**
 * IP 주소 형식 검증 클래스
 *
 * 허용 형식:
 * - XXX.XXX.XXX.XXX (일반 IP 주소, 예: 192.168.1.1)
 * - XXX.XXX.XXX.* (와일드카드, 예: 192.168.1.*)
 * - XXX.XXX.* (와일드카드, 예: 192.168.*)
 * - XXX.* (와일드카드, 예: 192.*)
 */
export declare class IpAddressValidation extends ValidationItem {
    constructor(id?: string, message?: string);
    validate(entityForm: EntityForm, value: FieldValue, message?: string): Promise<ValidateResult>;
}
/**
 * TagField의 withTagValidation에서 사용할 IP 주소 검증 함수
 * 각 태그가 추가될 때 실시간으로 검증합니다.
 *
 * @param value - 검증할 IP 주소 값
 * @returns TagValidationResult
 */
export declare function validateIpAddressTag(value: string): TagValidationResult;
//# sourceMappingURL=IpAddressValidation.d.ts.map