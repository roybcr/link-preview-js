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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreviewFromContent = exports.getLinkPreview = void 0;
const cross_fetch_1 = require("cross-fetch");
const constants_1 = require("./constants");
const parseResponse_1 = require("./lib/link-preview/parseResponse");
function getLinkPreview(text, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Getting link preview for ', text);
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
            redirect: `follow`
        };
        const fetchUrl = (options === null || options === void 0 ? void 0 : options.proxyUrl) ? options.proxyUrl.concat(detectedUrl) : detectedUrl;
        const response = yield cross_fetch_1.fetch(fetchUrl, fetchOptions);
        const headers = {};
        response.headers.forEach((header, key) => {
            headers[key] = header;
        });
        const normalizedResponse = {
            url: (options === null || options === void 0 ? void 0 : options.proxyUrl) ? response.url.replace(options.proxyUrl, ``) : response.url,
            headers,
            data: yield response.text()
        };
        return parseResponse_1.parseResponse(normalizedResponse, options);
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
        return parseResponse_1.parseResponse(response, options);
    });
}
exports.getPreviewFromContent = getPreviewFromContent;
//# sourceMappingURL=index.js.map