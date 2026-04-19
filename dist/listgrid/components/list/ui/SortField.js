import { jsx as _jsx } from "react/jsx-runtime";
// import {SearchFormState} from '../state/State';
import { IconSortAscendingLetters, IconSortDescending, IconSortDescendingLetters, } from '@tabler/icons-react';
export const SortField = ({ name, searchForm, onChangeSearchForm }) => {
    const sorts = searchForm.getSorts();
    const sorted = sorts.has(name);
    let direction = undefined;
    if (sorted) {
        // 이미 정렬 되어 있음
        direction = sorts.get(name);
    }
    function changeSort() {
        const nextDirection = getNextDirection();
        const newSearchForm = searchForm.clone().withSort(name, nextDirection);
        onChangeSearchForm(newSearchForm);
    }
    function getNextDirection() {
        if (direction === undefined) {
            return 'DESC';
        }
        else if (direction === 'DESC') {
            return 'ASC';
        }
        else {
            return undefined;
        }
    }
    const icon = () => {
        if (direction === undefined) {
            return _jsx(IconSortDescending, { className: `w-3.5` });
        }
        else if (direction === 'ASC') {
            return _jsx(IconSortDescendingLetters, { className: `w-3.5 text-primary` });
        }
        else {
            return _jsx(IconSortAscendingLetters, { className: `w-3.5 text-primary` });
        }
    };
    return (_jsx("button", { onClick: () => {
            changeSort();
        }, children: icon() }));
};
//# sourceMappingURL=SortField.js.map