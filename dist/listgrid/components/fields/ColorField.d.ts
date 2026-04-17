import { ReactNode } from "react";
import { FieldRenderParameters } from "../../config/EntityField";
import { ListableFormField, ViewListProps, ViewListResult } from "./abstract";
export declare class ColorField extends ListableFormField<ColorField> {
    constructor(name: string, order: number);
    /**
     * ColorField 핵심 렌더링 로직
     */
    protected renderInstance(params: FieldRenderParameters): Promise<ReactNode | null>;
    /**
     * ColorField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): ColorField;
    /**
     * ColorField 리스트 아이템 렌더링
     */
    protected renderListItemInstance(props: ViewListProps): Promise<ViewListResult>;
}
//# sourceMappingURL=ColorField.d.ts.map