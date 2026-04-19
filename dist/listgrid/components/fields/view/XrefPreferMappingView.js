'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { ALWAYS, MODIFY_ONLY, NO_FILTER_SORT_ON_LIST, } from '../../../config/Config';
import { EntityForm } from '../../../config/EntityForm';
import { useEffect, useState } from 'react';
import { Paper } from '../../../ui';
import { useModalManagerStore } from '../../../store';
import { ViewListGrid } from '../../list/ViewListGrid';
import { ListGrid } from '../../../config/ListGrid';
import { SearchForm } from '../../../form/SearchForm';
import { isEmpty } from '../../../utils';
import { ManyToOneField } from '../ManyToOneField';
import { ViewEntityForm } from '../../form/ViewEntityForm';
import { isTrue } from '../../../utils/BooleanUtil';
import { BooleanField } from '../BooleanField';
import { EntityFormButton } from '../../../config/EntityFormButton';
import { ShowNotifications } from '../../helper/ShowNotifications';
import { isBlank } from '../../../utils/StringUtil';
const PreferredMappingEntityForm = (mapping) => {
    return new EntityForm(mapping.label, '').addFields({
        items: [
            new ManyToOneField(mapping.name, 100, mapping.config)
                .withLabel(mapping.label)
                .withRequired(true),
            new BooleanField('preferred', 200)
                .withLabel(mapping.preferredLabel ?? '기본값')
                .withViewPreset(mapping.preferredViewPreset)
                .withDefaultValue(false)
                .withListConfig(NO_FILTER_SORT_ON_LIST),
        ],
    });
};
export const XrefPreferMappingView = ({ entityForm, ...props }) => {
    const readonly = props.readonly ?? false;
    const preferredViewPreset = isTrue(props.showPreferred, true) ? ALWAYS : MODIFY_ONLY;
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
    const [onEditEntityForm, setOnEditEntityForm] = useState();
    const [notification, setNotification] = useState('');
    const mappingValue = {};
    const [filters, setFilters] = useState([]);
    useEffect(() => {
        if (props.filters) {
            (async () => {
                if (typeof props.filters === 'function') {
                    const filters = await props.filters(entityForm, props.parentEntityForm);
                    setFilters(filters);
                }
                else {
                    setFilters(props.filters ?? []);
                }
            })();
        }
    }, [props.filters]);
    function setValueAndReload(val) {
        setValue(val);
        setOnEditEntityForm(undefined);
        setListKey(new Date().getTime().toString());
        setNotification('저장 버튼을 눌러야 실제 데이터에 반영됩니다.');
        props.onChange(val, false);
    }
    if (value !== undefined) {
        mappingValue.mapped = value.mapped ?? [];
    }
    const idList = [];
    const viewSearchForm = new SearchForm().withPageSize(1000);
    if (mappingValue.mapped !== undefined && mappingValue.mapped.length > 0) {
        // 이미 매핑된 정보는 확인할 수 없게 한다.
        idList.push(...mappingValue.mapped.map((mapped) => mapped.id).filter(Boolean));
        // viewSearchForm 에서는 이미 매핑된 정보만 표시되도록 한다.
        viewSearchForm.withFilter('AND', { name: 'id', queryConditionType: 'IN', values: idList });
    }
    else {
        // viewSearchForm 은 반드시 empty 를 리턴하게 한다.
        viewSearchForm.withShouldReturnEmpty(true);
    }
    if (filters.length > 0) {
        viewSearchForm.withFilter('AND', ...filters);
    }
    const xrefFilter = isEmpty(idList) && filters.length === 0
        ? undefined
        : [
            (entityForm) => {
                const filterItems = [];
                if (!isEmpty(idList)) {
                    filterItems.push({ name: 'id', queryConditionType: 'NOT_IN', values: idList });
                }
                if (filters.length > 0) {
                    filterItems.push(...filters);
                }
                return Promise.resolve(filterItems);
            },
        ];
    const xrefEntityForm = PreferredMappingEntityForm({
        value: mappingValue.mapped,
        config: {
            entityForm: entityForm,
            ...(xrefFilter !== undefined ? { filter: xrefFilter } : {}),
        },
        name: 'mapping',
        label: labelText,
        exceptId: idList,
        preferredViewPreset: preferredViewPreset,
    }).withOnSave(async (entityForm) => {
        const form = entityForm.clone(true);
        const fieldErrors = await entityForm.validate();
        if (!isEmpty(fieldErrors)) {
            return { entityForm: form.withErrors(fieldErrors), errors: ['입력 값이 올바르지 않습니다.'] };
        }
        const formData = await form.getSubmitFormData();
        const target = formData.data['mapping'];
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
                    entityForm: form.withErrors([
                        {
                            name: 'mapping',
                            label: labelText,
                            errors: ['이미 등록된 정보입니다.'],
                        },
                    ]),
                    errors: ['이미 등록된 정보입니다.'],
                };
            }
        }
        const preferred = await entityForm.getValue('preferred');
        mappingValue.mapped = mappingValue.mapped ?? [];
        mappingValue.mapped.push({ id: target, preferred: isTrue(preferred) });
        if (mappingValue.mapped.length > 0) {
            // preferred 가 무조건 단 하나는 있어야 한다.
            let found = false;
            for (const item of mappingValue.mapped) {
                if (item.id === target) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                mappingValue.mapped[0].preferred = true;
            }
        }
        return Promise.resolve({ entityForm });
    });
    return (_jsxs("div", { className: 'w-full', children: [!isBlank(notification) && (_jsx(ShowNotifications, { messages: [notification], color: 'info', showClose: true })), _jsx(ViewListGrid, { listGrid: new ListGrid(entityForm).withSearchForm(viewSearchForm), options: {
                    hideTitle: true,
                    filterable: false,
                    sortable: false,
                    onSelect: (item) => {
                        const id = item['id'];
                        xrefEntityForm.setValue('id', id);
                        xrefEntityForm.setValue('preferred', [item['preferred']]);
                        setOnEditEntityForm(xrefEntityForm);
                        handleOpenModal(xrefEntityForm);
                    },
                    fields: [
                        new BooleanField('preferred', 10000)
                            .withLabel(`기본 ${labelText}`)
                            .withSortable(false)
                            .withFilterable(false),
                    ],
                    onFetched: async (result) => {
                        // 필드의 값을 추가한다.
                        if (mappingValue.mapped && mappingValue.mapped.length > 0) {
                            result.list.forEach((item) => {
                                for (const mapped of mappingValue.mapped) {
                                    if (item['id'] === mapped.id) {
                                        item['preferred'] = mapped.preferred;
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
                        },
                    },
                    subCollection: {
                        add: false,
                        delete: true,
                        modifyOnView: false,
                        buttons: [
                            () => (_jsx("button", { type: "button", className: `btn btn-outline-secondary`, disabled: readonly, onClick: () => {
                                    handleOpenModal();
                                }, children: "\uBD88\uB7EC\uC624\uAE30" })),
                        ],
                    },
                } }, listKey)] }));
    function onDelete(idList) {
        if (mappingValue.mapped === undefined) {
            mappingValue.mapped = [];
        }
        mappingValue.mapped = mappingValue.mapped.filter((x) => !idList.includes(x.id));
        if (mappingValue.mapped.length > 0) {
            let found = false;
            for (const item of mappingValue.mapped) {
                if (isTrue(item.preferred)) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                mappingValue.mapped[0].preferred = true;
            }
        }
        setValue({ ...mappingValue });
        setListKey(new Date().getTime().toString());
        props.onChange(mappingValue, false);
    }
    function handleOpenModal(editEntityForm) {
        const modalId = `xref-prefer-mapping-${props.name}`;
        const currentEntityForm = editEntityForm ?? xrefEntityForm;
        openModal({
            modalId,
            title: String(label || '기본값'),
            size: '5xl',
            content: (_jsx(Paper, { children: _jsx(ViewEntityForm, { entityForm: currentEntityForm, readonly: editEntityForm !== undefined, excludeButtons: editEntityForm !== undefined ? ['delete', 'save'] : ['delete'], buttons: [
                        new EntityFormButton('list')
                            .withLabel('닫기')
                            .withClassName('btn btn-outline-primary gap-2')
                            .withOnClick(async (props) => {
                            closeModal(modalId);
                            setOnEditEntityForm(undefined);
                            return props.entityForm;
                        }),
                    ], postSave: async (entityForm) => {
                        // onSave에서 이미 mappingValue.mapped에 추가 완료
                        setValueAndReload({ ...mappingValue });
                        closeModal(modalId);
                        return entityForm;
                    } }) }, listKey)),
            onClose: () => {
                setOnEditEntityForm(undefined);
            },
        });
    }
};
//# sourceMappingURL=XrefPreferMappingView.js.map