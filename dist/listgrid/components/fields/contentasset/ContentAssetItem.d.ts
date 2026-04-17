import React from "react";
import { InputRendererProps } from '../../../config/Config';
import { EntityForm } from '../../../config/EntityForm';
import { Session } from '../../../auth/types';
interface ContentAssetItemProps extends InputRendererProps {
    entityForm: EntityForm;
    session?: Session;
    maxItems?: number;
    acceptedFileTypes?: string[];
    maxFileSize?: number;
}
/**
 * ContentAssetItem
 * ContentAssetField의 메인 렌더링 컴포넌트
 */
export declare const ContentAssetItem: React.FC<ContentAssetItemProps>;
export {};
//# sourceMappingURL=ContentAssetItem.d.ts.map