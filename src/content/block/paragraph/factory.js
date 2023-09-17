"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFParagraph = void 0;
const viewFactory_1 = require("../../../core/viewFactory");
const view_1 = require("./view");
class VFParagraph extends viewFactory_1.BlockViewFactory {
    async setupBlockView(block) {
        let view = new view_1.VParagraph;
        view.content = await this.renderer.renderInliners(block.content);
        return view;
    }
    async getRender(view) {
        return this.renderBlockView(view);
    }
}
exports.VFParagraph = VFParagraph;
