import { InputRendererProps } from '../../../config/Config';
import React from 'react';
import { TooltipColor } from '../../../ui';
interface LinkFieldProps extends InputRendererProps {
    min?: string;
    max?: string;
    tooltip?: {
        label: React.ReactNode;
        color?: TooltipColor;
    };
    className?: string;
}
export declare const LinkFieldView: (props: LinkFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=LinkFieldView.d.ts.map