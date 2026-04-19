import { HelpTextType, HiddenType, LabelType, ReadOnlyType, TooltipType, ViewPreset } from '../config/Config';
import { ReactNode } from 'react';
import { FieldInfoParameters } from '../config/EntityField';
export interface EntityItem {
    order: number;
    name: string;
    label?: LabelType | undefined;
    helpText?: HelpTextType | undefined;
    hidden?: HiddenType | undefined;
    readonly?: ReadOnlyType | undefined;
    hideLabel?: boolean | undefined;
    form?: {
        tabId: string;
        fieldGroupId: string;
    } | undefined;
    clone(includeValue?: boolean): any;
    getTabId(): string;
    getFieldGroupId(): string;
    /**
     * 필드가 표시될 tab의 id 를 지정합니다.
     * 보통 이 메소드는 EntityForm#addFields 에서 처리되므로 별도로 사용할 필요가 없습니다.
     * @param tabId
     */
    withTabId(tabId: string): this;
    /**
     * 필드가 표시될 fieldGroup 의 id 를 지정합니다.
     * 보통 이 메소드는 EntityForm#addFields 에서 처리되므로 별도로 사용할 필요가 없습니다.
     * @param fieldGroupId
     */
    withFieldGroupId(fieldGroupId: string): this;
    /**
     * Entity 의 상태(신규/수정)에 따라 readonly, hidden 을 ViewPreset 으로 지정해 사용할 수 있습니다.
     * @param type
     */
    withViewPreset(type: ViewPreset): this;
    /**
     * 필드 입력폼 하단에 출력될 helpText 를 지정할 수 있습니다.
     * @param helpText
     */
    withHelpText(helpText?: HelpTextType): this;
    /**
     * 필드 전체에 툴팁을 씌울 수 있다.
     * @param tooltip
     */
    withTooltip(tooltip?: TooltipType): this;
    /**
     * 필드의 visible 옵션을 설정할 수 있습니다.
     * @param hidden
     */
    withHidden(hidden?: HiddenType): this;
    /**
     * 필드 입력폼의 라벨에 표시될 내용을 설정할 수 있습니다.
     * @param label
     */
    withLabel(label?: LabelType): this;
    /**
     * 필드가 readonly 인지 여부를 설정할 수 있습니다.
     * @param readOnly
     */
    withReadOnly(readOnly?: ReadOnlyType): this;
    /**
     * 이 필드의 hideLabel 을 지정한다.
     * @param hideLabel
     */
    withHideLabel(hideLabel?: boolean): this;
    /**
     * 필드의 표시 순서를 설정합니다.
     * @param order
     */
    withOrder(order: number): this;
    getOrder(): number;
    getName(): string;
    getLabel(): LabelType;
    getHelpText(props: FieldInfoParameters): Promise<ReactNode>;
    isHidden(props: FieldInfoParameters): Promise<boolean>;
    isReadonly(props: FieldInfoParameters): Promise<boolean>;
    /**
     * 필드가 표시될 tabId 와 fieldGroupId 를 설정합니다.
     * withTabId, withFieldGroupId 를 한번에 지정하는 것과 같습니다.
     * @param form
     */
    withForm(form: {
        tabId: string;
        fieldGroupId: string;
    }): this;
}
//# sourceMappingURL=EntityItem.d.ts.map