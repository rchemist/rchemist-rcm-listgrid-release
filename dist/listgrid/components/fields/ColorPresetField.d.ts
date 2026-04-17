import { ReactNode } from "react";
import { FieldRenderParameters } from "../../config/EntityField";
import { ListableFormField, ViewListProps, ViewListResult } from "./abstract";
export declare class ColorPresetField extends ListableFormField<ColorPresetField> {
    presets?: string[];
    constructor(name: string, order: number, presets?: string[]);
    /**
     * ColorPresetField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    protected renderInstance(params: FieldRenderParameters): Promise<ReactNode | null>;
    /**
     * ColorPresetField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): ColorPresetField;
    /**
     * ColorPresetField 리스트 아이템 렌더링 (원본 renderListItem 로직 보존)
     */
    protected renderListItemInstance(props: ViewListProps): Promise<ViewListResult>;
}
//# sourceMappingURL=ColorPresetField.d.ts.map