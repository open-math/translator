"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FSpoiler = void 0;
const bitran_1 = require("bitran");
const block_1 = __importDefault(require("./block"));
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
