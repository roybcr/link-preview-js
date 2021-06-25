"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseResponse = exports.parseApplicationResponse = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const constants_1 = require("../constants");
const getMetaTags_1 = require("./getMetaTags");
const getSiteName_1 = require("./getSiteName");
const getDescription_1 = require("./getDescription");
const getMediaType_1 = require("./getMediaType");
const getImages_1 = require("./getImages");
const getVideos_1 = require("./getVideos");
const getDefaultFavicon_1 = require("./getDefaultFavicon");
const getFavicons_1 = require("./getFavicons");
function parseImageResponse(url, contentType) {
    return {
        url,
        mediaType: `image`,
        contentType,
        favicons: [getDefaultFavicon_1.getDefaultFavicon(url)],
    };
}
function parseAudioResponse(url, contentType) {
    return {
        url,
        mediaType: `audio`,
        contentType,
        favicons: [getDefaultFavicon_1.getDefaultFavicon(url)],
    };
}
function parseVideoResponse(url, contentType) {
    return {
        url,
        mediaType: `video`,
        contentType,
        favicons: [getDefaultFavicon_1.getDefaultFavicon(url)],
    };
}
function parseApplicationResponse(url, contentType) {
    return {
        url,
        mediaType: `application`,
        contentType,
        favicons: [getDefaultFavicon_1.getDefaultFavicon(url)],
    };
}
exports.parseApplicationResponse = parseApplicationResponse;
function parseTextResponse(body, url, options = {}, contentType) {
    const doc = cheerio_1.default.load(body);
    return {
        url,
        title: getMetaTags_1.getTitle(doc),
        siteName: getSiteName_1.getSiteName(doc),
        description: getDescription_1.getDescription(doc),
        mediaType: getMediaType_1.getMediaType(doc) || `website`,
        contentType,
        images: getImages_1.getImages(doc, url, options.imagesPropertyType),
        videos: getVideos_1.getVideos(doc),
        favicons: getFavicons_1.getFavicons(doc, url),
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
exports.parseResponse = parseResponse;
//# sourceMappingURL=parseResponse.js.map