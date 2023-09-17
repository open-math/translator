"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitran_1 = require("bitran");
class Link extends bitran_1.Inliner {
    type = 'link';
    label;
    target;
}
exports.default = Link;
