'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { dynamic } from "../utils/lazy";
import { Skeleton } from '../ui';
// DataImporter와 XLSX를 동적으로 로드
const DynamicDataImporter = dynamic(() => import('./DataImporter').then(mod => ({ default: mod.DataImporter })), {
    loading: () => (_jsxs("div", { className: "flex flex-col items-center justify-center p-8", children: [_jsx(Skeleton, { height: 40, width: 200, mb: "md" }), _jsx(Skeleton, { height: 200, width: "100%", mb: "md" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Skeleton, { height: 32, width: 80 }), _jsx(Skeleton, { height: 32, width: 80 })] })] })),
    ssr: false, // 클라이언트에서만 로드
});
export const LazyDataImporter = (props) => {
    return _jsx(DynamicDataImporter, { ...props });
};
export default LazyDataImporter;
//# sourceMappingURL=DynamicDataImporter.js.map