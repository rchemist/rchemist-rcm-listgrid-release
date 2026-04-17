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
/**
 * ContentAsset 유효성 검사 함수
 */
export const validateContentAssets = (assets) => {
    const errors = [];
    const titles = new Set();
    assets.forEach((asset, index) => {
        // 제목 필수 검사
        if (!asset.title || asset.title.trim() === '') {
            errors.push({
                index,
                field: 'title',
                message: '제목은 필수 입력 항목입니다.'
            });
        }
        // 제목 중복 검사
        if (asset.title && titles.has(asset.title.trim())) {
            errors.push({
                index,
                field: 'title',
                message: '동일한 제목이 이미 존재합니다.'
            });
        }
        else if (asset.title) {
            titles.add(asset.title.trim());
        }
        // 파일 URL 필수 검사
        if (!asset.assetUrl || asset.assetUrl.trim() === '') {
            errors.push({
                index,
                field: 'assetUrl',
                message: '파일을 업로드해주세요.'
            });
        }
    });
    return {
        isValid: errors.length === 0,
        errors
    };
};
/**
 * 빈 ContentAsset 생성
 */
export const createEmptyContentAsset = () => ({
    title: '',
    content: '',
    assetUrl: ''
});
//# sourceMappingURL=types.js.map