import { jsx as _jsx } from "react/jsx-runtime";
import { FormField } from './abstract';
import QRCode from "qrcode.react";
import { isBlank } from '../../utils/StringUtil';
export class QrField extends FormField {
    constructor(name, order, findValue) {
        super(name, order, 'custom');
        this.findValue = findValue;
    }
    /**
     * QrField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    renderInstance(params) {
        return (async () => {
            const value = await this.findValue(params.entityForm);
            if (isBlank(value)) {
                return null;
            }
            return _jsx(QrViewer, { value: value });
        })();
    }
    /**
     * QrField 인스턴스 생성
     */
    createInstance(name, order) {
        return new QrField(name, order, this.findValue);
    }
}
export const QrViewer = (props) => {
    return _jsx("div", { className: `p-2`, children: _jsx(QRCode, { value: props.value }) });
};
//# sourceMappingURL=QrField.js.map