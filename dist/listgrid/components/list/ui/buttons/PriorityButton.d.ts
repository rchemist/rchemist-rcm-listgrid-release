import { EntityForm } from '../../../../config/EntityForm';
export interface PriorityButtonsProps {
    managePriority: boolean;
    setManagePriority: (value: boolean) => void;
    setParentManagePriority: () => void;
    rows?: any[];
    entityForm: EntityForm;
    setNotifications: (notifications: string[]) => void;
    setErrors: (errors: string[]) => void;
}
export declare const PriorityButtons: React.FC<PriorityButtonsProps>;
//# sourceMappingURL=PriorityButton.d.ts.map