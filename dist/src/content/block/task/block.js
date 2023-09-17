"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitran_1 = require("bitran");
class Task extends bitran_1.Block {
    type = 'task';
    title;
    tags;
    statement;
    hint;
    solution;
    answer;
}
exports.default = Task;
