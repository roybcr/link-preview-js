"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bad = exports.hyper = exports.heading = exports.selfClosing = exports.block = exports.av = exports.reject = void 0;
exports.reject = new Set([
    "applet",
    "canvas",
    "embed",
    "frame",
    "frameset",
    "head",
    "iframe",
    "link",
    "meta",
    "noembed",
    "noframes",
    "noscript",
    "object",
    "param",
    "script",
    "style",
    "template",
]);
exports.av = new Set([
    "audio",
    "figcaption",
    "figure",
    "picture",
    "source",
    "track",
    "video",
]);
exports.block = new Set([
    "address",
    "article",
    "aside",
    "blockquote",
    "div",
    "figcaption",
    "figure",
    "footer",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "li",
    "main",
    "nav",
    "p",
    "pre",
    "section",
]);
exports.selfClosing = new Set([
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
]);
exports.heading = new Set(["h1", "h2", "h3", "h4", "h5", "h6", "title"]);
exports.hyper = new Set(["button", "option"]);
exports.bad = new Set(["footer", "textarea"]);
//# sourceMappingURL=grouping.js.map