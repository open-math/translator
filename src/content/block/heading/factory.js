"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFHeading = exports.FHeading = void 0;
const bitran_1 = require("bitran");
const viewFactory_1 = require("../../../core/viewFactory");
const block_1 = __importDefault(require("./block"));
const view_1 = require("./view");
class FHeading extends bitran_1.BlockFactory {
    canParse(strBlock) {
        return /^(#+) (.+)/.test(strBlock);
    }
    async parse(strBlock, meta) {
        let match = strBlock.match(/^(#+) (.+)/);
        let heading = new block_1.default;
        heading.level = match[1].length;
        heading.title = match[2];
        return heading;
    }
}
exports.FHeading = FHeading;
class VFHeading extends viewFactory_1.BlockViewFactory {
    async setupBlockView(block) {
        let view = new view_1.VHeading;
        view.level = block.level;
        view.title = block.title;
        return view;
    }
    async getRender(view) {
        return this.renderBlockView(view);
    }
}
exports.VFHeading = VFHeading;
