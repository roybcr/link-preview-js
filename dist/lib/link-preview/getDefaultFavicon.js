"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultFavicon = void 0;
const resolveURL_1 = require("../../core/resolveURL");
function getDefaultFavicon(rootUrl) {
    return resolveURL_1.resolve(rootUrl, `/favicon.ico`);
}
exports.getDefaultFavicon = getDefaultFavicon;
//# sourceMappingURL=getDefaultFavicon.js.map