import { AlertMessage, AlertMessageLink } from '../../../config/EntityFormTypes';
import { AlertStyles } from '../types/ViewEntityFormAlerts.types';
export declare const useAlertManager: (alertMessages: AlertMessage[], onRemove?: (key: string) => void, onTabChange?: (tabId: string) => void, onFieldFocus?: (fieldName: string) => void) => {
    visibleAlerts: AlertMessage[];
    isCollapsed: boolean;
    handleLinkClick: (link: AlertMessageLink) => void;
    handleCloseAlert: (key: string) => void;
    toggleCollapse: () => void;
    getDominantColor: () => "info" | "success" | "warning" | "danger";
};
export declare const getAlertStyles: (color: AlertMessage["color"]) => AlertStyles;
export declare const getIndicatorTone: (color: string) => "info" | "success" | "warning" | "error";
export declare const getColorIndicator: (color: string) => string;
//# sourceMappingURL=useAlertManager.d.ts.map