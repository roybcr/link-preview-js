"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreviewFromContent = exports.getLinkPreview = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const cross_fetch_1 = require("cross-fetch");
const url_1 = __importDefault(require("url"));
const constants_1 = require("./constants");
const metaTag = (doc, type, attr) => {
    const nodes = doc(`meta[${attr}='${type}']`);
    return nodes.length ? nodes : null;
};
const metaTagContent = (doc, type, attr) => doc(`meta[${attr}='${type}']`).attr(`content`);
function getTitle(doc) {
    let title = metaTagContent(doc, `og:title`, `property`) ||
        metaTagContent(doc, `og:title`, `name`);
    if (!title) {
        title = doc(`title`).text();
    }
    return title;
}
function getSiteName(doc) {
    const siteName = metaTagContent(doc, `og:site_name`, `property`) ||
        metaTagContent(doc, `og:site_name`, `name`);
    return siteName;
}
function getDescription(doc) {
    const description = metaTagContent(doc, `description`, `name`) ||
        metaTagContent(doc, `Description`, `name`) ||
        metaTagContent(doc, `og:description`, `property`);
    return description;
}
function getMediaType(doc) {
    const node = metaTag(doc, `medium`, `name`);
    if (node) {
        const content = node.attr(`content`);
        return content === `image` ? `photo` : content;
    }
    return (metaTagContent(doc, `og:type`, `property`) ||
        metaTagContent(doc, `og:type`, `name`));
}
function getImages(doc, rootUrl, imagesPropertyType) {
    let images = [];
    let nodes;
    let src;
    let dic = {};
    const imagePropertyType = imagesPropertyType !== null && imagesPropertyType !== void 0 ? imagesPropertyType : `og`;
    nodes =
        metaTag(doc, `${imagePropertyType}:image`, `property`) ||
            metaTag(doc, `${imagePropertyType}:image`, `name`);
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
    const nodes = metaTag(doc, `og:video`, `property`) || metaTag(doc, `og:video`, `name`);
    if (nodes === null || nodes === void 0 ? void 0 : nodes.length) {
        nodeTypes =
            metaTag(doc, `og:video:type`, `property`) ||
                metaTag(doc, `og:video:type`, `name`);
        nodeSecureUrls =
            metaTag(doc, `og:video:secure_url`, `property`) ||
                metaTag(doc, `og:video:secure_url`, `name`);
        width =
            metaTagContent(doc, `og:video:width`, `property`) ||
                metaTagContent(doc, `og:video:width`, `name`);
        height =
            metaTagContent(doc, `og:video:height`, `property`) ||
                metaTagContent(doc, `og:video:height`, `name`);
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
function getDefaultFavicon(rootUrl) {
    return url_1.default.resolve(rootUrl, `/favicon.ico`);
}
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
                    src = url_1.default.resolve(rootUrl, src);
                    images.push(src);
                }
            });
        }
    });
    if (images.length <= 0) {
        images.push(getDefaultFavicon(rootUrl));
    }
    return images;
}
function parseImageResponse(url, contentType) {
    return {
        url,
        mediaType: `image`,
        contentType,
        favicons: [getDefaultFavicon(url)],
    };
}
function parseAudioResponse(url, contentType) {
    return {
        url,
        mediaType: `audio`,
        contentType,
        favicons: [getDefaultFavicon(url)],
    };
}
function parseVideoResponse(url, contentType) {
    return {
        url,
        mediaType: `video`,
        contentType,
        favicons: [getDefaultFavicon(url)],
    };
}
function parseApplicationResponse(url, contentType) {
    return {
        url,
        mediaType: `application`,
        contentType,
        favicons: [getDefaultFavicon(url)],
    };
}
function parseTextResponse(body, url, options = {}, contentType) {
    const doc = cheerio_1.default.load(body);
    return {
        url,
        title: getTitle(doc),
        siteName: getSiteName(doc),
        description: getDescription(doc),
        mediaType: getMediaType(doc) || `website`,
        contentType,
        images: getImages(doc, url, options.imagesPropertyType),
        videos: getVideos(doc),
        favicons: getFavicons(doc, url),
    };
}
function parseUnknownResponse(body, url, options = {}, contentType) {
    return parseTextResponse(body, url, options, contentType);
}
function parseResponse(response, options) {
    try {
        let contentType = response.headers[`content-type`];
        if (contentType === null || contentType === void 0 ? void 0 : contentType.indexOf(`;`)) {
            contentType = contentType.split(`;`)[0];
        }
        if (!contentType) {
            return parseUnknownResponse(response.data, response.url, options);
        }
        if (contentType instanceof Array) {
            contentType = contentType[0];
        }
        if (constants_1.CONSTANTS.REGEX_CONTENT_TYPE_IMAGE.test(contentType)) {
            return parseImageResponse(response.url, contentType);
        }
        if (constants_1.CONSTANTS.REGEX_CONTENT_TYPE_AUDIO.test(contentType)) {
            return parseAudioResponse(response.url, contentType);
        }
        if (constants_1.CONSTANTS.REGEX_CONTENT_TYPE_VIDEO.test(contentType)) {
            return parseVideoResponse(response.url, contentType);
        }
        if (constants_1.CONSTANTS.REGEX_CONTENT_TYPE_TEXT.test(contentType)) {
            const htmlString = response.data;
            return parseTextResponse(htmlString, response.url, options, contentType);
        }
        if (constants_1.CONSTANTS.REGEX_CONTENT_TYPE_APPLICATION.test(contentType)) {
            return parseApplicationResponse(response.url, contentType);
        }
        const htmlString = response.data;
        return parseUnknownResponse(htmlString, response.url, options);
    }
    catch (e) {
        throw new Error(`link-preview-js could not fetch link information ${e.toString()}`);
    }
}
function getLinkPreview(text, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!text || typeof text !== `string`) {
            throw new Error(`link-preview-js did not receive a valid url or text`);
        }
        const detectedUrl = text
            .replace(/\n/g, ` `)
            .split(` `)
            .find((token) => constants_1.CONSTANTS.REGEX_VALID_URL.test(token));
        if (!detectedUrl) {
            throw new Error(`link-preview-js did not receive a valid a url or text`);
        }
        const fetchOptions = {
            headers: (_a = options === null || options === void 0 ? void 0 : options.headers) !== null && _a !== void 0 ? _a : {},
            redirect: `follow`,
        };
        const fetchUrl = (options === null || options === void 0 ? void 0 : options.proxyUrl)
            ? options.proxyUrl.concat(detectedUrl)
            : detectedUrl;
        const response = yield cross_fetch_1.fetch(fetchUrl, fetchOptions);
        const headers = {};
        response.headers.forEach((header, key) => {
            headers[key] = header;
        });
        const normalizedResponse = {
            url: (options === null || options === void 0 ? void 0 : options.proxyUrl)
                ? response.url.replace(options.proxyUrl, ``)
                : response.url,
            headers,
            data: yield response.text(),
        };
        return parseResponse(normalizedResponse, options);
    });
}
exports.getLinkPreview = getLinkPreview;
function getPreviewFromContent(response, options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!response || typeof response !== `object`) {
            throw new Error(`link-preview-js did not receive a valid response object`);
        }
        if (!response.url) {
            throw new Error(`link-preview-js did not receive a valid response object`);
        }
        return parseResponse(response, options);
    });
}
exports.getPreviewFromContent = getPreviewFromContent;
//# sourceMappingURL=index.js.map