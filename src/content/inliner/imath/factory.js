"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFIMath = exports.FIMath = void 0;
const katex_1 = __importDefault(require("katex"));
const bitran_1 = require("bitran");
const inliner_1 = __importDefault(require("./inliner"));
const viewFactory_1 = require("../../../core/viewFactory");
const view_1 = require("../../block/math/view");
class FIMath extends bitran_1.InlinerFactory {
    regexp = /(?<!\\)\$(.+?)(?<!\\)\$/gm;
    async parse(match) {
        let imath = new inliner_1.default;
        imath.content = match[1];
        return imath;
    }
}
exports.FIMath = FIMath;
class VFIMath extends viewFactory_1.InlinerViewFactory {
    async setupView(product) {
        let math = new view_1.VMath;
        math.html = katex_1.default.renderToString(product.content, { displayMode: false, strict: false, macros: require('../../block/math/macros') });
        return math;
    }
    getRender(view) {
        return this.renderTemplate('imath', view);
    }
}
exports.VFIMath = VFIMath;
