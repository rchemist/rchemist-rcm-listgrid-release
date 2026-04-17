interface HeaderFilterState {
    openFilterId: string | null;
    openFilter: (filterId: string) => void;
    closeFilter: () => void;
    isFilterOpen: (filterId: string) => boolean;
}
export declare const useHeaderFilterStore: import("zustand").UseBoundStore<import("zustand").StoreApi<HeaderFilterState>>;
export {};
//# sourceMappingURL=headerFilterStore.d.ts.map