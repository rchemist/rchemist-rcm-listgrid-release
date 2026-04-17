'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { IconPlus, IconX } from "@tabler/icons-react";
import { ViewListGrid } from '../../list/ViewListGrid';
import { ListGrid } from '../../../config/ListGrid';
import { TreeSelectView } from './TreeSelectView';
import { SearchForm } from "../../../form/SearchForm";
import { useModalManagerStore } from '../../../store';
export const ManyToOneMultiFilterView = ({ name, label, config, parentEntityForm, value, onChange, }) => {
    const { openModal, closeModal } = useModalManagerStore();
    const entityForm = config.entityForm;
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchForm, setSearchForm] = useState();
    const [mount, setMount] = useState(false);
    // Initialize selected items from value (array of IDs)
    useEffect(() => {
        (async () => {
            if (value && Array.isArray(value) && value.length > 0) {
                const items = [];
                for (const id of value) {
                    try {
                        const fetchEntityForm = entityForm.clone(true);
                        fetchEntityForm.id = id;
                        const response = await fetchEntityForm.fetchData();
                        const data = response.data.data;
                        if (data) {
                            const displayName = await getDisplayName(data);
                            items.push({
                                id: id,
                                name: displayName,
                                data: data
                            });
                        }
                    }
                    catch (e) {
                        // If fetch fails, still add with ID as name
                        items.push({
                            id: id,
                            name: id,
                            data: { id }
                        });
                    }
                }
                setSelectedItems(items);
            }
            else {
                setSelectedItems([]);
            }
            // Initialize search form with filters
            const filter = config.filter ?? [];
            const newSearchForm = SearchForm.create();
            if (filter.length > 0) {
                for (const filterItem of filter) {
                    if (filterItem) {
                        newSearchForm.withFilter("AND", ...(await filterItem(parentEntityForm)));
                    }
                }
                if (entityForm.neverDelete) {
                    newSearchForm.handleAndFilter("active", "true");
                }
            }
            setSearchForm(newSearchForm);
            setMount(true);
        })();
    }, [value]);
    const getDisplayName = async (data) => {
        if (config.displayFunc) {
            return await config.displayFunc(data);
        }
        if (config.field?.name) {
            if (config.field.name instanceof Function) {
                return config.field.name(data);
            }
            return data[config.field.name] ?? '';
        }
        return data.name ?? data.id ?? '';
    };
    const handleAddItem = (item) => {
        const idField = config.field?.id ?? 'id';
        const itemId = item[idField];
        // Check if already selected
        if (selectedItems.some(selected => selected.id === itemId)) {
            return;
        }
        (async () => {
            const displayName = await getDisplayName(item);
            const newItems = [...selectedItems, {
                    id: itemId,
                    name: displayName,
                    data: item
                }];
            setSelectedItems(newItems);
            onChange(newItems.map(i => i.id));
        })();
    };
    const handleRemoveItem = (itemId) => {
        const newItems = selectedItems.filter(item => item.id !== itemId);
        setSelectedItems(newItems);
        onChange(newItems.map(i => i.id));
    };
    const handleSelectModal = () => {
        const modalId = `manytoone-multi-select-${name}`;
        // Clone searchForm and exclude already selected items
        const modalSearchForm = searchForm?.clone() ?? SearchForm.create();
        const idField = config.field?.id ?? 'id';
        // Add NOT_IN filter to exclude already selected items
        if (selectedItems.length > 0) {
            const selectedIds = selectedItems.map(item => item.id);
            modalSearchForm.handleAndFilter(idField, selectedIds, 'NOT_IN');
        }
        openModal({
            modalId,
            title: `${label ?? name} 선택`,
            size: '5xl',
            content: (_jsx("div", { className: "modal-content flex max-h-[90vh] flex-col overflow-hidden", children: config.tree ? (_jsx(TreeSelectView, { entityForm: entityForm, tree: config.tree, onSelect: (item) => {
                        handleAddItem(item);
                        closeModal(modalId);
                    } })) : (_jsx(ViewListGrid, { listGrid: new ListGrid(entityForm).withSearchForm(modalSearchForm), options: {
                        popup: true,
                        filterable: config.filterable,
                        readonly: true,
                        selection: {
                            enabled: false,
                        },
                        manyToOne: {
                            onSelect: (item) => {
                                handleAddItem(item);
                                closeModal(modalId);
                            },
                        },
                    } })) }))
        });
    };
    if (!mount) {
        return null;
    }
    return (_jsxs("div", { className: "flex flex-col gap-2 w-full", children: [_jsxs("div", { className: "flex flex-wrap gap-1.5 min-h-[32px]", children: [selectedItems.map((item) => (_jsxs("div", { className: "inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20", children: [_jsx("span", { className: "max-w-[150px] truncate", children: item.name }), _jsx("button", { type: "button", onClick: () => handleRemoveItem(item.id), className: "flex items-center justify-center w-4 h-4 rounded-full hover:bg-primary/20 transition-colors", children: _jsx(IconX, { className: "w-3 h-3" }) })] }, item.id))), _jsxs("button", { type: "button", onClick: handleSelectModal, className: "inline-flex items-center gap-1 px-2.5 py-1 border border-dashed border-gray-300 dark:border-gray-600 rounded-full text-sm text-gray-500 dark:text-gray-400 hover:border-primary hover:text-primary transition-colors", children: [_jsx(IconPlus, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "\uCD94\uAC00" })] })] }), selectedItems.length === 0 && (_jsxs("p", { className: "text-xs text-gray-400", children: ["\uCD94\uAC00 \uBC84\uD2BC\uC744 \uD074\uB9AD\uD558\uC5EC ", label ?? name, "\uC744(\uB97C) \uC120\uD0DD\uD558\uC138\uC694. \uC5EC\uB7EC \uAC1C\uB97C \uC120\uD0DD\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] }))] }));
};
//# sourceMappingURL=ManyToOneMultiFilterView.js.map