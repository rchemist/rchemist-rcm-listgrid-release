import { FormField, FormFieldProps } from '../abstract';
import React from "react";
import { FieldRenderParameters } from '../../../config/EntityField';
import { ContentAsset } from "./types";
interface ContentAssetFieldProps extends FormFieldProps {
    /** 최대 업로드 가능한 항목 수 */
    maxItems?: number;
    /** 허용된 파일 타입 (예: ['image/*', 'application/pdf']) */
    acceptedFileTypes?: string[];
    /** 최대 파일 크기 (bytes) */
    maxFileSize?: number;
}
/**
 * ContentAssetField
 * 범용적인 파일 업로드 및 관리를 위한 ListGrid 커스텀 필드
 *
 * @extends FormField
 */
export declare class ContentAssetField extends FormField<ContentAssetField> {
    /** 최대 업로드 가능한 항목 수 */
    maxItems?: number;
    /** 허용된 파일 타입 */
    acceptedFileTypes?: string[];
    /** 최대 파일 크기 (bytes) */
    maxFileSize?: number;
    constructor(name: string, order: number);
    /**
     * ContentAssetField 핵심 렌더링 로직
     */
    protected renderInstance(params: FieldRenderParameters): Promise<React.ReactNode | null>;
    /**
     * ContentAssetField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): ContentAssetField;
    /**
     * 기본값 설정
     * @param value ContentAsset 배열
     */
    withDefaultValue(value: ContentAsset[]): this;
    /**
     * 최대 항목 수 설정
     * @param maxItems 최대 항목 수
     */
    withMaxItems(maxItems: number): this;
    /**
     * 허용된 파일 타입 설정
     * @param acceptedFileTypes 파일 타입 배열
     */
    withAcceptedFileTypes(acceptedFileTypes: string[]): this;
    /**
     * 최대 파일 크기 설정
     * @param maxFileSize 최대 파일 크기 (bytes)
     */
    withMaxFileSize(maxFileSize: number): this;
    /**
     * ContentAssetField 인스턴스 생성 헬퍼
     * @param props ContentAssetFieldProps
     */
    static create(props: ContentAssetFieldProps): ContentAssetField;
}
export {};
//# sourceMappingURL=ContentAssetField.d.ts.map