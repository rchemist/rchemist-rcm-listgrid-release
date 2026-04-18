'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { isTrue } from '../../../utils/BooleanUtil';
import { defaultString, isBlank } from '../../../utils/StringUtil';
import { KakaoMap } from '../address/KakaoMap';
import { PostCodeSelector } from "./PostCodeSelector";
import { useEffect, useState } from "react";
import { getRuntimeConfig } from '../../../config/RuntimeConfig';
const kakaoMapApiKey = getRuntimeConfig().kakaoMapAppKey;
export const AddressFieldView = ({ entityForm, onChange, ...props }) => {
    // prefix 처리 로직
    const determinePrefix = () => {
        if (props.prefix) {
            return props.prefix;
        }
        // name에 .이 포함되어 있다면 . 앞의 문자열이 prefix
        if (props.name && props.name.includes('.')) {
            return props.name.split('.')[0];
        }
        return '';
    };
    const prefix = determinePrefix();
    // 필드명 생성 함수
    const getFieldName = (fieldName) => {
        if (prefix) {
            return `${prefix}.${fieldName}`;
        }
        return fieldName;
    };
    const [postalCode, setPostalCode] = useState();
    const [clientView, setClientView] = useState(false);
    const showMap = isTrue(props.showMap, true) && !isBlank(kakaoMapApiKey) && clientView;
    const [address, setAddress] = useState();
    useEffect(() => {
        (async () => {
            const state = (await entityForm.getValue(getFieldName('state'))) ?? '';
            const city = (await entityForm.getValue(getFieldName('city'))) ?? '';
            const postalCode = await entityForm.getValue(getFieldName('postalCode')) ?? '';
            const address1 = (await entityForm.getValue(getFieldName('address1'))) ?? '';
            const address2 = (await entityForm.getValue(getFieldName('address2'))) ?? '';
            const longitude = (await entityForm.getValue(getFieldName('longitude'))) ?? '';
            const latitude = (await entityForm.getValue(getFieldName('latitude'))) ?? '';
            if (!isBlank(postalCode)) {
                setPostalCode(postalCode);
            }
            setAddress({
                city,
                state,
                postalCode,
                address1,
                address2,
                longitude,
                latitude
            });
        })();
        setClientView(true);
    }, [entityForm]);
    function onSetCoordinates(latitude, longitude) {
        onChange({
            state: defaultString(address.state),
            city: defaultString(address.city),
            address1: address.address1,
            address2: address.address2,
            postalCode: address.postalCode,
            longitude: longitude,
            latitude: latitude,
        }, true);
    }
    return _jsxs("div", { children: [_jsx(PostCodeSelector, { required: isTrue(props.required), address: address, onSubmit: (address) => {
                    onChange({
                        state: defaultString(address.state),
                        city: defaultString(address.city),
                        address1: address.address1,
                        address2: address.address2,
                        postalCode: address.postalCode,
                        longitude: address.longitude,
                        latitude: address.latitude,
                    }, true);
                }, onRemove: () => {
                    onChange({
                        state: '',
                        city: '',
                        address1: '',
                        address2: '',
                        postalCode: '',
                        longitude: undefined,
                        latitude: undefined,
                    }, true);
                } }), (showMap) && _jsx(KakaoMap, { ...address, apiKey: kakaoMapApiKey, onSetCoordinates: (latitude, longitude) => {
                    if (latitude !== address?.latitude || longitude !== address?.longitude) {
                        onSetCoordinates(latitude, longitude);
                    }
                } })] });
};
//# sourceMappingURL=AddressFieldView.js.map