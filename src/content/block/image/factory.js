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
const block_1 = __importDefault(require("./block"));
const location_1 = __importStar(require("../../../core/location"));
const parser_1 = require("../../../core/parser");
const viewFactory_1 = require("../../../core/viewFactory");
const view_1 = require("./view");
class FImage extends bitran_1.ObjBlockFactory {
    objType = 'image';
    async parseObj(obj) {
        let image = new block_1.default;
        image.src = this.locationFromSrc(obj.src);
        let helper = (0, parser_1.getHelper)(this.parser);
        let size = await helper.getImageSize(await helper.getParserFileSrc(image.src));
        image.width = size.width;
        image.height = size.height;
        image.maxWidth = obj.maxWidth;
        image.invertible = obj.invertible;
        if (obj.caption)
            image.caption = await this.parser.parseInliners(obj.caption);
        return image;
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
                imgLocation.type = srcParts[0];
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
        view.src = await this.renderer.helper.getRenderFileSrc(block.src);
        view.width = block.width;
        view.height = block.height;
        view.maxWidth = block.maxWidth;
        view.invertible = block.invertible;
        if (block.caption)
            view.caption = await this.renderer.renderInliners(block.caption);
        return view;
    }
    async getRender(view) {
        return this.renderBlockView(view);
    }
}
exports.VFImage = VFImage;
