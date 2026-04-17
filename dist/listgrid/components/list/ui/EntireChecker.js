import { jsx as _jsx } from "react/jsx-runtime";
import { isTrue } from '../../../utils/BooleanUtil';
import { v1 } from "uuid";
export const EntireChecker = ({ total, listIds, checkedItems, setCheckedItems, subCollection, selectionOptions, rows, showCheckboxInput }) => {
    // 선택 가능한 항목 필터링
    const selectableIds = selectionOptions?.selectableFilter && rows
        ? rows.filter(selectionOptions.selectableFilter).map((item) => item.id)
        : listIds;
    const checkAll = selectableIds.length > 0 && selectableIds.every((id) => checkedItems.includes(id));
    function checkAllItems() {
        if (!selectionOptions?.selectableFilter) {
            // 기존 로직
            if (checkedItems.length === 0) {
                setCheckedItems?.([...listIds]);
            }
            else {
                setCheckedItems?.([]);
            }
        }
        else {
            // selectableFilter가 있을 때
            if (checkAll) {
                // 선택 가능한 항목들을 제거
                const newCheckedItems = checkedItems.filter((id) => !selectableIds.includes(id));
                setCheckedItems?.(newCheckedItems);
            }
            else {
                // 선택 가능한 항목들을 추가
                const newCheckedItems = [...new Set([...checkedItems, ...selectableIds])];
                setCheckedItems?.(newCheckedItems);
            }
        }
        // 선택 변경 콜백
        if (selectionOptions?.onSelectionChange) {
            selectionOptions.onSelectionChange(checkedItems, rows || []);
        }
    }
    if (total < 1)
        return null;
    const id = isTrue(subCollection) ? v1() : 'entire-checker';
    // showCheckboxInput이 false면 체크박스 없이 '#' 표시
    if (!showCheckboxInput) {
        return _jsx("div", { className: "text-center font-medium", children: "#" });
    }
    return _jsx("input", { type: "checkbox", "aria-label": "\uC804\uCCB4 \uC120\uD0DD", className: "form-checkbox", id: id, checked: checkAll, onChange: () => checkAllItems() });
};
//# sourceMappingURL=EntireChecker.js.map