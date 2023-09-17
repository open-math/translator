"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFGallery = exports.FGallery = void 0;
const bitran_1 = require("bitran");
const block_1 = __importDefault(require("./block"));
const factory_1 = require("../image/factory");
const viewFactory_1 = require("../../../core/viewFactory");
const view_1 = __importDefault(require("./view"));
class FGallery extends bitran_1.ObjBlockFactory {
    objType = 'gallery';
    async parseObj(obj, meta) {
        let gallery = new block_1.default;
        if (!obj.images)
            throw new Error(`Gallery must have an 'images' property!`);
        if (!Array.isArray(obj.images))
            throw new Error(`Gallery 'images' property must be an array!`);
        gallery.images = [];
        for (let i = 0; i < obj.images.length; i++) {
            let factory = new factory_1.FImage(this.parser);
            gallery.images.push(await factory.parseObj(obj.images[i]));
        }
        gallery.start = obj.start ?? 0;
        return gallery;
    }
}
exports.FGallery = FGallery;
class VFGallery extends viewFactory_1.BlockViewFactory {
    async setupBlockView(block) {
        let view = new view_1.default;
        view.images = [];
        view.renderedImages = [];
        let factory = new factory_1.VFImage(this.renderer);
        for (let i = 0; i < block.images.length; i++) {
            let vImage = await factory.setupView(block.images[i]);
            view.images.push(vImage);
            view.renderedImages.push(await factory.getRender(vImage));
        }
        view.start = block.start;
        return view;
    }
    async getRender(view) {
        return this.renderBlockView(view);
    }
}
exports.VFGallery = VFGallery;
