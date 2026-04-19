'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { IconAlertTriangle, IconSquareRoundedX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { isTrue } from '../../utils/BooleanUtil';
export const ShowNotifications = ({ error, color, timeout, showClose = false, onClick, ...props }) => {
    const bgColor = color !== undefined
        ? `bg-${color}-light`
        : isTrue(error)
            ? 'bg-danger-light'
            : 'bg-success-light';
    const textColor = color !== undefined ? `text-${color}` : isTrue(error) ? 'text-danger' : 'text-success';
    const [view, setView] = useState(null);
    const processMessages = () => {
        if (!props.messages)
            return [];
        if (Array.isArray(props.messages)) {
            return props.messages
                .filter((message) => message !== undefined && message !== null && message !== '')
                .map((message, index) => ({
                id: index.toString(),
                message: message.replace(/(?:\r\n|\r|\n)/g, '<br />'),
            }));
        }
        else {
            const items = [];
            props.messages.forEach((value, key) => {
                if (value !== undefined && value !== null && value !== '') {
                    items.push({
                        id: key,
                        message: value.replace(/(?:\r\n|\r|\n)/g, '<br />'),
                    });
                }
            });
            return items;
        }
    };
    useEffect(() => {
        const messageItems = processMessages();
        // 중복을 제거한다.
        const uniqueMessages = messageItems.filter((item, index, self) => index === self.findIndex((t) => t.message === item.message));
        if (uniqueMessages.length > 0) {
            setView(_jsx("div", { className: "pt-2", children: _jsx("div", { className: `h-full overflow-auto p-4 pr-2 ${bgColor}`, children: _jsx("div", { className: "rcm-notification-body", children: _jsxs("div", { className: `${showClose ? 'flex items-start justify-between' : ''}`, children: [_jsx("div", { className: `${textColor} w-full`, children: uniqueMessages.map((item) => (_jsxs("div", { id: item.id, className: 'flex space-x-2 items-center font-semibold cursor-pointer hover:opacity-80', onClick: () => onClick && onClick(item.id), children: [_jsx(IconAlertTriangle, { className: "h-6 w-6" }), _jsx("div", { dangerouslySetInnerHTML: { __html: item.message } })] }, item.id))) }), showClose && (_jsx("div", { className: `${textColor}`, children: _jsx("button", { onClick: () => setView(null), children: _jsx(IconSquareRoundedX, { className: `h-4 w-4 ${textColor}` }) }) }))] }) }) }) }));
        }
        else {
            setView(null);
        }
        if (timeout) {
            setTimeout(() => {
                setView(null);
                if (props.onTimeout) {
                    props.onTimeout();
                }
            }, timeout);
        }
    }, [props.messages, bgColor, textColor, showClose, onClick, timeout]);
    return _jsx(_Fragment, { children: view });
};
//# sourceMappingURL=ShowNotifications.js.map