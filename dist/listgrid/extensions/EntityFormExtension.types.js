/*
 * Copyright (c) "2024". rchemist.io by Rchemist
 * Licensed under the Rchemist Common License, Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License under controlled by Rchemist
 */
/**
 * Extension Point 정의
 * 클라이언트와 서버 모두에서 사용되는 공통 enum
 */
export var ExtensionPoint;
(function (ExtensionPoint) {
    // LIST 관련
    ExtensionPoint["PRE_FETCH_LIST"] = "preFetchList";
    ExtensionPoint["POST_FETCH_LIST"] = "postFetchList";
    // CRUD 관련
    ExtensionPoint["PRE_CREATE"] = "preCreate";
    ExtensionPoint["POST_CREATE"] = "postCreate";
    ExtensionPoint["PRE_READ"] = "preRead";
    ExtensionPoint["POST_READ"] = "postRead";
    ExtensionPoint["PRE_UPDATE"] = "preUpdate";
    ExtensionPoint["POST_UPDATE"] = "postUpdate";
    ExtensionPoint["PRE_DELETE"] = "preDelete";
    ExtensionPoint["POST_DELETE"] = "postDelete";
})(ExtensionPoint || (ExtensionPoint = {}));
//# sourceMappingURL=EntityFormExtension.types.js.map