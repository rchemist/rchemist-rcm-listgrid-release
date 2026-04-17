import { jsx as _jsx } from "react/jsx-runtime";
import { ListableFormField } from "./ListableFormField";
import { ValidateResult } from '../../../validations/Validation';
import { CheckButtonValidationInput } from "../../../ui";
import { isEmpty } from "../../../utils";
export class CheckButtonValidationField extends ListableFormField {
    /**
     * 중복확인 버튼을 클릭했을 때 value 를 중복 확인 하는 함수
     * @param checkButtonValidation
     */
    withCheckButtonValidation(checkButtonValidation) {
        this.checkButtonValidation = checkButtonValidation;
        return this;
    }
    withCheckButtonLabel(checkButtonLabel) {
        this.checkButtonLabel = checkButtonLabel;
        return this;
    }
    copyFields(origin, includeValue = true) {
        return super.copyFields(origin, includeValue)
            .withCheckButtonValidation(origin.checkButtonValidation)
            .withCheckButtonLabel(origin.checkButtonLabel);
    }
    renderCheckButtonValidationField(params) {
        return (async () => {
            const entityForm = params.entityForm;
            return _jsx(CheckButtonValidationInput, { name: this.getName(), entityForm: entityForm, onError: params.onError, readonly: params.readonly, buttonProp: {
                    label: this.checkButtonLabel,
                }, inputProp: {
                    value: await entityForm.getValue(this.getName()),
                    required: params.required,
                }, defaultValue: this.value?.fetched ?? this.value?.default ?? '', onValid: (value) => {
                    entityForm.setFieldValidationState(this.getName(), { validated: true, color: 'success' });
                    params.onChange(value);
                }, onClear: () => {
                    entityForm.clearFieldValidationState(this.getName());
                    params.onChange('');
                }, onCheck: async (value) => {
                    if (!isEmpty(this.validations)) {
                        const currentValue = { ...this.value };
                        this.value = { ...this.value, current: value };
                        const validateResult = await this.validate(entityForm);
                        if (Array.isArray(validateResult)) {
                            for (const result of validateResult) {
                                if (result.hasError()) {
                                    this.value = currentValue;
                                    entityForm.setFieldValidationState(this.getName(), { validated: false, message: result.message, color: 'secondary' });
                                    return ValidateResult.fail(result.message + ' 입력 값을 변경하고 중복확인을 눌러 주세요.');
                                }
                            }
                        }
                        else {
                            if (validateResult.hasError()) {
                                this.value = currentValue;
                                entityForm.setFieldValidationState(this.getName(), { validated: false, message: validateResult.message, color: 'secondary' });
                                return ValidateResult.fail(validateResult.message + ' 입력 값을 변경하고 중복확인을 눌러 주세요.');
                            }
                        }
                    }
                    const result = await this.checkButtonValidation(entityForm, value);
                    entityForm.setFieldValidationState(this.getName(), {
                        validated: !result.error,
                        message: result.message,
                        color: result.error ? 'secondary' : 'success'
                    });
                    return result;
                } });
        })();
    }
    async isRequired(props) {
        const required = await super.isRequired(props);
        return Promise.resolve(required);
    }
}
//# sourceMappingURL=CheckButtonValidationField.js.map