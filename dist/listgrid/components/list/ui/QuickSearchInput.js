import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { isBlank } from '../../../utils/StringUtil';
import { IconCircleX, IconSearch } from "@tabler/icons-react";
export const QuickSearchInput = ({ search, setSearch, onQuickSearch, quickSearchEnabled, quickSearchLabel, loading }) => {
    if (!quickSearchEnabled)
        return _jsx("div", { children: "\u00A0" });
    return (_jsxs("div", { className: 'flex w-full max-w-full', children: [_jsx("input", { type: "text", id: "quick-search", className: "form-input peer form-input !pr-10 focus:!border-white-light py-3 max-w-[300px] min-w-[300px] disabled:pointer-events-none disabled:bg-[#f9f9f9] dark:disabled:bg-[#1b2e4b] placeholder:text-gray-400 dark:placeholder:text-gray-500 font-normal border-gray-300 dark:border-gray-600 dark:bg-gray-800", placeholder: `Search ${quickSearchLabel}`, value: search, readOnly: !quickSearchEnabled, disabled: loading || !quickSearchEnabled, onChange: (e) => setSearch(e.target.value), onKeyUp: (e) => {
                    if (e.key === 'Enter')
                        onQuickSearch(search);
                } }), _jsx("div", { className: "flex items-center justify-center dark:border-[#17263c] text-danger h-[40px] font-semibold -ml-8", children: _jsx("button", { className: 'flex min-h-[24px] min-w-[24px] items-center justify-center', onClick: () => {
                        if (!isBlank(search))
                            onQuickSearch(search);
                    }, children: _jsx(IconSearch, { className: 'w-3.5 h-3.5 text-gray-900 dark:text-gray-100', stroke: 1 }) }) }), !isBlank(search) && (_jsx("div", { className: "flex items-center justify-center dark:border-[#17263c] text-danger h-[40px] font-semibold -ml-11", children: _jsx("button", { className: 'flex min-h-[24px] min-w-[24px] items-center justify-center', onClick: () => {
                        setSearch('');
                        onQuickSearch('');
                    }, children: _jsx(IconCircleX, { className: 'w-3.5 h-3.5 text-gray-900 dark:text-gray-100', stroke: 1 }) }) }))] }));
};
//# sourceMappingURL=QuickSearchInput.js.map