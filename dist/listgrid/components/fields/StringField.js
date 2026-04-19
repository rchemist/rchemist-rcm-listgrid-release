import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckButtonValidationField, getNestedValue, } from '../../components/fields/abstract';
import { TextInput } from '../../ui';
import { getInputRendererParameters } from '../../components/helper/FieldRendererHelper';
import { CopyableTextView, CopyButton } from './view/CopyableTextView';
export class StringField extends CheckButtonValidationField {
    constructor(name, order, useCopy) {
        super(name, order, 'text');
        this.useCopy = useCopy ?? false;
    }
    /**
     * Enable copy button in list view
     */
    withCopy(enabled = true) {
        this.useCopy = enabled;
        return this;
    }
    /**
     * StringField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    renderInstance(params) {
        const renderNode = async (extraProps) => {
            // readonly + maskedValueFunc: display masked value without touching original value
            if (params.readonly && this.maskedValueFunc) {
                const inputParams = await getInputRendererParameters(this, params);
                if (inputParams.value != null && inputParams.value !== '') {
                    const maskedValue = await this.maskedValueFunc(params.entityForm, inputParams.value);
                    return _jsx(TextInput, { ...inputParams, ...extraProps, value: maskedValue });
                }
                return _jsx(TextInput, { ...inputParams, ...extraProps });
            }
            if (this.checkButtonValidation !== undefined) {
                return this.renderCheckButtonValidationField(params);
            }
            return (_jsx(TextInput, { ...await getInputRendererParameters(this, params), ...extraProps }));
        };
        if (this.useCopy) {
            return (async () => {
                const value = await params.entityForm.getValue(this.name);
                if (!value) {
                    return renderNode();
                }
                // 복사 버튼이 붙으므로 우측 라운드와 테두리를 제거
                const node = await renderNode({
                    className: 'rounded-r-none border-r-0',
                });
                return (_jsxs("div", { className: "rcm-input-group-stretch", children: [_jsx("div", { className: "rcm-input-group-grow", children: node }), _jsx(CopyButton, { value: String(value), className: "rcm-copy-addon-wrap" })] }));
            })();
        }
        return renderNode();
    }
    renderListFilterInstance(params) {
        return (async () => {
            return (_jsx(TextInput, { name: `${this.name}_${params.entityForm.id}`, onChange: (value) => {
                    params.onChange(value, 'LIKE');
                }, value: params.value }));
        })();
    }
    /**
     * StringField View 모드 렌더링 - 텍스트 표시
     * cardIcon이 설정된 경우 아이콘과 함께 표시
     */
    async renderViewInstance(props) {
        const value = getNestedValue(props.item, this.name);
        // null, undefined, 빈 문자열 처리
        if (value === null || value === undefined || value === '') {
            return { result: null };
        }
        // maskedValueFunc: apply masking in view mode
        let textValue = String(value);
        if (this.maskedValueFunc && props.entityForm) {
            textValue = await this.maskedValueFunc(props.entityForm, value);
        }
        // If copy is enabled, use CopyableTextView
        if (this.useCopy) {
            return {
                result: _jsx(CopyableTextView, { value: String(value), displayValue: textValue }),
            };
        }
        // cardIcon이 설정된 경우 아이콘과 함께 표시
        if (this.cardIcon) {
            const IconComponent = this.cardIcon;
            return {
                result: (_jsxs("span", { className: "rcm-bool-wrap", children: [_jsx("span", { className: "rcm-icon-frame", children: _jsx(IconComponent, { className: "rcm-icon", "data-size": "sm", stroke: 1.75 }) }), _jsx("span", { className: "font-medium", children: textValue })] })),
            };
        }
        return { result: textValue };
    }
    /**
     * StringField 리스트 아이템 렌더링 (복사 기능 지원)
     */
    async renderListItemInstance(props) {
        let value = getNestedValue(props.item, this.name);
        if (this.displayFunc) {
            const originalValue = this.value;
            this.value = { current: value, fetched: value };
            try {
                value = await this.displayFunc(props.entityForm, this);
            }
            finally {
                if (originalValue !== undefined) {
                    this.value = originalValue;
                }
                else {
                    delete this.value;
                }
            }
        }
        // maskedValueFunc: apply masking in list mode
        if (this.maskedValueFunc && value != null && value !== '') {
            value = await this.maskedValueFunc(props.entityForm, value);
        }
        // If copy is enabled and we have a value, use CopyableTextView
        if (this.useCopy && value) {
            return {
                result: _jsx(CopyableTextView, { value: String(value) }),
                linkOnCell: true,
            };
        }
        return { result: value };
    }
    /**
     * StringField 인스턴스 생성
     */
    createInstance(name, order) {
        return new StringField(name, order, this.useCopy);
    }
    static create(props) {
        return new StringField(props.name, props.order, props.useCopy).copyFields(props, true);
    }
}
//# sourceMappingURL=StringField.js.map