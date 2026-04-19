import { ContentAsset, ContentAssetError } from '../types';
import { EntityForm } from '../../../../config/EntityForm';
interface UseContentAssetProps {
    value: ContentAsset[] | undefined;
    onChange: (value: ContentAsset[]) => void;
    onError?: ((message: string) => void) | undefined;
    clearError?: (() => void) | undefined;
    entityForm: EntityForm;
    maxItems?: number | undefined;
    readonly?: boolean | undefined;
}
/**
 * ContentAsset 상태 관리 훅
 * 범용적인 파일 업로드 및 관리를 위한 상태 관리
 */
export declare const useContentAsset: ({ value: initialValue, onChange, onError, clearError, entityForm, maxItems, readonly, }: UseContentAssetProps) => {
    assets: ContentAsset[];
    loading: boolean;
    errors: ContentAssetError[];
    titleErrors: {
        [key: number]: string;
    };
    setTitleErrors: import("react").Dispatch<import("react").SetStateAction<{
        [key: number]: string;
    }>>;
    handleAddAsset: () => void;
    handleRemoveAsset: (index: number) => void;
    handleUpdateAsset: (index: number, field: keyof ContentAsset, value: any) => void;
    handleTitleBlur: (index: number, value: string) => void;
    handleFileUpload: (index: number, file: File, onUploadProgress?: (progress: number) => void) => Promise<void>;
    validateAll: () => boolean;
    canAddMore: boolean;
    isEmpty: boolean;
    isReadonly: boolean;
};
export {};
//# sourceMappingURL=useContentAsset.d.ts.map