/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ListableFormField, } from './abstract';
import { NumberInput } from '../../ui';
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
import { formatPrice } from '../../misc';
import { IconCoin, IconHash } from '@tabler/icons-react';
import { NumberFilter } from './filter/NumberFilter';
import { ValidateResult } from '../../validations/Validation';
export class NumberField extends ListableFormField {
    withMin(min) {
        if (this.limit) {
            if (min !== undefined)
                this.limit.min = min;
            else
                delete this.limit.min;
        }
        else {
            const newLimit = {};
            if (min !== undefined)
                newLimit.min = min;
            this.limit = newLimit;
        }
        return this;
    }
    withMax(max) {
        if (this.limit) {
            if (max !== undefined)
                this.limit.max = max;
            else
                delete this.limit.max;
        }
        else {
            const newLimit = {};
            if (max !== undefined)
                newLimit.max = max;
            this.limit = newLimit;
        }
        return this;
    }
    withLimit(limit) {
        if (limit !== undefined)
            this.limit = limit;
        else
            delete this.limit;
        return this;
    }
    withCurrency(currency) {
        if (currency !== undefined)
            this.currency = currency;
        else
            delete this.currency;
        return this;
    }
    withDouble(double) {
        if (double !== undefined)
            this.double = double;
        else
            delete this.double;
        return this;
    }
    constructor(name, order, props) {
        super(name, order, 'number');
        if (props?.limit !== undefined)
            this.limit = props.limit;
        if (props?.currency !== undefined)
            this.currency = props.currency;
        if (props?.double !== undefined)
            this.double = props.double;
    }
    /**
     * NumberField 핵심 렌더링 로직
     */
    renderInstance(params) {
        return (async () => {
            return (_jsx(NumberInput, { limit: this.limit, currency: this.currency, double: this.double, ...await getInputRendererParameters(this, params) }));
        })();
    }
    /**
     * NumberField 핵심 리스트 필터 렌더링 로직
     */
    renderListFilterInstance(params) {
        return (async () => {
            return (_jsx(NumberFilter, { onChange: (queryConditionType, value) => {
                    params.onChange(value, queryConditionType);
                }, onRemove: () => {
                    params.onChange('');
                } }));
        })();
    }
    /**
     * NumberField 핵심 리스트 아이템 렌더링 로직
     */
    renderListItemInstance(props) {
        if (props.item[this.name] !== undefined) {
            const numberValue = props.item[this.name];
            return Promise.resolve({ result: formatPrice(numberValue) });
        }
        // 기본 값 표시
        const value = String(props.item[this.name] ?? '');
        return Promise.resolve({ result: value });
    }
    /**
     * NumberField View 모드 렌더링 - 숫자 포맷팅
     * compact 모드: 아이콘 없이 깔끔한 텍스트만 표시
     * 일반 모드: 아이콘 + 포맷된 숫자 표시
     */
    async renderViewInstance(props) {
        const value = props.item[this.name];
        // null, undefined, 빈 문자열 처리
        if (value === null || value === undefined || value === '') {
            return { result: null };
        }
        const numberValue = Number(value);
        if (isNaN(numberValue)) {
            return { result: String(value) };
        }
        // formatPrice 함수를 사용하여 천단위 구분자 적용
        const formattedValue = formatPrice(numberValue);
        // currency 설정이 있으면 통화 기호 추가
        if (this.currency) {
            const currencyCode = this.currency.currencyCode ?? 'KRW';
            const currencySymbol = currencyCode === 'KRW'
                ? '원'
                : currencyCode === 'USD'
                    ? '$'
                    : currencyCode === 'EUR'
                        ? '€'
                        : currencyCode === 'JPY'
                            ? '¥'
                            : currencyCode === 'GBP'
                                ? '£'
                                : '';
            // position에 따라 기호 위치 결정
            const displayText = this.currency.position === 'after' || currencyCode === 'KRW'
                ? `${formattedValue}${currencySymbol}`
                : `${currencySymbol}${formattedValue}`;
            // compact 모드: 텍스트만 반환
            if (props.compact) {
                return { result: displayText };
            }
            // 일반 모드: 아이콘 + 텍스트
            const IconComponent = this.cardIcon || IconCoin;
            const frameColor = this.cardIcon ? undefined : 'success';
            return {
                result: (_jsxs("span", { className: "rcm-bool-wrap", children: [_jsx("span", { className: "rcm-icon-frame", "data-color": frameColor, children: _jsx(IconComponent, { className: "rcm-icon", "data-size": "sm", stroke: 1.75 }) }), _jsx("span", { className: "rcm-num-value rcm-num-value-emphasis", children: displayText })] })),
            };
        }
        // compact 모드: 텍스트만 반환
        if (props.compact) {
            return { result: formattedValue };
        }
        // 일반 모드: 아이콘 + 텍스트
        const IconComponent = this.cardIcon || IconHash;
        const frameColor = this.cardIcon ? undefined : 'info';
        return {
            result: (_jsxs("span", { className: "rcm-bool-wrap", children: [_jsx("span", { className: "rcm-icon-frame", "data-color": frameColor, children: _jsx(IconComponent, { className: "rcm-icon", "data-size": "sm", stroke: 1.75 }) }), _jsx("span", { className: "rcm-num-value", children: formattedValue })] })),
        };
    }
    /**
     * NumberField 인스턴스 생성
     */
    createInstance(name, order) {
        const ctorProps = {};
        if (this.limit !== undefined)
            ctorProps.limit = this.limit;
        if (this.currency !== undefined)
            ctorProps.currency = this.currency;
        if (this.double !== undefined)
            ctorProps.double = this.double;
        return new NumberField(name, order, ctorProps);
    }
    static create(props) {
        const ctorProps = {};
        if (props.limit !== undefined)
            ctorProps.limit = props.limit;
        if (props.currency !== undefined)
            ctorProps.currency = props.currency;
        if (props.double !== undefined)
            ctorProps.double = props.double;
        return new NumberField(props.name, props.order, ctorProps).copyFields(props, true);
    }
    async validate(entityForm, session) {
        // hidden 또는 readonly인 경우 min/max 검증 건너뛰기
        if ((await this.isHidden({ entityForm, session })) ||
            (await this.isReadonly({ entityForm, session }))) {
            return ValidateResult.success();
        }
        const result = await super.validate(entityForm, session);
        // result 는 ValidateResult 단수거나 ValidateResult[] 이다.
        // ValidateResult 의 error 여부를 판단해 최종으로 에러가 안 났으면 NumberField 자체의 기본 검증을 처리한다.
        // 여기서 기본 검증이란 min, max 값 검증을 의미한다.
        if (!this.hasError(result)) {
            if (this.limit) {
                const value = await entityForm.getValue(this.name);
                if (value !== undefined && value !== '') {
                    const numberValue = Number(value);
                    if (this.limit.min !== undefined && numberValue < this.limit.min) {
                        return ValidateResult.fail(`${this.getLabel()} 값은 ${this.limit.min} 이상이어야 합니다.`);
                    }
                    if (this.limit.max !== undefined && numberValue > this.limit.max) {
                        return ValidateResult.fail(`${this.getLabel()} 값은 ${this.limit.max} 이하이어야 합니다.`);
                    }
                }
            }
            return ValidateResult.success();
        }
        return result;
    }
    hasError(result) {
        if (Array.isArray(result)) {
            return result.some((r) => r.hasError());
        }
        return result.hasError();
    }
}
//# sourceMappingURL=NumberField.js.map