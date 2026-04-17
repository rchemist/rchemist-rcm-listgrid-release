/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { create } from 'zustand';
export const useHeaderFilterStore = create((set, get) => ({
    openFilterId: null,
    openFilter: (filterId) => {
        set({ openFilterId: filterId });
    },
    closeFilter: () => {
        set({ openFilterId: null });
    },
    isFilterOpen: (filterId) => {
        return get().openFilterId === filterId;
    },
}));
//# sourceMappingURL=headerFilterStore.js.map