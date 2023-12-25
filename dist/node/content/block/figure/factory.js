"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFFigure = exports.FVideo = exports.FImage = void 0;
const bitran_1 = require("bitran");
const uuid_1 = require("uuid");
const block_1 = require("./block");
const image_1 = require("./content/image");
const Helper_1 = __importDefault(require("../../../core/Helper"));
const viewFactory_1 = require("../../../core/viewFactory");
const view_1 = require("./view");
const parser_1 = require("../../../core/parser");
const global_1 = require("./global");
const video_1 = require("./content/video");
//
// Image
//
class FImage extends bitran_1.ObjBlockFactory {
    objType = 'image';
    async parseObj(obj) {
        let helper = Helper_1.default.getFrom(this.parser);
        let figure = await setupBaseFigure(obj, this.parser);
        figure.content = await image_1.ImageFigureContent.setupContent(obj, (0, parser_1.getLocation)(this.parser), helper);
        if (figure.widthSet['full'] === '100%')
            figure.widthSet['full'] = figure.content.size.width + 'px';
        return figure;
    }
}
exports.FImage = FImage;
//
// Video
//
class FVideo extends bitran_1.ObjBlockFactory {
    objType = 'video';
    async parseObj(obj) {
        let helper = Helper_1.default.getFrom(this.parser);
        let figure = await setupBaseFigure(obj, this.parser);
        figure.content = await video_1.VideoFigureContent.setupContent(obj, (0, parser_1.getLocation)(this.parser), helper);
        return figure;
    }
}
exports.FVideo = FVideo;
//
//
//
async function setupBaseFigure(raw, parser) {
    let figure = new block_1.Figure;
    figure.uuid = (0, uuid_1.v4)();
    figure.caption = await setupCaption(raw.caption, parser);
    figure.widthSet = setupWidthSet(raw);
    return figure;
}
async function setupCaption(rawCaption, parser) {
    if (!rawCaption)
        return null;
    let caption = new block_1.FigureCaption;
    if (typeof rawCaption === 'string')
        caption.main = await parser.parseInliners(rawCaption);
    else {
        if (rawCaption['main'])
            caption.main = await parser.parseInliners(rawCaption.main);
        else
            throw new Error('Incorrect caption!');
        if (rawCaption['secondary'])
            caption.secondary = await parser.parseInliners(rawCaption.secondary);
        if (rawCaption['link'])
            caption.link = rawCaption.link;
        if (rawCaption['maxWidth'])
            caption.maxWidth = rawCaption.maxWidth;
    }
    return caption;
}
function bpToMinWidth(bp) {
    switch (bp) {
        case 'mini': return '500px';
    }
    return false;
}
function setupWidthSet(raw) {
    let widthSet = { 'full': '100%' };
    let rawWidth = raw['width'];
    if (typeof rawWidth === 'string')
        widthSet['full'] = rawWidth;
    if (typeof rawWidth === 'object')
        widthSet = { ...rawWidth };
    let keys = Object.keys(widthSet);
    let resultWidthSet = {};
    keys.forEach(key => {
        let minWidth = bpToMinWidth(key);
        if (minWidth !== false) {
            resultWidthSet[minWidth] = widthSet[key];
        }
        else
            resultWidthSet[key] = widthSet[key];
    });
    return resultWidthSet;
}
//
//
//
class VFFigure extends viewFactory_1.BlockViewFactory {
    async setupBlockView(block) {
        let helper = Helper_1.default.getFrom(this.renderer);
        let view = await setupBaseVFigure(block, this.renderer);
        switch (block.content.type) {
            case global_1.FigureType.Image:
                view.content = await image_1.ImageVFigureContent.setupContent(block.content, this.renderer.location, helper);
                break;
            case global_1.FigureType.Video:
                view.content = await video_1.VideoVFigureContent.setupContent(block.content, helper);
                break;
        }
        return view;
    }
    async getRender(view) {
        //console.log(view);
        return this.renderBlockView(view);
    }
}
exports.VFFigure = VFFigure;
async function setupBaseVFigure(block, renderer) {
    let view = new view_1.VFigure;
    view.uuid = block.uuid;
    view.widthCss = getWidthCss(view.uuid, block.widthSet, block.caption?.maxWidth);
    view.caption = await setupVCaption(block.caption, renderer);
    return view;
}
async function setupVCaption(caption, renderer) {
    if (!caption)
        return null;
    let vCaption = new view_1.VFigureCaption;
    vCaption.main = await renderer.renderInliners(caption.main);
    vCaption.link = caption.link;
    if (caption.secondary)
        vCaption.secondary = await renderer.renderInliners(caption.secondary);
    vCaption.maxWidth = caption.maxWidth;
    return vCaption;
}
function getWidthCss(uuid, widthSet, captionMaxWidth) {
    let css = '';
    let rule = (width) => {
        return `figure[data-uuid="${uuid}"] ${captionMaxWidth ? '> .figureContent' : ''} { width: ${width}; }`;
    };
    let mediaRule = (minWidth, width) => {
        return `@media (max-width: ${minWidth}) { ${rule(width)} }`;
    };
    css += rule(widthSet['full']) + '\n\n';
    if (captionMaxWidth)
        css += `figure[data-uuid="${uuid}"] > figcaption { max-width: ${captionMaxWidth}; }` + '\n\n';
    Object.keys(widthSet).forEach(minWidth => {
        css += mediaRule(minWidth, widthSet[minWidth]) + '\n\n';
    });
    return css;
}
