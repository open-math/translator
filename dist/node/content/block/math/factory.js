"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFMath = exports.FMath = void 0;
const katex_1 = __importDefault(require("katex"));
const bitran_1 = require("bitran");
const macros_1 = __importDefault(require("./macros"));
const block_1 = __importDefault(require("./block"));
const viewFactory_1 = require("../../../core/viewFactory");
const view_1 = require("./view");
const Helper_1 = __importDefault(require("../../../core/Helper"));
class FMath extends bitran_1.BlockFactory {
    isObj;
    canParse(strBlock) {
        if (strBlock.startsWith('@math')) {
            this.isObj = true;
            return true;
        }
        return /^\$\$[\s\S]+?\$\$$/gm.test(strBlock);
    }
    async parse(strBlock) {
        let math = new block_1.default;
        math.content = this.isObj ? strBlock.split('\n').slice(1).join('\n') : strBlock.slice(2, -2).trim();
        return math;
    }
}
exports.FMath = FMath;
class VFMath extends viewFactory_1.BlockViewFactory {
    async setupBlockView(block) {
        let helper = Helper_1.default.getFrom(this.renderer);
        let math = new view_1.VMath;
        try {
            math.html = katex_1.default.renderToString(block.content, { displayMode: true, strict: false, macros: { ...macros_1.default, ...helper.getMathMacros() } });
        }
        catch (e) {
            e.texString = block.content;
            throw e;
        }
        return math;
    }
    async getRender(view) {
        return this.renderBlockView(view);
    }
}
exports.VFMath = VFMath;
