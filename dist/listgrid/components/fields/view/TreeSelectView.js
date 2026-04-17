/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
'use client';
import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Tree } from "../../../ui";
import { LoadingOverlay } from "../../../ui";
import { getExternalApiDataWithError } from "../../../misc";
import { isTrue } from '../../../utils/BooleanUtil';
import { Tooltip } from "../../../ui";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
export const TreeSelectView = ({ readonly = false, ...props }) => {
    const [treeData, setTreeData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const selectable = isTrue(props.selectable, true);
    const config = props.tree;
    useEffect(() => {
        if (props.tree.treeData !== undefined) {
            setTreeData(props.tree.treeData);
            setLoading(false);
        }
        else {
            fetchTreeData();
        }
    }, []);
    if (loading)
        return _jsxs("div", { className: 'relative', children: [_jsx(LoadingOverlay, { visible: true }), _jsx("div", { className: 'w-full h-[200px]' })] });
    if (isEmpty(treeData)) {
        return _jsx("div", { children: "\uB4F1\uB85D\uB41C \uB370\uC774\uD130\uAC00 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." });
    }
    return _jsxs("div", { children: [_jsx("div", { className: 'text-danger text-sm pb-2', children: error }), _jsx("div", { className: 'flex items-start min-h-[200px] w-full', children: _jsx(Tree, { data: treeData, className: 'w-full', levelOffset: 20, expandOnClick: false, selectOnClick: selectable, maxHeight: "60vh" // Enable auto scroll for long trees
                    , enhancedRendering: true, levelStyles: {
                        fontWeight: true // Apply font weight differentiation by level
                    }, renderNode: selectable ? ({ level, node, tree, expanded, hasChildren, elementProps }) => {
                        // Only customize rendering when selection is needed
                        // 선택이 필요한 경우에만 렌더링 커스터마이징
                        return (_createElement("div", { ...elementProps, key: `${node.value}-${level}`, className: "w-full flex items-center py-1", style: { paddingLeft: `${(level - 1) * 20}px` } },
                            _jsx("div", { className: "flex items-center justify-center w-6 h-6 mr-2 flex-shrink-0", children: hasChildren ? (_jsx("button", { className: "flex items-center justify-center w-5 h-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded hover:bg-gray-200 dark:hover:bg-gray-700", onClick: (e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        tree.toggleExpanded(node.value);
                                    }, "aria-label": expanded ? "Collapse" : "Expand", children: expanded ? (_jsx(IconChevronDown, { size: 14 })) : (_jsx(IconChevronRight, { size: 14 })) })) : (
                                /* Empty space for leaf nodes to maintain alignment */
                                /* 리프 노드를 위한 빈 공간으로 정렬 유지 */
                                _jsx("div", { className: "w-5 h-5 flex items-center justify-center", children: _jsx("div", { className: "w-1 h-1 bg-gray-400 rounded-full" }) })) }),
                            ((isTrue(config.rootSelectable, true) || level !== 1) &&
                                (isTrue(config.leafSelectable, true) || hasChildren)) ? (_jsx(Tooltip, { label: `${node.label} 선택`, zIndex: 10000, children: _jsx("button", { className: `flex-1 text-left py-2 px-3 rounded-md transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-transparent hover:border-blue-200 dark:hover:border-blue-800 font-medium text-gray-900 dark:text-gray-100`, onClick: (e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        if (readonly)
                                            return;
                                        let disabled = config.exceptId !== undefined && config.exceptId === node.value;
                                        if (!disabled) {
                                            if (isNodeInExceptTree(node, config.exceptId)) {
                                                disabled = true;
                                            }
                                        }
                                        if (disabled) {
                                            setError('자기 자신 또는 자기 자신의 하위 데이터는 선택할 수 없습니다.');
                                            return;
                                        }
                                        setError('');
                                        props.onSelect({ id: node.value, name: node.label });
                                    }, children: node.label }) })) : (_jsx("span", { className: "flex-1 py-2 px-3 text-gray-400 dark:text-gray-500 text-sm", children: node.label }))));
                    } : undefined }) })] });
    function fetchTreeData() {
        if (config.treeData !== undefined) {
            setTreeData(config.treeData);
        }
        else {
            const fetchConfig = config.fetch;
            const url = fetchConfig.url;
            const method = fetchConfig.method ?? 'GET';
            const requestBody = fetchConfig.requestBody;
            const convert = fetchConfig.convert;
            (async () => {
                const response = await getExternalApiDataWithError({
                    url: url,
                    method: method,
                    formData: method === 'GET' ? undefined : requestBody
                });
                if (response.data) {
                    if (convert !== undefined) {
                        response.data = convert(response.data);
                    }
                    setTreeData(response.data);
                    setLoading(false);
                }
                else {
                    setError(response.error ?? '데이터를 조회할 수 없습니다.');
                    setLoading(false);
                }
            })();
        }
    }
    function isNodeInExceptTree(node, exceptId) {
        if (!exceptId)
            return false;
        // Define a recursive function to search for exceptId in the tree
        const searchTree = (currentNode) => {
            if (!currentNode)
                return false;
            if (currentNode.value === exceptId)
                return true;
            if (currentNode.children) {
                for (const child of currentNode.children) {
                    if (searchTree(child)) {
                        return true;
                    }
                }
            }
            return false;
        };
        return searchTree(node);
    }
    function isEmpty(data) {
        return data.length === 0;
    }
};
//# sourceMappingURL=TreeSelectView.js.map