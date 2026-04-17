import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { ListableFormField } from './abstract';
import { LazyFileUploadInput as FileUploadInput } from "../../ui";
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
import { isEmpty } from "../../utils";
import { getAccessableAssetUrl } from "../../misc";
import { TextInput } from "../../ui";
export class ImageField extends ListableFormField {
    constructor(name, order, config) {
        super(name, order, 'file');
        this.config = config;
        this.listConfig = {
            filterable: false,
            sortable: false
        };
    }
    withConfig(config) {
        this.config = config;
        return this;
    }
    withMaxSize(maxSize) {
        this.config = {
            maxSize: maxSize,
            maxCount: this.config?.maxCount,
            extensions: this.config?.extensions,
            fileTypes: this.config?.fileTypes,
        };
        return this;
    }
    withMaxCount(maxCount) {
        this.config = {
            maxSize: this.config?.maxSize,
            maxCount: maxCount,
            extensions: this.config?.extensions,
            fileTypes: this.config?.fileTypes,
        };
        return this;
    }
    withExtensions(...extension) {
        this.config = {
            maxSize: this.config?.maxSize,
            maxCount: this.config?.maxCount,
            extensions: extension,
            fileTypes: this.config?.fileTypes,
        };
        return this;
    }
    withFileTypes(...fileTypes) {
        this.config = {
            maxSize: this.config?.maxSize,
            maxCount: this.config?.maxCount,
            extensions: this.config?.extensions,
            fileTypes: fileTypes,
        };
        return this;
    }
    /**
     * ImageField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    renderInstance(params) {
        return (async () => {
            let config = this.config;
            if (!config) {
                config = {
                    maxCount: 1,
                    extensions: ['png', 'jpeg', 'jpg', 'gif', 'webp', 'svg'],
                    fileTypes: ['image/*']
                };
            }
            else {
                if (!config.fileTypes) {
                    config.fileTypes = ['image/*'];
                }
                if (!config.extensions) {
                    config.extensions = ['png', 'jpeg', 'jpg', 'gif', 'webp', 'svg'];
                }
                if (!config.maxCount || config.maxCount < 1) {
                    config.maxCount = 1;
                }
            }
            return _jsx(FileUploadInput, { config: config, ...await getInputRendererParameters(this, params) });
        })();
    }
    /**
     * ImageField 인스턴스 생성
     */
    createInstance(name, order) {
        return new ImageField(name, order, this.config);
    }
    /**
     * ImageField 리스트 필터 렌더링 (기본 텍스트 입력)
     */
    renderListFilterInstance(params) {
        return (async () => {
            return _jsx(TextInput, { name: `${this.name}_${params.entityForm.id}`, onChange: (value) => params.onChange(value, 'LIKE'), value: params.value });
        })();
    }
    /**
     * ImageField 리스트 아이템 렌더링 (원본 renderListItem 로직 보존)
     */
    renderListItemInstance(props) {
        return (async () => {
            const value = await props.item;
            if (value[this.name]) {
                const file = value[this.name];
                if (!isEmpty(file.existFiles)) {
                    const imgUrl = getAccessableAssetUrl(file.existFiles[0].url);
                    return {
                        result: _jsx("div", { className: 'flex w-full items-center justify-center', children: _jsxs("div", { className: "relative text-center group", children: [_jsx("img", { className: "h-9 w-9 rounded-md object-cover saturate-50 transition-transform duration-300 group-hover:scale-110", src: `${imgUrl}`, onError: (event) => {
                                            event.currentTarget.src = '/assets/images/no-image.png';
                                        }, alt: "primary image" }), _jsx("div", { className: "absolute min-w-48 top-0 left-1/2 bg-white transform -translate-x-1/2 -translate-y-12 mt-2 z-50 hidden group-hover:flex justify-center items-center", children: _jsx("img", { className: "h-48 w-48 rounded-md object-cover shadow-lg max-w-48", src: `${imgUrl}`, onError: (event) => {
                                                event.currentTarget.src = '/assets/images/no-image.png';
                                            }, alt: "enlarged image" }) })] }) })
                    };
                }
            }
            return {
                result: _jsx("div", { className: 'flex w-full items-center justify-center', children: _jsx("img", { className: "h-9 w-9 rounded-md object-cover saturate-50 group-hover:saturate-100", src: `/assets/images/no-image.png`, alt: "no image" }) })
            };
        })();
    }
    static create(props) {
        return new ImageField(props.name, props.order, props.config)
            .copyFields(props, true);
    }
}
//# sourceMappingURL=ImageField.js.map