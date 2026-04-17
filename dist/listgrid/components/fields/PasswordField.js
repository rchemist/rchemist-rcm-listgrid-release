import { jsx as _jsx } from "react/jsx-runtime";
import { PasswordValidation } from '../../validations/PasswordValidation';
import { FormField } from './abstract';
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
import { PasswordStrengthView } from "../../ui";
import { TextInput } from "../../ui";
import { RegexValidation } from "../../validations/RegexValidation";
export class PasswordField extends FormField {
    constructor(name, order, validations, strength) {
        super(name, order, 'password');
        if (validations) {
            this.validations = [...validations];
        }
        else {
            this.validations = [new PasswordValidation()];
        }
        if (strength) {
            this.strength = strength;
            if (strength.regex) {
                const newValidations = [];
                for (const regex of strength.regex) {
                    newValidations.push(new RegexValidation('passwordStrength-' + name, regex.pattern, regex.error));
                }
                this.validations = [...this.validations, ...newValidations];
            }
        }
    }
    /**
     * PasswordField 핵심 렌더링 로직
     */
    renderInstance(params) {
        if (this.strength === undefined) {
            return (async () => {
                return _jsx(TextInput, { ...await getInputRendererParameters(this, params) });
            })();
        }
        return (async () => {
            return _jsx(PasswordStrengthView, { strength: this.strength, ...await getInputRendererParameters(this, params) });
        })();
    }
    /**
     * PasswordField 인스턴스 생성
     */
    createInstance(name, order) {
        return new PasswordField(name, order)
            .withStrength(this.strength);
    }
    withStrength(strength) {
        this.strength = strength;
        // strength 필드를 사용하는 경우 기본 validation 을 사용하지 않는다.
        if (strength !== undefined && this.validations !== undefined && this.validations.length > 0) {
            const newValidations = [];
            for (const validation of this.validations) {
                if (validation.id !== 'PasswordValidation') {
                    newValidations.push({ ...validation });
                }
            }
            // Add RegexValidation from strength.regex
            if (strength.regex) {
                for (const regex of strength.regex) {
                    newValidations.push(new RegexValidation('passwordStrength-' + this.name, regex.pattern, regex.error));
                }
            }
            this.validations = newValidations;
        }
        return this;
    }
    static create(props) {
        return new PasswordField(props.name, props.order, props.validations, props.strength)
            .copyFields(props, true);
    }
}
//# sourceMappingURL=PasswordField.js.map