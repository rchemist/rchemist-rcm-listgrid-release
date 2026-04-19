interface KakaoMapProps {
    latitude?: number | undefined;
    longitude?: number | undefined;
    address1?: string | undefined;
    address2?: string | undefined;
    onSetCoordinates: (latitude: number, longitude: number) => void;
    apiKey: string;
}
export declare const KakaoMap: (props: KakaoMapProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=KakaoMap.d.ts.map