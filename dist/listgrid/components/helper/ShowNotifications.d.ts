import React from "react";
import { ColorType } from "../../common/type";
interface ListGridNotificationsProps {
    messages?: string[] | Map<string, string>;
    error?: any;
    color?: ColorType;
    timeout?: number;
    showClose?: boolean;
    onClick?: (messageId?: string) => void;
    onTimeout?: () => void;
}
export declare const ShowNotifications: ({ error, color, timeout, showClose, onClick, ...props }: ListGridNotificationsProps) => React.ReactNode;
export {};
//# sourceMappingURL=ShowNotifications.d.ts.map