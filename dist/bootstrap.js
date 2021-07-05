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
exports.bootstrap = void 0;
const seed_1 = require("./seed");
const index_1 = require("./index");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const initialData = yield seed_1.seed();
        const promises = [];
        for (let i = 0; i < initialData.length; i++) {
            promises.push(index_1.getLinkPreview(initialData[i]));
            console.log("Pushing " + i + "to the stack");
        }
        const sl = promises.slice(230, 240);
        sl.forEach((s) => {
            Promise.resolve(s)
                .then((x) => {
                console.log("X", x);
                return x;
            })
                .catch((err) => console.error(err));
        });
    });
}
exports.bootstrap = bootstrap;
//# sourceMappingURL=bootstrap.js.map