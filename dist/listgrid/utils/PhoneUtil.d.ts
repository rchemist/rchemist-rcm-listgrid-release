/**
 * 전화번호에서 하이픈을 제거합니다.
 * @param phoneNumber 전화번호 문자열 (하이픈 포함 가능)
 * @returns 하이픈이 제거된 숫자만 있는 문자열
 * @example removePhoneNumberHyphens("010-1234-5678") => "01012345678"
 * @example removePhoneNumberHyphens("01012345678") => "01012345678"
 */
export declare function removePhoneNumberHyphens(phoneNumber: string | null | undefined): string;
/**
 * 전화번호를 하이픈이 포함된 형식으로 포맷팅합니다.
 * 10자리: 000-0000-0000 (예: 02-1234-5678)
 * 11자리: 000-0000-0000 (예: 010-1234-5678)
 * @param phoneNumber 전화번호 문자열 (숫자만)
 * @returns 하이픈이 포함된 전화번호 문자열
 * @example formatPhoneNumber("01012345678") => "010-1234-5678"
 * @example formatPhoneNumber("0212345678") => "02-1234-5678"
 * @example formatPhoneNumber("010-1234-5678") => "010-1234-5678" (이미 포맷팅된 경우)
 */
export declare function formatPhoneNumber(phoneNumber: string | null | undefined): string;
//# sourceMappingURL=PhoneUtil.d.ts.map