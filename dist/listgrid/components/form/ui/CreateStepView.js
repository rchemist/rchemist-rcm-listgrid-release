import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Stepper } from "../../../ui";
import { Group } from "../../../ui";
import { useEntityFormTheme } from "../context/EntityFormThemeContext";
/**
 * Validate current step fields and determine if step can advance
 */
export async function validateAndAdvanceStep(entityForm, currentStep, session) {
    const fieldNames = [];
    for (let i = 0; i <= currentStep; i++) {
        const step = entityForm.getCreateStep()[i];
        fieldNames.push(...step.fields);
    }
    const result = await entityForm.validate({ fieldNames, session });
    if (result.length > 0) {
        const newEntityForm = entityForm.clone(true);
        newEntityForm.withErrors(result);
        return { canAdvance: false, updatedForm: newEntityForm };
    }
    return { canAdvance: true, updatedForm: entityForm.clone(true).withErrors([]) };
}
export const CreateStepView = React.memo(function CreateStepView({ currentStep, setCurrentStep, maxStep, entityForm, setEntityForm, onClickSaveButton, showStepper, setShowStepper, session, buttonPosition = 'top', }) {
    const { classNames, cn, stepperRenderer, buttonLabels } = useEntityFormTheme();
    const createSteps = entityForm.getCreateStep();
    const stepsForRenderer = React.useMemo(() => createSteps.map(step => ({
        id: step.id,
        label: step.label,
        description: step.description,
    })), [createSteps]);
    const handleStepClick = React.useCallback((step) => {
        if (step < currentStep) {
            setCurrentStep(step);
        }
    }, [currentStep, setCurrentStep]);
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
    return (_jsx("div", { className: cn("flex flex-col gap-2.5 pt-5 xl:flex-row", classNames.createStep?.container), children: _jsxs("div", { className: cn("panel relative flex-1 rounded-xl p-5", classNames.createStep?.panel), children: [_jsx("div", { className: cn("mb-2", classNames.createStep?.stepperWrapper), children: showStepper ? (stepperRenderer ? ((() => {
                        const StepRenderer = stepperRenderer;
                        return (_jsx(StepRenderer, { steps: stepsForRenderer, currentStep: currentStep, maxStep: maxStep, onStepClick: handleStepClick }));
                    })()) : (_jsx(Stepper, { active: currentStep, onStepClick: handleStepClick, children: createSteps.map((step) => (_jsx(Stepper.Step, { label: step.label, description: step.description }, step.id))) }))) : (_jsx("div", { className: cn("text-lg font-semibold", classNames.createStep?.stepLabel), children: createSteps[currentStep].label })) }), buttonPosition === 'top' && (_jsxs(Group, { justify: "center", className: cn("pt-2 space-x-2", classNames.createStep?.buttonGroup), children: [_jsx("button", { className: cn("btn btn-default", classNames.createStep?.prevButton), onClick: handlePrev, disabled: currentStep === 0, children: "\uC774\uC804" }), currentStep < maxStep && (_jsx("button", { className: cn("btn btn-primary", classNames.createStep?.nextButton), onClick: handleNext, disabled: currentStep === maxStep, children: "\uB2E4\uC74C" })), currentStep === maxStep && (_jsx("button", { className: cn("btn btn-primary", classNames.createStep?.saveButton), onClick: onClickSaveButton, children: buttonLabels?.save ?? '저장' }))] }))] }) }));
});
//# sourceMappingURL=CreateStepView.js.map