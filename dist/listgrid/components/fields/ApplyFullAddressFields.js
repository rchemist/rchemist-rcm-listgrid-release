/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
import { AddressMapField, appendLastDot } from './address/AddressMapField';
import { NumberField } from './NumberField';
import { isTrue } from '../../utils/BooleanUtil';
import { StringField } from './StringField';
import { RequiredValidation } from '../../validations/RequiredValidation';
import { isBlank } from '../../utils/StringUtil';
const AddressFieldTypes = ['state', 'city', 'address1', 'address2', 'postalCode', 'longitude', 'latitude'];
function getListConfig() {
    return {
        support: true,
        filterable: true,
        sortable: true
    };
}
export const applyFullAddressFields = (entityForm, props) => {
    const addressMapFieldName = `${appendLastDot(props?.prefix)}address`;
    const fields = props?.fields ?? [...AddressFieldTypes];
    const required = isTrue(props?.required);
    const showLongitudeLatitude = isTrue(props?.showLongitudeLatitude);
    function getRequiredValidation(field) {
        if (required && fields.includes(field)) {
            // required 로 체크하려면 필드가 포함되어 있어야 한다.
            return new RequiredValidation(`${field}-required-validation`, `주소 찾기 버튼을 눌러 주소를 입력하세요`);
        }
        return undefined;
    }
    const AddressField = (fieldProps) => {
        const type = fieldProps.type ?? 'string';
        const order = props?.order?.[fieldProps.name] ?? fieldProps.order;
        const name = fieldProps.prefix ? `${appendLastDot(fieldProps.prefix)}${fieldProps.name}` : fieldProps.name;
        const label = props?.label?.[fieldProps.name] ?? fieldProps.label;
        const helpText = props?.helpText?.[fieldProps.name];
        const supportList = isTrue(props?.list?.[fieldProps.name]);
        const validation = getRequiredValidation(fieldProps.name);
        const hidden = !fields.includes(fieldProps.name);
        const listConfig = supportList ? getListConfig() : undefined;
        const isFieldRequired = required && fields.includes(fieldProps.name);
        if (type === 'number') {
            return new NumberField(name, order)
                .withLabel(label)
                .withHelpText(helpText)
                .withReadOnly(true)
                .withHidden(hidden)
                .withRequired(isFieldRequired)
                .withValidations(validation)
                .withListConfig(listConfig);
        }
        else {
            return new StringField(name, order)
                .withLabel(label)
                .withHelpText(helpText)
                .withReadOnly(true)
                .withHidden(hidden)
                .withRequired(isFieldRequired)
                .withValidations(validation)
                .withListConfig(listConfig);
        }
    };
    entityForm.addFields({
        tab: props?.tab,
        fieldGroup: props?.fieldGroup,
        items: [
            new AddressMapField(`${addressMapFieldName}`, props?.order?.address ?? 1000, props?.showMap, props?.prefix)
                .withLabel(props?.label?.address ?? '주소')
                .withHelpText(props?.helpText?.address)
                .withRequired(required),
            ...(showLongitudeLatitude ? [
                AddressField({ name: 'longitude', order: 1010, type: 'number', label: '경도', prefix: props?.prefix }),
                AddressField({ name: 'latitude', order: 1010, type: 'number', label: '위도', prefix: props?.prefix }),
            ] : []),
            AddressField({ name: 'state', order: 1010, type: 'string', label: '시/도', prefix: props?.prefix }),
            AddressField({ name: 'city', order: 1010, type: 'string', label: '시/군/구', prefix: props?.prefix }),
            AddressField({ name: 'address1', order: 1010, type: 'string', label: '주소1', prefix: props?.prefix }),
            AddressField({ name: 'address2', order: 1010, type: 'string', label: '상세 주소', prefix: props?.prefix }),
            AddressField({ name: 'postalCode', order: 1010, type: 'string', label: '우편번호', prefix: props?.prefix }),
        ]
    });
    entityForm.withOnChanges(async (entityForm, name) => {
        const prefix = appendLastDot(props?.prefix);
        if (name === `${prefix}address`) {
            const address = await entityForm.getValue(`${prefix}address`);
            if (address) {
                entityForm.setValue(`${prefix}state`, address.state);
                entityForm.setValue(`${prefix}city`, address.city);
                entityForm.setValue(`${prefix}address1`, address.address1);
                entityForm.setValue(`${prefix}address2`, address.address2);
                entityForm.setValue(`${prefix}postalCode`, address.postalCode);
                if (showLongitudeLatitude) {
                    entityForm.setValue(`${prefix}longitude`, address.longitude);
                    entityForm.setValue(`${prefix}latitude`, address.latitude);
                }
                entityForm.withShouldReload(true);
            }
        }
        return entityForm;
    });
    entityForm.withOnFetchData(async (entityForm, response) => {
        const prefix = appendLastDot(props?.prefix);
        // 주소 정보를 address 밑에 저장한다.
        const addressValue = {
            state: response[`${prefix}state`],
            city: response[`${prefix}city`],
            address1: response[`${prefix}address1`],
            address2: response[`${prefix}address2`],
            postalCode: response[`${prefix}postalCode`]
        };
        entityForm.setFetchedValue(addressMapFieldName, addressValue);
        // IMPORTANT:
        // - setFetchedValue only sets current when current is undefined.
        // - Some forms/pages can initialize current as empty, which makes required validation fail
        //   even though fetched data exists.
        // Here we force current address map value when fetched address fields exist.
        const currentAddress = await entityForm.getValue(addressMapFieldName);
        const shouldForceCurrent = (!currentAddress || typeof currentAddress !== 'object')
            || (!isBlank(String(addressValue.address1 ?? '')) && isBlank(String(currentAddress.address1 ?? '')));
        if (shouldForceCurrent) {
            entityForm.setValue(addressMapFieldName, addressValue);
        }
        return entityForm;
    });
};
//# sourceMappingURL=ApplyFullAddressFields.js.map