import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useEntityFormTheme } from "../context/EntityFormThemeContext";
import { validateAndAdvanceStep } from "./CreateStepView";
export const CreateStepButtons = React.memo(function CreateStepButtons({ currentStep, maxStep, entityForm, setEntityForm, setCurrentStep, onClickSaveButton, session, }) {
    const { classNames, cn, buttonLabels } = useEntityFormTheme();
    const handleNext = React.useCallback(async () => {
        const { canAdvance, updatedForm } = await validateAndAdvanceStep(entityForm, currentStep, session);
        setEntityForm(updatedForm);
        if (canAdvance) {
            setCurrentStep(currentStep + 1);
        }
    }, [entityForm, currentStep, session, setEntityForm, setCurrentStep]);
    const handlePrev = React.useCallback(() => {
        setCurrentStep(currentStep > 0 ? currentStep - 1 : currentStep);
    }, [currentStep, setCurrentStep]);
    return (_jsxs("div", { className: cn("rcm-create-step-buttons", classNames.createStep?.buttonGroup), children: [_jsx("button", { type: "button", className: cn("rcm-button", classNames.createStep?.prevButton), onClick: handlePrev, disabled: currentStep === 0, children: "\uC774\uC804" }), currentStep < maxStep && (_jsx("button", { type: "button", className: cn("rcm-button", classNames.createStep?.nextButton), "data-variant": "primary", onClick: handleNext, children: "\uB2E4\uC74C" })), currentStep === maxStep && (_jsx("button", { type: "button", className: cn("rcm-button", classNames.createStep?.saveButton), "data-variant": "primary", onClick: onClickSaveButton, children: buttonLabels?.save ?? '저장' }))] }));
});
//# sourceMappingURL=CreateStepButtons.js.map