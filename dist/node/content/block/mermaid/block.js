"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitran_1 = require("bitran");
class Mermaid extends bitran_1.Block {
    type = 'mermaid';
    content;
    uid;
}
exports.default = Mermaid;
