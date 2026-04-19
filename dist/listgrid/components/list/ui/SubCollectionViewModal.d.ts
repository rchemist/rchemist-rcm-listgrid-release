import React from 'react';
import { EntityForm } from '../../../config/EntityForm';
import { ViewListGridProps } from '../types/ViewListGrid.types';
import { SearchForm } from '../../../form/SearchForm';
export declare const SubCollectionViewModal: ({ entityForm, managedId, props, setManagedId, fetchData, setOpenBaseLoading, mappedBy, }: {
    entityForm: EntityForm;
    managedId: string | undefined;
    props: ViewListGridProps;
    setManagedId: React.Dispatch<React.SetStateAction<string | undefined>>;
    fetchData: (form?: SearchForm) => void;
    setOpenBaseLoading: (open: boolean) => void;
    mappedBy?: string;
}) => import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=SubCollectionViewModal.d.ts.map