import { FieldError } from '../../../config/EntityFormTypes';
interface ViewEntityErrorProps {
    errors?: Map<string, FieldError[]>;
    onTabChange?: (tabIndex: number) => void;
    tabs?: Array<{
        id: string;
        label: string;
    }>;
    entityForm?: any;
}
export declare const ViewEntityError: (props: ViewEntityErrorProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=ViewEntityError.d.ts.map