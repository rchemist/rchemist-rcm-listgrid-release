import { IEntityError } from '../api';
import { FieldError } from "./EntityFormTypes";
import { EntityForm } from "./EntityForm";
export declare function entityErrorToString(entityError: IEntityError): string;
export declare function mergeFieldErrors(origin: FieldError[], errors: FieldError[]): FieldError[];
interface ApiErrorResponse {
    error?: string | {
        message?: string;
        fieldError?: unknown;
    } | unknown;
    entityError?: {
        error?: string | {
            message?: string;
            fieldError?: unknown;
        };
    };
}
/**
 * API 응답 에러를 처리하고 필드 에러와 글로벌 에러를 추출합니다.
 * EntityForm의 save 메소드에서 사용하는 에러 처리 로직을 재사용 가능하도록 추출한 함수입니다.
 *
 * @param response - API 응답 객체 (error, entityError 포함 가능)
 * @param form - 필드 라벨을 가져오기 위한 EntityForm (optional)
 * @returns 처리된 에러 정보
 */
export declare function processApiError(response: ApiErrorResponse, form?: EntityForm): {
    fieldErrors: FieldError[];
    globalError?: string;
    hasError: boolean;
};
export declare function delay(ms: number): Promise<void>;
export {};
//# sourceMappingURL=EntityFormMethod.d.ts.map