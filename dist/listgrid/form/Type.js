/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { SearchForm } from './SearchForm';
import { callExternalHttpRequest } from "../misc";
import { isTrue } from '../utils/BooleanUtil';
import { signOut } from "../auth/SessionProvider";
import { showConfirm } from "../message";
export class PageResult {
    constructor(props) {
        this.list = [];
        this.searchForm = new SearchForm();
        this.list = props.list;
        this.totalCount = props.totalCount;
        this.totalPage = props.totalPage;
        this.searchForm = props.searchForm;
    }
    static createEmptyResult(searchForm) {
        return new PageResult({
            list: [],
            totalCount: 0,
            totalPage: 0,
            searchForm: searchForm || new SearchForm()
        });
    }
    withErrors(...errors) {
        this.errors = errors;
        return this;
    }
    static async fetchListData(url, searchForm, extensionOptions, serverProxy = true) {
        // 정적 빌드 시 cookies 사용으로 인한 오류 방지
        try {
            /**
             * 만약 serverSide가 true 라면 넘어 온 url 을 파라미터로 포함해 내부 프록시 api 를 호출하고 그 결과를 response 로 받는다.
             */
            const response = await callExternalHttpRequest({
                url: url,
                method: 'POST',
                formData: searchForm,
                entityFormName: extensionOptions?.entityFormName,
                extensionPoint: extensionOptions?.extensionPoint,
                serverProxy: serverProxy
            });
            if (response.isError()) {
                if (response.error === 'Failed to fetch' && response.status === 500 && typeof window !== 'undefined') {
                    await showConfirm({
                        title: '세션이 만료되었습니다.',
                        message: '서비스를 이용하려면 다시 로그인해야 합니다.',
                        confirmButtonText: '다시 로그인 하기',
                        cancelButtonText: '',
                        onConfirm: async () => {
                            await signOut();
                        }
                    });
                }
                if (response.entityError) {
                    return PageResult.createEmptyResult(searchForm).withErrors(response.entityError.error.message ?? '데이터 로딩 중 오류가 발생했습니다.');
                }
                return PageResult.createEmptyResult(searchForm).withErrors(response.error ?? '데이터 로딩 중 오류가 발생했습니다.');
            }
            const newSearchForm = SearchForm.deserialize(response.data.searchForm);
            if (searchForm.hasPreservedFilters()) {
                searchForm.getPreservedFilters().forEach((filter) => {
                    if (isTrue(filter.remove)) {
                        newSearchForm.removeFilter(filter.name);
                    }
                    else if (isTrue(filter.excludePreserve)) {
                        // TODO: Preserve exclusion logic
                    }
                    else {
                        newSearchForm.handleAndFilter(filter.name, filter.value, filter.op);
                    }
                });
            }
            // list 또는 content 필드 확인
            const listData = response.data.list || response.data.content || [];
            const responseList = listData.map((item) => ({
                ...item,
                id: String(item.id) // id를 문자열로 강제 변환
            }));
            return new PageResult({
                list: responseList,
                totalCount: response.data.totalCount,
                totalPage: response.data.totalPage,
                searchForm: newSearchForm,
            });
        }
        catch (error) {
            return PageResult.createEmptyResult(searchForm).withErrors('데이터 로딩 중 오류가 발생했습니다.');
        }
    }
}
//# sourceMappingURL=Type.js.map