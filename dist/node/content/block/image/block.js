"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitran_1 = require("bitran");
class Image extends bitran_1.Block {
    type = 'image';
    src;
    width;
    height;
    caption;
    invertible;
    widthId;
    renderWidth;
}
exports.default = Image;
