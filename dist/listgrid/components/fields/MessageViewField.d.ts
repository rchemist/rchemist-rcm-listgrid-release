import { ReactNode } from "react";
import { FieldRenderParameters } from "../../config/EntityField";
import { FormField, FormFieldProps } from "./abstract";
interface MessageViewFieldProps extends FormFieldProps {
    message: ReactNode;
}
export declare class MessageViewField extends FormField<MessageViewField> {
    message: ReactNode;
    constructor(name: string, order: number, message: ReactNode);
    /**
     * MessageViewField 핵심 렌더링 로직
     */
    protected renderInstance(params: FieldRenderParameters): Promise<ReactNode | null>;
    /**
     * MessageViewField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): MessageViewField;
    static create(props: MessageViewFieldProps): MessageViewField;
}
export {};
//# sourceMappingURL=MessageViewField.d.ts.map