"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMediaType = void 0;
const getMetaTags_1 = require("./getMetaTags");
function getMediaType(doc) {
    const node = getMetaTags_1.metaTag(doc, `medium`, `name`);
    if (node) {
        const content = node.attr(`content`);
        return content === `image` ? `photo` : content;
    }
    return getMetaTags_1.metaTagContent(doc, `og:type`, `property`) || getMetaTags_1.metaTagContent(doc, `og:type`, `name`);
}
exports.getMediaType = getMediaType;
//# sourceMappingURL=getMediaType.js.map