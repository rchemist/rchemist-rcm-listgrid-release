'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { isApiSpecification } from './Type';
import { Modal } from '../../ui';
import { ViewApiSpecification } from './ViewApiSpecification';
import { IconApi } from '@tabler/icons-react';
export const ApiSpecificationButton = ({ apiSpec }) => {
    const [open, setOpen] = useState(false);
    if (apiSpec === undefined) {
        return null;
    }
    return (_jsxs("div", { className: 'ml-2', children: [_jsx("button", { className: 'btn-outline-info rounded-full w-[24px] h-[24px]', onClick: () => setOpen(true), children: _jsx(IconApi, { className: 'w-6 h-6' }) }), open && (_jsx(_Fragment, { children: _jsx(Modal, { opened: open, title: 'API 상세 정보', position: 'top-center', closeOnClickOutside: true, closeOnEscape: true, onClose: () => {
                        setOpen(false);
                    }, children: isApiSpecification(apiSpec) ? (_jsx(ViewApiSpecification, { ...apiSpec })) : apiSpec }) }))] }));
};
//# sourceMappingURL=ApiSpecificationButton.js.map