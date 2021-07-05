"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthor = void 0;
const getMetaTags_1 = require("./getMetaTags");
function getAuthor(doc) {
    const author = getMetaTags_1.metaTagContent(doc, `author`, `name`) ||
        getMetaTags_1.metaTagContent(doc, `Author`, `name`) ||
        getMetaTags_1.metaTagContent(doc, `og:author`, `property`);
    return author;
}
exports.getAuthor = getAuthor;
//# sourceMappingURL=getAuthor.js.map