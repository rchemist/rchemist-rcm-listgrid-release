import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { isBlank } from '../../../utils/StringUtil';
import { IconCircleX, IconSearch } from "@tabler/icons-react";
export const QuickSearchInput = ({ search, setSearch, onQuickSearch, quickSearchEnabled, quickSearchLabel, loading }) => {
    if (!quickSearchEnabled)
        return _jsx("div", { children: "\u00A0" });
    return (_jsxs("div", { className: "rcm-quick-search-wrap", children: [_jsx("input", { type: "text", id: "quick-search", className: "rcm-input rcm-quick-search-input", placeholder: `Search ${quickSearchLabel}`, value: search, readOnly: !quickSearchEnabled, disabled: loading || !quickSearchEnabled, onChange: (e) => setSearch(e.target.value), onKeyUp: (e) => {
                    if (e.key === 'Enter')
                        onQuickSearch(search);
                } }), _jsx("div", { className: "rcm-quick-search-addon rcm-quick-search-addon-search", children: _jsx("button", { className: "rcm-quick-search-btn", onClick: () => {
                        if (!isBlank(search))
                            onQuickSearch(search);
                    }, children: _jsx(IconSearch, { className: "rcm-quick-search-icon", stroke: 1 }) }) }), !isBlank(search) && (_jsx("div", { className: "rcm-quick-search-addon rcm-quick-search-addon-clear", children: _jsx("button", { className: "rcm-quick-search-btn", onClick: () => {
                        setSearch('');
                        onQuickSearch('');
                    }, children: _jsx(IconCircleX, { className: "rcm-quick-search-icon", stroke: 1 }) }) }))] }));
};
//# sourceMappingURL=QuickSearchInput.js.map