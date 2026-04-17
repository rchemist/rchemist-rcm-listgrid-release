/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { ListableFormField } from './abstract';
import { PhoneNumberValidation } from '../../validations/PhoneNumberValidation';
import { RegexValidation } from '../../validations/RegexValidation';
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
import { formatPhoneNumber, removePhoneNumberHyphens } from "../../utils/PhoneUtil";
import { PhoneNumberFieldView } from './view/PhoneNumberFieldView';
import { PhoneNumberListView } from './view/PhoneNumberListView';
export class PhoneNumberField extends ListableFormField {
    constructor(name, order, validations, enableSms) {
        super(name, order, 'phone');
        this.validations = validations ? [...validations] : [new PhoneNumberValidation()];
        this.helpText = '숫자만 10 ~ 11 자리 사이로 입력해 주세요';
        this.enableSms = enableSms ?? false;
    }
    /**
     * Enable SMS functionality
     */
    withSms(enabled = true) {
        this.enableSms = enabled;
        return this;
    }
    /**
     * PhoneNumberField 핵심 렌더링 로직
     */
    renderInstance(params) {
        return (async () => {
            const inputParams = await getInputRendererParameters(this, params);
            // validations에서 RegexValidation 찾기
            let regex;
            if (this.validations) {
                const regexValidation = this.validations.find(v => v instanceof RegexValidation);
                if (regexValidation) {
                    regex = {
                        pattern: regexValidation.regex,
                        message: regexValidation.message || '전화번호 형식이 올바르지 않습니다.'
                    };
                }
            }
            return (_jsx(PhoneNumberFieldView, { name: inputParams.name, value: inputParams.value, onChange: inputParams.onChange, onError: inputParams.onError, readonly: inputParams.readonly, placeHolder: inputParams.placeHolder, regex: regex, enableSms: this.enableSms, session: params.entityForm.session, renderType: params.entityForm.getRenderType() }));
        })();
    }
    /**
     * PhoneNumberField 표시값 가져오기 (하이픈 포맷팅)
     */
    async getDisplayValue(entityForm, renderType) {
        if (this.displayFunc) {
            return this.displayFunc(entityForm, this, renderType);
        }
        const value = await this.getCurrentValue(renderType);
        // 하이픈 포맷팅 적용
        return formatPhoneNumber(value);
    }
    /**
     * PhoneNumberField 저장값 가져오기 (하이픈 제거)
     */
    async getSaveValue(entityForm, renderType) {
        if (this.saveValue) {
            return this.saveValue(entityForm, this, renderType);
        }
        const value = await this.getCurrentValue(renderType);
        // 하이픈 제거한 숫자만 반환
        return removePhoneNumberHyphens(value);
    }
    /**
     * PhoneNumberField 리스트 아이템 렌더링 (하이픈 포맷팅 + SMS 기능)
     */
    renderListItemInstance(props) {
        const value = props.item[this.name];
        const formatted = formatPhoneNumber(value);
        // If SMS is enabled and we have a value, use PhoneNumberListView
        if (this.enableSms && value) {
            return Promise.resolve({
                result: (_jsx(PhoneNumberListView, { phoneNumber: value, formattedValue: formatted, enableSms: this.enableSms, session: props.entityForm.session })),
                linkOnCell: true // Prevent row click from triggering when clicking the dropdown
            });
        }
        return Promise.resolve({ result: formatted });
    }
    /**
     * PhoneNumberField 인스턴스 생성
     */
    createInstance(name, order) {
        return new PhoneNumberField(name, order, this.validations, this.enableSms);
    }
    static create(props) {
        const field = new PhoneNumberField(props.name, props.order, props.validations, props.enableSms);
        return field.copyFields(props, true);
    }
}
//# sourceMappingURL=PhoneNumberField.js.map