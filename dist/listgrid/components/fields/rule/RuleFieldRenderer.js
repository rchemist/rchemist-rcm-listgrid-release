/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { EntityForm } from '../../../config/EntityForm';
import { useSession } from '../../../auth';
export const RuleFieldRenderer = (props) => {
    const field = props.field;
    const [view, setView] = useState();
    const session = useSession();
    useEffect(() => {
        (async () => {
            const viewParams = {
                entityForm: new EntityForm('temp', ''),
                onChange: props.onChange,
                required: await field.isRequired({ session })
            };
            setView(await field.render(viewParams));
        })();
    }, []);
    return _jsx("div", { children: _jsx("div", { className: 'flex items-center', children: view }) });
};
//# sourceMappingURL=RuleFieldRenderer.js.map