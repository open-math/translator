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
const Helper_1 = __importDefault(require("../../../core/Helper"));
class FIMath extends bitran_1.InlinerFactory {
    regexp = /(?<!\\)\$(.+?)(?<!\\)\$/gm;
    async parse(match) {
        let content = match[1];
        let imath = new inliner_1.default;
        imath.content = content;
        return imath;
    }
}
exports.FIMath = FIMath;
class VFIMath extends viewFactory_1.InlinerViewFactory {
    async setupView(product) {
        let helper = Helper_1.default.getFrom(this.renderer);
        let math = new view_1.VMath;
        let strMode = !/[\^\\\{\}]/gm.test(product.content);
        let mord = /^[a-zA-Zа-яА-Я ,]+$/gm.test(product.content);
        let containsLetters = /[a-zA-Zа-яА-Я]/gm.test(product.content);
        if (mord
            ||
                (strMode && !containsLetters)) {
            math['strMode'] = true;
            math['mord'] = mord;
            math.html = product.content;
        }
        else
            math.html = katex_1.default.renderToString(product.content, { displayMode: false, strict: false, macros: { ...require('../../block/math/macros'), ...helper.getMathMacros() } });
        return math;
    }
    getRender(view) {
        return this.renderTemplate('imath', view);
    }
}
exports.VFIMath = VFIMath;
