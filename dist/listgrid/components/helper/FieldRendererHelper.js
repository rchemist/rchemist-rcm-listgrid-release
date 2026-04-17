import { jsx as _jsx } from "react/jsx-runtime";
import { AbstractManyToOneField } from "../fields/abstract";
// Removed ManyToOneField and UserField imports to fix circular dependency
import { isBlank } from '../../utils/StringUtil';
import { Tooltip } from "../../ui";
import { Link } from "../../router";
import { IconExternalLink } from "@tabler/icons-react";
export async function getInputRendererParameters(field, params, ...args) {
    return {
        ...params,
        value: await field.getDisplayValue(params.entityForm, params.entityForm.getRenderType()),
        name: field.getName(),
        label: field.getLabel(),
        attributes: field.attributes,
        ...args
    };
}
export async function getManyToOneLink(renderType, field) {
    if (field && field instanceof AbstractManyToOneField && !isBlank(field.config.entityForm.menuUrl)) {
        const idName = await field.getMappedIdName(renderType);
        const menuUrl = `${field.config.entityForm.menuUrl}/${idName?.id ?? ''}`;
        const tooltip = `${idName?.name ?? field.getLabel()} 보기`;
        return _jsx(Tooltip, { label: tooltip, color: 'gray', children: _jsx(Link, { href: menuUrl, target: '_blank', className: "mb-2", children: _jsx(IconExternalLink, { className: 'text-secondary h-4 w-4 ml-1' }) }) });
    }
    return null;
}
//# sourceMappingURL=FieldRendererHelper.js.map