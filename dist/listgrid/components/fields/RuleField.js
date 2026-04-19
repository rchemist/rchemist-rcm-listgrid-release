import { jsx as _jsx } from "react/jsx-runtime";
import { FormField } from './abstract';
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
import { RuleFieldView } from './rule/RuleFieldView';
export class RuleField extends FormField {
    constructor(name, order, ...entityForms) {
        super(name, order, 'custom');
        this.entityForms = entityForms;
    }
    withEntityForms(entityForms) {
        this.entityForms = entityForms;
        return this;
    }
    createInstance(name, order) {
        return new RuleField(name, order, ...this.entityForms);
    }
    renderInstance(params) {
        return (async () => {
            return Promise.resolve(_jsx(RuleFieldView, { ...await getInputRendererParameters(this, { ...params }), entityForms: this.entityForms, onSubmit: (value) => {
                    params.onChange(value);
                } }));
        })();
    }
}
//# sourceMappingURL=RuleField.js.map