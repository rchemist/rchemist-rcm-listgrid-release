import { AlertMessage, AlertMessageLink } from '../../../config/EntityFormTypes';
import { FC } from "react";
export interface ViewEntityFormAlertsProps {
    alertMessages: AlertMessage[];
    onRemove?: (key: string) => void;
    onTabChange?: (tabId: string) => void;
    onFieldFocus?: (fieldName: string) => void;
}
export interface AlertStyles {
    /**
     * @deprecated Use `className` + `dataTone`. Kept for backward-compatibility;
     * now returns `'rcm-notice'` without tone modifier classes.
     */
    bg: string;
    hoverBg: string;
    text: string;
    icon: FC<any>;
    /** Primitive class to apply on the alert root (`rcm-notice`). */
    className: string;
    /** Value for the `data-tone` attribute on the alert root, or undefined for neutral. */
    dataTone?: 'info' | 'success' | 'warning' | 'error';
}
export interface AlertItemProps {
    alert: AlertMessage;
    onLinkClick: (link: AlertMessageLink) => void;
    onClose: (key: string) => void;
    t: (key: string) => string;
}
export type AlertColor = 'success' | 'danger' | 'warning' | 'info' | 'secondary' | 'primary' | 'dark';
//# sourceMappingURL=ViewEntityFormAlerts.types.d.ts.map