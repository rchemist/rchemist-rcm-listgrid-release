import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckButtonValidationField } from './abstract';
import { TextInput } from "../../ui";
import { getInputRendererParameters } from '../helper/FieldRendererHelper';
import { LinkFieldView } from "./view/LinkFieldView";
import { IconExternalLink } from "@tabler/icons-react";
import { isBlank } from '../../utils/StringUtil';
import { normalizeUrl } from "../../misc";
export class LinkField extends CheckButtonValidationField {
    constructor(name, order) {
        super(name, order, 'text');
    }
    /**
     * LinkField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    renderInstance(params) {
        if (this.checkButtonValidation !== undefined) {
            return super.renderCheckButtonValidationField(params);
        }
        return (async () => {
            return _jsx(LinkFieldView, { ...await getInputRendererParameters(this, params) });
        })();
    }
    /**
     * LinkField 인스턴스 생성
     */
    createInstance(name, order) {
        return new LinkField(name, order);
    }
    /**
     * LinkField 리스트 필터 렌더링 (원본 renderListFilter 로직 보존)
     */
    renderListFilterInstance(params) {
        return (async () => {
            return _jsx(TextInput, { name: `${this.name}_${params.entityForm.id}`, onChange: (value) => {
                    params.onChange(value, 'LIKE');
                }, value: params.value });
        })();
    }
    /**
     * LinkField 리스트 아이템 렌더링 (원본 renderListItem 로직 보존)
     */
    renderListItemInstance(props) {
        const value = String(props.item[this.name] ?? '');
        if (isBlank(value)) {
            return Promise.resolve({ result: value });
        }
        // 링크가 존재하는 경우 클릭 가능한 링크로 렌더링
        const linkElement = (_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "truncate", children: value }), !isBlank(value) && (_jsx("button", { type: "button", className: "flex h-5 w-5 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200", onClick: (e) => {
                        e.stopPropagation();
                        window.open(normalizeUrl(value), "_blank");
                    }, children: _jsx(IconExternalLink, { className: "h-3.5 w-3.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" }) }))] }));
        return Promise.resolve({
            result: linkElement,
        });
    }
    static create(props) {
        return new LinkField(props.name, props.order)
            .copyFields(props, true);
    }
}
//# sourceMappingURL=LinkField.js.map