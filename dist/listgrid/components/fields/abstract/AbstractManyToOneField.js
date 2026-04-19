/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { ListableFormField } from './ListableFormField';
/**
 * Abstract base class for ManyToOne relationship fields
 * This class provides common functionality for ManyToOneField and UserField
 */
export class AbstractManyToOneField extends ListableFormField {
    constructor(name, order, manyToOne) {
        super(name, order, 'manyToOne');
        this.config = manyToOne;
    }
    /**
     * Get the EntityForm from the config
     */
    getEntityForm() {
        return this.config.entityForm;
    }
    /**
     * Check if this field has a valid config
     */
    hasConfig() {
        return this.config != null;
    }
    /**
     * Get the field name for ID mapping
     */
    getIdFieldName() {
        return this.config.field?.id || 'id';
    }
    /**
     * Get mapped ID and name from the current value
     */
    async getMappedIdName(renderType = 'create') {
        // ManyToOne으로 매핑되어 있는 값의 id 값을 가져온다.
        const value = await this.getCurrentValue(renderType);
        if (value) {
            const idField = this.config.field?.id ?? 'id';
            const nameField = this.config.field?.name ?? 'name';
            try {
                if (nameField instanceof Function) {
                    return { id: value[idField], name: nameField(value) };
                }
                return { id: value[idField], name: value[nameField] };
            }
            catch (e) {
                console.error(e);
            }
        }
        return undefined;
    }
}
//# sourceMappingURL=AbstractManyToOneField.js.map