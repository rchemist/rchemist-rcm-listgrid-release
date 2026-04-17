/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AbstractManyToOneField } from "../abstract";
import { SearchForm } from "../../../form/SearchForm";
import { isBlank } from "../../../utils/StringUtil";
import { getManyToOneEntityValue } from "../ManyToOneField";
import { IconCheck, IconChevronLeft, IconChevronRight, IconEdit, IconSearch, IconX } from "@tabler/icons-react";
import { ViewListGrid } from "../../list/ViewListGrid";
import { ListGrid } from "../../../config/ListGrid";
import { useModalManagerStore } from "../../../store";
import { PageResult } from "../../../form/Type";
/**
 * CardManyToOneView
 *
 * ManyToOne 필드를 카드 형태로 표시하는 커스텀 렌더러입니다.
 * - readonly 모드: 선택된 카드만 표시
 * - 편집 모드: 선택된 카드 + 변경 버튼으로 다른 옵션 선택 가능
 *
 * @example
 * ```tsx
 * <EntityFormThemeProvider
 *   fieldRenderers={{
 *     syllabus: CardManyToOneView,
 *     selection: (props) => (
 *       <CardManyToOneView
 *         {...props}
 *         columns={3}
 *         cardConfig={{
 *           titleField: 'name',
 *           labelField: (item) => item.term?.name,
 *           descriptionField: (item) => `${item.year}년도 ${item.semester}학기`,
 *         }}
 *       />
 *     ),
 *   }}
 * >
 *   {children}
 * </EntityFormThemeProvider>
 * ```
 */
