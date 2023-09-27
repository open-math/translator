"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FThreorem = exports.FDefinition = exports.FExample = exports.FImportant = exports.VFAccentBlock = exports.FAccentBlock = void 0;
const bitran_1 = require("bitran");
const block_1 = __importDefault(require("./block"));
const viewFactory_1 = require("../../../core/viewFactory");
const view_1 = require("./view");
const Helper_1 = __importDefault(require("../../../core/Helper"));
//
// Block Factory
//
class FAccentBlock extends bitran_1.ObjBlockFactory {
    async parseObj(obj, meta) {
        let block = new block_1.default;
        block.type = this.getBlockType();
        block.main = await this.getMain(obj);
        block.expand = await this.getExpand(obj);
        if (obj.title)
            block.title = obj.title;
        block.showTitle = obj.showTitle;
        block.showInToc = obj.showInToc;
        return block;
    }
    //
    getMainAliases() { return []; }
    getExpandAliases() { return []; }
    async getMain(obj) {
        let mainAliases = [...['main'], ...this.getMainAliases()];
        let mainContent = this.getAliasedProperty(mainAliases, obj);
        if (!mainContent)
            return null;
        return this.parser.parseBlocks(mainContent);
    }
    async getExpand(obj) {
        let expandAliases = [...['expand'], ...this.getExpandAliases()];
        let expandContent = this.getAliasedProperty(expandAliases, obj);
        if (!expandContent)
            return null;
        if (typeof expandContent === 'object') {
            let toReturn = { ...expandContent };
            let keys = Object.keys(toReturn);
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                toReturn[key] = await this.parser.parseBlocks(toReturn[key]);
            }
            return toReturn;
        }
        else
            return this.parser.parseBlocks(expandContent);
    }
    //
    getBlockType() {
        return this.objType;
    }
    getAliasedProperty(aliases, obj) {
        for (let i = 0; i < aliases.length; i++) {
            let alias = aliases[i];
            if (alias in obj)
                return obj[alias];
        }
        return null;
    }
}
exports.FAccentBlock = FAccentBlock;
//
// View Factory
//
class VFAccentBlock extends viewFactory_1.BlockViewFactory {
    async setupBlockView(block) {
        let view = new view_1.VAccentBlock;
        view.title = block.title;
        view.showTitle = block.showTitle ?? !!block.title;
        view.main = await this.renderer.renderBlocks(block.main);
        if (block.expand) {
            let expand = block.expand;
            let helper = Helper_1.default.getFrom(this.renderer);
            view.expand = {};
            if (Array.isArray(expand))
                expand = { [helper.i18n(`accentBlock.${block.type}.expand`)]: expand };
            for (let i = 0; i < Object.keys(expand).length; i++) {
                let key = Object.keys(expand)[i];
                view.expand[key] = await this.renderer.renderBlocks(expand[key]);
            }
        }
        return view;
    }
    async getRender(view) {
        return this.renderTemplate('accentBlock', view);
    }
}
exports.VFAccentBlock = VFAccentBlock;
//
// Important
//
class FImportant extends FAccentBlock {
    objType = 'important';
    getMainAliases() { return ['content']; }
}
exports.FImportant = FImportant;
//
// Example
//
class FExample extends FAccentBlock {
    objType = 'example';
    getMainAliases() { return ['task']; }
    getExpandAliases() { return ['solution']; }
}
exports.FExample = FExample;
//
// Definition
//
class FDefinition extends FAccentBlock {
    objType = 'definition';
    getMainAliases() { return ['content']; }
}
exports.FDefinition = FDefinition;
//
// Theorem
//
class FThreorem extends FAccentBlock {
    objType = 'theorem';
    getMainAliases() { return ['statement']; }
    getExpandAliases() { return ['proof']; }
}
exports.FThreorem = FThreorem;
