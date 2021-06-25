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
exports.seed = void 0;
const jsonfile_1 = __importDefault(require("jsonfile"));
const path_1 = __importDefault(require("path"));
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Start seeding...");
        const data = yield jsonfile_1.default.readFile(path_1.default.join(__dirname, "../data.json"), "utf8");
        const linksArray = Object.keys(data).map((k) => {
            return data[k];
        });
        console.log("Seeding process completed");
        return linksArray;
    });
}
exports.seed = seed;
//# sourceMappingURL=seed.js.map