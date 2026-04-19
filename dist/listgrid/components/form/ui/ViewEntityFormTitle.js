import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import React from 'react';
import { Tooltip } from '../../../ui';
import { getTranslation } from '../../../utils/i18n';
import { useEntityFormTheme } from '../context/EntityFormThemeContext';
export const ViewEntityFormTitle = React.memo(function ViewEntityFormTitle({ title, hideTitle, }) {
    const { t } = getTranslation();
    const { classNames, cn } = useEntityFormTheme();
    if (hideTitle)
        return null;
    if (typeof title === 'string') {
        const titleText = t(title);
        const titleView = (_jsx("div", { className: cn('flex items-center mt-2 min-h-[60px] truncate py-3 pt-2 md:mt-0', classNames.title?.container), children: _jsx("span", { className: cn('text-[1.8rem] font-bold dark:text-white-light', classNames.title?.text), children: titleText }) }));
        if (titleText.length > 20) {
            return (_jsx(Tooltip, { label: titleText, usePortal: true, position: "top-start", children: titleView }));
        }
        return titleView;
    }
    // ReactNode가 string이 아니면 JSX.Element로 강제 변환
    return _jsx(_Fragment, { children: title });
});
//# sourceMappingURL=ViewEntityFormTitle.js.map