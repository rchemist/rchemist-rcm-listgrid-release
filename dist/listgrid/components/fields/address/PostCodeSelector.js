'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { isBlank } from '../../../utils/StringUtil';
import { Box } from "../../../ui";
import { Flex } from "../../../ui";
import { Grid } from "../../../ui";
import { Modal } from "../../../ui";
import clsx from "clsx";
// CSS module removed in Stage 8 (host app supplies styling)
const classes = {};
import DaumPostcode from "react-daum-postcode";
export const PostCodeSelector = (props) => {
    const [open, setOpen] = useState(false);
    const [openDaumPostCode, setOpenDaumPostCode] = useState(false);
    const [postalCode, setPostalCode] = useState();
    const [state, setState] = useState();
    const [city, setCity] = useState();
    const [address1, setAddress1] = useState();
    const [address2, setAddress2] = useState();
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();
    const [error, setError] = useState('');
    const disabled = isBlank(postalCode);
    const required = props.required;
    useEffect(() => {
        initializeData();
    }, [props]);
    return (_jsxs(_Fragment, { children: [_jsxs(Flex, { gap: 10, children: [_jsx("button", { type: "button", className: "rcm-button", "data-variant": "primary", onClick: () => { setOpen(!open); }, children: "\uC8FC\uC18C \uCC3E\uAE30" }), (!required && !isBlank(postalCode)) &&
                        _jsx("button", { type: "button", className: "rcm-button", "data-variant": "outline", onClick: () => { removeAddress(); }, children: "\uC8FC\uC18C \uC81C\uAC70" })] }), open &&
                _jsx(Modal, { opened: open, onClose: () => {
                        initializeData();
                        setOpen(false);
                    }, closeOnClickOutside: true, closeOnEscape: true, 
                    /* lockScroll={true} */
                    position: "center", size: 'lg', zIndex: 11000, title: "\uC8FC\uC18C \uAC80\uC0C9", children: _jsxs("div", { style: { padding: `2rem` }, children: [_jsxs(Grid, { className: classes.row, gutter: 16, align: "center", children: [_jsx(Grid.Col, { span: 2, className: clsx(classes.title, 'text-right pr-2'), children: "\uC6B0\uD3B8\uBC88\uD638" }), _jsx(Grid.Col, { span: 10, children: _jsxs("div", { className: "rcm-postcode-input-row", children: [_jsx("input", { type: "text", value: postalCode, disabled: true, readOnly: true, className: "rcm-input" }), _jsx("button", { type: "button", className: "rcm-button", "data-variant": "primary", onClick: () => {
                                                        setOpenDaumPostCode(true);
                                                    }, children: "\uC8FC\uC18C \uAC80\uC0C9" })] }) })] }), _jsxs(Grid, { className: clsx(classes.row, classes.subRow), gutter: 16, align: "center", children: [_jsx(Grid.Col, { span: 2, className: clsx(classes.title, 'text-right pr-2'), children: "\uC8FC\uC18C" }), _jsx(Grid.Col, { span: 10, children: _jsx("input", { type: "text", value: address1, placeholder: '주소 검색을 눌러 주소를 선택하세요', readOnly: true, disabled: true, className: "rcm-input" }) })] }), !disabled &&
                                _jsxs(Grid, { className: clsx(classes.row, classes.subRow), gutter: 16, align: "center", children: [_jsx(Grid.Col, { span: 2, className: clsx(classes.title, 'text-right pr-2'), children: "\uC0C1\uC138 \uC8FC\uC18C" }), _jsxs(Grid.Col, { span: 10, children: [_jsx("input", { type: "text", value: address2, placeholder: '상세 주소를 입력하세요', onChange: (e) => {
                                                        setAddress2(e.target.value ?? '');
                                                    }, className: "rcm-input" }), !isBlank(error) &&
                                                    _jsx(Box, { className: classes.error, children: error })] })] }), _jsx(Box, { className: classes.buttonContainer, children: _jsx("button", { type: "button", className: `px-4 py-2 rounded-md text-sm font-medium transition-colors ${disabled || isBlank(address2)
                                        ? 'btn btn-outline-primary border border-gray-300 text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                                        : 'btn btn-outline-primary border border-blue-500 text-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'}`, disabled: disabled || isBlank(address2), onClick: () => {
                                        validateAndSubmit();
                                    }, children: "\uC8FC\uC18C \uC785\uB825" }) })] }) }), openDaumPostCode &&
                _jsx(Modal, { opened: openDaumPostCode, onClose: () => {
                        setOpenDaumPostCode(false);
                    }, closeOnClickOutside: false, closeOnEscape: true, 
                    /* lockScroll={true} */
                    position: "center", zIndex: 12000, children: _jsx(DaumPostcode, { onComplete: (data) => {
                            setState(data.sido);
                            setCity(data.sigungu);
                            setAddress1(data.roadAddress);
                            setAddress2('');
                            setPostalCode(data.zonecode);
                            setLongitude(data.longitude);
                            setLatitude(data.latitude);
                            setOpenDaumPostCode(false);
                        } }) })] }));
    function removeAddress() {
        if (!required) {
            setState('');
            setCity('');
            setAddress1('');
            setAddress2('');
            setPostalCode('');
            setLatitude(undefined);
            setLongitude(undefined);
            // onRemove 콜백이 있으면 사용, 없으면 기존 방식 사용
            if (props.onRemove) {
                props.onRemove();
            }
            else {
                const address = {
                    state: '',
                    city: '',
                    address1: '',
                    address2: '',
                    postalCode: '',
                    latitude: undefined,
                    longitude: undefined
                };
                props.onSubmit(address);
            }
        }
    }
    function validateAndSubmit() {
        let validated = true;
        setError('');
        if (isBlank(address1)) {
            setError('주소 선택을 눌러 주소를 입력하세요');
            validated = false;
        }
        if (validated) {
            if (isBlank(address2)) {
                setError('상세 주소를 반드시 입력해야 합니다.');
                validated = false;
            }
        }
        if (validated) {
            const address = {
                state: state ?? address1.split(' ')[0],
                city: city ?? address1.split(' ')[1],
                address1: address1,
                address2: address2,
                postalCode: postalCode,
                longitude: isBlank(longitude) ? undefined : Number(longitude),
                latitude: isBlank(latitude) ? undefined : Number(latitude),
            };
            props.onSubmit(address);
            setOpen(false);
        }
    }
    function initializeData() {
        if (props.address) {
            setCity(props.address.city);
            setState(props.address.state);
            setPostalCode(props.address.postalCode);
            setAddress1(props.address.address1);
            setAddress2(props.address.address2);
            setLongitude(props.address.longitude);
            setLatitude(props.address.latitude);
        }
    }
};
//# sourceMappingURL=PostCodeSelector.js.map