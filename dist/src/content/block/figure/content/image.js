"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageVFigureContent = exports.ImageFigureContent = void 0;
const block_1 = require("../block");
const view_1 = require("../view");
const global_1 = require("../global");
const util_1 = require("../util");
class ImageFigureContent extends block_1.FigureContent {
    type = global_1.FigureType.Image;
    src;
    size;
    invertible;
    static async setupContent(raw, context, helper) {
        try {
            if (!raw.src)
                throw new Error(`Missing 'src' property!`);
            let imgLocation = (0, util_1.locationFromSrc)(raw.src, context);
            let hasImage = await helper.hasAsset(imgLocation);
            if (!hasImage)
                throw new Error(`Missing image ${imgLocation}!`);
            let size = await helper.getImageSize(imgLocation);
            if (!size)
                throw new Error(`Can't determine size of image ${imgLocation}!`);
            let image = new ImageFigureContent;
            image.src = imgLocation;
            image.size = new util_1.Size(size.width, size.height);
            image.invertible = !!raw.invertible;
            return image;
        }
        catch (e) {
            let message = 'Unknown error when parsing image!';
            if (e.message)
                message = e.message;
            console.error('Image error!');
            console.error(raw);
            throw new Error(message);
        }
    }
}
exports.ImageFigureContent = ImageFigureContent;
class ImageVFigureContent extends view_1.VFigureContent {
    type = global_1.FigureType.Image;
    src;
    size;
    invertible;
    static async setupContent(content, context, helper) {
        try {
            let view = new ImageVFigureContent;
            view.src = await helper.getAssetSrc(content.src);
            view.size = content.size;
            view.invertible = content.invertible;
            return view;
        }
        catch (e) {
            let message = 'Unknown error when rendering image!';
            if (e.message)
                message = e.message;
            console.error('Image error!');
            console.error(content);
            throw new Error(message);
        }
    }
}
exports.ImageVFigureContent = ImageVFigureContent;
