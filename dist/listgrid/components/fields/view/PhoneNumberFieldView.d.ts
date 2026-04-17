import { Session } from '../../../auth';
import { RenderType } from '../../../config/Config';
interface PhoneNumberFieldViewProps {
    name: string;
    value: string | null | undefined;
    onChange: (value: string, commit?: boolean) => void;
    onError?: (message: string) => void;
    readonly?: boolean;
    placeHolder?: string;
    regex?: {
        pattern: RegExp;
        message: string;
    };
    enableSms?: boolean;
    session?: Session;
    renderType?: RenderType;
}
export declare const PhoneNumberFieldView: ({ name, value, onChange, onError, readonly, placeHolder, regex, enableSms, session, renderType, }: PhoneNumberFieldViewProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=PhoneNumberFieldView.d.ts.map