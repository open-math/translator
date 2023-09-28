"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ParseWorker_1 = __importDefault(require("./ParseWorker"));
const index_1 = require("../../content/index");
class FilePW extends ParseWorker_1.default {
    filesToAdd = {};
    blockStep(block) {
        if (block instanceof index_1.Image)
            this.filesToAdd[block.src.toString()] = null;
        if (block instanceof index_1.Gallery)
            block.images.forEach(image => this.filesToAdd[image.src.toString()] = null);
    }
    finally(parseResult) {
        parseResult.files = parseResult.files.concat(Object.keys(this.filesToAdd));
    }
}
exports.default = FilePW;
