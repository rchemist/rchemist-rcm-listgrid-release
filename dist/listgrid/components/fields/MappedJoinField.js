import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { FormField } from './abstract';
// ManyToOne 관계이지만 단순 Join key 만 관리되는 필드인 경우 이 필드를 사용한다.
// 보통 SubCollection 에서처럼 key 값 관리만 하는 경우에 사용된다.
export class MappedJoinField extends FormField {
    constructor(name) {
        super(name, 10, 'hidden');
    }
    /**
     * MappedJoinField 핵심 렌더링 로직 (원본 render 로직 보존)
     */
    renderInstance(params) {
        return (async () => {
            return (_jsx("input", { type: 'hidden', name: `${this.getName()}`, value: await this.getCurrentValue(params.entityForm.getRenderType()) }));
        })();
    }
    /**
     * MappedJoinField 인스턴스 생성
     */
    createInstance(name, order) {
        return new MappedJoinField(name);
    }
    static create(props) {
        return new MappedJoinField(props.name).copyFields(props, true);
    }
    async isHidden(props) {
        return Promise.resolve(true);
    }
}
//# sourceMappingURL=MappedJoinField.js.map