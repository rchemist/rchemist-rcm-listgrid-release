import { EntityForm } from '../../../config/EntityForm';
interface UseEntityFormAutoSaveOptions {
    entityForm?: EntityForm;
    enabled: boolean;
    autoSaveKey?: string;
}
/**
 * EntityForm 자동 저장 훅
 * - sessionStorage에 필드 값을 자동 저장
 * - 새로고침 시 저장된 값 복원
 * - 탭/브라우저 닫으면 자동 삭제 (sessionStorage 특성)
 */
export declare function useEntityFormAutoSave({ entityForm, enabled, autoSaveKey, }: UseEntityFormAutoSaveOptions): {
    /** 현재 상태를 즉시 저장 */
    saveNow: () => Promise<void>;
    /** 디바운스된 저장 (필드 변경 시 호출) */
    triggerSave: () => void;
    /** 저장된 데이터 삭제 */
    clearAutoSave: () => void;
    /** 저장된 데이터 복원 */
    restore: () => Promise<boolean>;
};
export {};
//# sourceMappingURL=useEntityFormAutoSave.d.ts.map