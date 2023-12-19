"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFTable = exports.FTable = void 0;
const bitran_1 = require("bitran");
const block_1 = __importDefault(require("./block"));
const viewFactory_1 = require("../../../core/viewFactory");
const view_1 = require("./view");
class FTable extends bitran_1.ObjBlockFactory {
    objType = 'table';
    async parseObj(obj, meta) {
        let table = new block_1.default;
        table.content = await this.parser.parseBlocks(obj.content);
        return table;
    }
}
exports.FTable = FTable;
class VFTable extends viewFactory_1.BlockViewFactory {
    async setupBlockView(block) {
        let view = new view_1.VTable;
        view.content = await this.renderer.renderBlocks(block.content);
        return view;
    }
    async getRender(view) {
        return this.renderBlockView(view);
    }
}
exports.VFTable = VFTable;
