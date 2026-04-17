/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { isEqualsIgnoreCase } from "../misc";
export class EntityFormButton {
    constructor(id) {
        this.id = id;
    }
    // 버튼 ID를 반환
    getId() {
        return this.id;
    }
    // id 가 save 이거나 delete 인 경우에는 기존의 entityForm 버튼을 대체한다.
    isOverwrite(id) {
        return isEqualsIgnoreCase(this.id, id);
    }
    withIcon(icon) {
        this.icon = icon;
        return this;
    }
    withLabel(label) {
        this.label = label;
        return this;
    }
    withClassName(className) {
        this.className = className;
        return this;
    }
    withOnClick(onClick) {
        this.onClick = onClick;
        return this;
    }
    withDisabled(disabled) {
        this.disabled = disabled;
        return this;
    }
    withHidden(hidden) {
        this.hidden = hidden;
        return this;
    }
    withTooltip(tooltip) {
        this.tooltip = tooltip;
        return this;
    }
}
//# sourceMappingURL=EntityFormButton.js.map