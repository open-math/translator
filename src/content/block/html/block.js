"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitran_1 = require("bitran");
class Html extends bitran_1.Block {
    type = 'html';
    inliners;
    content;
}
exports.default = Html;
