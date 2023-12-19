"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFSecondary = exports.FSecondary = void 0;
const bitran_1 = require("bitran");
const block_1 = __importDefault(require("./block"));
const Helper_1 = __importDefault(require("../../../core/Helper"));
const util_1 = require("../figure/util");
const parser_1 = require("../../../core/parser");
const viewFactory_1 = require("../../../core/viewFactory");
const view_1 = require("./view");
class FSecondary extends bitran_1.ObjBlockFactory {
    objType = 'secondary';
    async parseObj(obj) {
        let helper = Helper_1.default.getFrom(this.parser);
        if (!obj.type)
            throw new Error(`Missing 'type' property!`);
        if (!obj.icon)
            throw new Error(`Missing 'icon' property!`);
        let iconLocation = (0, util_1.locationFromSrc)(obj.icon, (0, parser_1.getLocation)(this.parser));
        if (!(await helper.hasAsset(iconLocation)))
            throw new Error(`Missing icon image!`);
        let secondary = new block_1.default;
        secondary.contentType = obj.type;
        secondary.icon = iconLocation;
        secondary.title = obj.title;
        secondary.content = await this.parser.parseBlocks(obj.content);
        return secondary;
    }
}
exports.FSecondary = FSecondary;
class VFSecondary extends viewFactory_1.BlockViewFactory {
    async setupBlockView(block) {
        let helper = Helper_1.default.getFrom(this.renderer);
        let view = new view_1.VSecondary;
        view.icon = await helper.getAssetSrc(block.icon);
        view.title = block.title;
        view.contentType = block.contentType;
        view.content = await this.renderer.renderBlocks(block.content);
        return view;
    }
    async getRender(view) {
        return this.renderBlockView(view);
    }
}
exports.VFSecondary = VFSecondary;
