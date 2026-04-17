import { ModalOptions } from '../store';
import { ReactNode } from "react";
import { CommonFieldProps } from "../components/fields/Preset";
import { IDataTransferConfig } from "../transfer/Type";
import { FieldGroupInfo, HelpTextType, HiddenType, ReadOnlyType, RequiredType, TabInfo } from "./Config";
import { EntityForm } from "./EntityForm";
import { EntityItem } from "./EntityItem";
import { ColorType } from "../common/type";
export type CopyEntityFormExplicitFieldType = string | CopyEntityFormOverrideFieldProps;
export interface CopyEntityFormToInnerFieldsProps {
    prefix: string;
    entityForm: EntityForm;
    tab?: TabInfo;
    fieldGroup?: FieldGroupInfo;
    excludeFields?: string[];
    explicitFields?: CopyEntityFormExplicitFieldType[];
}
export interface CopyEntityFormOverrideFieldProps extends CommonFieldProps {
    tab?: TabInfo;
    fieldGroup?: FieldGroupInfo;
    helpText?: HelpTextType;
    hidden?: HiddenType;
    readonly?: ReadOnlyType;
    required?: RequiredType;
}
export interface AddFieldItemProps extends AbstractAddFieldProps {
    items: EntityItem[];
    overwrite?: boolean;
}
export interface AbstractAddFieldProps {
    tab?: TabInfo;
    fieldGroup?: FieldGroupInfo;
}
export interface SubmitFormData {
    data: any;
    modifiedFields: string[];
    errors: FieldError[];
    error: boolean;
}
export interface FieldError {
    name: string;
    label: string | ReactNode | false;
    errors: string[];
    tabId?: string;
    errorId?: string;
}
export interface AlertMessageLink {
    type?: 'tab' | 'field' | 'external' | 'modal';
    value: string | ModalOptions;
    target?: '_self' | '_blank' | '_parent' | '_top';
}
export interface AlertMessage {
    key: string;
    message: string | ReactNode;
    description?: ReactNode;
    color: ColorType;
    persistent?: boolean;
    link?: AlertMessageLink;
}
export interface DataTransferConfigProps extends IDataTransferConfig {
    fieldNames?: string[];
}
//# sourceMappingURL=EntityFormTypes.d.ts.map