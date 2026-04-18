import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileUploadInput } from "../../../../ui";
import { TextInput } from "../../../../ui";
import { Textarea } from "../../../../ui";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Tooltip } from "../../../../ui";
/**
 * ContentAssetItemUI
 * ContentAsset 항목들의 UI 렌더링 컴포넌트
 */
export const ContentAssetItemUI = ({ items, loading, errors, titleErrors, readonly, canAddMore, isEmpty, acceptedFileTypes, maxFileSize, onUpdateAsset, onTitleBlur, onTitleChange, onContentChange, onRemoveItem, onAddItem, onFileUpload, onUploadProgress, fieldErrors }) => {
    // 로딩 중일 때
    if (loading) {
        return _jsx("div", { className: "rcm-ca-loading", children: _jsx("span", { className: "rcm-text", "data-tone": "muted", children: "\uB85C\uB529 \uC911..." }) });
    }
    // 아이템이 없을 때
    if (isEmpty) {
        return (_jsxs("div", { className: "rcm-ca-wrap", children: [_jsxs("div", { className: "rcm-ca-empty", children: [_jsx("p", { className: "rcm-text", "data-tone": "muted", children: "\uB4F1\uB85D\uB41C \uCEE8\uD150\uCE20\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }), !readonly && canAddMore && (_jsxs("button", { type: "button", onClick: onAddItem, className: "rcm-ca-add-btn", children: [_jsx(IconPlus, { size: 16 }), _jsx("span", { children: "\uCEE8\uD150\uCE20 \uCD94\uAC00" })] }))] }), fieldErrors && fieldErrors.length > 0 && (_jsx("div", { className: "rcm-ca-errors", children: fieldErrors.map((error, index) => (_jsx("p", { className: "rcm-text", "data-color": "error", "data-size": "sm", children: error }, index))) }))] }));
    }
    return (_jsxs("div", { className: "rcm-ca-wrap", children: [items.map((item, index) => {
                const itemErrors = errors.filter(err => err.index === index);
                const hasError = itemErrors.length > 0 || titleErrors[index];
                return (_jsxs("div", { className: `rcm-ca-item ${hasError ? 'rcm-ca-item-error' : ''}`, children: [_jsxs("div", { className: "rcm-ca-item-header", children: [_jsxs("div", { className: "rcm-ca-item-title-col", children: [_jsxs("label", { className: "rcm-label", children: ["\uC81C\uBAA9 ", _jsx("span", { className: "rcm-text", "data-color": "error", children: "*" })] }), _jsx("div", { onBlur: (e) => {
                                                const target = e.target;
                                                if (target.tagName === 'INPUT') {
                                                    onTitleBlur(index, target.value);
                                                }
                                            }, children: _jsx(TextInput, { name: `title_${index}`, value: item.title, onChange: (val) => onTitleChange(index, val), placeHolder: "\uC81C\uBAA9\uC744 \uC785\uB825\uD558\uC138\uC694", readonly: readonly, className: titleErrors[index] ? "rcm-ca-input-error" : "" }) }), titleErrors[index] && (_jsx("p", { className: "rcm-text", "data-color": "error", "data-size": "sm", children: titleErrors[index] }))] }), !readonly && (_jsx("div", { className: "rcm-ca-item-remove-wrap", children: _jsx(Tooltip, { label: "\uC0AD\uC81C", children: _jsx("button", { type: "button", onClick: () => onRemoveItem(index), className: "rcm-icon-btn", "data-size": "md", "data-color": "error", children: _jsx(IconTrash, { className: "rcm-icon", "data-size": "lg" }) }) }) }))] }), _jsxs("div", { children: [_jsxs("label", { className: "rcm-label", children: ["\uC124\uBA85 ", _jsx("span", { className: "rcm-text", "data-tone": "muted", "data-size": "xs", children: "(\uC120\uD0DD\uC0AC\uD56D)" })] }), _jsx(Textarea, { name: `content_${index}`, value: item.content || '', onChange: (val) => onContentChange(index, val), placeHolder: "\uBD80\uAC00 \uC124\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694", readonly: readonly, rows: 3 })] }), _jsxs("div", { children: [_jsxs("label", { className: "rcm-label", children: ["\uD30C\uC77C ", _jsx("span", { className: "rcm-text", "data-color": "error", children: "*" })] }), _jsx(FileUploadInput, { name: `asset_${index}`, value: item.assetUrl || '', onChange: (val) => onUpdateAsset(index, 'assetUrl', val), readonly: readonly, viewSimple: false, config: {
                                        maxCount: 1,
                                        maxSize: maxFileSize ? maxFileSize / (1024 * 1024) : 10,
                                        extensions: acceptedFileTypes
                                            ? acceptedFileTypes.map(type => type.replace('*', '').replace('.', ''))
                                            : ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx', 'xls', 'xlsx']
                                    } }), itemErrors.filter(err => err.field === 'assetUrl').map((err, errIndex) => (_jsx("p", { className: "rcm-text", "data-color": "error", "data-size": "sm", children: err.message }, errIndex)))] })] }, index));
            }), !readonly && canAddMore && (_jsx("div", { className: "rcm-ca-add-btn-row", children: _jsxs("button", { type: "button", onClick: onAddItem, className: "rcm-ca-add-btn", children: [_jsx(IconPlus, { size: 16 }), _jsx("span", { children: "\uCEE8\uD150\uCE20 \uCD94\uAC00" })] }) })), fieldErrors && fieldErrors.length > 0 && (_jsx("div", { className: "rcm-ca-errors", children: fieldErrors.map((error, index) => (_jsx("p", { className: "rcm-text", "data-color": "error", "data-size": "sm", children: error }, index))) }))] }));
};
//# sourceMappingURL=ContentAssetItemUI.js.map