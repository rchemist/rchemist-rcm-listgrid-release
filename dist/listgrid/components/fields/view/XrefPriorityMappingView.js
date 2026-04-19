'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Paper } from '../../../ui';
import { ViewListGrid } from '../../list/ViewListGrid';
import { ListGrid } from '../../../config/ListGrid';
import { SearchForm } from '../../../form/SearchForm';
import { isEmpty } from '../../../utils';
import { isTrue } from '../../../utils/BooleanUtil';
import { useModalManagerStore } from '../../../store';
export const XrefPriorityMappingView = ({ entityForm, excludeId, add, parentEntityForm, ...props }) => {
    const readonly = props.readonly ?? false;
    const label = props.label;
    const { openModal, closeModal } = useModalManagerStore();
    const [value, setValue] = useState(props.value);
    const [listKey, setListKey] = useState('init');
    const mappingValue = {};
    if (value !== undefined) {
        mappingValue.mapped = value.mapped ?? [];
    }
    const [filters, setFilters] = useState([]);
    useEffect(() => {
        if (props.filters) {
            (async () => {
                if (typeof props.filters === 'function') {
                    const filters = await props.filters(entityForm, parentEntityForm);
                    setFilters(filters);
                }
                else {
                    setFilters(props.filters ?? []);
                }
            })();
        }
    }, [props.filters]);
    // Lookup 으로 찾기를 실행했을 때 표시할 그리드
    const searchForm = new SearchForm();
    if (excludeId) {
        // excludeId 값이 있다면 해당 조건을 추가한다.
        searchForm.withFilter('AND', { name: 'id', queryConditionType: 'NOT_EQUAL', value: excludeId });
    }
    // 현재 매핑된 정보만 표시하는 서치폼
    const viewSearchForm = new SearchForm().withPageSize(1000);
    if (mappingValue.mapped !== undefined && mappingValue.mapped.length > 0) {
        // 이미 매핑된 정보는 확인할 수 없게 한다.
        const idList = mappingValue.mapped.map((m) => m.id);
        searchForm.withFilter('AND', { name: 'id', queryConditionType: 'NOT_IN', values: idList });
        // viewSearchForm 에서는 이미 매핑된 정보만 표시되도록 한다.
        viewSearchForm.withFilter('AND', { name: 'id', queryConditionType: 'IN', values: idList });
    }
    else {
        // viewSearchForm 은 반드시 empty 를 리턴하게 한다.
        viewSearchForm.withShouldReturnEmpty(true);
    }
    if (filters.length > 0) {
        searchForm.withFilter('AND', ...filters);
        viewSearchForm.withFilter('AND', ...filters);
    }
    return (_jsx("div", { className: 'w-full', children: _jsx(ViewListGrid, { listGrid: new ListGrid(entityForm).withSearchForm(viewSearchForm), options: {
                hideTitle: true,
                filterable: false,
                sortable: false,
                onFetched: async (pageResult) => {
                    if (!isEmpty(pageResult.list)) {
                        // mappingValue 의 순서대로 결과를 재정렬한다.
                        const newList = [];
                        mappingValue.mapped?.forEach((mapped) => {
                            for (const item of pageResult.list) {
                                if (mapped.id === item.id) {
                                    newList.push(item);
                                    break;
                                }
                            }
                        });
                        pageResult.list = newList;
                    }
                    return pageResult;
                },
                onDrag: (idList) => {
                    if (!isEmpty(idList)) {
                        const newValue = { mapped: value.mapped };
                        // how to sort mapped.id === idList[index]
                        newValue.mapped = newValue.mapped?.sort((a, b) => {
                            const aIndex = idList.indexOf(a.id);
                            const bIndex = idList.indexOf(b.id);
                            return aIndex - bIndex;
                            // return a.priority - b.priority;
                        });
                        newValue.mapped?.forEach((m, index) => {
                            m.priority = index + 1;
                        });
                        setValue(newValue);
                        props.onChange(newValue, false);
                    }
                },
                delete: {
                    onDelete: async (_entityForm, _rows, checkedItems) => {
                        if (!isEmpty(checkedItems)) {
                            onDelete(checkedItems);
                        }
                        return Promise.resolve({ entityForm: _entityForm });
                    },
                },
                subCollection: {
                    add: readonly ? false : isTrue(add),
                    delete: !readonly,
                    modifyOnView: false,
                    buttons: [
                        () => readonly ? null : (_jsx("button", { type: "button", className: `btn btn-outline-secondary h-[34px]`, disabled: readonly, onClick: () => {
                                const modalId = `xref-priority-mapping-${props.name}`;
                                openModal({
                                    modalId,
                                    title: String(label || '선택'),
                                    size: '2xl',
                                    content: (_jsx(Paper, { children: _jsx(ViewListGrid, { listGrid: new ListGrid(entityForm).withSearchForm(searchForm), options: {
                                                readonly: true,
                                                popup: true,
                                                hideTitle: true,
                                                onSelect: (item) => {
                                                    // Single row click: add one item and close modal
                                                    onChange(item.id);
                                                    closeModal(modalId);
                                                },
                                                selection: {
                                                    enabled: true,
                                                    actions: [
                                                        {
                                                            label: '선택 완료',
                                                            onClick: async (_entityForm, checkedItems) => {
                                                                onChangeMultiple(checkedItems);
                                                                closeModal(modalId);
                                                            },
                                                            color: 'primary',
                                                        },
                                                    ],
                                                    deleteButton: false,
                                                },
                                            } }) })),
                                });
                            }, children: "\uC120\uD0DD" })),
                    ],
                },
            } }, listKey) }));
    function onChange(id) {
        if (mappingValue.mapped === undefined) {
            mappingValue.mapped = [];
        }
        mappingValue.mapped = mappingValue.mapped.filter((x) => x.id !== id);
        const newPriority = mappingValue.mapped.length + 1;
        mappingValue.mapped = [...mappingValue.mapped, { id: id, priority: newPriority }];
        setValue({ ...mappingValue });
        setListKey(new Date().getTime().toString());
        props.onChange(mappingValue, false);
    }
    function onChangeMultiple(ids) {
        if (mappingValue.mapped === undefined) {
            mappingValue.mapped = [];
        }
        for (const id of ids) {
            mappingValue.mapped = mappingValue.mapped.filter((x) => x.id !== id);
            const newPriority = mappingValue.mapped.length + 1;
            mappingValue.mapped = [...mappingValue.mapped, { id: id, priority: newPriority }];
        }
        setValue({ ...mappingValue });
        setListKey(new Date().getTime().toString());
        props.onChange(mappingValue, false);
    }
    function onDelete(idList) {
        if (mappingValue.mapped === undefined) {
            mappingValue.mapped = [];
        }
        mappingValue.mapped = mappingValue.mapped.filter((x) => !idList.includes(x.id));
        // priority 재설정
        mappingValue.mapped.forEach((m, index) => {
            m.priority = index + 1;
        });
        setValue({ ...mappingValue });
        setListKey(new Date().getTime().toString());
        props.onChange(mappingValue, false);
    }
};
//# sourceMappingURL=XrefPriorityMappingView.js.map