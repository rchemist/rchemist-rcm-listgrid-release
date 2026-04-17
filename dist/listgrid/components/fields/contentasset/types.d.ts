/**
 * ContentAsset 인터페이스
 * 범용적인 파일 업로드 및 관리를 위한 자산 타입
 */
export interface ContentAsset {
    /** 백엔드 서버에서 받은 고유 식별자 */
    id?: string;
    /** 컨텐츠 제목 (필수, 중복 불가) */
    title: string;
    /** 부가 설명 텍스트 */
    content?: string;
    /** 업로드된 파일의 URL */
    assetUrl: string;
}
/**
 * ContentAsset 유효성 검사 결과
 */
export interface ContentAssetValidation {
    isValid: boolean;
    errors: ContentAssetError[];
}
/**
 * ContentAsset 에러 타입
 */
export interface ContentAssetError {
    index: number;
    field: keyof ContentAsset;
    message: string;
}
/**
 * ContentAsset 유효성 검사 함수
 */
export declare const validateContentAssets: (assets: ContentAsset[]) => ContentAssetValidation;
/**
 * 빈 ContentAsset 생성
 */
export declare const createEmptyContentAsset: () => ContentAsset;
/**
 * ContentAssetField 설정 옵션
 */
export interface ContentAssetFieldConfig {
    /** 최대 업로드 가능한 항목 수 */
    maxItems?: number;
    /** 허용된 파일 타입 (예: ['image/*', 'application/pdf']) */
    acceptedFileTypes?: string[];
    /** 최대 파일 크기 (bytes) */
    maxFileSize?: number;
    /** 읽기 전용 모드 */
    readonly?: boolean;
}
//# sourceMappingURL=types.d.ts.map