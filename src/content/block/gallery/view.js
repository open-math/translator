"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BlockView_1 = __importDefault(require("../../../core/block/BlockView"));
class VGallery extends BlockView_1.default {
    images;
    renderedImages;
    start;
}
exports.default = VGallery;
