'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { ListableFormField } from './abstract';
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
import { ColorInput } from '../../ui';
export class ColorField extends ListableFormField {
    constructor(name, order) {
        super(name, order, 'custom');
    }
    /**
     * ColorField 핵심 렌더링 로직
     */
    renderInstance(params) {
        return (async () => {
            const inputParam = { ...(await getInputRendererParameters(this, params)) };
            return _jsx(ColorInputField, { ...inputParam });
        })();
    }
    /**
     * ColorField 인스턴스 생성
     */
    createInstance(name, order) {
        return new ColorField(name, order);
    }
    /**
     * ColorField 리스트 아이템 렌더링
     */
    renderListItemInstance(props) {
        return renderColorListField(this, props);
    }
}
async function renderColorListField(field, props) {
    const value = props.item[field.name] ?? '#fff';
    return {
        result: (_jsx("div", { children: _jsx("div", { className: `w-5 h-5 !bg-[${value}] rounded-full` }) })),
    };
}
const ColorInputField = ({ name, label, required = false, readonly = false, withAlpha = false, ...props }) => {
    const [value, setValue] = useState();
    useEffect(() => {
        setValue(props.value);
    }, [props.value]);
    return (_jsx(ColorInput, { name: name, value: value, onChangeEnd: (color) => {
            setValue(color);
            props.onChange(color);
        }, format: 'hex', swatches: [
            '#2e2e2e',
            '#868e96',
            '#fa5252',
            '#e64980',
            '#be4bdb',
            '#7950f2',
            '#4c6ef5',
            '#228be6',
            '#15aabf',
            '#12b886',
            '#40c057',
            '#82c91e',
            '#fab005',
            '#ffffff',
        ], disabled: readonly, withAlpha: withAlpha }));
};
//# sourceMappingURL=ColorField.js.map