"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitran_1 = require("bitran");
class Gallery extends bitran_1.Block {
    type = 'gallery';
    images;
    start;
}
exports.default = Gallery;
