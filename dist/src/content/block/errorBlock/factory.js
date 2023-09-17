"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFErrorBlock = void 0;
const viewFactory_1 = require("../../../core/viewFactory");
const view_1 = require("./view");
class VFErrorBlock extends viewFactory_1.BlockViewFactory {
    async setupBlockView(block) {
        let view = new view_1.VErrorBlock;
        view.error = block.error;
        view.code = block.code;
        return view;
    }
    async getRender(view) {
        return this.renderBlockView(view);
    }
}
exports.VFErrorBlock = VFErrorBlock;
