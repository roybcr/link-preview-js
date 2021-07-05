"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkPreviewRouter = void 0;
const express_1 = __importDefault(require("express"));
const getLinkPreviewMiddleware_1 = require("../middleware/getLinkPreviewMiddleware");
const router = express_1.default.Router();
exports.linkPreviewRouter = router.get("/", getLinkPreviewMiddleware_1.getLinkPreviewMiddleware, (req, res) => {
    const data = req.data;
});
//# sourceMappingURL=linkPreviewRouter.js.map