"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitran_1 = require("bitran");
class Todo extends bitran_1.Block {
    type = 'todo';
    title;
    content;
}
exports.default = Todo;
