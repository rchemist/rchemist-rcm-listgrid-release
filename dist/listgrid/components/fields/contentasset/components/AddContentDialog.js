'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 *  Copyright (c) "2025". RChemist by RCHEMIST
 *  Licensed under the RCM EULA by RCHEMIST
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License under controlled by RCHEMIST
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
import { useCallback, useState } from "react";
import { TextInput } from "../../../../ui";
import { Textarea } from "../../../../ui";
import { useModalManagerStore } from '../../../../store';
/**
 * AddContentDialog
 * ContentAsset 항목 추가를 위한 다이얼로그 컴포넌트
 */
export const AddContentDialog = ({ onAdd, existingTitles }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [titleError, setTitleError] = useState("");
    const { closeTopModal } = useModalManagerStore();
    // 제목 유효성 검사
    const validateTitle = useCallback((value) => {
        const trimmedValue = value.trim();
        if (!trimmedValue) {
            return "제목은 필수 입력 항목입니다.";
        }
        // 중복 검사 (대소문자 구분 없이)
        const titleLower = trimmedValue.toLowerCase();
        const isDuplicate = existingTitles.some(existing => existing.toLowerCase() === titleLower);
        if (isDuplicate) {
            return "동일한 제목이 이미 존재합니다.";
        }
        return "";
    }, [existingTitles]);
    // 제목 변경 핸들러
    const handleTitleChange = useCallback((value) => {
        setTitle(value);
        // 타이핑 중에는 에러 메시지 제거
        if (titleError) {
            setTitleError("");
        }
    }, [titleError]);
    // 제목 블러 핸들러
    const handleTitleBlur = useCallback(() => {
        const error = validateTitle(title);
        setTitleError(error);
    }, [title, validateTitle]);
    // 추가 버튼 핸들러
    const handleAdd = useCallback(() => {
        // 제목 유효성 검사
        const error = validateTitle(title);
        if (error) {
            setTitleError(error);
            return;
        }
        // 콜백 호출
        onAdd(title.trim(), content.trim() || undefined);
        // 모달 닫기
        closeTopModal();
    }, [title, content, validateTitle, onAdd, closeTopModal]);
    // 취소 버튼 핸들러
    const handleCancel = useCallback(() => {
        closeTopModal();
    }, [closeTopModal]);
    // Enter 키 핸들러
    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAdd();
        }
    }, [handleAdd]);
    return (_jsxs("div", { className: "rcm-ca-dialog", children: [_jsxs("div", { children: [_jsxs("label", { className: "rcm-label", children: ["\uC81C\uBAA9 ", _jsx("span", { className: "rcm-text", "data-color": "error", children: "*" })] }), _jsx("div", { onBlur: handleTitleBlur, onKeyPress: handleKeyPress, children: _jsx(TextInput, { name: "title", value: title, onChange: handleTitleChange, placeHolder: "\uC81C\uBAA9\uC744 \uC785\uB825\uD558\uC138\uC694", className: titleError ? "rcm-ca-input-error" : "" }) }), titleError && (_jsx("p", { className: "rcm-text", "data-color": "error", "data-size": "sm", children: titleError }))] }), _jsxs("div", { children: [_jsxs("label", { className: "rcm-label", children: ["\uC124\uBA85 ", _jsx("span", { className: "rcm-text", "data-tone": "muted", "data-size": "xs", children: "(\uC120\uD0DD\uC0AC\uD56D)" })] }), _jsx(Textarea, { name: "content", value: content, onChange: setContent, placeHolder: "\uBD80\uAC00 \uC124\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694", rows: 3 })] }), _jsxs("div", { className: "rcm-ca-dialog-footer", children: [_jsx("button", { type: "button", onClick: handleCancel, className: "rcm-button", "data-variant": "outline", children: "\uCDE8\uC18C" }), _jsx("button", { type: "button", onClick: handleAdd, disabled: !title.trim(), className: "rcm-button", "data-variant": "primary", children: "\uCD94\uAC00" })] })] }));
};
//# sourceMappingURL=AddContentDialog.js.map