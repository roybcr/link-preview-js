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
const constants_1 = require("./constants");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const initialData = yield seed_1.seed();
        let invalid = 0;
        for (let i = 0; i < initialData.length; i++) {
            if (!constants_1.CONSTANTS.REGEX_VALID_URL.test(initialData[i])) {
                console.log(initialData[i]);
                invalid++;
            }
        }
        console.log(invalid);
    });
}
exports.bootstrap = bootstrap;
//# sourceMappingURL=bootstrap.js.map