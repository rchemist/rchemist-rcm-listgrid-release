/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Paper } from "../../../ui";
import { Modal } from "../../../ui";
import { getConditionalReactNode } from '../../../config/Config';
import { RuleBasedFieldsView } from './RuleBasedFieldView';
import { useSession } from '../../../auth';
export const RuleBasedSelector = ({ ...props }) => {
    const entityForm = props.entityForm;
    const apiUrl = getApiUrl(props.apiUrl ?? entityForm.getUrl(), props.type, props.parentId ?? '');
    const [open, setOpen] = useState(false);
    const [label, setLabel] = useState();
    const [helpText, setHelpText] = useState();
    const session = useSession();
    /**
     * RuleBasedSelector 를 FormField 의 render 에서 사용할 수 있도록 label 과 helpText 를 맞춘다.
     */
    useEffect(() => {
        if (props.label === undefined) {
            if (props.fieldName !== undefined) {
                const label = entityForm.getLabel(props.fieldName);
                setLabel(label);
            }
            else {
                setLabel((props.type === 'add' ? '검색 후 등록' : '검색 후 제거'));
            }
        }
        else {
            //
            if (typeof props.label === 'boolean') {
                setLabel((props.type === 'add' ? '검색 후 등록' : '검색 후 제거'));
            }
            else {
                setLabel(props.label);
            }
        }
        if (props.helpText === undefined) {
            if (props.fieldName !== undefined) {
                (async () => {
                    const label = await entityForm.getHelpText(props.fieldName);
                    setHelpText(label);
                })();
            }
            else {
                setHelpText('');
            }
        }
        else {
            //
            (async () => {
                const helpText = await getConditionalReactNode({ entityForm, renderType: entityForm?.getRenderType(), session: session }, props.helpText);
                setHelpText(helpText);
            })();
        }
    }, []);
    return _jsxs(_Fragment, { children: [_jsx("button", { className: 'btn btn-outline-secondary h-[34px]', onClick: () => {
                    setOpen(true);
                }, children: label }), _jsx(Modal, { opened: open, size: '5xl', onClose: () => {
                    setOpen(false);
                }, children: _jsx(Paper, { children: _jsx(RuleBasedFieldsView, { ...props, label: label, entityForms: [{ label: '', prefix: '', entityForm: entityForm }], helpText: helpText, apiUrl: apiUrl, viewType: 'selector', onSubmitSelector: props.onSubmit !== undefined ? props.onSubmit : (count) => {
                            setOpen(false);
                            props.setNotifications?.([`${count} 건의 데이터가 ${props.type === 'add' ? '등록' : '제거'} 되었습니다.`]);
                            props.onRefresh?.();
                        }, onCancel: () => {
                            setOpen(false);
                        } }) }) })] });
};
function getApiUrl(apiUrl, type, parentId) {
    return (`${apiUrl}/${type}/${parentId}`);
}
//# sourceMappingURL=RuleBasedSelector.js.map