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
            content: (_jsx("div", { className: "rcm-modal-content-scroll", children: config.tree ? (_jsx(TreeSelectView, { entityForm: entityForm, tree: config.tree, onSelect: (item) => {
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
    return (_jsxs("div", { className: "rcm-m2o-multi-wrap", children: [_jsxs("div", { className: "rcm-m2o-multi-chips", children: [selectedItems.map((item) => (_jsxs("div", { className: "rcm-m2o-multi-chip", children: [_jsx("span", { className: "rcm-m2o-multi-chip-label", children: item.name }), _jsx("button", { type: "button", onClick: () => handleRemoveItem(item.id), className: "rcm-m2o-multi-chip-remove", children: _jsx(IconX, { className: "rcm-m2o-multi-chip-remove-icon" }) })] }, item.id))), _jsxs("button", { type: "button", onClick: handleSelectModal, className: "rcm-m2o-multi-add", children: [_jsx(IconPlus, { className: "rcm-m2o-multi-add-icon" }), _jsx("span", { children: "\uCD94\uAC00" })] })] }), selectedItems.length === 0 && (_jsxs("p", { className: "rcm-m2o-multi-helper", children: ["\uCD94\uAC00 \uBC84\uD2BC\uC744 \uD074\uB9AD\uD558\uC5EC ", label ?? name, "\uC744(\uB97C) \uC120\uD0DD\uD558\uC138\uC694. \uC5EC\uB7EC \uAC1C\uB97C \uC120\uD0DD\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] }))] }));
};
//# sourceMappingURL=ManyToOneMultiFilterView.js.map