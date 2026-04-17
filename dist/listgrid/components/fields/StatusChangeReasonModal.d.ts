import React from 'react';
import { SelectOption } from '../../form/Type';
import { FieldValue } from '../../config/Config';
interface StatusReason {
    message: string;
    fieldName: string;
    required?: boolean;
}
interface StatusChangeReasonModalProps {
    currentStatus: FieldValue;
    newStatus: FieldValue;
    options: SelectOption[];
    reason: StatusReason;
    onConfirm: (reason: string) => void;
    onCancel: () => void;
}
export declare const StatusChangeReasonModal: React.FC<StatusChangeReasonModalProps>;
export {};
//# sourceMappingURL=StatusChangeReasonModal.d.ts.map