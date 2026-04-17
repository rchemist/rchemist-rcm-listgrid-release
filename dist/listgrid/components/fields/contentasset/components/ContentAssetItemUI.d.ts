import React from "react";
import { ContentAsset, ContentAssetError } from "../types";
interface ContentAssetItemUIProps {
    items: ContentAsset[];
    loading: boolean;
    errors: ContentAssetError[];
    titleErrors: {
        [key: number]: string;
    };
    readonly: boolean;
    canAddMore: boolean;
    isEmpty: boolean;
    acceptedFileTypes?: string[];
    maxFileSize?: number;
    onUpdateAsset: (index: number, field: keyof ContentAsset, value: any) => void;
    onTitleBlur: (index: number, value: string) => void;
    onTitleChange: (index: number, value: string) => void;
    onContentChange: (index: number, value: string) => void;
    onRemoveItem: (index: number) => void;
    onAddItem: () => void;
    onFileUpload: (index: number, file: File, onProgress?: (progress: number) => void) => Promise<void>;
    onUploadProgress: (index: number) => (progress: number) => void;
    fieldErrors?: string[];
}
/**
 * ContentAssetItemUI
 * ContentAsset 항목들의 UI 렌더링 컴포넌트
 */
export declare const ContentAssetItemUI: React.FC<ContentAssetItemUIProps>;
export {};
//# sourceMappingURL=ContentAssetItemUI.d.ts.map