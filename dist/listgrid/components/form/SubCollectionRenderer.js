'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { getTranslation } from '../../utils/i18n';
import { LoadingOverlay } from '../../ui';
import { ViewHelpText } from './ui/ViewHelpText';
import { isTrue } from '../../utils/BooleanUtil';
export const SubCollectionRenderer = ({ collection, entityForm, session, }) => {
    const { t } = getTranslation();
    // 서브콜렉션 렌더링, 마운트 상태, 도움말 상태
    // State for sub-collection view, mounted state, and help text
    const [view, setView] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [helpText, setHelpText] = useState(null);
    useEffect(() => {
        if (!mounted) {
            (async () => {
                // 서브콜렉션 렌더링 및 도움말 비동기 조회
                // Async fetch for sub-collection view and help text
                const params = { entityForm, ...(session !== undefined ? { session } : {}) };
                setView(await collection.render(params));
                setHelpText(await collection.getHelpText(params));
                setMounted(true);
            })();
        }
    }, []);
    const label = collection.getLabel();
    const hideLabel = isTrue(collection.hideLabel);
    // 마운트 전에는 로딩 오버레이 표시
    // Show loading overlay before mount
    if (!mounted) {
        return (_jsxs("div", { className: 'relative', children: [_jsx(LoadingOverlay, { visible: true }), _jsx("div", { className: 'w-full h-[400px]' })] }));
    }
    return (_jsxs("div", { children: [!hideLabel && (_jsx("div", { children: _jsx("label", { children: viewLabel(label) }) })), _jsx("div", { children: view }), _jsx(ViewHelpText, { helpText: helpText })] }));
    /**
     * viewLabel
     * - 라벨이 string이면 번역, 아니면 그대로 반환
     * - If label is string, translate; otherwise, return as is
     */
    function viewLabel(label) {
        if (typeof label === 'string') {
            return t(label);
        }
        return label;
    }
};
//# sourceMappingURL=SubCollectionRenderer.js.map