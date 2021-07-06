"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve = void 0;
function resolve(from, to) {
    const resolvedUrl = new URL(to, new URL(from, 'resolve://'));
    if (resolvedUrl.protocol === 'resolve:') {
        const { pathname, search, hash } = resolvedUrl;
        return pathname + search + hash;
    }
    return resolvedUrl.toString();
}
exports.resolve = resolve;
//# sourceMappingURL=resolveURL.js.map