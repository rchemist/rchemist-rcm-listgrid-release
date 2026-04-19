/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
// // type script 4.9 버그로 인해 TSON 을 사용할 수 없다.
// import TSON from "typescript-json";
export function replacer(_key, value) {
    if (value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries()), // or with spread: value: [...value]
        };
    }
    else {
        return value;
    }
}
export function reviver(_key, value) {
    if (typeof value === 'object' && value !== null) {
        const record = value;
        if (record.dataType === 'Map' && record.value) {
            return new Map(record.value);
        }
    }
    return value;
}
function mapReplacer(_key, value) {
    if (value instanceof Map) {
        return Object.fromEntries(value);
    }
    else if (value instanceof Set) {
        return [...value];
        // of course you can separate cases to turn Maps into objects
    }
    return value;
}
export function stringify(obj, beautify) {
    // Circular reference를 처리하기 위한 WeakSet
    const seen = new WeakSet();
    const circularSafeReplacer = (key, value) => {
        // 먼저 mapReplacer 적용
        const mappedValue = mapReplacer(key, value);
        // 객체가 아니거나 null인 경우 그대로 반환
        if (typeof mappedValue !== 'object' || mappedValue === null) {
            return mappedValue;
        }
        // Circular reference 체크
        if (seen.has(mappedValue)) {
            return '[Circular Reference]';
        }
        seen.add(mappedValue);
        return mappedValue;
    };
    try {
        if (beautify) {
            return JSON.stringify(obj, circularSafeReplacer, 2);
        }
        return JSON.stringify(obj, circularSafeReplacer);
    }
    catch (error) {
        console.error('stringify error:', error);
        return '{}';
    }
}
const simpleStringify = (object) => {
    for (const eachIdx in object) {
        if (object[eachIdx] instanceof Map) {
            object[eachIdx] = Array.from(object[eachIdx]);
            simpleStringify(object);
        }
        else if (typeof object[eachIdx] == 'object' && object[eachIdx] !== null) {
            simpleStringify(object[eachIdx]);
        }
    }
    return JSON.stringify(object);
};
// Re-export from `misc` — `parse<T = unknown>` is the canonical generic
// implementation. Prior duplicate definition was merged in Task G (DECISIONS #74).
// This re-export preserves existing `import { parse } from '../utils/jsonUtils'`
// paths for backward-compat.
export { parse } from '../misc';
//# sourceMappingURL=jsonUtils.js.map