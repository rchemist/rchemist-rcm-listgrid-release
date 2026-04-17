/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
'use client';
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { SearchBarActions } from "./ui/SearchBarActions";
import { QuickSearchInput } from "./ui/QuickSearchInput";
import { useQuickSearchBar } from "./hooks/useQuickSearchBar";
import { useListGridTheme } from "./context/ListGridThemeContext";
// == Main Component ==
export const QuickSearchBar = (props) => {
    const { loading, subCollection, onQuickSearch, showAdvancedSearch, } = props;
    const { search, setSearch, quickSearchEnabled, quickSearchLabel, handlePageSizeChange, filtered, searchEnabled, } = useQuickSearchBar(props);
    const { classNames: themeClasses } = useListGridTheme();
    if (!searchEnabled)
        return _jsx(_Fragment, {});
    return (_jsx(Transition, { appear: true, show: !showAdvancedSearch, as: Fragment, children: _jsx(Transition.Child, { as: Fragment, enter: "ease-out duration-500", enterFrom: "opacity-0", enterTo: "opacity-100 scale-100", leave: "ease-in duration-200", leaveFrom: "opacity-100 scale-100", leaveTo: "opacity-0", children: _jsx("div", { className: themeClasses.searchBar?.container ?? "flex flex-1 p-0 mb-2", children: _jsx("div", { className: themeClasses.searchBar?.innerWrapper ?? "w-full px-4", children: _jsxs("div", { className: themeClasses.searchBar?.layoutWrapper ?? "gap-2 md:flex md:items-center w-full md:justify-between", children: [_jsx(QuickSearchInput, { search: search, setSearch: setSearch, onQuickSearch: onQuickSearch, quickSearchEnabled: quickSearchEnabled, quickSearchLabel: quickSearchLabel, loading: loading }), _jsx(SearchBarActions, { ...props, searchForm: props.searchForm, handlePageSizeChange: handlePageSizeChange, searchEnabled: searchEnabled, filtered: filtered })] }) }) }) }) }));
};
//# sourceMappingURL=QuickSearchBar.js.map