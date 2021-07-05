"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavicons = void 0;
const resolveURL_1 = require("../../core/resolveURL");
const getDefaultFavicon_1 = require("./getDefaultFavicon");
function getFavicons(doc, rootUrl) {
    const images = [];
    let nodes = [];
    let src;
    const relSelectors = [
        `rel=icon`,
        `rel="shortcut icon"`,
        `rel=apple-touch-icon`,
    ];
    relSelectors.forEach((relSelector) => {
        nodes = doc(`link[${relSelector}]`);
        if (nodes.length) {
            nodes.each((_, node) => {
                if (node.type === `tag`)
                    src = node.attribs.href;
                if (src) {
                    src = resolveURL_1.resolve(rootUrl, src);
                    images.push(src);
                }
            });
        }
    });
    if (images.length <= 0) {
        images.push(getDefaultFavicon_1.getDefaultFavicon(rootUrl));
    }
    return images;
}
exports.getFavicons = getFavicons;
//# sourceMappingURL=getFavicons.js.map