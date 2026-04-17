'use client';
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Tooltip } from "../../../ui";
import { IconCircleX, IconPlus, IconSearch, IconSettings2 } from "@tabler/icons-react";
import { Dropdown } from "../../../ui";
import { isTrue } from '../../../utils/BooleanUtil';
import { isBlank } from '../../../utils/StringUtil';
import { ViewListGrid } from '../../list/ViewListGrid';
import { ListGrid } from '../../../config/ListGrid';
import { TreeSelectView } from './TreeSelectView';
import { SearchForm } from "../../../form/SearchForm";
import { getManyToOneEntityValue } from '../ManyToOneField';
import { ViewEntityForm } from '../../form/ViewEntityForm';
import { useModalManagerStore } from '../../../store';
import { useSession } from '../../../auth';
// Value ID 추출 헬퍼
function getValueId(val) {
    if (!val)
        return undefined;
    if (typeof val === 'string')
        return val;
    if (typeof val === 'object' && val.id)
        return val.id;
    return undefined;
}
export const ManyToOneView = ({ config, required, parentEntityForm, ...props }) => {
    const readonly = isTrue(props.readonly);
    const { openModal, closeModal } = useModalManagerStore();
    const session = useSession();
    const entityForm = config.entityForm;
    const menuUrl = config.entityForm.menuUrl; // 선택된 item 이 있는 경우 해당 item 으로 링크 처리
    const subCollectionEntity = isTrue(props.subCollectionEntity, false);
    const [name, setName] = useState("");
    const [value, setValue] = useState();
    const [defaultValue, setDefaultValue] = useState();
    const [mount, setMount] = useState(false);
    const [searchForm, setSearchForm] = useState();
    // 로컬에서 선택한 값의 ID를 추적하여 불필요한 재처리 방지
    const localValueIdRef = useRef(undefined);
    // modifiable 권한 체크 함수
    const checkModifiable = () => {
        if (config.modifiable === true) {
            return true;
        }
        if (typeof config.modifiable === 'object' && config.modifiable.roles) {
            // session이 없으면 false
            const userRoles = session?.getUser()?.roles;
            if (!userRoles) {
                return false;
            }
            return config.modifiable.roles.some(role => userRoles.includes(role));
        }
        return false;
    };
    const isModifiable = checkModifiable();
    useEffect(() => {
        const propsValueId = getValueId(props.value);
        // 로컬에서 이미 동일한 값을 선택한 경우, 재처리 스킵 (깜빡임 방지)
        if (propsValueId && propsValueId === localValueIdRef.current && mount) {
            return;
        }
        if (mount) {
            setMount(false);
        }
        (async () => {
            // props.value 를 json 에서 parse 된 object 타입이어야 한다.
            if (props.value) {
                let value = await getManyToOneEntityValue(props.name, props.value, config);
                // Case 1: value가 문자열인 경우 (ID만 전달된 경우 - 상세검색 필터 등)
                // getManyToOneEntityValue가 fetch하지 못하고 문자열 그대로 반환한 경우
                if (typeof value === 'string' && value) {
                    const fetchEntityForm = config.entityForm.clone(true);
                    fetchEntityForm.id = value;
                    try {
                        const fetchedData = (await fetchEntityForm.fetchData()).data.data;
                        if (fetchedData) {
                            value = fetchedData;
                        }
                    }
                    catch (e) {
                        // fetch 실패 시 기존 value 사용
                    }
                }
                // Case 2: value가 객체이고 id만 있는 경우 (name 등 display 정보가 없는 경우)
                else if (value && typeof value === 'object' && value.id) {
                    const hasDisplayInfo = config.displayFunc ||
                        (config.field?.name instanceof Function) ||
                        (config.field?.name && value[config.field.name]) ||
                        value.name;
                    if (!hasDisplayInfo) {
                        // display 정보가 없으면 id로 fetch
                        const fetchEntityForm = config.entityForm.clone(true);
                        fetchEntityForm.id = value.id;
                        try {
                            const fetchedData = (await fetchEntityForm.fetchData()).data.data;
                            if (fetchedData) {
                                value = fetchedData;
                            }
                        }
                        catch (e) {
                            // fetch 실패 시 기존 value 사용
                        }
                    }
                }
                setManyToOneValue(value, true);
            }
            else {
                // 값이 없을 때 name과 value 모두 초기화
                setName("");
                setValue("");
                localValueIdRef.current = undefined;
            }
            const filter = [];
            if (config.filter !== undefined) {
                for (const filterItem of config.filter) {
                    if (filterItem) {
                        filter.push(filterItem);
                    }
                }
            }
            const searchForm = SearchForm.create();
            if (filter !== undefined && filter.length > 0) {
                for (const filterItem of filter) {
                    searchForm.withFilter("AND", ...(await filterItem(parentEntityForm)));
                }
                if (entityForm.neverDelete) {
                    searchForm.handleAndFilter("active", "true");
                }
            }
            setSearchForm(searchForm);
            setMount(true);
        })();
    }, [props.value]);
    if (!mount) {
        // 아직 useEffect 가 실행되지 않았다면
        return null;
    }
    // 선택 모달 핸들러
    const handleSelectModal = () => {
        const modalId = `manytoone-select-${props.name}`;
        const isTree = !!config.tree;
        openModal({
            modalId,
            title: `${props.label} 검색`,
            size: isTree ? 'lg' : '5xl',
            fullHeight: isTree ? false : true,
            maxHeight: isTree ? undefined : '90vh',
            content: (_jsx("div", { className: `modal-content flex flex-col overflow-hidden ${isTree ? '' : 'max-h-[85vh]'}`, children: isTree ? (_jsx(TreeSelectView, { entityForm: entityForm, tree: config.tree, onSelect: (item) => {
                        setManyToOneValue(item);
                        closeModal(modalId);
                    } })) : (_jsx(ViewListGrid, { listGrid: new ListGrid(entityForm).withSearchForm(searchForm), options: {
                        popup: true,
                        filterable: config.filterable,
                        readonly: true,
                        hideAdvancedSearch: config.hideAdvancedSearch,
                        selection: {
                            enabled: false,
                        },
                        manyToOne: {
                            onSelect: (item) => {
                                setManyToOneValue(item);
                                closeModal(modalId);
                            },
                        },
                    } })) }))
        });
    };
    // 생성 모달 핸들러
    const handleCreateModal = () => {
        const modalId = `manytoone-create-${props.name}`;
        openModal({
            modalId,
            title: `${props.label} 생성`,
            size: '5xl',
            content: (_jsx(ViewEntityForm, { entityForm: entityForm.clone(true), postSave: async (savedForm) => {
                    const savedData = await savedForm.getValues();
                    savedData.id = savedForm.id;
                    setManyToOneValue(savedData);
                    closeModal(modalId);
                    return savedForm;
                }, buttonLinks: {
                    onClickList: async () => closeModal(modalId)
                }, subCollection: true, readonly: false }))
        });
    };
    // 수정 모달 핸들러
    const handleEditModal = () => {
        const modalId = `manytoone-edit-${props.name}-${value.id}`;
        openModal({
            modalId,
            title: `${props.label} 수정`,
            size: '5xl',
            content: (_jsx(ViewEntityForm, { entityForm: entityForm.clone(true).withId(value.id), postSave: async (updatedForm) => {
                    const updatedData = await updatedForm.getValues();
                    setManyToOneValue(updatedData);
                    closeModal(modalId);
                    return updatedForm;
                }, buttonLinks: {
                    onClickList: async () => closeModal(modalId)
                }, subCollection: true, readonly: false }))
        });
    };
    // 보기 모달 핸들러
    const handleViewModal = () => {
        const modalId = `manytoone-view-${props.name}-${value.id}`;
        const viewEntityForm = entityForm
            .clone(true)
            .withId(value.id)
            .withTitle(value.id === undefined ? undefined : {
            view: async () => name ? `정보 조회 > ${name}` : '정보 조회'
        });
        openModal({
            modalId,
            title: `${props.label} 조회`,
            size: '5xl',
            content: (_jsx(ViewEntityForm, { entityForm: viewEntityForm, buttonLinks: {
                    onClickList: async () => closeModal(modalId)
                }, subCollection: true, readonly: true }))
        });
    };
    return (_jsx("div", { className: "flex w-full", children: _jsxs("div", { className: "flex w-full items-center", children: [_jsx("div", { className: "group relative flex w-full", children: _jsx("div", { className: "dropdown flex w-full", children: _jsx("input", { type: "text", className: `peer cursor-pointer form-input 
                w-full min-w-full cursor-not-allowed font-normal focus:!border-white-light 
                rounded-r-none border-r-0 !pr-10`, placeholder: !readonly ? `찾기 버튼을 눌러 ${props.label} 을(를) 선택해 주세요` : '', value: name, disabled: readonly, readOnly: true, onClick: () => {
                                if (!isBlank(value)) {
                                    if (isModifiable && !readonly) {
                                        handleEditModal();
                                    }
                                    else {
                                        handleViewModal();
                                    }
                                }
                                else if (!readonly) {
                                    if (isModifiable) {
                                        handleCreateModal();
                                    }
                                    else {
                                        handleSelectModal();
                                    }
                                }
                            } }) }) }), !isBlank(value) && (_jsx("div", { className: `flex h-full items-center justify-center border border-white-light bg-[#fafafa] font-semibold text-secondary dark:border-[#17263c] dark:bg-[#1b2e4b] border-r-0`, children: _jsx(Tooltip, { label: isModifiable && !readonly ? `정보 수정` : `정보 보기`, children: _jsx("button", { className: "flex h-[30px] w-[40px] items-center justify-center", onClick: () => {
                                if (isBlank(menuUrl) || !subCollectionEntity) {
                                    if (isModifiable && !readonly) {
                                        handleEditModal();
                                    }
                                    else {
                                        handleViewModal();
                                    }
                                }
                                else {
                                    window.open(menuUrl + "/" + value.id, "_blank");
                                }
                            }, children: _jsx(IconSearch, { className: "h-4 w-4" }) }) }) })), !readonly && !isBlank(value) && (_jsx("div", { className: `flex h-full items-center justify-center border border-white-light bg-[#fafafa] font-semibold text-secondary dark:border-[#17263c] dark:bg-[#1b2e4b] border-r-0`, children: _jsx(Tooltip, { label: `선택 해제`, children: _jsx("button", { className: "flex h-[30px] w-[40px] items-center justify-center", onClick: () => {
                                setManyToOneValue("");
                            }, children: _jsx(IconCircleX, { className: "h-4 w-4" }) }) }) })), isModifiable && !readonly ? (_jsx(Dropdown, { placement: "bottom-end", btnClassName: "flex h-full min-w-[80px] cursor-pointer items-center justify-center space-x-1 whitespace-nowrap border border-secondary bg-secondary px-3 font-semibold text-white hover:bg-secondary/85 disabled:opacity-20 dark:border-[#17263c] rounded-r-md border-l-0", button: _jsxs(_Fragment, { children: [_jsx(IconSettings2, { className: "h-4 w-4" }), _jsx("span", { children: "\uAD00\uB9AC" })] }), children: _jsxs("ul", { className: "min-w-[120px] p-0", children: [_jsx("li", { children: _jsxs("button", { type: "button", className: "flex w-full items-center space-x-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700", onClick: handleSelectModal, children: [_jsx(IconSearch, { className: "h-4 w-4" }), _jsx("span", { children: "\uCC3E\uAE30" })] }) }), _jsx("li", { children: _jsxs("button", { type: "button", className: "flex w-full items-center space-x-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700", onClick: handleCreateModal, children: [_jsx(IconPlus, { className: "h-4 w-4" }), _jsx("span", { children: "\uB4F1\uB85D" })] }) })] }) })) : (_jsxs("button", { type: "button", disabled: readonly, className: "flex h-full min-w-[80px] cursor-pointer items-center justify-center space-x-1 whitespace-nowrap border border-secondary bg-secondary px-3 font-semibold text-white hover:bg-secondary/85 disabled:opacity-20 dark:border-[#17263c] rounded-r-md border-l-0", onClick: handleSelectModal, children: [_jsx(IconSearch, { className: "h-4 w-4" }), _jsx("span", { children: "\uCC3E\uAE30" })] }))] }) }));
    function setManyToOneValue(value, initialize) {
        (async () => {
            let finalValue = value;
            // 빈 문자열 처리 - 명시적으로 clear하는 경우
            if (value === "") {
                value = undefined;
                finalValue = undefined;
            }
            if (value === undefined) {
                // Initialize 시에만 defaultValue 사용, 사용자가 명시적으로 clear한 경우는 제외
                if (isTrue(initialize) && defaultValue !== undefined && isTrue(required)) {
                    const currentValue = await getViewName(defaultValue);
                    setName(currentValue);
                    setValue(defaultValue);
                    finalValue = defaultValue;
                    // localValueIdRef 업데이트
                    localValueIdRef.current = getValueId(defaultValue);
                }
                else {
                    // 명시적 clear이거나 초기화가 아닌 경우 무조건 clear
                    setName("");
                    setValue(undefined);
                    finalValue = undefined;
                    // localValueIdRef 초기화
                    localValueIdRef.current = undefined;
                }
            }
            else {
                const currentValue = await getViewName(value);
                setName(currentValue);
                setValue(value);
                finalValue = value;
                // localValueIdRef 업데이트 - 선택된 값의 ID 추적
                localValueIdRef.current = getValueId(value);
            }
            if (isTrue(initialize)) {
                if (defaultValue === undefined) {
                    setDefaultValue(finalValue);
                }
            }
            else {
                // onChange value 처리
                props.onChange(finalValue, true);
            }
        })();
    }
    async function getViewName(value) {
        if (config.displayFunc !== undefined) {
            return await config.displayFunc(value);
        }
        if (config.field?.name) {
            if (config.field.name instanceof Function) {
                return config.field.name(value);
            }
            else {
                return value[config.field.name];
            }
        }
        else {
            // 설정된 정보가 없으면 name 필드를 우선 사용한다.
            return value["name"] ?? "";
        }
    }
};
//# sourceMappingURL=ManyToOneView.js.map