"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONSTANTS = void 0;
exports.CONSTANTS = {
    REGEX_VALID_URL: new RegExp(`^` +
        `(?:(?:https?|ftp)://)` +
        `(?:\\S+(?::\\S*)?@)?` +
        `(?:` +
        `(?!(?:10|127)(?:\\.\\d{1,3}){3})` +
        `(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})` +
        `(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})` +
        `(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])` +
        `(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}` +
        `(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))` +
        `|` +
        `(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)` +
        `(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*` +
        `(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))` +
        `\\.?` +
        `)` +
        `(?::\\d{2,5})?` +
        `(?:[/?#]\\S*)?` +
        `$`, `i`),
    REGEX_CONTENT_TYPE_IMAGE: new RegExp(`image/.*`, `i`),
    REGEX_CONTENT_TYPE_AUDIO: new RegExp(`audio/.*`, `i`),
    REGEX_CONTENT_TYPE_VIDEO: new RegExp(`video/.*`, `i`),
    REGEX_CONTENT_TYPE_TEXT: new RegExp(`text/.*`, `i`),
    REGEX_CONTENT_TYPE_APPLICATION: new RegExp(`application/.*`, `i`)
};
//# sourceMappingURL=constants.js.map