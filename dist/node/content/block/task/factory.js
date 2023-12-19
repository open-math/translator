"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFTask = exports.FTask = void 0;
const bitran_1 = require("bitran");
const uuid_1 = require("uuid");
const block_1 = require("./block");
const viewFactory_1 = require("../../../core/viewFactory");
const view_1 = require("./view");
class FTask extends bitran_1.ObjBlockFactory {
    objType = 'task';
    async parseObj(obj, meta) {
        let task = new block_1.Task;
        await this.parseTaskBase(task, obj);
        task.tags = obj.tags;
        if (obj.similar) {
            task.similar = [];
            for (let i = 0; i < obj.similar.length; i++) {
                let rawSimilar = obj.similar[i];
                rawSimilar.title = task.title;
                let similar;
                if (!rawSimilar.script) {
                    similar = new block_1.SimilarTask;
                }
                else {
                    similar = new block_1.SimilarGenTask;
                    similar.scriptId = (0, uuid_1.v4)();
                    similar.script = JSON.stringify(rawSimilar.script);
                }
                await this.parseTaskBase(similar, rawSimilar);
                task.similar.push(similar);
            }
        }
        return task;
    }
    async parseTaskBase(task, obj) {
        ['title', 'statement'].forEach(requiredField => {
            if (!obj[requiredField])
                throw new Error(`Task must have '${requiredField}' property!'`);
        });
        task.title = obj.title;
        let fields = ['statement', 'hint', 'solution', 'answer', 'note'];
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            if (field in obj)
                task[field] = await this.parser.parseBlocks(obj[field]);
        }
    }
}
exports.FTask = FTask;
class VFTask extends viewFactory_1.BlockViewFactory {
    async setupBlockView(block) {
        let view = new view_1.VTask;
        view.tags = block.tags;
        await this.renderTaskBase(view, block);
        if (block.similar) {
            view.similar = [];
            for (let i = 0; i < block.similar.length; i++) {
                let blockSimilar = block.similar[i];
                let vSimilar;
                if ('script' in blockSimilar) {
                    let genSimilarBlock = blockSimilar;
                    vSimilar = new view_1.VSimilarGenTask;
                    vSimilar.script = genSimilarBlock.script;
                    vSimilar.scriptId = genSimilarBlock.scriptId;
                }
                else {
                    vSimilar = new view_1.VSimilarTask;
                }
                await this.renderTaskBase(vSimilar, blockSimilar);
                vSimilar.num = i + 1;
                view.similar.push(vSimilar);
            }
        }
        return view;
    }
    async getRender(view) {
        return this.renderBlockView(view);
    }
    async renderTaskBase(view, block) {
        ['title', 'statement'].forEach(requiredField => {
            if (!block[requiredField])
                throw new Error(`Task must have '${requiredField} property!'`);
        });
        view.title = block.title;
        view.statement = await this.renderer.renderBlocks(block.statement);
        let sections = ['hint', 'solution', 'answer', 'note'].filter(section => block[section]);
        for (let i = 0; i < sections.length; i++) {
            let section = sections[i];
            view.sections[section] = await this.renderer.renderBlocks(block[section]);
        }
    }
}
exports.VFTask = VFTask;
