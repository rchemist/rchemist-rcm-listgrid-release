// 타입 가드 함수
export function isApiSpecification(obj) {
    return (typeof obj === 'object' &&
        obj !== null &&
        typeof obj.url === 'string' &&
        typeof obj.method === 'string' &&
        (typeof obj.response === 'string' || obj.response !== undefined));
}
//# sourceMappingURL=Type.js.map