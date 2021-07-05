"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLinkPreviewMiddleware = void 0;
const index_1 = require("../index");
const getLinkPreviewMiddleware = (req, _res, next) => {
    const url = req.body.url;
    index_1.getLinkPreview(url)
        .then((data) => {
        console.log(data);
    })
        .then(() => next())
        .catch((err) => console.error(err));
};
exports.getLinkPreviewMiddleware = getLinkPreviewMiddleware;
//# sourceMappingURL=getLinkPreviewMiddleware.js.map