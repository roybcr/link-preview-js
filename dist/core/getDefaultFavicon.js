"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultFavicon = void 0;
const url_1 = __importDefault(require("url"));
function getDefaultFavicon(rootUrl) {
    return url_1.default.resolve(rootUrl, `/favicon.ico`);
}
exports.getDefaultFavicon = getDefaultFavicon;
//# sourceMappingURL=getDefaultFavicon.js.map