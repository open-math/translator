"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlinerViewFactory = exports.BlockViewFactory = exports.StringViewFactory = exports.ViewFactory = void 0;
const template_1 = require("../content/global/layout/template");
const Helper_1 = __importDefault(require("./Helper"));
class ViewFactory {
    renderer;
    constructor(renderer) {
        this.renderer = renderer;
    }
    async render(product) {
        let view = await this.setupView(product);
        return await this.getRender(view);
    }
    renderTemplate(type, locals) {
        let helper = Helper_1.default.getFrom(this.renderer);
        return (0, template_1.renderTemplate)(type, { ...{ i18n: helper.i18n, isEditor: helper.isEditor() }, ...locals });
    }
}
exports.ViewFactory = ViewFactory;
class StringViewFactory extends ViewFactory {
    async getRender(view) {
        return view;
    }
}
exports.StringViewFactory = StringViewFactory;
class BlockViewFactory extends ViewFactory {
    async setupView(block) {
        let view = await this.setupBlockView(block);
        view.type = block.type;
        view.id = block.id;
        view.classes = block.classes;
        return view;
    }
    renderBlockView(view) {
        return this.renderTemplate(view.type, view);
    }
}
exports.BlockViewFactory = BlockViewFactory;
class InlinerViewFactory extends ViewFactory {
}
exports.InlinerViewFactory = InlinerViewFactory;
