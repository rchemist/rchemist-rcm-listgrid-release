import { ExtensionPoint, } from '../../extensions/EntityFormExtension.types';
import { EntityFormActions } from '../../config/form/EntityFormActions';
export class EntityFormExtensions extends EntityFormActions {
    constructor(name, url) {
        super(name, url);
    }
    /**
     * Client Extension 추가 메소드 (내부용)
     */
    withClientExtension(point, handler, options) {
        const config = {
            handler,
            options: {
                enabled: true,
                continueOnError: true,
                priority: 0,
                ...options,
            },
        };
        const configs = this.clientExtensions.get(point) || [];
        configs.push(config);
        // priority로 정렬
        configs.sort((a, b) => (a.options?.priority || 0) - (b.options?.priority || 0));
        this.clientExtensions.set(point, configs);
        return this;
    }
    // LIST Extensions - Client
    withClientPreFetchList(handler, options) {
        return this.withClientExtension(ExtensionPoint.PRE_FETCH_LIST, handler, options);
    }
    withClientPostFetchList(handler, options) {
        return this.withClientExtension(ExtensionPoint.POST_FETCH_LIST, handler, options);
    }
    // CREATE Extensions - Client
    withClientPreCreate(handler, options) {
        return this.withClientExtension(ExtensionPoint.PRE_CREATE, handler, options);
    }
    withClientPostCreate(handler, options) {
        return this.withClientExtension(ExtensionPoint.POST_CREATE, handler, options);
    }
    // READ Extensions - Client
    withClientPreRead(handler, options) {
        return this.withClientExtension(ExtensionPoint.PRE_READ, handler, options);
    }
    withClientPostRead(handler, options) {
        return this.withClientExtension(ExtensionPoint.POST_READ, handler, options);
    }
    // UPDATE Extensions - Client
    withClientPreUpdate(handler, options) {
        return this.withClientExtension(ExtensionPoint.PRE_UPDATE, handler, options);
    }
    withClientPostUpdate(handler, options) {
        return this.withClientExtension(ExtensionPoint.POST_UPDATE, handler, options);
    }
    // DELETE Extensions - Client
    withClientPreDelete(handler, options) {
        return this.withClientExtension(ExtensionPoint.PRE_DELETE, handler, options);
    }
    withClientPostDelete(handler, options) {
        return this.withClientExtension(ExtensionPoint.POST_DELETE, handler, options);
    }
    /**
     * Client Extension 실행
     */
    async executeClientExtensions(point, data, context) {
        const configs = this.clientExtensions.get(point) || [];
        let result = data;
        for (const config of configs) {
            // 비활성화된 Extension은 건너뛰기
            if (config.options?.enabled === false)
                continue;
            try {
                result = await config.handler(result, context);
            }
            catch (error) {
                console.error(`[Client Extension Error] ${this.name}.${point}:`, error);
                if (config.options?.continueOnError === false) {
                    throw error;
                }
            }
        }
        return result;
    }
    /**
     * Client Extensions 존재 여부 확인
     */
    hasClientExtensions(...points) {
        return points.some((point) => {
            const clientConfigs = this.clientExtensions.get(point) || [];
            return clientConfigs.length > 0;
        });
    }
    /**
     * 특정 Extension Point의 Client Extension 목록 가져오기
     */
    getClientExtensions(point) {
        return this.clientExtensions.get(point) || [];
    }
    /**
     * 모든 Client Extension 정보 가져오기 (디버깅용)
     */
    getAllClientExtensions() {
        return new Map(this.clientExtensions);
    }
}
//# sourceMappingURL=EntityFormExtensions.js.map