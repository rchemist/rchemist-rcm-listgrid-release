import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { TooltipCard } from "../../../ui";
import { IconInfoCircle } from "@tabler/icons-react";
import { isBlank } from '../../../utils/StringUtil';
import { getTranslation } from "../../../utils/i18n";
export const ViewHelpIcon = (props) => {
    const helpText = props.helpText;
    if (isBlank(helpText))
        return null;
    const { t } = getTranslation();
    const value = t(helpText ?? '');
    return _jsxs(TooltipCard, { width: 280, shadow: "md", children: [_jsx(TooltipCard.Target, { children: _jsx("div", { className: "rcm-text-muted", children: _jsx(IconInfoCircle, { width: 18, color: '#808080' }) }) }), _jsx(TooltipCard.Dropdown, { children: _jsx("div", { className: "rcm-field-help", dangerouslySetInnerHTML: { __html: value } }) })] });
};
//# sourceMappingURL=ViewHelpIcon.js.map