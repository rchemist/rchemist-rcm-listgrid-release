'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo } from 'react';
import { Indicator } from '../../../ui';
import { Tooltip } from '../../../ui';
import { SelectBox } from '../../../ui';
import { getTranslation } from '../../../utils/i18n';
import { ViewFieldSelector } from '../ViewFieldSelector';
import { useListGridTheme } from '../context/ListGridThemeContext';
/** 페이지 사이즈 옵션 정의 */
const PAGE_SIZE_OPTIONS = [
    { labelKey: 'common.pageSize.20', value: '20' },
    { labelKey: 'common.pageSize.50', value: '50' },
    { labelKey: 'common.pageSize.100', value: '100' },
];
const DEFAULT_PAGE_SIZE_VALUE = PAGE_SIZE_OPTIONS[0].value;
export const SearchBarActions = (props) => {
    const { hidePageSize, searchForm, handlePageSizeChange, enableHandleData, viewFields, setViewFields, listFields, loading, entityUrl, subCollectionName, searchEnabled, subCollection, filtered, onOpenAdvancedSearch, hideAdvancedSearch, } = props;
    const { t } = getTranslation();
    const { classNames: themeClasses, cn } = useListGridTheme();
    const containerClass = cn('rcm-search-bar-actions', themeClasses.searchBarActions?.container);
    // 서브콜렉션에서는 페이지 사이즈 선택만 숨김
    const showPageSize = !hidePageSize && !subCollection;
    // i18n 적용된 옵션 목록
    const pageSizeOptions = useMemo(() => PAGE_SIZE_OPTIONS.map((opt) => ({
        label: t(opt.labelKey),
        value: opt.value,
    })), [t]);
    // 현재 페이지 사이즈 값
    const currentPageSize = `${searchForm.getPageSize() ?? DEFAULT_PAGE_SIZE_VALUE}`;
    // 현재 값이 옵션에 없으면 첫 번째 옵션으로 강제 변경
    const isValidOption = PAGE_SIZE_OPTIONS.some((opt) => opt.value === currentPageSize);
    useEffect(() => {
        if (showPageSize && !isValidOption) {
            handlePageSizeChange(DEFAULT_PAGE_SIZE_VALUE);
        }
    }, [showPageSize, isValidOption, handlePageSizeChange]);
    return (_jsxs("div", { className: containerClass, children: [showPageSize && (_jsx("div", { className: "rcm-search-bar-pagesize", children: _jsx("div", { className: "rcm-search-bar-pagesize-select", children: _jsx(SelectBox, { required: true, name: `pageSizeSelector`, options: pageSizeOptions, value: isValidOption ? currentPageSize : DEFAULT_PAGE_SIZE_VALUE, onChange: handlePageSizeChange, menuPortalTarget: typeof document !== 'undefined' ? document.body : undefined }) }) })), enableHandleData && (_jsx("div", { className: subCollection ? '' : 'rcm-hide-below-sm', children: _jsx(ViewFieldSelector, { viewFields: viewFields, ...(setViewFields !== undefined ? { setViewFields } : {}), fields: listFields, disabled: loading, entityUrl: entityUrl, ...(subCollectionName !== undefined ? { subCollectionName } : {}) }) })), !hideAdvancedSearch && (_jsx(Tooltip, { label: `${searchEnabled ? '통합 검색' : '통합 검색을 지원하지 않습니다.'}`, children: filtered ? (_jsx(Indicator, { color: "red", processing: true, children: _jsx("button", { className: 'rcm-button rcm-search-bar-submit', "data-variant": "primary", disabled: loading || !searchEnabled, onClick: () => onOpenAdvancedSearch?.(), children: "\uD1B5\uD569 \uAC80\uC0C9" }) })) : (_jsx("button", { className: 'rcm-button rcm-search-bar-submit', "data-variant": "primary", disabled: loading || !searchEnabled, onClick: () => onOpenAdvancedSearch?.(), children: "\uD1B5\uD569 \uAC80\uC0C9" })) }))] }));
};
//# sourceMappingURL=SearchBarActions.js.map