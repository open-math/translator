"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFTodo = exports.FTodo = void 0;
const bitran_1 = require("bitran");
const block_1 = __importDefault(require("./block"));
const viewFactory_1 = require("../../../core/viewFactory");
const view_1 = require("./view");
class FTodo extends bitran_1.ObjBlockFactory {
    objType = 'todo';
    async parseObj(obj) {
        if (!obj['title'])
            throw new Error(`Missing 'title' property in todo block!`);
        let todo = new block_1.default;
        todo.title = obj.title;
        if (obj.content)
            todo.content = await this.parser.parseBlocks(obj.content);
        return todo;
    }
}
exports.FTodo = FTodo;
class VFTodo extends viewFactory_1.BlockViewFactory {
    async setupBlockView(block) {
        let view = new view_1.VTodo;
        view.title = block.title;
        if (block.content)
            view.content = await this.renderer.renderBlocks(block.content);
        return view;
    }
    async getRender(view) {
        return this.renderBlockView(view);
    }
}
exports.VFTodo = VFTodo;
