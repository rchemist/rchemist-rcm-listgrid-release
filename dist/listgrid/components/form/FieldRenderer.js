'use client';
/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AbstractManyToOneField } from '../fields/abstract';
import React, { useCallback, useEffect, useId, useState } from "react";
import { ViewFieldError } from './ui/ViewFieldError';
import { ViewHelpText } from './ui/ViewHelpText';
import { Icon } from "@iconify/react";
import { isTrue } from '../../utils/BooleanUtil';
import { isBlank } from '../../utils/StringUtil';
import { IconHelp } from "@tabler/icons-react";
import { Tooltip } from "../../ui";
import { useLoadingStore } from "../../loading";
import { getTranslation } from "../../utils/i18n";
import { getManyToOneLink } from "../helper/FieldRendererHelper";
import { useEntityFormTheme } from "./context/EntityFormThemeContext";
export const FieldRenderer = (props) => {
    const { t } = getTranslation();
    const { classNames, cn, getFieldRenderer } = useEntityFormTheme();
    const entityForm = props.entityForm;
    const setEntityForm = props.setEntityForm;
    const field = props.field;
    const subCollectionEntity = isTrue(props.subCollectionEntity, false);
    const { setOpenBaseLoading } = useLoadingStore();
    // Generate unique ID per component instance to prevent ID collision between parent and modal forms
    const instanceId = useId();
    // 필드 렌더링에 필요한 상태들
    // State for rendering the field
    const [version, setVersion] = React.useState();
    const [view, setView] = useState();
    const [errors, setErrors] = useState([]);
    const [required, setRequired] = useState(false);
    const [_readonly, setReadonly] = useState();
    const [tooltip, setTooltip] = useState("");
    const [helpText, setHelpText] = useState("");
    const [_placeHolder, setPlaceHolder] = useState("");
    const [manyToOneLink, setManyToOneLink] = useState(null);
    const [dirty, setDirty] = useState(false);
    // 커스텀 렌더러용 현재 필드 값
    const [currentValue, setCurrentValue] = useState();
    // 커스텀 필드 렌더러 확인
    const CustomFieldRenderer = getFieldRenderer(field.getName());
    // 커스텀 렌더러용 onChange 핸들러
    const handleFieldChange = useCallback((value, propagation) => {
        (async () => {
            const fieldName = field.getName();
            const currentScroll = window.scrollY;
            setErrors([]);
            setCurrentValue(value);
            const isPropagation = isTrue(propagation, true);
            let cloned = entityForm.clone(true);
            cloned.setValue(fieldName, value);
            cloned.clearAlertMessages(false);
            const updatedField = cloned.fields.get(fieldName);
            setDirty(updatedField?.isDirty() ?? false);
            const validationErrors = await cloned.validate({
                fieldNames: [fieldName],
                session: props.session,
            });
            cloned.mergeError(fieldName, validationErrors);
            let changed = false;
            if (isPropagation) {
                if (cloned.onChanges && cloned.onChanges.length > 0) {
                    for (const onChange of cloned.onChanges) {
                        try {
                            cloned = await onChange(cloned, fieldName);
                            if (isTrue(cloned.shouldReload)) {
                                changed = true;
                            }
                        }
                        catch (e) {
                            console.error(e);
                        }
                    }
                }
            }
            const manyToOneField = cloned.getField(fieldName);
            setManyToOneLink(await getManyToOneLink(cloned.getRenderType(), manyToOneField));
            if (changed || manyToOneField instanceof AbstractManyToOneField) {
                setEntityForm?.(cloned);
            }
            else {
                entityForm.merge(cloned);
                setEntityForm?.(entityForm);
            }
            requestAnimationFrame(() => {
                if (Math.abs(window.scrollY - currentScroll) > 0) {
                    setOpenBaseLoading(true);
                    window.scrollTo({
                        top: currentScroll,
                        behavior: "instant",
                    });
                    setTimeout(() => {
                        setOpenBaseLoading(false);
                    }, 50);
                }
            });
        })();
    }, [entityForm, setEntityForm, field, props.session, setOpenBaseLoading]);
    // 커스텀 렌더러용 onError 핸들러
    const handleFieldError = useCallback((message) => {
        if (isBlank(message))
            return;
        const newErrors = [message];
        setErrors(newErrors);
        const errors = entityForm.errors ? [...entityForm.errors] : [];
        errors.push({
            name: field.name,
            label: field.label,
            errors: newErrors,
        });
        const cloned = entityForm.clone(true).withErrors(errors);
        setEntityForm?.(cloned);
    }, [entityForm, setEntityForm, field]);
    // 커스텀 렌더러용 clearError 핸들러
    const handleClearError = useCallback(() => {
        setErrors([]);
    }, []);
    const name = field.getName();
    const label = field.getLabel();
    const showTooltip = !isBlank(tooltip);
    const hideLabel = isTrue(field.hideLabel);
    useEffect(() => {
        if (entityForm) {
            setVersion(entityForm.version);
            const fieldInstance = entityForm.fields.get(name);
            setDirty(fieldInstance?.isDirty() ?? false);
            // 커스텀 렌더러용 현재 값 설정
            setCurrentValue(entityForm.getValue(name));
            (async () => {
                // 필드 에러, 필수, 읽기전용, 툴팁, 도움말, placeholder 등 비동기 조회 및 상태 반영
                // Fetch field errors, required, readonly, tooltip, helpText, placeholder, etc. asynchronously
                const messages = new Set();
                const fieldErrors = entityForm?.errors;
                if (fieldErrors && fieldErrors.length > 0) {
                    fieldErrors.forEach((error) => {
                        if (error.name === field.getName() && error.errors.length > 0) {
                            error.errors.forEach((error) => {
                                messages.add(error);
                            });
                        }
                    });
                }
                setErrors([...messages]);
                const required = await field.isRequired({
                    entityForm,
                    session: props.session,
                });
                const readonly = await field.isReadonly({
                    entityForm,
                    session: props.session,
                });
                setRequired(required);
                setReadonly(readonly);
                const tooltip = await field.getTooltip({
                    entityForm,
                    session: props.session,
                });
                setTooltip(tooltip);
                const helpText = await field.getHelpText({
                    entityForm,
                    session: props.session,
                });
                setHelpText(helpText);
                const placeHolder = await field.getPlaceHolder({
                    entityForm,
                    session: props.session,
                });
                setPlaceHolder(placeHolder);
                // 필드 렌더링 파라미터 구성 및 view 생성
                // Build field render parameters and generate view
                const viewParams = {
                    entityForm: entityForm,
                    session: props.session,
                    subCollectionEntity: subCollectionEntity,
                    updateEntityForm: async (updater) => {
                        // EntityForm을 업데이트하고 상태를 반영
                        const updatedEntityForm = await updater(entityForm.clone(true));
                        setEntityForm?.(updatedEntityForm);
                    },
                    resetEntityForm: props.resetEntityForm,
                    onChange: (value, propagation) => {
                        (async () => {
                            // 값 변경 시 에러 초기화, 값 반영, 검증, onChanges 콜백, manyToOneLink 갱신 등 처리
                            // On value change: clear errors, update value, validate, run onChanges, update manyToOneLink, etc.
                            const name = field.getName();
                            const currentScroll = window.scrollY; // 현재 스크롤 위치 저장
                            setErrors([]);
                            const isPropagation = isTrue(propagation, true);
                            let cloned = entityForm.clone(true);
                            cloned.setValue(name, value);
                            // persistent가 false인 alert 메시지들을 제거
                            cloned.clearAlertMessages(false);
                            // dirty 상태 즉시 계산 및 업데이트
                            const updatedField = cloned.fields.get(name);
                            setDirty(updatedField?.isDirty() ?? false);
                            // 현재 value 에 대해서만 다시 error 검사하기
                            // Validate only the current value
                            const errors = await cloned.validate({
                                fieldNames: [name],
                                session: props.session,
                            });
                            cloned.mergeError(name, errors);
                            let changed = false;
                            if (isPropagation) {
                                if (cloned.onChanges && cloned.onChanges.length > 0) {
                                    for (const onChange of cloned.onChanges) {
                                        try {
                                            cloned = await onChange(cloned, name);
                                            if (isTrue(cloned.shouldReload)) {
                                                changed = true;
                                            }
                                        }
                                        catch (e) {
                                            console.error(e);
                                        }
                                    }
                                }
                            }
                            const manyToOneField = cloned.getField(name);
                            setManyToOneLink(await getManyToOneLink(cloned.getRenderType(), manyToOneField));
                            if (changed || manyToOneField instanceof AbstractManyToOneField) {
                                setEntityForm?.(cloned);
                            }
                            else {
                                entityForm.merge(cloned);
                                setEntityForm?.(entityForm);
                            }
                            // entityForm 갱신으로 스크롤에 변화가 생겼다면 해당 위치로 스크롤을 자동 이동하는 구문
                            // If entityForm update changes scroll, auto-scroll to previous position
                            requestAnimationFrame(() => {
                                if (Math.abs(window.scrollY - currentScroll) > 0) {
                                    setOpenBaseLoading(true);
                                    window.scrollTo({
                                        top: currentScroll,
                                        behavior: "instant",
                                    });
                                    setTimeout(() => {
                                        setOpenBaseLoading(false);
                                    }, 50);
                                }
                            });
                        })();
                    },
                    onError: (message) => {
                        // 필드 에러 발생 시 에러 상태 및 EntityForm 에러 갱신
                        // On field error: update error state and EntityForm errors
                        if (isBlank(message)) {
                            return;
                        }
                        const newErrors = [];
                        newErrors.push(message);
                        setErrors(newErrors);
                        const errors = [];
                        if (entityForm.errors) {
                            errors.push(...entityForm.errors);
                        }
                        errors.push({
                            name: field.name,
                            label: field.label,
                            errors: newErrors,
                        });
                        const cloned = entityForm
                            .clone(true)
                            .withErrors(errors);
                        setEntityForm?.(cloned);
                    },
                    clearError: () => {
                        // 에러 상태 초기화
                        // Clear error state
                        setErrors([]);
                    },
                    required: required,
                    readonly: readonly,
                    placeHolder: placeHolder,
                    helpText: helpText,
                };
                setView(await field.view(viewParams));
            })();
        }
    }, [entityForm, setEntityForm]);
    useEffect(() => {
        (async () => {
            // manyToOneLink(상세보기 등) 렌더링용 상태 갱신
            // Update manyToOneLink (for detail view, etc.)
            setManyToOneLink(await getManyToOneLink(entityForm.getRenderType(), field));
        })();
    }, []);
    return (_jsxs("div", { id: `field-${instanceId}-${name}`, "data-field-name": name, className: classNames.field?.container, children: [_jsxs("div", { id: `field-${instanceId}-${name}-${version}`, className: cn(`rcm-field-label-wrapper ${showTooltip ? 'rcm-field-label-wrapper-with-tooltip' : ''}`, classNames.field?.labelWrapper), children: [_jsxs("div", { className: "rcm-field-label-row", children: [!hideLabel && (_jsx("label", { className: cn('rcm-field-label', classNames.field?.label), children: viewLabel(label) })), manyToOneLink, required && (_jsx(Tooltip, { label: "필수값", color: "red", withArrow: true, children: _jsx("div", { className: "rcm-field-icon-wrap", children: _jsx(Icon, { icon: "healthicons:star-small", className: cn('rcm-field-icon rcm-field-icon-required', classNames.field?.requiredIcon) }) }) })), dirty && (_jsx(Tooltip, { label: "수정됨", color: "yellow", withArrow: true, children: _jsx("div", { className: "rcm-field-icon-wrap", children: _jsx(Icon, { icon: "healthicons:star-small-outline", className: cn('rcm-field-icon rcm-field-icon-dirty', classNames.field?.dirtyIcon) }) }) }, `tooltip-${name}-${version}-dirty`))] }), showTooltip && (_jsx("div", { className: "rcm-row", children: _jsx(Tooltip, { label: tooltip, color: "gray", withArrow: true, position: "top-end", children: _jsx("div", { className: cn('rcm-field-tooltip-icon', classNames.field?.tooltipIcon), children: _jsx(IconHelp, { className: "rcm-field-icon" }) }) }) }))] }), _jsx("div", { className: cn('rcm-field-value', classNames.field?.valueContainer), children: CustomFieldRenderer ? (_jsx(CustomFieldRenderer, { field: field, entityForm: entityForm, setEntityForm: setEntityForm, value: currentValue, onChange: handleFieldChange, onError: handleFieldError, clearError: handleClearError, required: required, readonly: _readonly ?? false, session: props.session, helpText: helpText, placeholder: _placeHolder, subCollectionEntity: subCollectionEntity, resetEntityForm: props.resetEntityForm })) : (view) }), _jsx(ViewFieldError, { errors: errors }), _jsx(ViewHelpText, { helpText: helpText })] }));
    /**
     * viewLabel
     * - 라벨이 string이면 번역, 아니면 그대로 반환
     * - If label is string, translate; otherwise, return as is
     */
    function viewLabel(label) {
        if (typeof label === "string") {
            return t(label);
        }
        return label;
    }
};
//# sourceMappingURL=FieldRenderer.js.map