import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { ShowNotifications } from '../../../components/helper/ShowNotifications';
import { ViewEntityError } from '../ui/ViewEntityError';
export const ViewEntityFormErrors = React.memo(function ViewEntityFormErrors({ errors, entityErrorMap, notifications, onTabChange, tabs, entityForm, }) {
    // EntityTab 배열을 ViewEntityError에서 사용할 수 있는 형태로 변환
    const tabInfo = tabs?.map((tab) => ({ id: tab.id, label: tab.label }));
    return (_jsxs(_Fragment, { children: [entityErrorMap.size === 0 && _jsx(ShowNotifications, { messages: errors, error: true }), _jsx(ViewEntityError, { errors: entityErrorMap, ...(onTabChange !== undefined ? { onTabChange } : {}), ...(tabInfo !== undefined ? { tabs: tabInfo } : {}), ...(entityForm !== undefined ? { entityForm } : {}) }), _jsx(ShowNotifications, { messages: notifications, timeout: 10000, showClose: true })] }));
});
//# sourceMappingURL=ViewEntityFormErrors.js.map