import React from "react";
import { BreadcrumbItem } from "../ui";
import { ViewEntityFormProps } from '../components/form/types/ViewEntityForm.types';
interface ViewEntityFormWrapperProps {
    props: ViewEntityFormProps;
    breadcrumbs?: BreadcrumbItem[];
    anonymous?: boolean;
    /**
     * 새창(팝업) 모드 여부
     * - true일 때 Breadcrumb 숨김
     * - ViewEntityFormProps에 popupMode 전달
     */
    popupMode?: boolean;
}
export declare const ViewEntityFormWrapper: React.FC<ViewEntityFormWrapperProps>;
export {};
//# sourceMappingURL=ViewEntityFormWrapper.d.ts.map