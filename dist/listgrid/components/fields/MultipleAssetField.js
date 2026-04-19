'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { FormField } from './abstract';
import React, { useEffect, useState } from 'react';
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
import { Modal } from '../../ui';
import { Paper } from '../../ui';
import { Button } from '../../ui';
import { TextInput } from '../../ui';
import { defaultString, isBlank } from '../../utils/StringUtil';
import { IconPhotoPlus, IconTrash } from '@tabler/icons-react';
import { MultipleAssetUpload } from './view/MultipleAssetUpload';
import { getAccessableAssetUrl } from '../../misc';
import { RegexLowerEnglishNumber } from '../../misc';
import { isTrue } from '../../utils/BooleanUtil';
import { ViewHelpText } from '../form/ui/ViewHelpText';
import { Tooltip } from '../../ui';
export class MultipleAssetField extends FormField {
    constructor(name, order, tags, fileTypes) {
        super(name, order, 'custom');
        this.tags = tags;
        this.fileTypes = fileTypes;
    }
    /**
     * MultipleAssetField 핵심 렌더링 로직
     */
    renderInstance(params) {
        return (async () => {
            const inputParams = await getInputRendererParameters(this, params);
            return (_jsx(MultipleAssetFieldView, { fileTypes: this.fileTypes, tags: this.tags, ...inputParams }));
        })();
    }
    /**
     * MultipleAssetField 인스턴스 생성
     */
    createInstance(name, order) {
        return new MultipleAssetField(name, order, this.tags, this.fileTypes);
    }
    static create(props) {
        return new MultipleAssetField(props.name, props.order, props.tags, props.fileTypes).copyFields(props, true);
    }
}
function deepCopy(value) {
    const newValue = {
        ...(value?.preferred !== undefined ? { preferred: value.preferred } : {}),
    };
    if (value?.assets !== undefined && value.assets.length > 0) {
        const newAssets = [];
        value.assets.forEach((asset) => {
            newAssets.push({ ...asset });
        });
        newValue.assets = newAssets;
    }
    return newValue;
}
const MultipleAssetFieldView = (props) => {
    const [value, setValue] = useState();
    const [openAdd, setOpenAdd] = useState(false);
    const [error, setError] = useState('');
    const [currentIndex, setCurrentIndex] = useState();
    const [currentEdit, setCurrentEdit] = useState({ url: '' });
    const [tags, setTags] = useState(props.tags ?? []);
    useEffect(() => {
        if (props.value) {
            setValue(props.value);
            const tags = props.tags ?? [];
            if (props.value.assets) {
                props.value?.assets.forEach((asset) => {
                    if (!tags.includes(asset.name ?? '')) {
                        tags.push(asset.name ?? '');
                    }
                });
            }
            setTags(tags);
        }
        else {
            // new value
            const newValue = { assets: [] };
            if (props.tags) {
                props.tags.forEach((tag) => {
                    newValue.assets?.push({ name: tag, url: '' });
                });
                setValue(newValue);
                setTags(props.tags);
            }
        }
    }, [props.value]);
    function openImageForm(currentIndex) {
        setError('');
        setCurrentIndex(currentIndex);
        setOpenAdd(true);
        if (currentIndex === undefined) {
            setCurrentEdit({ url: '' });
        }
        else {
            setCurrentEdit(value?.assets?.[currentIndex] ?? { url: '' });
        }
    }
    function closeUpload() {
        setCurrentEdit({ url: '' });
        setCurrentIndex(undefined);
        setOpenAdd(false);
    }
    const readonly = isTrue(props.readonly);
    return (_jsxs(React.Fragment, { children: [_jsx("div", { className: "rcm-asset-outer", children: _jsx("div", { className: "rcm-asset-table-responsive", children: _jsxs("div", { className: "rcm-asset-grid", children: [tags.map((tag, index) => {
                                const asset = value?.assets?.find((asset) => asset.name === tag);
                                if (!asset) {
                                    return null;
                                }
                                const isPrimary = tag === 'Primary';
                                return (_jsx("div", { children: _jsxs("table", { className: "rcm-asset-table", children: [_jsx("thead", { children: _jsx("tr", { children: _jsx("th", { className: "rcm-asset-th", children: _jsxs("div", { className: "rcm-asset-th-row", children: [_jsx("div", { className: `rcm-asset-th-name${!isPrimary ? ' rcm-asset-th-name-compact' : ''}`, children: _jsx(Tooltip, { label: `${asset.name}`, children: _jsx("div", { className: "rcm-truncate", children: asset.name }) }) }), !isPrimary && (_jsx("div", { className: "rcm-asset-th-remove", children: !readonly && (_jsx("button", { type: 'button', className: "rcm-asset-th-remove-btn", onClick: () => {
                                                                            const newValues = { assets: [] };
                                                                            value.assets?.forEach((asset, deleteIndex) => {
                                                                                if (index !== deleteIndex) {
                                                                                    newValues.assets?.push(asset);
                                                                                }
                                                                            });
                                                                            if (props.tags?.includes(asset.name)) {
                                                                                setTags(tags.filter((tag) => tag !== asset.name));
                                                                            }
                                                                            setValue(newValues);
                                                                            props.onChange(newValues, false);
                                                                        }, children: _jsx(IconTrash, { className: "rcm-icon", "data-color": "error" }) })) }))] }) }, `th-${index}`) }) }), _jsx("tbody", { children: _jsx("tr", { children: _jsx("td", { className: "rcm-asset-td", children: _jsx("div", { className: "rcm-asset-td-inner", onClick: () => {
                                                                openImageForm(index);
                                                            }, children: _jsx("button", { className: "rcm-asset-btn-fill", children: (function () {
                                                                    if (isBlank(value?.assets?.[index]?.url)) {
                                                                        // 데이터 없음
                                                                        if (readonly) {
                                                                            return null;
                                                                        }
                                                                        else {
                                                                            return (_jsx(IconPhotoPlus, { className: "rcm-icon rcm-asset-placeholder-icon" }));
                                                                        }
                                                                    }
                                                                    else {
                                                                        const imgUrl = getAccessableAssetUrl(value.assets[index].url);
                                                                        return (_jsx("img", { className: "rcm-asset-img", alt: `${value?.assets?.[index]?.description ?? ''}`, onError: (event) => {
                                                                                event.currentTarget.src = '/assets/images/no-image.png';
                                                                            }, src: `${imgUrl}` }));
                                                                    }
                                                                })() }) }) }, `td-${index}`) }) })] }) }, `asset${index}`));
                            }), !readonly && (_jsx("div", { className: "rcm-asset-add-col", children: _jsx("table", { className: "rcm-asset-add-table", children: _jsx("tbody", { children: _jsx("tr", { children: _jsx("td", { className: "rcm-asset-add-td", children: _jsx("button", { type: "button", className: "rcm-asset-add-btn", onClick: () => {
                                                        openImageForm();
                                                    }, children: "+ \uCD94\uAC00" }) }) }) }) }) }))] }) }) }), openAdd && (_jsx(Modal, { title: currentIndex === undefined ? '새 이미지 추가' : '이미지 수정', size: '5xl', position: 'center', opened: openAdd, onClose: () => {
                    closeUpload();
                }, children: _jsxs(Paper, { className: "rcm-asset-modal-body", children: [_jsxs("div", { children: [_jsx("div", { className: "rcm-asset-modal-label", children: _jsx("div", { children: "\uC774\uBBF8\uC9C0 \uC720\uD615" }) }), _jsx(TextInput, { placeHolder: '이미지 유형', value: currentIndex === undefined
                                        ? ''
                                        : defaultString(value?.assets?.[currentIndex]?.name), readonly: currentIndex !== undefined &&
                                        tags.includes(defaultString(value?.assets?.[currentIndex ?? 0]?.name)), onChange: (value) => {
                                        setError('');
                                        if (isBlank(value)) {
                                            setError('이미지의 이름을 영문/숫자로 입력하세요.');
                                        }
                                        else {
                                            if (tags.includes(value)) {
                                                setError('중복된 이미지 이름이 존재합니다. 다른 이름을 입력해야 합니다.');
                                            }
                                            else {
                                                if (!RegexLowerEnglishNumber.test(value)) {
                                                    setError('영문 소문자/숫자만 입력할 수 있습니다');
                                                    return;
                                                }
                                                const currentItem = { ...currentEdit };
                                                currentItem.name = value;
                                                setCurrentEdit(currentItem);
                                            }
                                        }
                                    }, name: `item` }), currentIndex === undefined && (_jsx(ViewHelpText, { helpText: 'Front 에서 이 이미지를 식별하기 위한 Key입니다. 영문 소문자/숫자만 입력할 수 있습니다.' }))] }), _jsxs("div", { children: [_jsx("div", { className: "rcm-asset-modal-label", children: _jsx("div", { children: "Alt Tag" }) }), _jsx(TextInput, { placeHolder: 'Alt tag', tooltip: {
                                        label: '이미지가 표시될 때 &lt;img> 태그에 alt 속성값을 정의할 수 있습니다.',
                                    }, value: defaultString(value?.assets?.[currentIndex ?? 0]?.description), onChange: (value) => {
                                        const currentItem = { ...currentEdit };
                                        currentItem.description = value;
                                        setCurrentEdit(currentItem);
                                    }, name: `description` })] }), _jsxs("div", { children: [_jsx("div", { className: "rcm-asset-modal-label", children: _jsx("div", { children: "Image" }) }), _jsx(MultipleAssetUpload, { fileTypes: props.fileTypes, url: currentEdit.url, onChange: (url) => {
                                        const currentItem = { ...currentEdit };
                                        currentItem.url = url;
                                        setCurrentEdit(currentItem);
                                    } })] }), _jsxs("div", { className: "rcm-asset-modal-footer", children: [!isBlank(error) && _jsx("div", { className: "rcm-asset-modal-error", children: error }), _jsx(Button, { style: { marginLeft: 0.5 }, color: 'info', disabled: isBlank(currentEdit.name) || isBlank(currentEdit.url), variant: "filled", onClick: () => {
                                        if (isBlank(currentEdit.name)) {
                                            setError('이미지 유형의 이름을 입력해야 합니다.');
                                        }
                                        else if (isBlank(currentEdit.url)) {
                                            setError('이미지를 업로드해 주세요.');
                                        }
                                        else {
                                            const values = deepCopy(value);
                                            if (currentIndex === undefined) {
                                                values.assets?.push(currentEdit);
                                                setTags([...tags, currentEdit.name]);
                                            }
                                            else {
                                                values.assets[currentIndex] = currentEdit;
                                            }
                                            setValue(values);
                                            setOpenAdd(false);
                                            props.onChange(values, currentEdit.name === 'Primary');
                                            closeUpload();
                                        }
                                    }, children: currentIndex === undefined ? '이미지 등록' : '이미지 수정' })] })] }, `image-upload${currentIndex}`) }))] }));
};
//# sourceMappingURL=MultipleAssetField.js.map