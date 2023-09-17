"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFArray = exports.FArray = void 0;
const bitran_1 = require("bitran");
const block_1 = __importDefault(require("./block"));
const viewFactory_1 = require("../../../core/viewFactory");
const view_1 = require("./view");
class FArray extends bitran_1.ObjBlockFactory {
    objType = 'array';
    async parseObj(obj, meta) {
        let array = new block_1.default;
        array.items = [];
        if (obj.items)
            for (let i = 0; i < obj.items.length; i++)
                array.items.push(await this.parser.parseBlocks(obj.items[i]));
        return array;
    }
}
exports.FArray = FArray;
class VFArray extends viewFactory_1.BlockViewFactory {
    async setupBlockView(block) {
        let view = new view_1.VArray;
        view.items = [];
        for (let i = 0; i < block.items.length; i++)
            view.items.push(await this.renderer.renderBlocks(block.items[i]));
        return view;
    }
    async getRender(view) {
        return this.renderBlockView(view);
    }
}
exports.VFArray = VFArray;
