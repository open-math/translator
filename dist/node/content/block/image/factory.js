"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFImage = exports.FImage = void 0;
const bitran_1 = require("bitran");
const uuid_1 = require("uuid");
const block_1 = __importDefault(require("./block"));
const location_1 = __importStar(require("../../../core/location"));
const parser_1 = require("../../../core/parser");
const viewFactory_1 = require("../../../core/viewFactory");
const view_1 = require("./view");
class FImage extends bitran_1.ObjBlockFactory {
    objType = 'image';
    async parseObj(obj) {
        let helper = (0, parser_1.getHelper)(this.parser);
        if (!obj.src)
            throw new Error(`Missing 'src' property in image!`);
        let imgLocation = this.locationFromSrc(obj.src);
        if (!(await helper.hasAsset(imgLocation)))
            throw new Error(`Missing image '${imgLocation}'!`);
        let size = await helper.getImageSize(imgLocation);
        let image = new block_1.default;
        image.src = imgLocation;
        image.width = size.width;
        image.height = size.height;
        image.invertible = obj.invertible;
        this.setRenderWidth(image, obj);
        if (obj.caption)
            image.caption = await this.parser.parseInliners(obj.caption);
        return image;
    }
    setRenderWidth(image, obj) {
        if (!obj.width)
            return null;
        image.widthId = (0, uuid_1.v4)();
        image.renderWidth = obj.width;
    }
    locationFromSrc(rawSrc) {
        if (!rawSrc)
            throw new Error(`Image 'src' property is not set!`);
        let parserLocation = (0, parser_1.getLocation)(this.parser);
        let imgLocation = new location_1.default;
        let srcParts = rawSrc.split('|');
        switch (srcParts.length) {
            // Image is located in current topic
            case 1:
                imgLocation.type = location_1.LocationType.Topic;
                imgLocation.path = parserLocation.path;
                imgLocation.target = srcParts[0];
                break;
            case 2:
                throw new Error(`Invalid image 'src' property: '${rawSrc}'`);
            // Image is located somewhere else
            case 3:
                imgLocation.type = srcParts[0].slice(1);
                imgLocation.path = srcParts[1];
                imgLocation.target = srcParts[2];
                break;
        }
        // TODO: Allow external resources for "src"?
        return imgLocation;
    }
}
exports.FImage = FImage;
class VFImage extends viewFactory_1.BlockViewFactory {
    async setupBlockView(block) {
        let view = new view_1.VImage;
        view.src = await this.renderer.helper.getAssetSrc(block.src);
        view.width = block.width;
        view.height = block.height;
        view.invertible = block.invertible;
        if (block.widthId) {
            view.widthId = block.widthId;
            view.widthCss = this.getWidthCss(block.widthId, block.renderWidth);
        }
        if (block.caption)
            view.caption = await this.renderer.renderInliners(block.caption);
        return view;
    }
    async getRender(view) {
        return this.renderBlockView(view);
    }
    getWidthCss(widthId, renderWidth) {
        let css = '';
        let maxWidthCss = (maxWidth) => {
            //return `img[data-width-id="${widthId}"] { max-width: min(${maxWidth}, 100%) !important }`;
            return `img[data-width-id="${widthId}"] { width: ${maxWidth}; }`;
        };
        if (typeof renderWidth === 'string')
            css = maxWidthCss(renderWidth);
        else {
            Object.keys(renderWidth).forEach(bp => {
                switch (bp) {
                    case 'full':
                        css += `@media (min-width: 500px) { ${maxWidthCss(renderWidth[bp])} }`;
                        break;
                    case 'mini':
                        css += `@media (max-width: 500px) { ${maxWidthCss(renderWidth[bp])} }`;
                        break;
                    default:
                        css += `@media (max-width: ${bp}) { ${maxWidthCss(renderWidth[bp])} }`;
                        break;
                }
            });
        }
        return '<style>' + css + '</style>';
    }
}
exports.VFImage = VFImage;
