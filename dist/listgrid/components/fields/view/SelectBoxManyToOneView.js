/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Select from 'react-select';
import { AbstractManyToOneField } from '../abstract';
import { SearchForm } from '../../../form/SearchForm';
import { getManyToOneEntityValue } from '../ManyToOneField';
import { PageResult } from '../../../form/Type';
import { isTrue } from '../../../utils/BooleanUtil';
const CACHE_TTL = 5 * 60 * 1000; // 5분
const dataCache = new Map();
function getCachedData(cacheKey) {
    const entry = dataCache.get(cacheKey);
    if (!entry)
        return null;
    // TTL 체크
    if (Date.now() - entry.timestamp > CACHE_TTL) {
        dataCache.delete(cacheKey);
        return null;
    }
    return entry.data;
}
function setCachedData(cacheKey, data) {
    dataCache.set(cacheKey, {
        data,
        timestamp: Date.now(),
    });
}
// 캐시 무효화 함수 (필요시 외부에서 호출 가능)
export function invalidateSelectBoxCache(urlPattern) {
    if (urlPattern) {
        for (const key of dataCache.keys()) {
            if (key.includes(urlPattern)) {
                dataCache.delete(key);
            }
        }
    }
    else {
        dataCache.clear();
    }
}
/**
 * SelectBoxManyToOneView
 *
 * ManyToOne 필드를 SelectBox(드롭다운) 형태로 표시하는 커스텀 렌더러입니다.
 * 전체 옵션을 미리 로딩하여 드롭다운으로 표시합니다.
 *
 * @example
 * ```tsx
 * ManyToOneField.create({
 *   name: 'country',
 *   order: 1,
 *   config: { entityForm: CountryEntityForm() }
 * })
 * .withSelectBoxView({
 *   labelField: 'name',
 *   placeholder: '국가를 선택하세요',
 * })
 * ```
 */
