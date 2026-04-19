import React, { ReactNode } from 'react';
import { EntityFormButton } from '../../../config/EntityFormButton';
import { ViewEntityFormButtonsProps } from '../types/ViewEntityFormButtons.types';
/**
 * ViewEntityFormButtons 컴포넌트
 * - EntityForm의 버튼 영역만 렌더링합니다.
 * - 버튼 그룹을 flex row로 배치합니다.
 *
 * @param props.buttons - 버튼(ReactNode)
 */
interface ViewButtonsProps {
    buttons: ReactNode;
}
export declare const ViewEntityFormButtons: React.NamedExoticComponent<ViewButtonsProps>;
export declare function getOverwriteButton(buttons: EntityFormButton[] | undefined, id: string): boolean;
/**
 * responsive screen 크기에 따라 버튼 사이즈와 위치를 조정하기 위해 별도의 functions 으로 분리한다.
 * row-reverse 를 사용하기 위해 단일 element 를 리턴하지 않고 reactnode[] 를 리턴할 수 있게 함수로 만들었다.
 * @param router
 * @param pathname
 * @param props
 */
export declare function getEntityFormButtons(props: ViewEntityFormButtonsProps): Promise<ReactNode[]>;
export {};
//# sourceMappingURL=ViewEntityFormButtons.d.ts.map