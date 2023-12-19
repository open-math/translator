"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFErrorInliner = void 0;
const viewFactory_1 = require("../../../core/viewFactory");
const view_1 = require("./view");
class VFErrorInliner extends viewFactory_1.InlinerViewFactory {
    async setupView(product) {
        let errorInliner = new view_1.VErrorInliner;
        errorInliner.error = product.error;
        return errorInliner;
    }
    async getRender(view) {
        return this.renderTemplate('errorInliner', view);
    }
}
exports.VFErrorInliner = VFErrorInliner;
