"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFInclude = exports.FInclude = void 0;
const bitran_1 = require("bitran");
const block_1 = __importDefault(require("./block"));
const viewFactory_1 = require("../../../core/viewFactory");
const Helper_1 = __importDefault(require("../../../core/Helper"));
class FInclude extends bitran_1.BlockFactory {
    canParse(strBlock) {
        return strBlock.startsWith('<~ ');
    }
    async parse(strBlock) {
        let rawId = strBlock.slice(3).trim();
        let include = new block_1.default;
        include.id = rawId;
        return include;
    }
}
exports.FInclude = FInclude;
class VFInclude extends viewFactory_1.StringViewFactory {
    async setupView(product) {
        let unique = await Helper_1.default.getFrom(this.renderer).getUnique(product.id);
        if (!unique)
            throw new Error(`Can't find unique with id '${product.id}'!`);
        return await this.renderer.renderBlocks(unique);
    }
}
exports.VFInclude = VFInclude;
