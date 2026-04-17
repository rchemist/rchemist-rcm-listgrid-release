import { EntityForm } from '../../../../config/EntityForm';
interface CacheClearButtonProps {
    entityForm: EntityForm;
    setNotifications: (notifications: string[]) => void;
    setErrors: (errors: string[]) => void;
    onRefresh: () => void;
}
export declare const CacheClearButton: React.FC<CacheClearButtonProps>;
export {};
//# sourceMappingURL=CacheClearButton.d.ts.map