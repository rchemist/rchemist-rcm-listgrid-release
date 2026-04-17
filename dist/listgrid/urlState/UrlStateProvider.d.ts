import { ReactNode } from 'react';
import type { QueryStatesSetter, UrlParser, UrlStateServices, UrlStateSetOptions } from './types';
export interface UrlStateProviderProps {
    value: UrlStateServices;
    children: ReactNode;
}
export declare function UrlStateProvider({ value, children }: UrlStateProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useQueryStates(parsers: Record<string, UrlParser<any>>, options?: UrlStateSetOptions): [Record<string, any>, QueryStatesSetter];
//# sourceMappingURL=UrlStateProvider.d.ts.map