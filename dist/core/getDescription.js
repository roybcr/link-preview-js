"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDescription = void 0;
const getMetaTags_1 = require("./getMetaTags");
function getDescription(doc) {
    const description = getMetaTags_1.metaTagContent(doc, `description`, `name`) ||
        getMetaTags_1.metaTagContent(doc, `Description`, `name`) ||
        getMetaTags_1.metaTagContent(doc, `og:description`, `property`);
    return description;
}
exports.getDescription = getDescription;
//# sourceMappingURL=getDescription.js.map