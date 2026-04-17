import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { showConfirm } from "../../../../message";
import { isTrue } from '../../../../utils/BooleanUtil';
import { cn } from "../../../../utils/cn";
/**
 * 새창(팝업) 모드 전용 닫기 버튼
 *
 * - 저장되지 않은 변경사항이 있으면 확인 다이얼로그 표시
 * - 확인 시 window.close() 호출
 */
export const ClosePopupButton = ({ entityForm, readonly, buttonClassNames, }) => {
    return (_jsx("button", { className: cn("btn btn-outline-primary gap-2", buttonClassNames?.close), onClick: (e) => {
            (async () => {
                e.stopPropagation();
                const dirty = isTrue(readonly) ? false : entityForm.isDirty();
                if (dirty) {
                    showConfirm({
                        title: "창을 닫으시겠습니까?",
                        message: "저장되지 않은 변경사항이 있습니다.",
                        confirmButtonText: "닫기",
                        cancelButtonText: "취소",
                        onConfirm: async () => {
                            window.close();
                        },
                    });
                }
                else {
                    window.close();
                }
            })();
        }, children: "\uB2EB\uAE30" }, "button_close_popup"));
};
//# sourceMappingURL=ClosePopupButton.js.map