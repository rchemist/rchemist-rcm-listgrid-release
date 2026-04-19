import { FormField } from './abstract';
import { StringField } from './StringField';
import { TextareaField } from './TextareaField';
import { BooleanField } from './BooleanField';
import { NumberField } from './NumberField';
import { DatetimeField } from './DatetimeField';
import { MarkdownField } from './MarkdownField';
import { EntityForm } from '../../config/EntityForm';
import { AddFieldItemProps } from '../../config/EntityFormTypes';
import { SelectOption } from '../../form/Type';
import { SelectField } from './SelectField';
import { ReactNode } from 'react';
export declare const SeoMetadataFields: FormField<any>[];
export interface CommonFieldProps {
    label?: string;
    order?: number;
    name?: string;
}
export declare const AliasField: (props: CheckDuplicatedFieldProps) => StringField;
export declare const ExternalIdField: (props: ExternalIdFieldProps) => StringField;
export declare const NameField: (props?: CommonFieldProps) => StringField;
export declare const LabelField: (props?: CommonFieldProps) => StringField;
export declare const DescriptionField: (props?: CommonFieldProps) => MarkdownField;
export declare const TitleField: (props?: CommonFieldProps) => StringField;
export declare const ContentField: (props?: CommonFieldProps) => MarkdownField;
interface CheckDuplicatedFieldProps extends CommonFieldProps {
    fetchUrl: string;
    entity: string;
    entityName: string;
}
interface ExternalIdFieldProps extends CommonFieldProps {
    fetchUrl: string;
}
export declare const SlugField: (props: CheckDuplicatedFieldProps) => StringField;
interface AvailableDatetimeFieldProps extends CommonFieldProps {
    fieldName?: {
        availableAt: string;
        availableUntil: string;
    };
    fieldLabel?: {
        availableAt: string;
        availableUntil: string;
    };
}
export declare const AvailableDatetimeFields: (target: string, props?: AvailableDatetimeFieldProps) => DatetimeField[];
export declare const StatusDateAndRevisionPreset: (useUpdatedAt?: boolean, useRevision?: boolean) => AddFieldItemProps;
export declare const StatusCreatedAtFieldPreset: AddFieldItemProps;
export declare const StatusCreatedAndUpdatedAtFieldPreset: AddFieldItemProps;
export declare const XrefAtFieldPreset: AddFieldItemProps;
export declare const DeviceTypes: SelectOption[];
export declare const DeviceTypeField: (props?: CommonFieldProps) => SelectField;
export declare const HiddenField: (props?: CommonFieldProps) => BooleanField;
export declare const PriorityField: (props?: CommonFieldProps) => NumberField;
interface ActiveFieldProps extends CommonFieldProps {
    defaultValue?: boolean;
}
export declare const ActiveField: (props?: ActiveFieldProps) => BooleanField;
export declare const MarketingField: (props?: CommonFieldProps) => (StringField | TextareaField)[];
export declare const TooltipDiv: (props: {
    children: ReactNode | ReactNode[];
}) => import("react/jsx-runtime").JSX.Element;
export declare const PublishStatusTypes: SelectOption[];
export declare const DraftPublishStatusTypes: SelectOption[];
export declare const PublishedPublishStatusTypes: SelectOption[];
export declare const DiscardedPublishStatusTypes: SelectOption[];
export declare const PublishStatusFieldPreset: AddFieldItemProps;
export declare function applyPublishStatusEntityForm(entityForm: EntityForm, ...readonlyOnPublishedFields: string[]): EntityForm;
export {};
//# sourceMappingURL=Preset.d.ts.map