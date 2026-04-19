import { SearchForm } from '../../form/SearchForm';
import { PageResult } from '../../form/Type';
import { ExtensionPoint, ClientExtensionFunction, ExtensionOptions, ClientExtensionConfig, ClientExtensionContext } from '../../extensions/EntityFormExtension.types';
import { EntityFormActions } from '../../config/form/EntityFormActions';
export declare abstract class EntityFormExtensions<T extends object = any> extends EntityFormActions<T> {
    constructor(name: string, url: string);
    /**
     * Client Extension 추가 메소드 (내부용)
     */
    private withClientExtension;
    withClientPreFetchList(handler: ClientExtensionFunction<SearchForm>, options?: Omit<ExtensionOptions, 'executionContext'>): this;
    withClientPostFetchList(handler: ClientExtensionFunction<PageResult>, options?: Omit<ExtensionOptions, 'executionContext'>): this;
    withClientPreCreate(handler: ClientExtensionFunction<any>, options?: Omit<ExtensionOptions, 'executionContext'>): this;
    withClientPostCreate(handler: ClientExtensionFunction<any>, options?: Omit<ExtensionOptions, 'executionContext'>): this;
    withClientPreRead(handler: ClientExtensionFunction<any>, options?: Omit<ExtensionOptions, 'executionContext'>): this;
    withClientPostRead(handler: ClientExtensionFunction<any>, options?: Omit<ExtensionOptions, 'executionContext'>): this;
    withClientPreUpdate(handler: ClientExtensionFunction<any>, options?: Omit<ExtensionOptions, 'executionContext'>): this;
    withClientPostUpdate(handler: ClientExtensionFunction<any>, options?: Omit<ExtensionOptions, 'executionContext'>): this;
    withClientPreDelete(handler: ClientExtensionFunction<any>, options?: Omit<ExtensionOptions, 'executionContext'>): this;
    withClientPostDelete(handler: ClientExtensionFunction<any>, options?: Omit<ExtensionOptions, 'executionContext'>): this;
    /**
     * Client Extension 실행
     */
    executeClientExtensions<T>(point: ExtensionPoint, data: T, context: ClientExtensionContext): Promise<T>;
    /**
     * Client Extensions 존재 여부 확인
     */
    hasClientExtensions(...points: ExtensionPoint[]): boolean;
    /**
     * 특정 Extension Point의 Client Extension 목록 가져오기
     */
    getClientExtensions(point: ExtensionPoint): ClientExtensionConfig[];
    /**
     * 모든 Client Extension 정보 가져오기 (디버깅용)
     */
    getAllClientExtensions(): Map<ExtensionPoint, ClientExtensionConfig[]>;
}
//# sourceMappingURL=EntityFormExtensions.d.ts.map