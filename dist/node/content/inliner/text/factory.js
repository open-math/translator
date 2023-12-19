"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFText = void 0;
const viewFactory_1 = require("../../../core/viewFactory");
const view_1 = require("./view");
class VFText extends viewFactory_1.InlinerViewFactory {
    async setupView(product) {
        let view = new view_1.VText;
        view.content = product.content;
        return view;
    }
    async getRender(view) {
        return view.content;
    }
}
exports.VFText = VFText;
