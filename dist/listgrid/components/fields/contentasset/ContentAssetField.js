import { jsx as _jsx } from "react/jsx-runtime";
/*
 *  Copyright (c) "2025". RChemist by RCHEMIST
 *  Licensed under the RCM EULA by RCHEMIST
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License under controlled by RCHEMIST
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
import { FormField } from '../abstract';
import { getInputRendererParameters } from '../../helper/FieldRendererHelper';
import { ContentAssetItem } from './ContentAssetItem';
/**
 * ContentAssetField
 * 범용적인 파일 업로드 및 관리를 위한 ListGrid 커스텀 필드
 *
 * @extends FormField
 */
export class ContentAssetField extends FormField {
    constructor(name, order) {
        super(name, order, 'contentAsset');
    }
    /**
     * ContentAssetField 핵심 렌더링 로직
     */
    renderInstance(params) {
        return (async () => {
            const inputParams = await getInputRendererParameters(this, params);
            return (_jsx(ContentAssetItem, { ...inputParams, entityForm: params.entityForm, ...(params.session !== undefined ? { session: params.session } : {}), ...(this.maxItems !== undefined ? { maxItems: this.maxItems } : {}), ...(this.acceptedFileTypes !== undefined
                    ? { acceptedFileTypes: this.acceptedFileTypes }
                    : {}), ...(this.maxFileSize !== undefined ? { maxFileSize: this.maxFileSize } : {}) }));
        })();
    }
    /**
     * ContentAssetField 인스턴스 생성
     */
    createInstance(name, order) {
        return new ContentAssetField(name, order);
    }
    /**
     * 기본값 설정
     * @param value ContentAsset 배열
     */
    withDefaultValue(value) {
        return super.withDefaultValue(value);
    }
    /**
     * 최대 항목 수 설정
     * @param maxItems 최대 항목 수
     */
    withMaxItems(maxItems) {
        this.maxItems = maxItems;
        return this;
    }
    /**
     * 허용된 파일 타입 설정
     * @param acceptedFileTypes 파일 타입 배열
     */
    withAcceptedFileTypes(acceptedFileTypes) {
        this.acceptedFileTypes = acceptedFileTypes;
        return this;
    }
    /**
     * 최대 파일 크기 설정
     * @param maxFileSize 최대 파일 크기 (bytes)
     */
    withMaxFileSize(maxFileSize) {
        this.maxFileSize = maxFileSize;
        return this;
    }
    /**
     * ContentAssetField 인스턴스 생성 헬퍼
     * @param props ContentAssetFieldProps
     */
    static create(props) {
        const field = new ContentAssetField(props.name, props.order).copyFields(props, true);
        if (props.maxItems !== undefined) {
            field.withMaxItems(props.maxItems);
        }
        if (props.acceptedFileTypes) {
            field.withAcceptedFileTypes(props.acceptedFileTypes);
        }
        if (props.maxFileSize !== undefined) {
            field.withMaxFileSize(props.maxFileSize);
        }
        return field;
    }
}
//# sourceMappingURL=ContentAssetField.js.map