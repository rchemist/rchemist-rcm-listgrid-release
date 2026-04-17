import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tooltip } from "../../ui";
import Swal from "sweetalert2";
import { IconCopyCheck } from "@tabler/icons-react";
export const ViewApiSpecification = ({ method, response, formData, ...props }) => {
    const url = props.url;
    return _jsxs("div", { className: "rcm-api-spec", children: [_jsxs("div", { children: [_jsx(ShowTitle, { copyText: `${url}`, label: 'API URL' }), _jsxs("div", { className: "rcm-api-spec-url-row", children: [_jsx("div", { className: "rcm-api-spec-method", children: method }), _jsx("div", { id: "addonsRightoutline", className: "rcm-api-spec-url", children: url })] })] }), formData && _jsxs("div", { children: [_jsx(ShowTitle, { copyText: `${formData}`, label: 'Form Data' }), _jsx("div", { className: "rcm-api-spec-block", children: _jsx("div", { children: _jsx("pre", { children: formData }) }) })] }), _jsxs("div", { children: [_jsx(ShowTitle, { copyText: `${response}`, label: 'API 응답 결과' }), _jsx("div", { className: "rcm-api-spec-block", children: _jsx("div", { children: _jsx("pre", { children: response }) }) })] })] });
};
const ShowTitle = ({ copyText, label }) => {
    return _jsxs("div", { className: 'flex items-center space-x-2', children: [_jsx("label", { children: label }), _jsx(Tooltip, { label: `버튼을 누르면 데이터를 클립보드로 복사합니다.`, zIndex: 10000, className: 'cursor-pointer', color: 'indigo', position: 'right-end', children: _jsx("button", { className: 'w-[24px] h-[24px]', onClick: () => {
                        try {
                            navigator.clipboard.writeText(copyText);
                            showMessage('클립보드에 복사되었습니다.');
                        }
                        catch (error) {
                            showMessage('클립보드에 복사 실패했습니다.');
                        }
                    }, children: _jsx(IconCopyCheck, { className: 'w-4 h-4 mb-2' }) }) })] });
};
const showMessage = (message = '') => {
    const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1000,
    });
    toast.fire({
        icon: 'success',
        title: message || '클립보드에 복사 되었습니다.',
        padding: '10px 20px',
    });
};
//# sourceMappingURL=ViewApiSpecification.js.map