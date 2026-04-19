/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { ListableFormField, } from './abstract';
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
import { useState, useEffect } from 'react';
import { RegexValidation } from '../../validations/RegexValidation';
import { readonlyClass } from '../../ui';
import { formatPhoneNumber, removePhoneNumberHyphens } from '../../utils/PhoneUtil';
/**
 * 전화번호 입력 내부 컴포넌트 (TelephoneNumberField용)
 * 입력 시 하이픈을 자동으로 제거하고, 표시 시 하이픈을 포맷팅합니다.
 */
const TelephoneNumberInput = ({ name, value, onChange, onError, readonly = false, placeHolder, regex, }) => {
    // 표시용 값 (하이픈 포함)
    const [displayValue, setDisplayValue] = useState('');
    // 외부 value가 변경되면 displayValue 동기화 (하이픈 포맷팅)
    useEffect(() => {
        if (value) {
            const formatted = formatPhoneNumber(value);
            setDisplayValue(formatted);
        }
        else {
            setDisplayValue('');
        }
    }, [value]);
    const handleChange = (e) => {
        const inputValue = e.target.value;
        // 하이픈 제거 (숫자만 추출)
        const digitsOnly = removePhoneNumberHyphens(inputValue);
        // 최대 11자리로 제한
        const truncated = digitsOnly.substring(0, 11);
        // 표시용 값은 하이픈 포함 형식으로 포맷팅
        const formatted = formatPhoneNumber(truncated);
        setDisplayValue(formatted);
        // 저장용 값은 하이픈 제거한 숫자만 전달 (입력 중에는 검증하지 않음)
        onChange(truncated, false);
    };
    const handleBlur = () => {
        const digitsOnly = removePhoneNumberHyphens(displayValue);
        // blur 시에만 검증 (입력이 완료되었을 때)
        if (regex && digitsOnly) {
            const isValid = regex.pattern.test(digitsOnly);
            if (!isValid) {
                onError?.(regex.message);
            }
            else {
                // 검증 통과 시 에러 초기화
                onError?.('');
            }
        }
        onChange(digitsOnly, true);
    };
    return (_jsx("input", { type: "text", className: readonlyClass(readonly, 'form-input'), id: name, value: displayValue, placeholder: placeHolder, disabled: readonly, onChange: handleChange, onBlur: handleBlur }));
};
export class TelephoneNumberField extends ListableFormField {
    constructor(name, order, validations) {
        super(name, order, 'text');
        if (validations !== undefined) {
            this.validations = validations;
        }
    }
    /**
     * TelephoneNumberField 핵심 렌더링 로직
     */
    renderInstance(params) {
        return (async () => {
            const inputParams = await getInputRendererParameters(this, params);
            // validations에서 RegexValidation 찾기
            let regex;
            if (this.validations) {
                const regexValidation = this.validations.find((v) => v instanceof RegexValidation);
                if (regexValidation) {
                    regex = {
                        pattern: regexValidation.regex,
                        message: regexValidation.message || '전화번호 형식이 올바르지 않습니다.',
                    };
                }
            }
            return (_jsx(TelephoneNumberInput, { name: inputParams.name, value: inputParams.value, onChange: inputParams.onChange, onError: inputParams.onError, readonly: inputParams.readonly, placeHolder: inputParams.placeHolder, regex: regex }));
        })();
    }
    /**
     * TelephoneNumberField 표시값 가져오기 (하이픈 포맷팅)
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
     * TelephoneNumberField 저장값 가져오기 (하이픈 제거)
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
     * TelephoneNumberField 리스트 아이템 렌더링 (하이픈 포맷팅)
     */
    renderListItemInstance(props) {
        const value = props.item[this.name];
        const formatted = formatPhoneNumber(value);
        return Promise.resolve({ result: formatted });
    }
    /**
     * TelephoneNumberField 인스턴스 생성
     */
    createInstance(name, order) {
        return new TelephoneNumberField(name, order, this.validations);
    }
    static create(props) {
        return new TelephoneNumberField(props.name, props.order, props.validations).copyFields(props, true);
    }
}
//# sourceMappingURL=TelephoneNumberField.js.map