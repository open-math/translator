"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitran_1 = require("bitran");
class Heading extends bitran_1.Block {
    type = 'heading';
    level;
    title;
}
exports.default = Heading;