export const SelectBoxManyToOneView = ({ field, entityForm, value, onChange, readonly, required, labelField = 'name', valueField = 'id', placeholder = '선택하세요', nullValueLabel = '선택 안함', isSearchable = false, menuPosition = 'fixed', menuPlacement = 'auto', items: providedItems, loadItems, }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [mounted, setMounted] = useState(false);
    const fieldName = field.getName();
    const config = useMemo(() => {
        if (field instanceof AbstractManyToOneField) {
            return field.config;
        }
        return undefined;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fieldName]);
    // 안정적인 URL을 의존성으로 사용 (config 객체 대신)
    const configUrl = config?.entityForm?.getUrl();
    // 라벨 가져오기 함수
    const getLabel = useCallback((item) => {
        if (!item)
            return '';
        try {
            if (typeof labelField === 'function') {
                const result = labelField(item);
                return result ?? '';
            }
            // config.field.name도 체크
            if (config?.field?.name) {
                if (typeof config.field.name === 'function') {
                    return config.field.name(item) ?? '';
                }
                return item[config.field.name] ?? item[labelField] ?? '';
            }
            return item[labelField] ?? item.name ?? item.title ?? '';
        }
        catch (e) {
            console.error('[SelectBoxManyToOneView] getLabel error:', e);
            return item.name ?? item.title ?? '';
        }
    }, [labelField, config]);
    // 값 가져오기 함수
    const getValue = useCallback((item) => {
        if (!item)
            return '';
        return item[valueField] ?? item.id ?? '';
    }, [valueField]);
    // value의 ID 추출
    const getValueId = useCallback((val) => {
        if (!val)
            return undefined;
        if (typeof val === 'string')
            return val;
        return val[valueField] ?? val.id;
    }, [valueField]);
    const currentValueId = useMemo(() => getValueId(value), [value, getValueId]);
    // EntityForm ref 유지
    const entityFormRef = useRef(entityForm);
    entityFormRef.current = entityForm;
    // 이미 로딩되었는지 추적
    const loadedRef = useRef(false);
    // 캐시 키 생성
    const cacheKey = useMemo(() => {
        if (!configUrl)
            return null;
        // neverDelete 여부도 캐시 키에 포함
        const neverDelete = config?.entityForm?.neverDelete ? '_active' : '';
        return `${configUrl}${neverDelete}`;
    }, [configUrl, config?.entityForm?.neverDelete]);
    // 아이템 목록 로드 - 캐시 우선 사용
    useEffect(() => {
        // 이미 로딩되었으면 스킵
        if (loadedRef.current && items.length > 0) {
            return;
        }
        let cancelled = false;
        (async () => {
            try {
                if (providedItems) {
                    setItems(providedItems);
                    loadedRef.current = true;
                    setLoading(false);
                    setMounted(true);
                    return;
                }
                if (loadItems) {
                    setLoading(true);
                    const loadedItems = await loadItems();
                    if (!cancelled) {
                        setItems(loadedItems);
                        loadedRef.current = true;
                    }
                    return;
                }
                if (config?.entityForm && cacheKey) {
                    // 캐시 확인
                    const cachedData = getCachedData(cacheKey);
                    if (cachedData) {
                        setItems(cachedData);
                        loadedRef.current = true;
                        setLoading(false);
                        setMounted(true);
                        return;
                    }
                    // 캐시 없으면 서버에서 로드
                    setLoading(true);
                    const searchForm = SearchForm.create();
                    if (config.filter) {
                        for (const filterItem of config.filter) {
                            if (filterItem) {
                                searchForm.withFilter('AND', ...(await filterItem(entityFormRef.current)));
                            }
                        }
                    }
                    if (config.entityForm.neverDelete) {
                        searchForm.handleAndFilter('active', 'true');
                    }
                    searchForm.withPage(0).withPageSize(500);
                    const url = config.entityForm.getUrl();
                    const result = await PageResult.fetchListData(url, searchForm);
                    if (!cancelled) {
                        const loadedData = result?.list ?? [];
                        setItems(loadedData);
                        loadedRef.current = true;
                        // 캐시에 저장
                        setCachedData(cacheKey, loadedData);
                    }
                }
            }
            catch (e) {
                console.error(`[SelectBoxManyToOneView:${fieldName}] Failed to load items:`, e);
                if (!cancelled)
                    setItems([]);
            }
            finally {
                if (!cancelled) {
                    setLoading(false);
                    setMounted(true);
                }
            }
        })();
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cacheKey, fieldName]);
    // SelectOption 목록 생성
    const options = useMemo(() => {
        const opts = items.map((item) => ({
            label: getLabel(item),
            value: getValue(item),
            data: item,
        }));
        // required가 아니면 빈 옵션 추가
        if (!isTrue(required)) {
            opts.unshift({
                label: nullValueLabel,
                value: '',
                data: null,
            });
        }
        return opts;
    }, [items, getLabel, getValue, required, nullValueLabel]);
    // 현재 선택된 값 설정
    useEffect(() => {
        if (!mounted)
            return;
        (async () => {
            if (value && config) {
                const entity = await getManyToOneEntityValue(field.getName(), value, config);
                if (entity) {
                    const id = getValue(entity);
                    const found = options.find((opt) => opt.value === id);
                    setSelectedOption(found ?? null);
                }
                else {
                    setSelectedOption(null);
                }
            }
            else {
                // required가 아니면 빈 옵션 선택
                if (!isTrue(required)) {
                    const emptyOption = options.find((opt) => opt.value === '');
                    setSelectedOption(emptyOption ?? null);
                }
                else {
                    setSelectedOption(null);
                }
            }
        })();
    }, [value, config, field, options, mounted, getValue, required]);
    // 선택 변경 핸들러
    const handleChange = useCallback((newValue) => {
        if (readonly)
            return;
        if (!newValue || newValue.value === '') {
            setSelectedOption(null);
            onChange(undefined, true);
        }
        else {
            setSelectedOption(newValue);
            onChange(newValue.data, true);
        }
    }, [readonly, onChange]);
    if (loading || !mounted) {
        return (_jsx("div", { className: "rcm-select-loading-wrapper", children: _jsxs("div", { className: "rcm-select-loading", children: [_jsxs("svg", { className: "rcm-select-loading-spinner", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "rcm-spinner-track", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "rcm-spinner-head", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), _jsx("span", { className: "rcm-select-loading-text", children: "\uBD88\uB7EC\uC624\uB294 \uC911..." })] }) }));
    }
    return (_jsx("div", { className: "custom-select whitespace-nowrap", children: _jsx(Select, { classNamePrefix: "react-select", options: options, value: selectedOption, isSearchable: isSearchable, menuPortalTarget: typeof document !== 'undefined' ? document.body : null, menuPosition: menuPosition, menuPlacement: menuPlacement, isDisabled: isTrue(readonly), placeholder: placeholder, onChange: handleChange, isClearable: false, noOptionsMessage: () => '선택 가능한 항목이 없습니다.', styles: {
                control: (base) => ({
                    ...base,
                    minHeight: '36px',
                    height: '36px',
                }),
                valueContainer: (base) => ({
                    ...base,
                    height: '36px',
                    padding: '0 8px',
                }),
                indicatorsContainer: (base) => ({
                    ...base,
                    height: '36px',
                }),
                menuPortal: (base) => ({
                    ...base,
                    zIndex: 9999,
                }),
            } }) }));
};
export default SelectBoxManyToOneView;
//# sourceMappingURL=SelectBoxManyToOneView.js.map