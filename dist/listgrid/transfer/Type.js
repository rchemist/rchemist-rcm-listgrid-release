/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { fDate, fDateTime } from '../misc';
import { isTrue } from '../utils/BooleanUtil';
import { getPlainText } from '../ui';
import { defaultString, isBlank, subStringAfterLast, subStringBeforeLast, } from '../utils/StringUtil';
import { isEmpty } from '../utils';
export class DataTransferProperty {
    constructor(data) {
        this.name = data.name;
        this.propertyName = data.propertyName;
        this.helpText = data.helpText;
        this.order = data.order;
        this.tabId = data.tabId;
        this.fieldGroupId = data.fieldGroupId;
    }
    static fromJson(data) {
        return new DataTransferProperty(data);
    }
    static fromJsonArray(data) {
        return data.map((item) => DataTransferProperty.fromJson(item));
    }
    withHelpText(helpText) {
        this.helpText = helpText;
        return this;
    }
    withOrder(order) {
        this.order = order;
        return this;
    }
    withTabId(tabId) {
        this.tabId = tabId;
        return this;
    }
    withFieldGroupId(fieldGroupId) {
        this.fieldGroupId = fieldGroupId;
        return this;
    }
    isConfigured(...configuredForms) {
        const tabId = this.tabId ? this.tabId : '';
        const fieldGroupId = this.fieldGroupId ? this.fieldGroupId : '';
        const form = DataTransferProperty.getForm(tabId, fieldGroupId);
        try {
            configuredForms.forEach((configuredForm) => {
                if (configuredForm === form) {
                    throw new Error('configured');
                }
            });
        }
        catch (e) {
            //
            return true;
        }
        return false;
    }
    static getForm(tabId, fieldGroupId) {
        return tabId + '_' + fieldGroupId;
    }
}
export const DataTransferAll = {
    exportable: true,
    importable: true,
};
export const DataTransferNotSupport = {
    exportable: false,
    importable: false,
};
export const DataTransferExportOnly = {
    exportable: true,
    importable: false,
};
export const DataTransferImportOnly = {
    exportable: false,
    importable: true,
};
export class DataTransferConfig {
    constructor(data, url) {
        this.export = { fields: [] };
        this.import = { fields: [] };
        this.type = data.type ? data.type : { exportable: true, importable: true };
        this.export = data.export ? data.export : { fields: [] };
        this.import = data.import ? data.import : { fields: [] };
        this.exportFileName = data.exportFileName;
        const defaultImportMode = { create: true, update: true };
        const importMode = data.import?.mode ?? defaultImportMode;
        if (this.import) {
            this.import.mode = importMode;
        }
        else {
            this.import = { fields: [], mode: importMode };
        }
        if (this.export.url === undefined) {
            this.export.url = url;
        }
        if (this.import.url === undefined) {
            // 엑셀 업로드 기본 경로
            this.import.url = url + '/excel-upload';
        }
    }
    isSupportExport() {
        return isTrue(this.type.exportable);
    }
    isSupportImport() {
        return isTrue(this.type.importable);
    }
    isImportUpdateEnabled() {
        return this.import?.mode?.update !== false;
    }
    withExportableFields(...exportableFields) {
        if (this.export) {
            this.export.fields = exportableFields;
        }
        else {
            this.export = { fields: exportableFields };
        }
        return this;
    }
    withImportableFields(...importableFields) {
        if (this.import) {
            this.import.fields = importableFields;
        }
        else {
            this.import = { fields: importableFields };
        }
        return this;
    }
    withExportUrl(exportUrl) {
        if (this.export) {
            this.export.url = exportUrl;
        }
        else {
            this.export = { fields: [], url: exportUrl };
        }
        return this;
    }
    withImportUrl(importUrl) {
        if (this.import) {
            this.import.url = importUrl;
        }
        else {
            this.import = { fields: [], url: importUrl };
        }
        return this;
    }
    withExportFileName(exportFileName) {
        this.exportFileName = exportFileName;
        return this;
    }
    withImportSampleData(importSampleData) {
        if (this.import) {
            this.import.sampleData = importSampleData;
        }
        else {
            this.import = { fields: [], sampleData: importSampleData };
        }
        return this;
    }
    withAddedExportFields(addedFields) {
        if (this.export) {
            this.export.addedFields = addedFields;
        }
        else {
            this.export = { fields: [], addedFields: addedFields };
        }
        return this;
    }
    withAddedImportFields(addedFields) {
        if (this.import) {
            this.import.addedFields = addedFields;
        }
        else {
            this.import = { fields: [], addedFields: addedFields };
        }
        return this;
    }
    withOverrideExportFormData(overrideFormData) {
        if (this.export) {
            this.export.overrideFormData = overrideFormData;
        }
        else {
            this.export = { fields: [], overrideFormData: overrideFormData };
        }
        return this;
    }
    withOverrideImportFormData(overrideFormData) {
        if (this.import) {
            this.import.overrideFormData = overrideFormData;
        }
        else {
            this.import = { fields: [], overrideFormData: overrideFormData };
        }
        return this;
    }
    getExportFileName() {
        return this.exportFileName || 'export';
    }
    setDataFields(dataFields) {
        if (dataFields.length === 0) {
            return;
        }
        if (!this.export) {
            this.export = { fields: [] };
        }
        if (!this.import) {
            this.import = { fields: [] };
        }
        this.export.fields = this.updateFields(this.export.fields ?? [], dataFields, this.isSupportExport(), { ensureId: true });
        this.import.fields = this.updateFields(this.import.fields ?? [], dataFields, this.isSupportImport(), { ensureId: this.isImportUpdateEnabled() });
    }
    updateFields(existingFields, dataFields, isSupported, options) {
        if (isSupported) {
            if (existingFields.length === 0) {
                existingFields.push(...dataFields);
            }
            else {
                dataFields.forEach((dataField) => {
                    if (!existingFields.find((field) => field.equals(dataField))) {
                        existingFields.push(dataField);
                    }
                });
            }
        }
        const ensureId = options?.ensureId ?? true;
        return this.applyIdPolicy(existingFields, ensureId);
    }
    applyIdPolicy(fields, ensureId) {
        if (ensureId) {
            const hasId = fields.some((field) => field.getName() === 'id');
            if (!hasId) {
                return [DataField.create({ name: 'id', label: '아이디', type: 'text' }), ...fields];
            }
            return fields;
        }
        return fields.filter((field) => field.getName() !== 'id');
    }
    withExportDescription(description) {
        if (this.export) {
            this.export.description = description;
        }
        else {
            this.export = { fields: [], description: description };
        }
        return this;
    }
    withImportDescription(description) {
        if (this.import) {
            this.import.description = description;
        }
        else {
            this.import = { fields: [], description: description };
        }
        return this;
    }
    withImportOverrideParseResult(overrideParseResult) {
        if (this.import) {
            this.import.overrideParseResult = overrideParseResult;
        }
        else {
            this.import = { fields: [], overrideParseResult: overrideParseResult };
        }
        return this;
    }
    validateDataFields(defaultFields) {
        // 이 class 인스턴스를 사용하기 전 반드시 initialize 를 해야 한다.
        // fields 설정을 조정하기 위해서이다.
        if (this.isSupportExport()) {
            if (!this.export) {
                this.export = { fields: [] };
            }
            if (isEmpty(this.export.fields)) {
                this.export.fields = this.applyIdPolicy([...defaultFields], true);
            }
        }
        if (this.isSupportImport()) {
            if (!this.import) {
                this.import = { fields: [] };
            }
            if (isEmpty(this.import.fields)) {
                this.import.fields = this.applyIdPolicy([...defaultFields], this.isImportUpdateEnabled());
            }
        }
    }
}
export class DataField {
    constructor({ name, label, type, description, options, dataTransferRule, required, }) {
        this.name = name;
        this.label = label;
        this.description = description;
        this.type = type;
        this.required = required;
        this.options = options;
        this.dataTransferRule = dataTransferRule;
    }
    static create(props) {
        return new DataField(props);
    }
    equals(other) {
        return this.getName() === other.getName();
    }
    getName() {
        return this.name;
    }
    getLabel() {
        return this.label;
    }
    isRequired() {
        return isTrue(this.required);
    }
    getType() {
        return this.type;
    }
    getOptions() {
        return this.options ?? [];
    }
    async getValueOnExport(value) {
        if (this.dataTransferRule?.changeValueOnExport) {
            return await this.dataTransferRule?.changeValueOnExport(value);
        }
        if (value === undefined || value === null) {
            return '';
        }
        if (this.type === 'select') {
            if (this.options) {
                const option = this.options?.find((option) => option.value === value);
                return option ? option.label : value;
            }
        }
        else if (this.type === 'multiselect') {
            if (this.options) {
                const val = value + '';
                if (val === '') {
                    return '';
                }
                // multi select value
                if (val.includes('|||')) {
                    const values = val.split('|||');
                    return values
                        .map((value) => {
                        const option = this.options?.find((option) => option.value === value);
                        return option ? (option.label ?? option.value) : value;
                    })
                        .join(',');
                }
                else {
                    const option = this.options?.find((option) => option.value === value);
                    return option ? (option.label ?? option.value) : value;
                }
            }
        }
        else if (this.type === 'datetime') {
            return await getRangeDatetimeValue(value);
        }
        else if (this.type === 'boolean') {
            const bool = isTrue(value);
            return bool ? '예' : '아니오';
        }
        else if (this.type === 'html') {
            return getPlainText(value);
        }
        else if (this.type === 'markdown') {
            return getPlainText(value);
        }
        else if (this.type === 'date') {
            return await getRangeDateValue(value);
        }
        return value;
    }
    async getValueOnImport(value) {
        if (this.dataTransferRule?.changeValueOnImport) {
            return await this.dataTransferRule?.changeValueOnImport(value);
        }
        if (this.type === 'select') {
            const option = this.options?.find((option) => option.label === value);
            return option ? option.value : value;
        }
        else if (this.type === 'multiselect') {
            const val = value + '';
            if (val === '') {
                return '';
            }
            // multi select value
            if (val.includes(',')) {
                const values = val.split('|||');
                return values
                    .map((value) => {
                    const option = this.options?.find((option) => option.label === value);
                    return option ? option.value : value;
                })
                    .join('|||');
            }
            else {
                const option = this.options?.find((option) => option.label === value);
                return option ? option.value : value;
            }
        }
        else if (this.type === 'datetime') {
            return await getImportedRangeDatetimeValue(value);
        }
        else if (this.type === 'date') {
            return await getImportedRangeDateValue(value);
        }
        else if (this.type === 'boolean') {
            return isTrue(value);
        }
        else if (this.type === 'html') {
            return value;
        }
        else if (this.type === 'markdown') {
            return value;
        }
        return value;
    }
    withRequired(required) {
        this.required = required;
        return this;
    }
    withOptions(options) {
        this.options = options;
        return this;
    }
    withChangeValueOnExport(changeValueOnExport) {
        if (this.dataTransferRule) {
            this.dataTransferRule.changeValueOnExport = changeValueOnExport;
        }
        else {
            this.dataTransferRule = {
                changeValueOnExport: changeValueOnExport,
            };
        }
        return this;
    }
    withChangeValueOnImport(changeValueOnImport) {
        if (this.dataTransferRule) {
            this.dataTransferRule.changeValueOnImport = changeValueOnImport;
        }
        else {
            this.dataTransferRule = {
                changeValueOnImport: changeValueOnImport,
            };
        }
        return this;
    }
    withDescription(description) {
        this.description = description;
        return this;
    }
    getDescription() {
        return defaultString(this.description);
    }
}
export function createFieldMap(...fields) {
    const fieldMap = new Map();
    fields.forEach((field) => {
        fieldMap.set(field.getName(), field);
    });
    return fieldMap;
}
export function getExportFileName(exportFileName, translation) {
    let fileName = exportFileName || 'export_file';
    // replace translation
    fileName = translation(fileName);
    // replace space to underscore
    fileName = fileName.replace(/ /g, '_');
    let postfix = '';
    if (fileName.includes('.')) {
        postfix = subStringAfterLast(fileName, '.');
        fileName = subStringBeforeLast(fileName, '.');
    }
    // add current date to file name
    const date = fDateTime(new Date(), 'yyyyMMddHHmmss');
    fileName = fileName + '_' + date;
    if (!isBlank(postfix)) {
        fileName = fileName + '.' + postfix;
    }
    else {
        fileName = fileName + '.xlsx';
    }
    return fileName;
}
// 타입 가드 함수들
export function isDataColumn(value) {
    return (!!value &&
        typeof value === 'object' &&
        typeof value.name === 'string' &&
        'value' in value);
}
export function isDataRow(value) {
    return Array.isArray(value) && value.every(isDataColumn);
}
export function isDataRowSet(value) {
    return Array.isArray(value) && value.every(isDataRow);
}
export function isSampleDataItem(value) {
    return (!!value &&
        typeof value === 'object' &&
        typeof value.name === 'string' &&
        'value' in value);
}
export async function getRangeDateValue(value) {
    // value 가 배열이면 배열의 첫번째 요소를 반환
    if (value !== undefined) {
        if (Array.isArray(value)) {
            if (value.length == 2) {
                return fDate(value[0]) + ' ~ ' + fDate(value[1]);
            }
            else if (value.length == 1) {
                return fDate(value[0]);
            }
        }
    }
    return value;
}
export async function getRangeDatetimeValue(value) {
    // value 가 배열이면 배열의 첫번째 요소를 반환
    if (value !== undefined) {
        if (Array.isArray(value)) {
            if (value.length == 2) {
                return fDateTime(value[0]) + ' ~ ' + fDateTime(value[1]);
            }
            else if (value.length == 1) {
                return fDateTime(value[0]);
            }
        }
    }
    return value;
}
export async function getImportedRangeDateValue(value) {
    if (value !== undefined) {
        const valueString = value + '';
        if (valueString.includes(' ~ ')) {
            const values = valueString.split(' ~ ');
            return [fDate(values[0]), fDate(values[1])];
        }
        else if (valueString.includes('~')) {
            const values = valueString.split('~');
            return [fDate(values[0]), fDate(values[1])];
        }
        else if (valueString.includes(',')) {
            const values = valueString.split(',');
            return [fDate(values[0]), fDate(values[1])];
        }
        else {
            // 단일값
            return fDate(value);
        }
    }
    return value;
}
export async function getImportedRangeDatetimeValue(value) {
    if (value !== undefined) {
        const valueString = value + '';
        if (valueString.includes(' ~ ')) {
            const values = valueString.split(' ~ ');
            return [fDateTime(values[0]), fDateTime(values[1])];
        }
        else if (valueString.includes('~')) {
            const values = valueString.split('~');
            return [fDateTime(values[0]), fDateTime(values[1])];
        }
        else if (valueString.includes(',')) {
            const values = valueString.split(',');
            return [fDateTime(values[0]), fDateTime(values[1])];
        }
        else {
            // 단일값
            return fDateTime(value);
        }
    }
    return value;
}
//# sourceMappingURL=Type.js.map