import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tooltip } from "../../../../ui";
import { showConfirm } from "../../../../message";
import { getExternalApiData } from "../../../../misc";
export const PriorityButtons = ({ managePriority, setManagePriority, setParentManagePriority, rows, entityForm, setNotifications, setErrors }) => {
    const handlePriorityToggle = () => {
        if (managePriority) {
            showConfirm({
                title: '우선순위 변경을 완료하시겠습니까?',
                message: '우선순위 변경을 완료하면 변경된 우선순위가 저장되어 목록에 반영됩니다.',
                confirmButtonText: '우선순위 변경 완료',
                cancelButtonText: '취소',
                onConfirm: async () => {
                    const priorities = new Map();
                    rows?.forEach((row, index) => {
                        priorities.set(row.id, index + 1);
                    });
                    const response = await getExternalApiData({
                        url: `${entityForm.getUrl()}/priority`,
                        method: 'PUT',
                        formData: {
                            priorities: Object.fromEntries(priorities)
                        }
                    });
                    if (response) {
                        setNotifications(['우선순위 변경이 완료되었습니다.']);
                        setManagePriority(false);
                        setParentManagePriority();
                    }
                    else {
                        setNotifications([]);
                        setErrors(['우선순위 변경 중 오류가 발생했습니다.']);
                    }
                }
            });
        }
        else {
            setParentManagePriority();
            setManagePriority(true);
        }
    };
    const handleCancelPriorityChange = () => {
        setParentManagePriority();
        setManagePriority(false);
    };
    return (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Tooltip, { label: managePriority ? '리스트에서 우선순위를 변경한 후 버튼을 누르면 변경된 우선순위가 저장되어 목록에 반영됩니다.' : '리스트 각 행의 맨 좌측 열을 드래그해 우선순위를 변경할 수 있습니다', children: _jsx("button", { type: 'button', className: `btn ${managePriority ? 'btn-success' : 'btn-outline-primary'}`, onClick: handlePriorityToggle, children: managePriority ? '우선순위 변경 완료' : '우선순위 변경' }) }), managePriority && _jsx("button", { type: 'button', className: 'btn btn-outline-danger', onClick: handleCancelPriorityChange, children: "\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uCDE8\uC18C" })] }));
};
//# sourceMappingURL=PriorityButton.js.map