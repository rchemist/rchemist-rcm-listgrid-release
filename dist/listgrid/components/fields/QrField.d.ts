import { FormField } from './abstract';
import { ReactNode } from "react";
import { FieldRenderParameters } from "../../config/EntityField";
import { EntityForm } from '../../config/EntityForm';
export declare class QrField extends FormField<QrField> {
    findValue: (entityForm: EntityForm) => Promise<string>;
    constructor(name: string, order: number, findValue: (entityForm: EntityForm) => Promise<string>);
    /**
     * QrField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    protected renderInstance(params: FieldRenderParameters): Promise<ReactNode | null | undefined>;
    /**
     * QrField 인스턴스 생성
     */
    protected createInstance(name: string, order: number): QrField;
}
interface QrViewerProps {
    value: string;
}
export declare const QrViewer: (props: QrViewerProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=QrField.d.ts.map