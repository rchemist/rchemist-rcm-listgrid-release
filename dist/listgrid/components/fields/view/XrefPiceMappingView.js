/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ALWAYS, NO_FILTER_SORT_ON_LIST } from '../../../config/Config';
import { EntityForm } from '../../../config/EntityForm';
import { useEffect, useState } from "react";
import { Paper } from "../../../ui";
import { LoadingOverlay } from "../../../ui";
import { useModalManagerStore } from '../../../store';
import { ViewListGrid } from '../../list/ViewListGrid';
import { ListGrid } from '../../../config/ListGrid';
import { SearchForm } from "../../../form/SearchForm";
import { isEmpty } from "../../../utils";
import { ManyToOneField } from '../ManyToOneField';
import { ViewEntityForm } from '../../form/ViewEntityForm';
import { isTrue } from '../../../utils/BooleanUtil';
import { BooleanField } from '../BooleanField';
import { EntityFormButton } from '../../../config/EntityFormButton';
import { NumberField } from '../NumberField';
import { generateUUID } from '../../../utils/simpleCrypt';
import { isBlank } from '../../../utils/StringUtil';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const PriceMappingEntityForm = (label, mapping) => {
    return new EntityForm(label, '')
        .addFields({
        items: [
            new ManyToOneField(mapping.name, 100, mapping.config).withLabel(mapping.label).withRequired(true),
            new NumberField('price', 200).withLabel('가격')
                .withHelpText(mapping.helpText)
                .withViewPreset(mapping.priceViewPreset)
                .withDefaultValue(false)
                .withListConfig(NO_FILTER_SORT_ON_LIST),
        ]
    });
};
export const XrefPriceMappingView = ({ entityForm, parentEntityForm, ...props }) => {
    const readonly = props.readonly ?? false;
    const priceViewPreset = ALWAYS;
    const label = props.label;
    let labelText;
    if (label) {
        if (typeof label === 'string') {
            labelText = label ?? '기본값';
        }
        else {
            labelText = '기본값';
        }
    }
    const { openModal, closeModal } = useModalManagerStore();
    const [value, setValue] = useState(props.value);
    const [listKey, setListKey] = useState('init');
    const [viewSearchForm, setViewSearchForm] = useState();
    const [idList, setIdList] = useState([]);
    const [error, setError] = useState();
    const MySwal = withReactContent(Swal);
    const mappingValue = {};
    const [filters, setFilters] = useState([]);
    if (value !== undefined) {
        mappingValue.mapped = value.mapped ?? [];
    }
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
    useEffect(() => {
        if (value.mapped === undefined || value.mapped.length === 0) {
            const newViewSearchForm = new SearchForm()
                .withShouldReturnEmpty(true);
            setViewSearchForm(newViewSearchForm);
            setListKey(new Date().getTime().toString());
            return;
        }
        for (const mapped of value.mapped) {
            if (!idList.includes(mapped.id)) {
                idList.push(mapped.id);
            }
        }
        setIdList([...idList]);
        setListKey(new Date().getTime().toString());
        const newViewSearchForm = viewSearchForm?.clone()
            .removeFilter('id')
            .withShouldReturnEmpty(false)
            .withFilter('AND', { name: 'id', values: idList, queryConditionType: "IN" });
        setViewSearchForm(newViewSearchForm);
    }, [value]);
    useEffect(() => {
        const viewSearchForm = new SearchForm().withPageSize(1000);
        const idList = [];
        if (mappingValue.mapped !== undefined && mappingValue.mapped.length > 0) {
            // 이미 매핑된 정보는 확인할 수 없게 한다.
            idList.push(...mappingValue.mapped.map((mapped) => mapped.id).filter(Boolean));
            // viewSearchForm 에서는 이미 매핑된 정보만 표시되도록 한다.
            viewSearchForm.withFilter('AND', { name: 'id', queryConditionType: 'IN', values: idList });
            viewSearchForm.withIgnoreCache(true);
        }
        else {
            // viewSearchForm 은 반드시 empty 를 리턴하게 한다.
            viewSearchForm.withShouldReturnEmpty(true);
        }
        setIdList(idList);
        setViewSearchForm(viewSearchForm);
    }, [props.value]);
    if (filters.length > 0) {
        viewSearchForm?.withFilter('AND', ...filters);
    }
    if (viewSearchForm === undefined) {
        return _jsx("div", { className: 'relative', children: _jsxs("div", { className: `panel p-4 flex-1 gap-2.5 mt-5 border dark:border-[#17263c] rounded-xl shadow-none space-y-2`, children: [_jsx(LoadingOverlay, { visible: true }), _jsx("div", { className: 'w-full h-[400px]' })] }) });
    }
    const xrefEntityForm = PriceMappingEntityForm(labelText, {
        config: {
            entityForm: entityForm,
            filter: isEmpty(idList) ? [(entityForm) => {
                    const filterItems = [];
                    if (filters.length > 0) {
                        filterItems.push(...filters);
                    }
                    filterItems.push({ name: 'id', queryConditionType: 'NOT_NULL' });
                    return Promise.resolve(filterItems);
                }] : [(entityForm) => {
                    const filterItems = [];
                    if (filters.length > 0) {
                        filterItems.push(...filters);
                    }
                    filterItems.push({ name: 'id', queryConditionType: 'NOT_IN', values: idList });
                    return Promise.resolve(filterItems);
                }],
        },
        name: 'mapping',
        label: labelText,
        helpText: props.priceHelpText ?? '가격을 재설정할 수 있습니다.',
        exceptId: idList,
        priceViewPreset: priceViewPreset
    })
        .withOnChanges(async (entityForm, name) => {
        if (name === 'mapping') {
            const mappingValue = await entityForm.getValue('mapping');
            await props.initPrice(entityForm, mappingValue);
            entityForm.withShouldReload(true);
        }
        return entityForm;
    })
        .withOnSave(async (entityForm) => {
        const form = entityForm.clone(true);
        const fieldErrors = await entityForm.validate();
        if (!isEmpty(fieldErrors)) {
            return { entityForm: form.withErrors(fieldErrors), errors: ['입력 값이 올바르지 않습니다.'] };
        }
        const formData = await form.getSubmitFormData();
        const target = formData.data['mappingId'];
        if (!isEmpty(mappingValue.mapped)) {
            let duplicated = false;
            for (const item of mappingValue.mapped) {
                if (item.id === target) {
                    // 같은 값이 있으면 오류로 인식한다.
                    duplicated = true;
                    break;
                }
            }
            if (duplicated) {
                // 에러를 내야 한다.
                return {
                    entityForm: form.withErrors([{
                            name: 'mapping',
                            label: labelText,
                            errors: ['이미 등록된 정보입니다.']
                        }]), errors: ['이미 등록된 정보입니다.']
                };
            }
        }
        const price = await entityForm.getValue('price');
        mappingValue.mapped = mappingValue.mapped ?? [];
        let duplicated = false;
        for (const item of mappingValue.mapped) {
            if (item.id === target) {
                item.price = price;
                duplicated = true;
                break;
            }
        }
        if (!duplicated) {
            mappingValue.mapped.push({ id: target, price: price });
        }
        setValue({ ...mappingValue });
        setListKey(generateUUID());
        props.onChange({ ...mappingValue });
        return Promise.resolve({ entityForm });
    });
    return _jsxs("div", { className: 'w-full', children: [_jsx(ViewListGrid, { listGrid: new ListGrid(entityForm).withSearchForm(viewSearchForm), options: {
                    hideTitle: true,
                    filterable: false,
                    sortable: false,
                    onSelect: (item) => {
                        MySwal.fire({
                            title: '계약 메뉴는 수정할 수 없습니다. 가격을 변경하려면 메뉴를 제거하고 다시 등록해 주세요.',
                            toast: true,
                            position: 'bottom-end',
                            showConfirmButton: false,
                            timer: 3000,
                            showCloseButton: true,
                            customClass: {
                                popup: `color-danger`,
                            },
                        });
                        // View 를 지원하지 않는다.
                        return;
                    },
                    fields: [
                        new BooleanField('price', 10000).withLabel(`${labelText} 최종 가격`).withSortable(false).withFilterable(false)
                    ],
                    onFetched: async (result) => {
                        // 필드의 값을 추가한다.
                        if (mappingValue.mapped && mappingValue.mapped.length > 0) {
                            result.list.forEach((item) => {
                                for (const mapped of mappingValue.mapped) {
                                    if (item['id'] === mapped.id) {
                                        item['price'] = mapped.price;
                                    }
                                }
                            });
                        }
                        return result;
                    },
                    delete: {
                        onDelete: async (_entityForm, _rows, checkedItems) => {
                            if (!isEmpty(checkedItems)) {
                                onDelete(checkedItems);
                            }
                            return Promise.resolve({ entityForm: _entityForm });
                        }
                    },
                    subCollection: {
                        add: false, delete: true,
                        modifyOnView: false,
                        buttons: [
                            () => _jsx("button", { type: "button", className: `btn btn-outline-secondary h-[34px]`, disabled: readonly, onClick: () => {
                                    handleOpenModal();
                                }, children: "\uBD88\uB7EC\uC624\uAE30" })
                        ]
                    }
                } }, listKey), !isBlank(error) && _jsx(_Fragment, {})] });
    function onDelete(checkedItems) {
        if (mappingValue.mapped === undefined) {
            mappingValue.mapped = [];
        }
        const newIdList = [...idList];
        for (const id of checkedItems) {
            const index = mappingValue.mapped.findIndex((mapped) => mapped.id === id);
            if (index > -1) {
                mappingValue.mapped.splice(index, 1);
            }
            const idIndex = newIdList.indexOf(id);
            if (idIndex > -1) {
                newIdList.splice(idIndex, 1);
            }
        }
        if (mappingValue.mapped.length > 0) {
            let found = false;
            for (const item of mappingValue.mapped) {
                if (isTrue(item.price)) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                mappingValue.mapped[0].price = undefined;
            }
        }
        setIdList(newIdList);
        setValue({ ...mappingValue });
        props.onChange(mappingValue, false);
    }
    function handleOpenModal() {
        const modalId = `xref-price-mapping-${props.name}`;
        openModal({
            modalId,
            title: String(label || '기본값'),
            size: '5xl',
            content: (_jsx(Paper, { children: _jsx(ViewEntityForm, { entityForm: xrefEntityForm, buttons: [
                        new EntityFormButton('list')
                            .withLabel('닫기')
                            .withClassName('btn btn-outline-primary gap-2')
                            .withOnClick(async (props) => {
                            closeModal(modalId);
                            return props.entityForm;
                        })
                    ], postSave: async (entityForm) => {
                        closeModal(modalId);
                        return entityForm;
                    } }) }, listKey)),
        });
    }
};
//# sourceMappingURL=XrefPiceMappingView.js.map