import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { IconFilter } from '@tabler/icons-react';
export const FilterButton = ({ isActive, onClick, disabled }) => {
    return (_jsx("button", { onClick: onClick, disabled: disabled, className: `inline-flex items-center transition-colors ${isActive ? 'text-primary' : 'text-gray-400 hover:text-primary'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`, "aria-label": "\uD544\uD130", type: "button", children: _jsx(IconFilter, { className: "w-3.5 h-3.5 mt-0.5" }) }));
};
//# sourceMappingURL=FilterButton.js.map