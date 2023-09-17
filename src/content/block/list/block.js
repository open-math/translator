"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitran_1 = require("bitran");
class List extends bitran_1.Block {
    type = 'list';
    listType;
    olStart;
    items;
}
exports.default = List;
