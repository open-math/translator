"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFMermaid = exports.FMermaid = void 0;
const katex_1 = __importDefault(require("katex"));
const uuid_1 = require("uuid");
const bitran_1 = require("bitran");
const block_1 = __importDefault(require("./block"));
const viewFactory_1 = require("../../../core/viewFactory");
class FMermaid extends bitran_1.BlockFactory {
    canParse(strBlock) {
        return strBlock.startsWith('@mermaid');
    }
    async parse(strBlock) {
        strBlock = strBlock.replace(/^@mermaid$/gm, '');
        strBlock = strBlock.replace(/\$\$(.+?)\$\$/gm, (match, math) => katex_1.default.renderToString('\\displaystyle ' + math, { displayMode: false }));
        strBlock = strBlock.replace(/\$(.+?)\$/gm, (match, imath) => katex_1.default.renderToString(imath, { displayMode: false }));
        let mermaid = new block_1.default;
        mermaid.content = strBlock;
        mermaid.uid = (0, uuid_1.v4)();
        return mermaid;
    }
}
exports.FMermaid = FMermaid;
class VFMermaid extends viewFactory_1.StringViewFactory {
    async setupView(product) {
        return this.renderTemplate('mermaid', product);
    }
}
exports.VFMermaid = VFMermaid;