export const CardManyToOneView = ({ field, entityForm, value, onChange, readonly, session, columns = 3, mobileColumns, gridClassName, cardConfig, items: providedItems, loadItems, emptyMessage = "선택 가능한 항목이 없습니다.", showSearchButton = true, showAllWhenEmpty = true, pageSize = 6, searchFirst = false, searchPlaceholder, searchFields = ['name'], }) => {
    const { openModal, closeModal } = useModalManagerStore();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(!searchFirst); // searchFirst면 초기 로딩 상태 false
    const [selectedItem, setSelectedItem] = useState(null);
    const [isChanging, setIsChanging] = useState(false); // 변경 모드 상태
    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [hasSearched, setHasSearched] = useState(false); // searchFirst 모드에서 검색 실행 여부
    const [isSearching, setIsSearching] = useState(false); // 검색 중 상태
    // ManyToOne config 가져오기 - field.getName()을 의존성으로 사용해서 안정성 확보
    const fieldName = field.getName();
    const config = useMemo(() => {
        if (field instanceof AbstractManyToOneField) {
            return field.config;
        }
        return undefined;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fieldName]); // field 객체 대신 fieldName 사용
    // value의 ID를 추출하는 헬퍼 함수
    const getValueId = useCallback((val) => {
        if (!val)
            return undefined;
        if (typeof val === 'string')
            return val;
        return val.id;
    }, []);
    // 현재 value의 ID (메모이제이션)
    const currentValueId = useMemo(() => getValueId(value), [value, getValueId]);
    // 아이템 목록 로드 - currentValueId가 변경될 때만 실행
    const entityFormRef = useRef(entityForm);
    entityFormRef.current = entityForm; // 항상 최신 entityForm 참조 유지
    // 이전 값들을 추적하기 위한 ref
    const prevDepsRef = useRef({
        providedItems,
        loadItems,
        config,
        currentValueId,
    });
    useEffect(() => {
        // searchFirst 모드에서는 초기 로드 건너뜀
        if (searchFirst) {
            return;
        }
        // 어떤 dependency가 변경되었는지 로그
        const prevDeps = prevDepsRef.current;
        const changes = [];
        if (prevDeps.providedItems !== providedItems)
            changes.push('providedItems');
        if (prevDeps.loadItems !== loadItems)
            changes.push('loadItems');
        if (prevDeps.config !== config)
            changes.push('config');
        if (prevDeps.currentValueId !== currentValueId)
            changes.push(`currentValueId: ${prevDeps.currentValueId} -> ${currentValueId}`);
        // 현재 값 저장
        prevDepsRef.current = { providedItems, loadItems, config, currentValueId };
        let cancelled = false;
        (async () => {
            setLoading(true);
            try {
                if (providedItems) {
                    setItems(providedItems);
                }
                else if (loadItems) {
                    const loadedItems = await loadItems();
                    if (!cancelled)
                        setItems(loadedItems);
                }
                else if (config?.entityForm) {
                    // 기본: entityForm에서 목록 조회
                    const searchForm = SearchForm.create();
                    if (config.filter) {
                        for (const filterItem of config.filter) {
                            if (filterItem) {
                                // 최신 entityForm 사용
                                searchForm.withFilter("AND", ...(await filterItem(entityFormRef.current)));
                            }
                        }
                    }
                    if (config.entityForm.neverDelete) {
                        searchForm.handleAndFilter("active", "true");
                    }
                    searchForm.withPage(0).withPageSize(100);
                    const url = config.entityForm.getUrl();
                    const result = await PageResult.fetchListData(url, searchForm);
                    if (!cancelled) {
                        setItems(result?.list ?? []);
                    }
                }
            }
            catch (e) {
                if (!cancelled)
                    setItems([]);
            }
            finally {
                if (!cancelled)
                    setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [providedItems, loadItems, config, currentValueId, fieldName, searchFirst]);
    // 현재 선택된 값 설정
    useEffect(() => {
        (async () => {
            if (value && config) {
                const entity = await getManyToOneEntityValue(field.getName(), value, config);
                setSelectedItem(entity);
            }
            else {
                setSelectedItem(null);
            }
        })();
    }, [value, config, field]);
    // 아이템 선택 핸들러
    const handleSelect = useCallback((item) => {
        if (readonly)
            return;
        setSelectedItem(item);
        setIsChanging(false); // 선택 후 변경 모드 종료
        onChange(item, true);
    }, [readonly, onChange]);
    // 선택 해제 핸들러
    const handleClear = useCallback(() => {
        if (readonly)
            return;
        setSelectedItem(null);
        onChange(undefined, true);
    }, [readonly, onChange]);
    // 변경 모드 토글
    const handleToggleChange = useCallback(() => {
        setIsChanging((prev) => !prev);
    }, []);
    // 검색 모달 핸들러
    const handleSearchModal = useCallback(() => {
        if (!config)
            return;
        const modalId = `card-manytoone-search-${field.getName()}`;
        const searchForm = SearchForm.create();
        openModal({
            modalId,
            title: `${field.getLabel()} 검색`,
            size: "5xl",
            content: (_jsx("div", { className: "modal-content flex max-h-[90vh] flex-col overflow-hidden", children: _jsx(ViewListGrid, { listGrid: new ListGrid(config.entityForm).withSearchForm(searchForm), options: {
                        popup: true,
                        filterable: config.filterable,
                        readonly: true,
                        selection: { enabled: false },
                        manyToOne: {
                            onSelect: (item) => {
                                handleSelect(item);
                                closeModal(modalId);
                            },
                        },
                    } }) })),
        });
    }, [config, field, openModal, closeModal, handleSelect]);
    // 타이틀 가져오기
    const getTitle = useCallback((item) => {
        if (cardConfig?.titleField) {
            if (typeof cardConfig.titleField === "function") {
                return cardConfig.titleField(item);
            }
            return item[cardConfig.titleField] ?? "";
        }
        if (config?.field?.name) {
            if (typeof config.field.name === "function") {
                return config.field.name(item);
            }
            return item[config.field.name] ?? "";
        }
        return item.name ?? item.title ?? "";
    }, [cardConfig, config]);
    // 페이징/검색 필요 여부
    const needsPagination = items.length > pageSize;
    // 검색어로 필터링된 아이템
    const filteredItems = useMemo(() => {
        if (!searchQuery.trim())
            return items;
        const query = searchQuery.toLowerCase();
        return items.filter((item) => {
            const title = getTitle(item).toLowerCase();
            return title.includes(query);
        });
    }, [items, searchQuery, getTitle]);
    // 전체 페이지 수
    const totalPages = Math.ceil(filteredItems.length / pageSize);
    // 현재 페이지의 아이템들
    const paginatedItems = useMemo(() => {
        if (!needsPagination)
            return items;
        const start = currentPage * pageSize;
        return filteredItems.slice(start, start + pageSize);
    }, [filteredItems, currentPage, pageSize, needsPagination, items]);
    // 검색어 변경 시 첫 페이지로
    const handleSearchChange = useCallback((e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(0);
    }, []);
    // 서버 검색 실행 (searchFirst 모드용)
    const handleServerSearch = useCallback(async (query) => {
        if (!config?.entityForm || isBlank(query.trim())) {
            return;
        }
        setIsSearching(true);
        setHasSearched(true);
        try {
            const searchForm = SearchForm.create();
            // 기존 필터 적용
            if (config.filter) {
                for (const filterItem of config.filter) {
                    if (filterItem) {
                        searchForm.withFilter("AND", ...(await filterItem(entityFormRef.current)));
                    }
                }
            }
            // 검색어 필터 추가 (OR 조건으로 searchFields에 대해 검색)
            const searchFilters = searchFields.map(fieldName => ({
                name: fieldName,
                value: `%${query.trim()}%`,
                queryConditionType: 'LIKE',
            }));
            if (searchFilters.length === 1) {
                searchForm.withFilter("AND", searchFilters[0]);
            }
            else {
                // 여러 필드에 대해 OR 검색
                searchForm.withFilter("OR", ...searchFilters);
            }
            if (config.entityForm.neverDelete) {
                searchForm.handleAndFilter("active", "true");
            }
            searchForm.withPage(0).withPageSize(pageSize * 3); // 검색 시 더 많이 가져옴
            const url = config.entityForm.getUrl();
            const result = await PageResult.fetchListData(url, searchForm);
            setItems(result?.list ?? []);
            setCurrentPage(0);
        }
        catch (e) {
            console.error("Server search failed:", e);
            setItems([]);
        }
        finally {
            setIsSearching(false);
        }
    }, [config, searchFields, pageSize, fieldName]);
    // Enter 키 핸들러 (searchFirst 모드용)
    const handleSearchKeyDown = useCallback((e) => {
        if (e.key === 'Enter' && searchFirst) {
            e.preventDefault();
            handleServerSearch(searchQuery);
        }
    }, [searchFirst, searchQuery, handleServerSearch]);
    // 페이지 변경
    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
    }, []);
    // 라벨(뱃지) 가져오기
    const getLabel = useCallback((item) => {
        if (cardConfig?.labelField) {
            if (typeof cardConfig.labelField === "function") {
                return cardConfig.labelField(item);
            }
            return item[cardConfig.labelField] ?? "";
        }
        return "";
    }, [cardConfig]);
    // 설명 가져오기
    const getDescription = useCallback((item) => {
        if (cardConfig?.descriptionField) {
            if (typeof cardConfig.descriptionField === "function") {
                return cardConfig.descriptionField(item);
            }
            return item[cardConfig.descriptionField] ?? "";
        }
        else if (cardConfig?.descriptionField === '') {
            return "";
        }
        return item.description ?? "";
    }, [cardConfig]);
    // 이미지 가져오기
    const getImage = useCallback((item) => {
        if (cardConfig?.imageField) {
            if (typeof cardConfig.imageField === "function") {
                return cardConfig.imageField(item);
            }
            return item[cardConfig.imageField];
        }
        return item.image ?? item.thumbnail ?? item.imageUrl;
    }, [cardConfig]);
    // 아이템 선택 여부 확인
    const isItemSelected = useCallback((item) => {
        if (!selectedItem)
            return false;
        return selectedItem.id === item.id;
    }, [selectedItem]);
    // 선택된 카드 렌더링 (readonly 모드 또는 선택 완료 상태)
    const renderSelectedCard = useCallback((item) => {
        const image = getImage(item);
        const label = getLabel(item);
        const description = getDescription(item);
        return (_jsxs("div", { className: `
            relative rounded-lg border p-4 transition-all
            ${cardConfig?.selectedContainerClassName ?? "border-primary/40 bg-primary/[0.02]"}
          `, children: [_jsx("div", { className: cardConfig?.checkIconClassName ??
                        "absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary/70 text-white", children: _jsx(IconCheck, { size: 14 }) }), image && (_jsx("div", { className: "mb-3 aspect-video w-full overflow-hidden rounded-md bg-gray-100 dark:bg-gray-700", children: _jsx("img", { src: image, alt: getTitle(item), className: "h-full w-full object-cover" }) })), !isBlank(label) && (_jsx("span", { className: cardConfig?.labelClassName ??
                        "inline-block mb-2 px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary", children: label })), _jsx("h4", { className: cardConfig?.titleClassName ??
                        "text-base font-semibold text-gray-900 dark:text-white", children: getTitle(item) }), !isBlank(description) && (_jsx("p", { className: cardConfig?.descriptionClassName ??
                        "mt-1 text-sm text-gray-500 dark:text-gray-400", children: description })), cardConfig?.renderAction && (_jsx("div", { className: "mt-2", children: cardConfig.renderAction(item) }))] }, item.id));
    }, [cardConfig, getTitle, getLabel, getDescription, getImage]);
    // 선택 가능한 카드 렌더링 (편집 모드)
    const renderSelectableCard = useCallback((item, selected, onSelect) => {
        const image = getImage(item);
        const label = getLabel(item);
        const description = getDescription(item);
        return (_jsxs("div", { onClick: onSelect, className: `
            relative rounded-lg border p-4 transition-all cursor-pointer
            hover:shadow-sm
            ${selected
                ? cardConfig?.selectedContainerClassName ??
                    "border-primary/40 bg-primary/[0.02]"
                : cardConfig?.containerClassName ??
                    "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"}
          `, children: [selected && (_jsx("div", { className: cardConfig?.checkIconClassName ??
                        "absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary/70 text-white", children: _jsx(IconCheck, { size: 14 }) })), image && (_jsx("div", { className: "mb-3 aspect-video w-full overflow-hidden rounded-md bg-gray-100 dark:bg-gray-700", children: _jsx("img", { src: image, alt: getTitle(item), className: "h-full w-full object-cover" }) })), !isBlank(label) && (_jsx("span", { className: cardConfig?.labelClassName ??
                        "inline-block mb-2 px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300", children: label })), _jsx("h4", { className: cardConfig?.titleClassName ??
                        "text-sm font-semibold text-gray-900 dark:text-white", children: getTitle(item) }), !isBlank(description) && (_jsx("p", { className: cardConfig?.descriptionClassName ??
                        "mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2", children: description })), cardConfig?.renderAction && (_jsx("div", { className: "mt-2", children: cardConfig.renderAction(item) }))] }, item.id));
    }, [cardConfig, getTitle, getLabel, getDescription, getImage]);
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center py-8", children: _jsx("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" }) }));
    }
    // readonly 모드: 선택된 카드만 표시
    if (readonly) {
        if (!selectedItem) {
            return (_jsx("div", { className: "text-sm text-gray-500 py-4", children: "\uC120\uD0DD\uB41C \uD56D\uBAA9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }));
        }
        return (_jsx("div", { className: "w-full", children: cardConfig?.renderCard
                ? cardConfig.renderCard(selectedItem, true, () => { })
                : renderSelectedCard(selectedItem) }));
    }
    // 편집 모드: 선택된 카드가 있고 변경 모드가 아닌 경우
    if (selectedItem && !isChanging) {
        return (_jsxs("div", { className: "w-full space-y-3", children: [cardConfig?.renderCard
                    ? cardConfig.renderCard(selectedItem, true, () => { })
                    : renderSelectedCard(selectedItem), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("button", { type: "button", onClick: handleToggleChange, className: "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors", children: [_jsx(IconEdit, { size: 16 }), "\uBCC0\uACBD"] }), _jsxs("button", { type: "button", onClick: handleClear, className: "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors", children: [_jsx(IconX, { size: 16 }), "\uC120\uD0DD \uD574\uC81C"] })] })] }));
    }
    // 편집 모드: 변경 중이거나 선택된 카드가 없는 경우
    return (_jsxs("div", { className: "w-full", children: [isChanging && selectedItem && (_jsxs("div", { className: "flex items-center justify-between mb-4 pb-3 border-b border-gray-200", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: "\uB2E4\uB978 \uD56D\uBAA9\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694" }), _jsx("button", { type: "button", onClick: handleToggleChange, className: "text-sm text-gray-500 hover:text-gray-700", children: "\uCDE8\uC18C" })] })), searchFirst && (_jsxs("div", { className: "mb-4", children: [_jsxs("div", { className: "relative flex gap-2", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(IconSearch, { size: 18, className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" }), _jsx("input", { type: "text", value: searchQuery, onChange: handleSearchChange, onKeyDown: handleSearchKeyDown, placeholder: searchPlaceholder ?? "검색어를 입력하세요...", className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" }), searchQuery && (_jsx("button", { type: "button", onClick: () => { setSearchQuery(""); setItems([]); setHasSearched(false); setCurrentPage(0); }, className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600", children: _jsx(IconX, { size: 16 }) }))] }), _jsxs("button", { type: "button", onClick: () => handleServerSearch(searchQuery), disabled: isSearching || isBlank(searchQuery.trim()), className: "px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5", children: [isSearching ? (_jsx("div", { className: "h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" })) : (_jsx(IconSearch, { size: 16 })), "\uAC80\uC0C9"] })] }), (hasSearched || isSearching) && (_jsx("div", { className: "mt-2 text-xs text-gray-500", children: isSearching ? '검색 중...' : `검색 결과: ${items.length}건` }))] })), !searchFirst && needsPagination && (_jsxs("div", { className: "mb-4", children: [_jsxs("div", { className: "relative", children: [_jsx(IconSearch, { size: 18, className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" }), _jsx("input", { type: "text", value: searchQuery, onChange: handleSearchChange, placeholder: "\uC774\uB984\uC73C\uB85C \uAC80\uC0C9...", className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" }), searchQuery && (_jsx("button", { type: "button", onClick: () => { setSearchQuery(""); setCurrentPage(0); }, className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600", children: _jsx(IconX, { size: 16 }) }))] }), _jsxs("div", { className: "mt-2 text-xs text-gray-500", children: ["\uCD1D ", filteredItems.length, "\uAC1C ", searchQuery && `(검색결과)`] })] })), searchFirst && !hasSearched ? (_jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-gray-400", children: [_jsx(IconSearch, { size: 32, className: "mb-3 opacity-50" }), _jsx("p", { className: "text-sm", children: "\uAC80\uC0C9\uC5B4\uB97C \uC785\uB825\uD558\uACE0 \uAC80\uC0C9 \uBC84\uD2BC\uC744 \uD074\uB9AD\uD558\uC138\uC694" })] })) : paginatedItems.length > 0 ? (_jsxs("div", { id: `card-grid-${field.getName()}`, className: gridClassName ?? "grid gap-4", style: !gridClassName
                    ? {
                        gridTemplateColumns: `repeat(${mobileColumns ?? columns}, minmax(0, 1fr))`,
                    }
                    : undefined, children: [!gridClassName && mobileColumns !== undefined && mobileColumns !== columns && (_jsx("style", { children: `
              @media (min-width: 1024px) {
                #card-grid-${field.getName()} {
                  grid-template-columns: repeat(${columns}, minmax(0, 1fr)) !important;
                }
              }
            ` })), paginatedItems.map((item) => {
                        const selected = isItemSelected(item);
                        if (cardConfig?.renderCard) {
                            return cardConfig.renderCard(item, selected, () => handleSelect(item));
                        }
                        return renderSelectableCard(item, selected, () => handleSelect(item));
                    })] })) : (_jsx("div", { className: "flex flex-col items-center justify-center py-8 text-gray-500", children: _jsx("p", { children: searchFirst && hasSearched ? "검색 결과가 없습니다." : (searchQuery ? "검색 결과가 없습니다." : emptyMessage) }) })), needsPagination && totalPages > 1 && (_jsxs("div", { className: "mt-4 flex items-center justify-center gap-2", children: [_jsx("button", { type: "button", onClick: () => handlePageChange(currentPage - 1), disabled: currentPage === 0, className: "p-1.5 rounded-lg border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors", children: _jsx(IconChevronLeft, { size: 18 }) }), _jsx("div", { className: "flex items-center gap-1", children: Array.from({ length: totalPages }, (_, i) => (_jsx("button", { type: "button", onClick: () => handlePageChange(i), className: `min-w-[32px] h-8 px-2 rounded-lg text-sm font-medium transition-colors ${currentPage === i
                                ? "bg-primary text-white"
                                : "text-gray-600 hover:bg-gray-100"}`, children: i + 1 }, i))) }), _jsx("button", { type: "button", onClick: () => handlePageChange(currentPage + 1), disabled: currentPage >= totalPages - 1, className: "p-1.5 rounded-lg border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors", children: _jsx(IconChevronRight, { size: 18 }) })] }))] }));
};
export default CardManyToOneView;
//# sourceMappingURL=CardManyToOneView.js.map