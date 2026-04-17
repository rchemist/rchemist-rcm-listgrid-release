interface KakaoMapProps {
    latitude?: number;
    longitude?: number;
    address1?: string;
    address2?: string;
    onSetCoordinates: (latitude: number, longitude: number) => void;
    apiKey: string;
}
export declare const KakaoMap: (props: KakaoMapProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=KakaoMap.d.ts.map