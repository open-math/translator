"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFTask = exports.FTask = void 0;
const bitran_1 = require("bitran");
const block_1 = __importDefault(require("./block"));
const viewFactory_1 = require("../../../core/viewFactory");
const view_1 = require("./view");
class FTask extends bitran_1.ObjBlockFactory {
    objType = 'task';
    async parseObj(obj, meta) {
        let task = new block_1.default;
        ['title', 'statement'].forEach(requiredField => {
            if (!obj[requiredField])
                throw new Error(`Task must have '${requiredField} property!'`);
        });
        task.title = obj.title;
        task.tags = obj.tags;
        let fields = ['statement', 'hint', 'solution', 'answer'];
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            if (field in obj)
                task[field] = await this.parser.parseBlocks(obj[field]);
        }
        return task;
    }
}
exports.FTask = FTask;
class VFTask extends viewFactory_1.BlockViewFactory {
    async setupBlockView(block) {
        let view = new view_1.VTask;
        view.title = block.title;
        view.tags = block.tags;
        view.statement = await this.renderer.renderBlocks(block.statement);
        let sections = ['hint', 'solution', 'answer'].filter(section => block[section]);
        for (let i = 0; i < sections.length; i++) {
            let section = sections[i];
            view.sections[section] = await this.renderer.renderBlocks(block[section]);
        }
        return view;
    }
    async getRender(view) {
        return this.renderBlockView(view);
    }
}
exports.VFTask = VFTask;
