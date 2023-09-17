"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VImage = void 0;
const BlockView_1 = __importDefault(require("../../../core/block/BlockView"));
class VImage extends BlockView_1.default {
    src;
    width;
    height;
    maxWidth;
    caption;
    invertible;
}
exports.VImage = VImage;
