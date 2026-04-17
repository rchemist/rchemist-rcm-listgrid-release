'use client';
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { getAlignClassName } from "../../../common/func";
import { isTrue } from '../../../utils/BooleanUtil';
import { useEffect, useState } from "react";
import { useListGridTheme } from "../context/ListGridThemeContext";
export const ViewColumn = ({ fields, item, index, router, path, entityForm, viewFields, viewMode, onSelect, clickAccordion, }) => {
    const [views, setViews] = useState();
    const { classNames: themeClasses } = useListGridTheme();
    const viewUrl = path + "/" + item.id;
    // 테마에서 데이터 셀 클래스 가져오기
    const dataCellClass = themeClasses.cell?.dataCell ?? '';
    const baseCellClass = themeClasses.cell?.cell ?? '';
    useEffect(() => {
        (async () => {
            const views = [];
            for (const field of fields) {
                if (viewFields.length === 0 || viewFields.includes(field.getName())) {
                    const viewListResult = await field.viewListItem({
                        entityForm,
                        item,
                        router,
                        viewUrl,
                    });
                    const linkOnCell = isTrue(viewListResult.linkOnCell, true);
                    const tdIndex = fields.indexOf(field);
                    const alignClassName = getAlignClassName(field.getListFieldAlignType());
                    views.push(_jsx("td", { className: `${baseCellClass} ${dataCellClass} ${alignClassName} whitespace-nowrap ${linkOnCell ? "cursor-pointer" : ""}`, onClick: () => {
                            if (linkOnCell) {
                                if (clickAccordion !== undefined) {
                                    clickAccordion();
                                }
                                else {
                                    if (onSelect !== undefined) {
                                        onSelect(item);
                                    }
                                    else {
                                        if (viewMode === "page") {
                                            router.push(viewUrl);
                                        }
                                        else {
                                            window.open(viewUrl, `${item.id}`);
                                        }
                                    }
                                }
                            }
                        }, children: viewListResult.result }, `td_${index}_${tdIndex}`));
                }
            }
            setViews(views);
        })();
    }, [viewFields]);
    if (views === undefined)
        return null;
    return _jsx(_Fragment, { children: views });
};
//# sourceMappingURL=ViewColumn.js.map