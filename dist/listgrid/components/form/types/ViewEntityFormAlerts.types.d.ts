import { AlertMessage, AlertMessageLink } from '../../../config/EntityFormTypes';
import { FC } from "react";
export interface ViewEntityFormAlertsProps {
    alertMessages: AlertMessage[];
    onRemove?: (key: string) => void;
    onTabChange?: (tabId: string) => void;
    onFieldFocus?: (fieldName: string) => void;
}
export interface AlertStyles {
    bg: string;
    hoverBg: string;
    text: string;
    icon: FC<any>;
}
export interface AlertItemProps {
    alert: AlertMessage;
    onLinkClick: (link: AlertMessageLink) => void;
    onClose: (key: string) => void;
    t: (key: string) => string;
}
export type AlertColor = 'success' | 'danger' | 'warning' | 'info' | 'secondary' | 'primary' | 'dark';
//# sourceMappingURL=ViewEntityFormAlerts.types.d.ts.map