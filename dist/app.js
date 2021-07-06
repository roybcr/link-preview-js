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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const getLinkPreviewMiddleware_1 = require("./middleware/getLinkPreviewMiddleware");
const index_1 = require("./index");
dotenv_1.default.config();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const PORT = process.env.PORT;
    const app = express_1.default();
    app.use(cors_1.default({
        origin: process.env.SERVER_URL,
        credentials: true
    }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.get('/', (_req, res) => {
        res.send('URL Processing Service');
    });
    app.post('/api/getpreview', getLinkPreviewMiddleware_1.getLinkPreviewMiddleware, (req, res) => {
        const url = req.body.url;
        index_1.getLinkPreview(url)
            .then((response) => {
            res.json(response);
        })
            .catch((err) => {
            console.error(err);
        });
    });
    app.listen(PORT, () => {
        console.log('Listening on port ' + PORT);
    });
});
main();
//# sourceMappingURL=app.js.map