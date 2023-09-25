"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFSpoiler = exports.FSpoiler = void 0;
const bitran_1 = require("bitran");
const block_1 = __importDefault(require("./block"));
const viewFactory_1 = require("../../../core/viewFactory");
const Helper_1 = __importDefault(require("../../../core/Helper"));
class FSpoiler extends bitran_1.BlockFactory {
    canParse(strBlock) {
        return strBlock.startsWith('@spoiler');
    }
    async parse(strBlock, meta) {
        if (!meta || !meta.id)
            throw new Error(`Spoiler must have an 'id' property!`);
        strBlock = strBlock.replace(/^@spoiler$/gm, '');
        let spoiler = new block_1.default;
        spoiler.content = await this.parser.parseBlocks(strBlock);
        return spoiler;
    }
}
exports.FSpoiler = FSpoiler;
class VFSpoiler extends viewFactory_1.StringViewFactory {
    async setupView(product) {
        if (!Helper_1.default.getFrom(this.renderer).isEditor())
            return '';
        let content = await this.renderer.renderBlocks(product.content);
        return `<div class="spoilerPreview"><div class="id">${product['id']}</div>${content}</div>`;
    }
}
exports.VFSpoiler = VFSpoiler;
