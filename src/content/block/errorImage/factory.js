"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFErrorImage = void 0;
const viewFactory_1 = require("../../../core/viewFactory");
class VFErrorImage extends viewFactory_1.StringViewFactory {
    async setupView(product) {
        return this.renderTemplate('errorImage', product);
    }
}
exports.VFErrorImage = VFErrorImage;
