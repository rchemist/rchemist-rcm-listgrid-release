import { isTrue } from '../../../utils/BooleanUtil';
import { getRuntimeConfig } from '../../../config/RuntimeConfig';
export const useServerSideCache = isTrue(getRuntimeConfig().useServerSideCache, true);
//# sourceMappingURL=ListGridHeader.types.js.map