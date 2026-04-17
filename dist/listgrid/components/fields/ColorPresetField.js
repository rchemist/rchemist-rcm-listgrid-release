'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { ListableFormField } from "./abstract";
import { AllColorTypes } from "../../common/type";
import { getAdditionalColorClass, getOppositeTextColorClass } from "../../common/func";
import { Popover } from "../../ui";
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
export class ColorPresetField extends ListableFormField {
    constructor(name, order, presets) {
        super(name, order, 'text');
        this.presets = presets;
    }
    /**
     * ColorPresetField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    renderInstance(params) {
        return (async () => {
            const inputParam = { ...await getInputRendererParameters(this, params) };
            return _jsx(ColorPresetFieldView, { presets: this.presets, ...inputParam });
        })();
    }
    /**
     * ColorPresetField 인스턴스 생성
     */
    createInstance(name, order) {
        return new ColorPresetField(name, order, this.presets);
    }
    /**
     * ColorPresetField 리스트 아이템 렌더링 (원본 renderListItem 로직 보존)
     */
    renderListItemInstance(props) {
        return renderColorListField(this, props);
    }
}
async function renderColorListField(field, props) {
    const value = props.item[field.name] ?? 'indigo';
    return { result: _jsx("div", { children: _jsx("div", { className: `w-5 h-5 ${getAdditionalColorClass(value)} rounded-full` }) }) };
}
// 색상을 선택하는 버튼을 렌더링한다.
const ColorPresetFieldView = ({ name, label, required = false, readonly = false, presets = [], ...props }) => {
    const [selectedColor, setSelectedColor] = useState('indigo');
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if (props.value) {
            setSelectedColor(props.value ?? 'indigo');
        }
    }, [props.value]);
    return (_jsx("div", { className: "rcm-stack", children: _jsxs(Popover, { position: 'bottom', shadow: 'md', opened: isOpen, onChange: setIsOpen, closeOnClickOutside: true, children: [_jsx(Popover.Target, { children: _jsx("button", { className: `btn ${getAdditionalColorClass(selectedColor)} ${getOppositeTextColorClass(selectedColor)}`, disabled: readonly, onClick: () => setIsOpen(true), children: "\uC0C9\uC0C1 \uC120\uD0DD" }) }), _jsx(Popover.Dropdown, { children: _jsx("div", { className: `w-full grid grid-cols-6 gap-2`, children: AllColorTypes.map((color, index) => (_jsx("button", { type: "button", className: `w-8 h-8 rounded-full ${getAdditionalColorClass(color)}`, onClick: () => {
                                setSelectedColor(color);
                                setIsOpen(false);
                                props.onChange(color);
                            } }, index))) }) })] }) }));
};
//# sourceMappingURL=ColorPresetField.js.map