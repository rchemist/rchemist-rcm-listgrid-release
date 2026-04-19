import { jsx as _jsx } from "react/jsx-runtime";
import { FormField } from './abstract';
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
import { UserView } from '../../ui';
export class ProfileField extends FormField {
    constructor(name, order) {
        super(name, order, 'custom');
        this.hideLabel = true;
        this.readonly = true;
    }
    /**
     * ProfileField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    renderInstance(params) {
        return (async () => {
            return _jsx(UserView, { ...await getInputRendererParameters(this, params) });
        })();
    }
    /**
     * ProfileField 인스턴스 생성
     */
    createInstance(name, order) {
        return new ProfileField(name, order);
    }
}
//# sourceMappingURL=ProfileField.js.map