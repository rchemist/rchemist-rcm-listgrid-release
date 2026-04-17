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
        return _jsx("div", { className: "p-4 text-gray-500", children: "\uB85C\uB529 \uC911..." });
    }
    // 아이템이 없을 때
    if (isEmpty) {
        return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "border border-gray-200 rounded-lg p-8 text-center", children: [_jsx("p", { className: "text-gray-500", children: "\uB4F1\uB85D\uB41C \uCEE8\uD150\uCE20\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }), !readonly && canAddMore && (_jsxs("button", { type: "button", onClick: onAddItem, className: "mt-4 flex items-center gap-2 mx-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200", children: [_jsx(IconPlus, { size: 16 }), _jsx("span", { className: "text-sm font-medium", children: "\uCEE8\uD150\uCE20 \uCD94\uAC00" })] }))] }), fieldErrors && fieldErrors.length > 0 && (_jsx("div", { className: "mt-2", children: fieldErrors.map((error, index) => (_jsx("p", { className: "text-red-500 text-sm", children: error }, index))) }))] }));
    }
    return (_jsxs("div", { className: "space-y-4", children: [items.map((item, index) => {
                // 해당 항목의 에러 찾기
                const itemErrors = errors.filter(err => err.index === index);
                const hasError = itemErrors.length > 0 || titleErrors[index];
                return (_jsxs("div", { className: `border rounded-lg p-4 space-y-3 transition-all ${hasError ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:shadow-md'}`, children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: ["\uC81C\uBAA9 ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("div", { onBlur: (e) => {
                                                const target = e.target;
                                                if (target.tagName === 'INPUT') {
                                                    onTitleBlur(index, target.value);
                                                }
                                            }, children: _jsx(TextInput, { name: `title_${index}`, value: item.title, onChange: (val) => onTitleChange(index, val), placeHolder: "\uC81C\uBAA9\uC744 \uC785\uB825\uD558\uC138\uC694", readonly: readonly, className: titleErrors[index] ? "border-red-500" : "" }) }), titleErrors[index] && (_jsx("p", { className: "mt-1 text-xs text-red-500", children: titleErrors[index] }))] }), !readonly && (_jsx("div", { className: "pt-6", children: _jsx(Tooltip, { label: "\uC0AD\uC81C", children: _jsx("button", { type: "button", onClick: () => onRemoveItem(index), className: "p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors", children: _jsx(IconTrash, { size: 20 }) }) }) }))] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: ["\uC124\uBA85 ", _jsx("span", { className: "text-gray-400 text-xs", children: "(\uC120\uD0DD\uC0AC\uD56D)" })] }), _jsx(Textarea, { name: `content_${index}`, value: item.content || '', onChange: (val) => onContentChange(index, val), placeHolder: "\uBD80\uAC00 \uC124\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694", readonly: readonly, rows: 3 })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: ["\uD30C\uC77C ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(FileUploadInput, { name: `asset_${index}`, value: item.assetUrl || '', onChange: (val) => onUpdateAsset(index, 'assetUrl', val), readonly: readonly, viewSimple: false, config: {
                                        maxCount: 1,
                                        maxSize: maxFileSize ? maxFileSize / (1024 * 1024) : 10, // bytes to MB
                                        extensions: acceptedFileTypes
                                            ? acceptedFileTypes.map(type => type.replace('*', '').replace('.', ''))
                                            : ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx', 'xls', 'xlsx']
                                    } }), itemErrors.filter(err => err.field === 'assetUrl').map((err, errIndex) => (_jsx("p", { className: "mt-1 text-xs text-red-500", children: err.message }, errIndex)))] })] }, index));
            }), !readonly && canAddMore && (_jsx("div", { className: "flex justify-center pt-2", children: _jsxs("button", { type: "button", onClick: onAddItem, className: "flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200", children: [_jsx(IconPlus, { size: 16 }), _jsx("span", { className: "text-sm font-medium", children: "\uCEE8\uD150\uCE20 \uCD94\uAC00" })] }) })), fieldErrors && fieldErrors.length > 0 && (_jsx("div", { className: "mt-2", children: fieldErrors.map((error, index) => (_jsx("p", { className: "text-red-500 text-sm", children: error }, index))) }))] }));
};
//# sourceMappingURL=ContentAssetItemUI.js.map