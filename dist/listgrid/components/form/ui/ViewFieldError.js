import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { getTranslation } from "../../../utils/i18n";
export const ViewFieldError = (props) => {
    const { t } = getTranslation();
    if (!props.errors || props.errors.length === 0)
        return null;
    const errors = [];
    props.errors?.forEach((error, index) => {
        errors.push(_jsx("div", { className: "rcm-field-error", children: t(error ?? '') }, index));
    });
    return _jsx(_Fragment, { children: errors });
};
//# sourceMappingURL=ViewFieldError.js.map