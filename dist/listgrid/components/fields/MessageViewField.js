import { jsx as _jsx } from "react/jsx-runtime";
import { FormField } from './abstract';
export class MessageViewField extends FormField {
    constructor(name, order, message) {
        super(name, order, 'custom');
        this.readonly = true;
        this.hideLabel = true;
        this.message = message;
    }
    /**
     * MessageViewField 핵심 렌더링 로직
     */
    renderInstance(params) {
        return (async () => {
            return _jsx("div", { children: this.message });
        })();
    }
    /**
     * MessageViewField 인스턴스 생성
     */
    createInstance(name, order) {
        return new MessageViewField(name, order, this.message);
    }
    static create(props) {
        return new MessageViewField(props.name, props.order, props.message).copyFields(props, true);
    }
}
//# sourceMappingURL=MessageViewField.js.map