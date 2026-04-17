import { ReactNode } from 'react';
import type { RouterApi, RouterLinkProps, RouterServices } from './types';
export interface RouterProviderProps {
    value: RouterServices;
    children: ReactNode;
}
export declare function RouterProvider({ value, children }: RouterProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useRouter(): RouterApi;
export declare function usePathname(): string;
export declare function useParams(): Record<string, string | string[] | undefined>;
export declare function useSearchParams(): URLSearchParams;
export declare function Link(props: RouterLinkProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=RouterProvider.d.ts.map