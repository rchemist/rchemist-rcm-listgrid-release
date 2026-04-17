import { jsx as _jsx } from "react/jsx-runtime";
import NextLink from 'next/link';
import { useRouter, usePathname, useParams, useSearchParams } from 'next/navigation';
const NextLinkComponent = (props) => {
    // next/link accepts href as string | UrlObject; we pass through string.
    return _jsx(NextLink, { ...props });
};
export const nextRouterServices = {
    useRouter() {
        const r = useRouter();
        return {
            push: (url) => r.push(url),
            replace: (url) => r.replace(url),
            refresh: () => r.refresh(),
            back: () => r.back(),
            forward: () => r.forward(),
            prefetch: (url) => r.prefetch(url),
        };
    },
    usePathname() {
        return usePathname() ?? '';
    },
    useParams() {
        return (useParams() ?? {});
    },
    useSearchParams() {
        const sp = useSearchParams();
        // next/navigation returns ReadonlyURLSearchParams — copy to mutable
        // URLSearchParams so call sites that expect to iterate/clone it work.
        return new URLSearchParams(sp?.toString() ?? '');
    },
    Link: NextLinkComponent,
};
//# sourceMappingURL=NextRouterAdapter.js.map