import { Address } from './AddressMapField';
interface PostCodeSelectorProps {
    address?: Address | undefined;
    onSubmit: (address: Address) => void;
    onRemove?: (() => void) | undefined;
    required: boolean;
}
export declare const PostCodeSelector: (props: PostCodeSelectorProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=PostCodeSelector.d.ts.map