"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSiteName = void 0;
const getMetaTags_1 = require("./getMetaTags");
function getSiteName(doc) {
    const siteName = getMetaTags_1.metaTagContent(doc, `og:site_name`, `property`) ||
        getMetaTags_1.metaTagContent(doc, `og:site_name`, `name`);
    return siteName;
}
exports.getSiteName = getSiteName;
//# sourceMappingURL=getSiteName.js.map