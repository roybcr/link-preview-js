"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImages = void 0;
const url_1 = __importDefault(require("url"));
const getMetaTags_1 = require("./getMetaTags");
function getImages(doc, rootUrl, imagesPropertyType) {
    let images = [];
    let nodes;
    let src;
    let dic = {};
    const imagePropertyType = imagesPropertyType !== null && imagesPropertyType !== void 0 ? imagesPropertyType : `og`;
    nodes =
        getMetaTags_1.metaTag(doc, `${imagePropertyType}:image`, `property`) ||
            getMetaTags_1.metaTag(doc, `${imagePropertyType}:image`, `name`);
    if (nodes) {
        nodes.each((_, node) => {
            if (node.type === `tag`) {
                src = node.attribs.content;
                if (src) {
                    src = url_1.default.resolve(rootUrl, src);
                    images.push(src);
                }
            }
        });
    }
    if (images.length <= 0 && !imagesPropertyType) {
        src = doc(`link[rel=image_src]`).attr(`href`);
        if (src) {
            src = url_1.default.resolve(rootUrl, src);
            images = [src];
        }
        else {
            nodes = doc(`img`);
            if (nodes === null || nodes === void 0 ? void 0 : nodes.length) {
                dic = {};
                images = [];
                nodes.each((_, node) => {
                    if (node.type === `tag`)
                        src = node.attribs.src;
                    if (src && !dic[src]) {
                        dic[src] = true;
                        images.push(url_1.default.resolve(rootUrl, src));
                    }
                });
            }
        }
    }
    return images;
}
exports.getImages = getImages;
//# sourceMappingURL=getImages.js.map