"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFHr = exports.FHr = void 0;
const bitran_1 = require("bitran");
const block_1 = __importDefault(require("./block"));
const viewFactory_1 = require("../../../core/viewFactory");
class FHr extends bitran_1.BlockFactory {
    canParse(strBlock) {
        return strBlock === '---';
    }
    async parse() {
        return new block_1.default;
    }
}
exports.FHr = FHr;
class VFHr extends viewFactory_1.StringViewFactory {
    async setupView() {
        return '<hr>';
    }
}
exports.VFHr = VFHr;
