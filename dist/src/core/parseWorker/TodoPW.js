"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const ParseWorker_1 = __importDefault(require("./ParseWorker"));
const index_1 = require("../../content/index");
class TodoPW extends ParseWorker_1.default {
    todoBlocks = [];
    blockStep(block) {
        if (!(block instanceof index_1.Todo))
            return;
        let id = (0, uuid_1.v4)();
        block.id = 'todo:' + id;
        this.todoBlocks.push(block);
    }
    finally(parseResult) {
        parseResult.todos = this.todoBlocks;
    }
}
exports.default = TodoPW;
