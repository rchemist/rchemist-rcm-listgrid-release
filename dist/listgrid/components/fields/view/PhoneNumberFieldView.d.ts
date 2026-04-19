import { Session } from '../../../auth';
import { RenderType } from '../../../config/Config';
interface PhoneNumberFieldViewProps {
    name: string;
    value: string | null | undefined;
    onChange: (value: string, commit?: boolean | undefined) => void;
    onError?: ((message: string) => void) | undefined;
    readonly?: boolean | undefined;
    placeHolder?: string | undefined;
    regex?: {
        pattern: RegExp;
        message: string;
    } | undefined;
    enableSms?: boolean | undefined;
    session?: Session | undefined;
    renderType?: RenderType | undefined;
}
export declare const PhoneNumberFieldView: ({ name, value, onChange, onError, readonly, placeHolder, regex, enableSms, session, renderType, }: PhoneNumberFieldViewProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=PhoneNumberFieldView.d.ts.map