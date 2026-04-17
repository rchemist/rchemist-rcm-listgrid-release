import React from "react";
export type FilterDropdownSize = 'sm' | 'md' | 'lg';
export type FilterDropdownPlacement = 'left' | 'right';
interface FilterDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    onApply?: () => void;
    onClear?: () => void;
    size?: FilterDropdownSize;
    placement?: FilterDropdownPlacement;
    anchorRef?: React.RefObject<HTMLElement | null>;
}
export declare const FilterDropdown: ({ isOpen, onClose, children, onApply, onClear, size, placement, anchorRef, }: FilterDropdownProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FilterDropdown.d.ts.map