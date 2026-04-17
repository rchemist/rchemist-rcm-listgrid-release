'use client';
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';
import { useState } from "react";
import { isBlank } from '../../../utils/StringUtil';
export const KakaoMap = (props) => {
    const [latitude, setLatitude] = useState(props.latitude);
    const [longitude, setLongitude] = useState(props.longitude);
    useKakaoLoader({ appkey: props.apiKey, libraries: ['services'] });
    /*
    (async () => {
      useKakaoLoader({appkey: kakaoMapApiKey, libraries: ['services']});
    })().then(() => {
  
    });
  */
    'use client';
    if (latitude === undefined || longitude === undefined) {
        if (isBlank(props.address1)) {
            return null;
        }
        else {
            if (props.address1) {
                try {
                    var geocoder = new kakao.maps.services.Geocoder();
                    geocoder.addressSearch(props.address1, (result, status) => {
                        if (status === 'OK' && result) {
                            const latitude = parseFloat(result[0].y);
                            const longitude = parseFloat(result[0].x);
                            setLatitude(latitude);
                            setLongitude(longitude);
                            props.onSetCoordinates(latitude, longitude);
                        }
                    });
                }
                catch (e) {
                    // no nothing
                }
            }
        }
    }
    if (latitude === undefined || longitude === undefined) {
        return null;
    }
    return _jsx(_Fragment, { children: _jsx(Map, { id: 'address-map', level: 3, center: { lat: latitude, lng: longitude }, style: { width: '100%', height: '300px', marginTop: `1rem` }, children: _jsx(MapMarker // 마커를 생성합니다
            , { position: {
                    // 마커가 표시될 위치입니다
                    lat: latitude,
                    lng: longitude,
                }, title: props.address1 ? `${props.address1} ${props.address2}` : '' }) }) });
};
//# sourceMappingURL=KakaoMap.js.map