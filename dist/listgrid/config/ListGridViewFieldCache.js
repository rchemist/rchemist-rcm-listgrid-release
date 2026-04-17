/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { parse, stringify } from '../utils/jsonUtils';
const cacheKey = 'listGridViewFields';
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
    setFields(key, postFix, fields) {
        const cacheKey = this.createCacheKey(key, postFix);
        this.data.set(cacheKey, fields);
    }
    getFields(key, postFix) {
        const cacheKey = this.createCacheKey(key, postFix);
        return this.data.get(cacheKey) ?? [];
    }
    clearFields(key, postFix) {
        const cacheKey = this.createCacheKey(key, postFix);
        this.data.delete(cacheKey);
    }
    createCacheKey(key, postFix) {
        return key + (postFix ? '_' + postFix : '');
    }
    toJson() {
        return stringify(this);
    }
}
export function getListFieldsFromCache(key, postFix) {
    if (typeof window === 'undefined')
        return undefined;
    const cache = CacheContext.create(localStorage.getItem(cacheKey));
    return cache.getFields(key, postFix);
}
export function setListFieldsToCache(key, postFix, fields) {
    if (typeof window === 'undefined')
        return;
    const cache = CacheContext.create(localStorage.getItem(cacheKey));
    cache.setFields(key, postFix, fields);
    localStorage.setItem(cacheKey, cache.toJson());
}
export function clearListFieldsToCache(key, postFix) {
    if (typeof window === 'undefined')
        return;
    const cache = CacheContext.create(localStorage.getItem(cacheKey));
    cache.clearFields(key, postFix);
    localStorage.setItem(cacheKey, cache.toJson());
}
//# sourceMappingURL=ListGridViewFieldCache.js.map