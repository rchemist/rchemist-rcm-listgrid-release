'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tooltip } from '../../../ui';
import { useLoadingStore } from '../../../loading';
import { Icon } from '@iconify/react';
import { IconBaselineDensityMedium, IconChevronUp, IconExternalLink, IconEye, } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { ViewColumn } from './ViewColumn';
import { usePathname, useRouter } from '../../../router';
import { showAlert } from '../../../message';
import { isTrue } from '../../../utils/BooleanUtil';
import { useModalManagerStore } from '../../../store';
import { ViewEntityForm } from '../../form/ViewEntityForm';
import { useListGridTheme } from '../context/ListGridThemeContext';
import { SubCollectionInlineView } from './SubCollectionInlineView';
export const ViewRows = (props) => {
    const managePriority = props.managePriority;
    const { enableCheckItem, sortableList, checkedItems, onDrag, item, index, checkItem, totalCount, draggable, startNumber, selectionOptions, showCheckboxInput, openInNewWindow, isAdmin, onSelect, entityForm, inlineExpansion, isSubCollection, mappedBy, inlineViewReadonly, } = props;
    // Check if this item is expanded inline
    const isInlineExpanded = inlineExpansion?.isExpanded(item.id) ?? false;
    const [accordionView, setAccordionView] = useState();
    const [showAccordion, setShowAccordion] = useState(false);
    const [key, setKey] = useState('init');
    const [isMobile, setIsMobile] = useState(false);
    const { setOpenBaseLoading } = useLoadingStore();
    const { openModal, closeModal } = useModalManagerStore();
    const { classNames: themeClasses } = useListGridTheme();
    // 모바일 감지 (768px 이하)
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    const router = useRouter();
    const pathname = usePathname();
    const accordionMode = props.useAccordion ?? false;
    const openInNewWindowEnabled = isTrue(openInNewWindow?.enabled);
    // 검색/선택 모드 여부 (ManyToOne 등에서 사용)
    const isSearchMode = !!onSelect;
    // 새창 열기 버튼 표시 여부 결정 (관리자 권한 필요, 검색 모드가 아닐 때만)
    const showOpenInNewWindowButton = openInNewWindowEnabled &&
        isAdmin &&
        !isSearchMode &&
        (!openInNewWindow?.showFilter || openInNewWindow.showFilter(item));
    // 검색 모드에서 보기 버튼 표시 여부
    const showViewButton = isSearchMode && entityForm;
    // 새창으로 엔티티 열기
    const handleOpenInNewWindow = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!item.id)
            return;
        // 현재 pathname 기반으로 상세 페이지 URL 생성 (쿼리 파라미터로 popup 모드 전달)
        const entityPath = pathname || '';
        const popupUrl = `${entityPath}/${item.id}?popup=true`;
        // localStorage에서 저장된 팝업 크기 읽기 (경로별로 별도 저장)
        const storageKey = `popup_size:${entityPath}`;
        let width;
        let height;
        try {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                const parsed = JSON.parse(saved);
                width = Math.min(parsed.width || 1200, window.screen.availWidth);
                height = Math.min(parsed.height || 800, window.screen.availHeight);
            }
            else {
                width = Math.min(openInNewWindow?.windowFeatures?.width || 1200, window.screen.availWidth);
                height = Math.min(openInNewWindow?.windowFeatures?.height || 800, window.screen.availHeight);
            }
        }
        catch {
            width = Math.min(openInNewWindow?.windowFeatures?.width || 1200, window.screen.availWidth);
            height = Math.min(openInNewWindow?.windowFeatures?.height || 800, window.screen.availHeight);
        }
        const left = Math.max(0, (window.screen.availWidth - width) / 2);
        const top = Math.max(0, (window.screen.availHeight - height) / 2);
        const windowFeatures = `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`;
        // entity ID를 윈도우 이름으로 사용하여 중복 창 방지
        const windowName = `entity_${item.id}`;
        const popup = window.open(popupUrl, windowName, windowFeatures);
        // 팝업 창 크기 변경을 감지하여 localStorage에 저장
        if (popup) {
            let lastWidth = width;
            let lastHeight = height;
            const sizeTracker = setInterval(() => {
                if (popup.closed) {
                    clearInterval(sizeTracker);
                    return;
                }
                try {
                    const w = popup.outerWidth;
                    const h = popup.outerHeight;
                    if (w > 0 && h > 0 && (w !== lastWidth || h !== lastHeight)) {
                        lastWidth = w;
                        lastHeight = h;
                        localStorage.setItem(storageKey, JSON.stringify({ width: w, height: h }));
                    }
                }
                catch {
                    clearInterval(sizeTracker);
                }
            }, 1000);
        }
    };
    // 검색 모드에서 엔티티 상세 보기 (모달)
    const handleViewEntity = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!item.id || !entityForm)
            return;
        const modalId = `search-view-entity-${item.id}`;
        const viewEntityForm = entityForm.clone(true).withId(item.id).withTitle('상세 정보');
        const titleStr = typeof entityForm.title === 'string' ? entityForm.title : entityForm.title?.title || '정보';
        openModal({
            modalId,
            title: `${titleStr} 조회`,
            size: '5xl',
            content: (_jsx(ViewEntityForm, { entityForm: viewEntityForm, buttonLinks: {
                    onClickList: async () => closeModal(modalId),
                }, subCollection: true, readonly: true })),
        });
    };
    async function toggleAccordion() {
        setShowAccordion(!showAccordion);
        setOpenBaseLoading(true);
        if (accordionView === null || accordionView === undefined) {
            const view = await props.useAccordion.render(item, () => {
                if (props.onRefresh) {
                    props.onRefresh();
                }
                else {
                    router.refresh?.();
                    setTimeout(() => {
                        setOpenBaseLoading(false);
                    }, 100);
                }
            });
            setAccordionView(view);
            setKey(new Date().toTimeString());
            setOpenBaseLoading(false);
        }
        else {
            setKey(new Date().toTimeString());
            setAccordionView(null);
            setOpenBaseLoading(false);
        }
    }
    // Toggle inline expansion for SubCollection (모바일에서는 모달로 표시)
    function toggleInlineExpansion() {
        if (!inlineExpansion || !entityForm)
            return;
        // 모바일: 모달로 표시
        if (isMobile) {
            const modalId = `inline-view-entity-${item.id}`;
            const viewEntityForm = entityForm.clone(true).withId(item.id).withTitle('상세 정보');
            const mobileTitleStr = typeof entityForm.title === 'string' ? entityForm.title : entityForm.title?.title || '정보';
            openModal({
                modalId,
                title: `${mobileTitleStr} 조회`,
                size: '5xl',
                content: (_jsx(ViewEntityForm, { entityForm: viewEntityForm, buttonLinks: {
                        onClickList: async () => closeModal(modalId),
                        ...(props.onRefresh
                            ? {
                                onSave: {
                                    success: () => {
                                        props.onRefresh();
                                    },
                                },
                                onDelete: {
                                    success: () => {
                                        props.onRefresh();
                                        closeModal(modalId);
                                    },
                                },
                            }
                            : {}),
                    }, subCollection: true, readonly: props.viewMode === 'popup' || inlineViewReadonly === true, ...(mappedBy !== undefined ? { hideMappedByFields: mappedBy } : {}) })),
            });
            return;
        }
        // 데스크톱: 인라인 확장
        inlineExpansion.toggleExpansion(item.id);
    }
    // 테마에서 행 및 셀 클래스 가져오기
    const baseRowClass = `${themeClasses.row?.row ?? ''} ${themeClasses.row?.hover ?? 'hover:bg-gray-50 dark:hover:bg-dark/30'} ${themeClasses.row?.clickable ?? 'cursor-pointer'}`;
    // 확장된 행 스타일 - 배경색으로 연결감 표현 (데스크톱 전용)
    const expandedRowClass = isInlineExpanded && !isMobile ? 'bg-gray-200 !hover:bg-gray-200' : '';
    const rowClass = `${baseRowClass} ${expandedRowClass} transition-all duration-200`;
    const cellClass = themeClasses.cell?.cell ?? '';
    const checkboxCellClass = themeClasses.cell?.checkboxCell ?? 'w-[50px]';
    const dragHandleCellClass = themeClasses.cell?.dragHandleCell ?? 'w-[30px] cursor-grab';
    const openNewWindowCellClass = themeClasses.cell?.openNewWindowCell ?? 'hidden md:table-cell';
    return (_jsxs(React.Fragment, { children: [_jsxs("tr", { className: rowClass, children: [managePriority && (_jsx("td", { className: dragHandleCellClass, children: _jsx(IconBaselineDensityMedium, { className: 'w-4 h-4' }) })), enableCheckItem && (_jsx("td", { className: `${checkboxCellClass} whitespace-nowrap space-x-1`, children: (() => {
                            // showCheckboxInput이 false면 번호만 표시
                            if (!showCheckboxInput) {
                                return _jsx("span", { className: 'font-normal', children: startNumber - index });
                            }
                            // 선택 가능 여부 체크
                            const isSelectable = !selectionOptions?.selectableFilter || selectionOptions.selectableFilter(item);
                            return (_jsxs("label", { htmlFor: `${item.id}`, className: 'font-normal', children: [_jsx("input", { type: 'checkbox', className: 'form-checkbox', id: `${item.id}`, checked: checkedItems.includes(item.id), disabled: !isSelectable, onChange: () => {
                                            // 선택 제한 검증
                                            if (selectionOptions?.maxSelection && !checkedItems.includes(item.id)) {
                                                if (checkedItems.length >= selectionOptions.maxSelection) {
                                                    showAlert({
                                                        message: `최대 ${selectionOptions.maxSelection}개까지만 선택 가능합니다.`,
                                                        topLayer: true,
                                                    });
                                                    return;
                                                }
                                            }
                                            // 선택 검증
                                            if (selectionOptions?.validateSelection) {
                                                const newCheckedItems = checkedItems.includes(item.id)
                                                    ? checkedItems.filter((id) => id !== item.id)
                                                    : [...checkedItems, item.id];
                                                const validation = selectionOptions.validateSelection(newCheckedItems);
                                                if (!validation.valid) {
                                                    showAlert({
                                                        message: validation.message || '선택할 수 없습니다.',
                                                        topLayer: true,
                                                    });
                                                    return;
                                                }
                                            }
                                            checkItem(item.id);
                                            // 선택 변경 콜백
                                            if (selectionOptions?.onSelectionChange) {
                                                const newCheckedItems = checkedItems.includes(item.id)
                                                    ? checkedItems.filter((id) => id !== item.id)
                                                    : [...checkedItems, item.id];
                                                selectionOptions.onSelectionChange(newCheckedItems, props.list);
                                            }
                                        } }), startNumber - index] }));
                        })() })), showOpenInNewWindowButton && (_jsx("td", { className: `${openNewWindowCellClass} whitespace-nowrap`, children: _jsx(Tooltip, { label: openInNewWindow?.tooltip || '새창에서 열기', children: _jsx("button", { className: 'btn btn-outline-secondary btn-sm p-1 min-w-[32px] min-h-[32px] flex items-center justify-center', onClick: handleOpenInNewWindow, children: _jsx(IconExternalLink, { className: 'w-4 h-4' }) }) }) })), inlineExpansion && (_jsx("td", { className: `${themeClasses.cell?.selectCell ?? ''} whitespace-nowrap`, children: _jsx(Tooltip, { label: isInlineExpanded ? '접기' : '펼치기', children: _jsx("button", { className: `btn btn-sm p-1 min-w-[32px] min-h-[32px] flex items-center justify-center ${isInlineExpanded ? 'btn-secondary' : 'btn-outline-info'}`, onClick: (e) => {
                                    e.stopPropagation();
                                    toggleInlineExpansion();
                                }, children: isInlineExpanded ? (_jsx(IconChevronUp, { className: 'w-4 h-4' })) : (_jsx(IconEye, { className: 'w-4 h-4' })) }) }) })), showViewButton && !inlineExpansion && (_jsx("td", { className: `${themeClasses.cell?.selectCell ?? ''} whitespace-nowrap`, children: _jsx(Tooltip, { label: '상세 보기', children: _jsx("button", { className: 'btn btn-outline-info btn-sm p-1 min-w-[32px] min-h-[32px] flex items-center justify-center', onClick: handleViewEntity, children: _jsx(IconEye, { className: 'w-4 h-4' }) }) }) })), openInNewWindowEnabled && isAdmin && !showOpenInNewWindowButton && !isSearchMode && (_jsx("td", { className: `${openNewWindowCellClass} whitespace-nowrap` })), _jsx(ViewColumn, { ...props, ...(() => {
                            // Priority: inline expansion > accordion > undefined
                            const clickAccordion = inlineExpansion
                                ? toggleInlineExpansion
                                : accordionMode
                                    ? toggleAccordion
                                    : undefined;
                            return clickAccordion !== undefined ? { clickAccordion } : {};
                        })(), viewMode: props.viewMode }), draggable && (_jsx("td", { className: 'whitespace-nowrap space-x-1', children: (function () {
                            const sortButtons = [];
                            if (totalCount < 1) {
                                return sortButtons;
                            }
                            if (index < totalCount) {
                                // 아래로 내리기
                                sortButtons.push(_jsx(Tooltip, { label: `아래로 내리기`, children: _jsx("button", { className: 'btn-outline-secondary', onClick: () => {
                                            const items = [...sortableList];
                                            const temp = items[index + 1];
                                            items[index + 1] = items[index];
                                            items[index] = temp;
                                            onDrag(items);
                                        }, children: _jsx(Icon, { icon: "mingcute:arrow-down-circle-fill", className: `h-[24px] w-[24px]` }) }) }, `btn_down_${index}`));
                            }
                            if (index > 0) {
                                // 위로 올리기
                                sortButtons.push(_jsx(Tooltip, { label: `위로 올리기`, children: _jsx("button", { className: 'btn-outline-secondary', onClick: () => {
                                            const items = [...sortableList];
                                            const temp = items[index - 1];
                                            items[index - 1] = items[index];
                                            items[index] = temp;
                                            onDrag(items);
                                        }, children: _jsx(Icon, { icon: "mingcute:arrow-up-circle-fill", className: `h-[24px] w-[24px]` }) }) }, `btn_up_${index}`));
                            }
                            return sortButtons;
                        })() }))] }, `tr_${index}_${key}`), showAccordion && (_jsx("tr", { children: _jsx("td", { colSpan: props.fields.length + 2, className: `${accordionView && 'p-2'}`, children: _jsx("div", { className: 'w-full', children: accordionView }) }) }, `row_accordion_${index}`)), isInlineExpanded && inlineExpansion && !isMobile && (_jsx("tr", { children: _jsx("td", { colSpan: props.fields.length +
                        (enableCheckItem ? 1 : 0) +
                        (showOpenInNewWindowButton ? 1 : 0) +
                        (inlineExpansion ? 1 : 0) +
                        (showViewButton && !inlineExpansion ? 1 : 0) +
                        (managePriority ? 1 : 0) +
                        (draggable ? 1 : 0), className: "rcm-row-expansion-cell", style: { maxWidth: '1px' }, children: _jsx(SubCollectionInlineView, { entityForm: entityForm.clone(true).withId(item.id), itemId: item.id, isExpanded: true, onCollapse: () => inlineExpansion.collapseItem(item.id), readonly: props.viewMode === 'popup' || inlineViewReadonly === true, ...(props.onRefresh !== undefined ? { onSave: props.onRefresh } : {}), ...(props.onRefresh !== undefined ? { onDelete: props.onRefresh } : {}), ...(mappedBy !== undefined ? { mappedBy } : {}) }) }) }, `row_inline_${index}`))] }));
};
//# sourceMappingURL=ViewRows.js.map