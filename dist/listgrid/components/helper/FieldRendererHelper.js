import { jsx as _jsx } from "react/jsx-runtime";
import { AbstractManyToOneField } from "../fields/abstract";
// Removed ManyToOneField and UserField imports to fix circular dependency
import { isBlank } from '../../utils/StringUtil';
import { Tooltip } from "../../ui";
import { Link } from "../../router";
import { IconExternalLink } from "@tabler/icons-react";
export async function getInputRendererParameters(field, params) {
    return {
        ...params,
        value: await field.getDisplayValue(params.entityForm, params.entityForm.getRenderType()),
        name: field.getName(),
        label: field.getLabel(),
        attributes: field.attributes,
    };
}
export async function getManyToOneLink(renderType, field) {
    if (field && field instanceof AbstractManyToOneField && !isBlank(field.config.entityForm.menuUrl)) {
        const idName = await field.getMappedIdName(renderType);
        const menuUrl = `${field.config.entityForm.menuUrl}/${idName?.id ?? ''}`;
        const tooltip = `${idName?.name ?? field.getLabel()} 보기`;
        return _jsx(Tooltip, { label: tooltip, color: 'gray', children: _jsx(Link, { href: menuUrl, target: '_blank', className: "rcm-m2o-external-link", children: _jsx(IconExternalLink, { className: "rcm-icon", "data-size": "md", "data-tone": "muted" }) }) });
    }
    return null;
}
//# sourceMappingURL=FieldRendererHelper.js.map