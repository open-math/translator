"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ParseWorker_1 = __importDefault(require("./ParseWorker"));
const index_1 = require("../../content/index");
const block_1 = require("../../content/block/figure/block");
const global_1 = require("../../content/block/figure/global");
const block_2 = __importDefault(require("../../content/block/secondary/block"));
class FilePW extends ParseWorker_1.default {
    filesToAdd = {};
    blockStep(block) {
        if (block instanceof block_1.Figure)
            if (block.content.type === global_1.FigureType.Image || block.content.type === global_1.FigureType.Video)
                this.filesToAdd[block.content.src.toString()] = null;
        if (block instanceof block_2.default)
            this.filesToAdd[block.icon.toString()] = null;
        if (block instanceof index_1.Gallery)
            block.images.forEach(image => this.filesToAdd[image.content.src.toString()] = null);
    }
    finally(parseResult) {
        parseResult.files = parseResult.files.concat(Object.keys(this.filesToAdd));
    }
}
exports.default = FilePW;
