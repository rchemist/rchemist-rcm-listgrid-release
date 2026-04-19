import { ReactNode } from 'react';
import { EntityField, FieldRenderParameters } from '../../config/EntityField';
import { FormField } from '../fields/abstract';
import { RenderType } from '../../config/Config';
export declare function getInputRendererParameters<TForm extends object = any, TValue = any>(field: FormField<any, TValue, TForm>, params: FieldRenderParameters<TForm, TValue>): Promise<{
    value: any;
    name: string;
    label: import("../../config/Config").LabelType;
    attributes: Map<string, unknown> | undefined;
    entityForm: import("../..").EntityForm<TForm>;
    session?: import("../..").Session;
    onChange: (value: TValue, propagation?: boolean) => void;
    onError?: (message: string) => void;
    clearError?: () => void;
    required?: boolean;
    readonly?: boolean;
    placeHolder?: string;
    helpText?: ReactNode;
    subCollectionEntity?: boolean;
    updateEntityForm?: (updater: (entityForm: import("../..").EntityForm<TForm>) => Promise<import("../..").EntityForm<TForm>>) => Promise<void>;
    resetEntityForm?: (delay?: number, preserveState?: boolean) => Promise<void>;
}>;
export declare function getManyToOneLink(renderType: RenderType, field?: EntityField): Promise<ReactNode>;
//# sourceMappingURL=FieldRendererHelper.d.ts.map