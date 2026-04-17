/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { parse, stringify } from '../utils/jsonUtils';
class CacheContext {
    constructor() {
        this.data = new Map();
    }
    static create(value) {
        const cache = new CacheContext();
        const data = parse(value);
        if (value) {
            cache.data = new Map(Object.entries(data.data));
        }
        return cache;
    }
    isOpened(key, postFix) {
        const cacheKey = key + (postFix ? '_' + postFix : '');
        return this.data.get(cacheKey) ?? false;
    }
    setOpened(key, postFix, opened = true) {
        const cacheKey = key + (postFix ? '_' + postFix : '');
        this.data.set(cacheKey, opened);
    }
    setClosed(key, postFix) {
        this.setOpened(key, postFix, false);
    }
    toJson() {
        return stringify(this);
    }
}
export function isOpenedAdvancedSearch(key, postFix) {
    if (typeof window === 'undefined')
        return false;
    const cache = CacheContext.create(localStorage.getItem('advancedSearchFormOpened'));
    return cache.isOpened(key, postFix);
}
export function setOpenedAdvancedSearch(key, postFix, opened = true) {
    if (typeof window === 'undefined')
        return;
    const cache = CacheContext.create(localStorage.getItem('advancedSearchFormOpened'));
    cache.setOpened(key, postFix, opened);
    localStorage.setItem('advancedSearchFormOpened', cache.toJson());
}
export function setClosedAdvancedSearch(key, postFix) {
    if (typeof window === 'undefined')
        return;
    const cache = CacheContext.create(localStorage.getItem('advancedSearchFormOpened'));
    cache.setClosed(key, postFix);
    localStorage.setItem('advancedSearchFormOpened', cache.toJson());
}
//# sourceMappingURL=AdvancedSearchOpenCache.js.map