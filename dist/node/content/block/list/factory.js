"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFList = exports.FBlockList = exports.FList = void 0;
const bitran_1 = require("bitran");
const block_1 = __importDefault(require("./block"));
const viewFactory_1 = require("../../../core/viewFactory");
const view_1 = require("./view");
class FList extends bitran_1.BlockFactory {
    canParse(strBlock) {
        return (this.isUl(strBlock) || this.getOlStart(strBlock)) !== null;
    }
    isUl(str) {
        return str.startsWith('* ');
    }
    getOlStart(str) {
        let match = str.match(/^(\d+)\. /);
        if (match)
            return +match[1];
        return null;
    }
    async parse(strBlock, meta) {
        let list = new block_1.default;
        list.listType = this.isUl(strBlock) ? 'ul' : 'ol';
        list.items = [];
        if (list.listType === 'ol')
            list.start = this.getOlStart(strBlock);
        let lines = strBlock.split('\n').map(line => line.trim());
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            let inliners = await this.parser.parseInliners(line.replace((list.listType === 'ol') ? /^\d+\./ : /^\* /, ''));
            let paragraph = new bitran_1.Paragraph;
            paragraph.content = inliners;
            list.items.push([paragraph]);
        }
        return list;
    }
}
exports.FList = FList;
class FBlockList extends bitran_1.ObjBlockFactory {
    objType = 'list';
    async parseObj(obj, meta) {
        let list = new block_1.default;
        list.listType = ['ul', 'ol'].includes(obj.type) ? obj.type : 'ul';
        if (list.listType === 'ol') {
            let start = Math.floor(obj.start);
            start = isNaN(start) ? 1 : start;
            list.start = start;
        }
        if (!Array.isArray(obj.items) || obj.items.length === 0)
            return null;
        list.items = await Promise.all(obj.items.map(async (item) => await this.parser.parseBlocks(item)));
        return list;
    }
}
exports.FBlockList = FBlockList;
class VFList extends viewFactory_1.BlockViewFactory {
    async setupBlockView(block) {
        let view = new view_1.VList;
        view.listType = block.listType;
        view.start = block.start;
        view.items = [];
        for (let i = 0; i < block.items.length; i++)
            view.items.push(await this.renderer.renderBlocks(block.items[i]));
        return view;
    }
    async getRender(view) {
        return this.renderBlockView(view);
    }
}
exports.VFList = VFList;
