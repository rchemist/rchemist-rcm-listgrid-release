import React from 'react';
import { SubCollectionBaseButtonProps } from '../../types/SubCollectionButtons.type';
export interface CreateButtonProps {
    ableDelete: boolean;
    activeTrashIcon: boolean;
    deleteItems: () => void;
    buttons?: ((props: SubCollectionBaseButtonProps) => React.ReactNode)[];
    buttonProps: SubCollectionBaseButtonProps;
    ableAdd: boolean;
    setOpen: (open: boolean) => void;
    setRenderKey: (key: number) => void;
}
export declare const CreateButton: React.FC<CreateButtonProps>;
//# sourceMappingURL=CreateButton.d.ts.map