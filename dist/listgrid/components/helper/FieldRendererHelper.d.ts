import { ReactNode } from "react";
import { EntityField, FieldRenderParameters } from "../../config/EntityField";
import { FormField } from "../fields/abstract";
import { RenderType } from "../../config/Config";
export declare function getInputRendererParameters(field: FormField<any>, params: FieldRenderParameters): Promise<{
    value: any;
    name: string;
    label: import("../../config/Config").LabelType;
    attributes: Map<string, any> | undefined;
    entityForm: import("../..").EntityForm;
    session?: import("../..").Session;
    onChange: (value: any, propagation?: boolean) => void;
    onError?: (message: string) => void;
    clearError?: () => void;
    required?: boolean;
    readonly?: boolean;
    placeHolder?: string;
    helpText?: ReactNode;
    subCollectionEntity?: boolean;
    updateEntityForm?: (updater: (entityForm: import("../..").EntityForm) => Promise<import("../..").EntityForm>) => Promise<void>;
    resetEntityForm?: (delay?: number, preserveState?: boolean) => Promise<void>;
}>;
export declare function getManyToOneLink(renderType: RenderType, field?: EntityField): Promise<ReactNode>;
//# sourceMappingURL=FieldRendererHelper.d.ts.map