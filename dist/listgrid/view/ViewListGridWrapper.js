'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useSession } from '../auth';
import { usePathname } from "../router";
import { Breadcrumb } from "../ui";
import { LoadingOverlay } from "../ui";
import { Skeleton } from "../ui";
import { dynamic } from "../utils/lazy";
import { checkAdminMenuPermission, DEFAULT_MENU_ALIAS } from '../menu/MenuPermissionChecker';
// Dynamic import with better optimization
const ViewListGrid = dynamic(() => import("../components/list/ViewListGrid").then(mod => ({
    default: mod.ViewListGrid
})), {
    ssr: false,
    loading: () => (_jsxs("div", { className: 'relative', children: [_jsx(LoadingOverlay, { visible: true }), _jsx("div", { className: 'w-full h-[400px]' })] }))
});
export const ViewListGridWrapper = React.memo(({ props, breadcrumbs, anonymous }) => {
    const [mounted, setMounted] = useState(false);
    const [permissionType, setPermissionType] = useState();
    const session = useSession();
    const pathname = usePathname();
    // Memoize listGrid options to prevent unnecessary re-renders
    const listGridOptions = useMemo(() => {
        const options = { ...props.options };
        if (permissionType === 'READ') {
            options.readonly = true;
        }
        return options;
    }, [props.options, permissionType]);
    useEffect(() => {
        let isMounted = true;
        let timeoutId;
        (async () => {
            if (anonymous) {
                if (isMounted) {
                    setPermissionType('ALL');
                    setMounted(true);
                }
                return;
            }
            if (pathname === undefined) {
                return;
            }
            // 세션이 undefined인 경우 5초 후 타임아웃 처리
            if (session === undefined) {
                timeoutId = setTimeout(() => {
                    if (isMounted) {
                        console.warn('Session timeout - 5초 후에도 세션을 가져올 수 없습니다.');
                        setPermissionType('NONE');
                        setMounted(true);
                    }
                }, 5000);
                return;
            }
            // 세션이 있으면 타임아웃 클리어
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = undefined;
            }
            try {
                const permissionType = await checkAdminMenuPermission({
                    url: pathname,
                    alias: DEFAULT_MENU_ALIAS
                });
                if (isMounted) {
                    setPermissionType(permissionType);
                    setMounted(true);
                }
            }
            catch (error) {
                console.error('Permission check failed:', error);
                if (isMounted) {
                    setPermissionType('NONE');
                    setMounted(true);
                }
            }
        })();
        return () => {
            isMounted = false;
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [session, pathname, anonymous]);
    // Memoize breadcrumb component
    const breadcrumbComponent = useMemo(() => (_jsx(Breadcrumb, { type: 'basic', items: breadcrumbs })), [breadcrumbs]);
    if (!mounted) {
        return (_jsxs("div", { children: [breadcrumbComponent, _jsx("div", { children: _jsx(Skeleton, { visible: true, children: _jsx("div", { className: 'h-100 w-full' }) }) })] }));
    }
    if (permissionType === 'NONE') {
        return (_jsxs("div", { children: [breadcrumbComponent, _jsx("div", { className: "rcm-permission-denied", children: _jsxs("div", { className: "rcm-permission-denied-inner", children: [_jsx("div", { className: "rcm-permission-denied-icon-wrap", children: _jsx("svg", { className: "rcm-permission-denied-icon", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }) }) }), _jsx("h3", { className: "rcm-permission-denied-title", children: "\uC811\uADFC \uAD8C\uD55C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4" }), _jsxs("p", { className: "rcm-permission-denied-desc", children: ["\uC774 \uD398\uC774\uC9C0\uC5D0 \uC811\uADFC\uD560 \uC218 \uC788\uB294 \uAD8C\uD55C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.", _jsx("br", {}), "\uAD00\uB9AC\uC790\uC5D0\uAC8C \uBB38\uC758\uD558\uC2DC\uAE30 \uBC14\uB78D\uB2C8\uB2E4."] }), _jsx("button", { onClick: () => window.history.back(), className: "rcm-button rcm-button-outline", children: "\uB4A4\uB85C \uAC00\uAE30" })] }) })] }));
    }
    return (_jsxs("div", { children: [breadcrumbComponent, _jsx("div", { children: _jsx(Suspense, { fallback: _jsxs("div", { className: 'relative', children: [_jsx(LoadingOverlay, { visible: true }), _jsx("div", { className: 'w-full h-[400px]' })] }), children: _jsx(ViewListGrid, { ...props, options: listGridOptions }) }) })] }));
});
ViewListGridWrapper.displayName = 'ViewListGridWrapper';
//# sourceMappingURL=ViewListGridWrapper.js.map