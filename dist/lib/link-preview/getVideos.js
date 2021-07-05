"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideos = void 0;
const getMetaTags_1 = require("./getMetaTags");
function getVideos(doc) {
    const videos = [];
    let nodeTypes;
    let nodeSecureUrls;
    let nodeType;
    let nodeSecureUrl;
    let video;
    let videoType;
    let videoSecureUrl;
    let width;
    let height;
    let videoObj;
    let index;
    const nodes = getMetaTags_1.metaTag(doc, `og:video`, `property`) || getMetaTags_1.metaTag(doc, `og:video`, `name`);
    if (nodes === null || nodes === void 0 ? void 0 : nodes.length) {
        nodeTypes =
            getMetaTags_1.metaTag(doc, `og:video:type`, `property`) ||
                getMetaTags_1.metaTag(doc, `og:video:type`, `name`);
        nodeSecureUrls =
            getMetaTags_1.metaTag(doc, `og:video:secure_url`, `property`) ||
                getMetaTags_1.metaTag(doc, `og:video:secure_url`, `name`);
        width =
            getMetaTags_1.metaTagContent(doc, `og:video:width`, `property`) ||
                getMetaTags_1.metaTagContent(doc, `og:video:width`, `name`);
        height =
            getMetaTags_1.metaTagContent(doc, `og:video:height`, `property`) ||
                getMetaTags_1.metaTagContent(doc, `og:video:height`, `name`);
        for (index = 0; index < nodes.length; index += 1) {
            const node = nodes[index];
            if (node.type === `tag`)
                video = node.attribs.content;
            nodeType = nodeTypes[index];
            if (nodeType.type === `tag`)
                videoType = nodeType ? nodeType.attribs.content : null;
            nodeSecureUrl = nodeSecureUrls[index];
            if (nodeSecureUrl.type === `tag`)
                videoSecureUrl = nodeSecureUrl ? nodeSecureUrl.attribs.content : null;
            videoObj = {
                url: video,
                secureUrl: videoSecureUrl,
                type: videoType,
                width,
                height,
            };
            if (videoType && videoType.indexOf(`video/`) === 0) {
                videos.splice(0, 0, videoObj);
            }
            else {
                videos.push(videoObj);
            }
        }
    }
    return videos;
}
exports.getVideos = getVideos;
//# sourceMappingURL=getVideos.js.map