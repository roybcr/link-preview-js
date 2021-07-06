"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTitle = exports.metaTagContent = exports.metaTag = void 0;
const metaTag = (doc, type, attr) => {
    const nodes = doc(`meta[${attr}='${type}']`);
    return nodes.length ? nodes : null;
};
exports.metaTag = metaTag;
const metaTagContent = (doc, type, attr) => doc(`meta[${attr}='${type}']`).attr(`content`);
exports.metaTagContent = metaTagContent;
function getTitle(doc) {
    let title = exports.metaTagContent(doc, `og:title`, `property`) || exports.metaTagContent(doc, `og:title`, `name`);
    if (!title) {
        title = doc(`title`).text();
    }
    return title;
}
exports.getTitle = getTitle;
//# sourceMappingURL=getMetaTags.js.map