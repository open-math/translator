import { ObjBlockFactory, Parser } from "bitran";
import { v4 as uuid4 } from "uuid";

import { Figure, FigureCaption } from "./block";
import { ImageFigureContent, ImageVFigureContent } from "./content/image";
import Helper from "core/Helper";
import { BlockViewFactory } from "core/viewFactory";
import { VFigure, VFigureCaption } from "./view";
import { getLocation } from "core/parser";
import { Renderer } from "core/index";
import { FigureType } from "./global";
import { VideoFigureContent, VideoVFigureContent } from "./content/video";

//
// Image
//

export class FImage extends ObjBlockFactory<Figure>
{
    objType = 'image';
    
    async parseObj(obj: any): Promise<Figure>
    {
        let helper = Helper.getFrom(this.parser);

        let figure = await setupBaseFigure(obj, this.parser);
            figure.content = await ImageFigureContent.setupContent(obj, getLocation(this.parser), helper);

        if (figure.widthSet['full'] === '100%')
            figure.widthSet['full'] = (figure.content as ImageFigureContent).size.width + 'px';

        return figure;
    }
}

//
// Video
//

export class FVideo extends ObjBlockFactory<Figure>
{
    objType = 'video';

    async parseObj(obj: any): Promise<Figure>
    {
        let helper = Helper.getFrom(this.parser);

        let figure = await setupBaseFigure(obj, this.parser);
            figure.content = await VideoFigureContent.setupContent(obj, getLocation(this.parser), helper);
        
        return figure;
    }
}

//
//
//

async function setupBaseFigure(raw, parser)
{
    let figure = new Figure;
        figure.uuid = uuid4();
        figure.caption = await setupCaption(raw.caption, parser);
        figure.widthSet = setupWidthSet(raw);

    return figure;
}

async function setupCaption(rawCaption, parser: Parser)
{
    if (!rawCaption)
        return null;

    let caption = new FigureCaption;

    if (typeof rawCaption === 'string')
        caption.main = await parser.parseInliners(rawCaption);
    else
    {
        if (rawCaption['main'])
        caption.main = await parser.parseInliners(rawCaption.main);
        else
            throw new Error('Incorrect caption!');

        if (rawCaption['secondary'])
            caption.secondary = await parser.parseInliners(rawCaption.secondary);

        if (rawCaption['link'])
            caption.link = rawCaption.link;
    }

    return caption;
}

function bpToMinWidth(bp: string)
{
    switch (bp)
    {
        case 'mini': return '500px';
    }

    return false;
}

function setupWidthSet(raw)
{
    let widthSet = { 'full': '100%' };
    let rawWidth = raw['width'];

    if (typeof rawWidth === 'string')
        widthSet['full'] = rawWidth;

    if (typeof rawWidth === 'object')
        widthSet = {...rawWidth};

    let keys = Object.keys(widthSet);

    let resultWidthSet = {};

    keys.forEach(key =>
    {
        let minWidth = bpToMinWidth(key);
        
        if (minWidth !== false)
        {
            resultWidthSet[minWidth] = widthSet[key];
        }
        else resultWidthSet[key] = widthSet[key];
    });

    return resultWidthSet;
}

//
//
//

export class VFFigure extends BlockViewFactory<VFigure, Figure>
{
    async setupBlockView(block: Figure): Promise<VFigure>
    {
        let helper = Helper.getFrom(this.renderer);
        let view = await setupBaseVFigure(block, this.renderer);

        switch (block.content.type)
        {
            case FigureType.Image:
                view.content = await ImageVFigureContent.setupContent(block.content as ImageFigureContent, this.renderer.location, helper);
                break;
            case FigureType.Video:
                view.content = await VideoVFigureContent.setupContent(block.content as VideoFigureContent, helper);
                break;
        }

        return view;
    }

    async getRender(view: VFigure)
    {
        //console.log(view);
        return this.renderBlockView(view);
    }
}

async function setupBaseVFigure(block: Figure, renderer: Renderer)
{
    let view = new VFigure;
        view.uuid = block.uuid;
        view.widthCss = getWidthCss(view.uuid, block.widthSet);
        view.caption = await setupVCaption(block.caption, renderer);

    return view;
}

async function setupVCaption(caption: FigureCaption, renderer: Renderer)
{
    if (!caption)
        return null;

    let vCaption = new VFigureCaption;
        vCaption.main =     await renderer.renderInliners(caption.main);
        vCaption.link =     caption.link;

    if (caption.secondary)
        vCaption.secondary = await renderer.renderInliners(caption.secondary);

    return vCaption;
}

function getWidthCss(uuid: string, widthSet: object)
{
    let css = '';

    let rule = (width: string) =>
    {
        return `figure[data-uuid="${uuid}"] { width: ${width}; }`;
    }

    let mediaRule = (minWidth: string, width: string) =>
    {
        return `@media (max-width: ${minWidth}) { ${rule(width)} }`;
    }

    css += rule(widthSet['full']) + '\n\n';

    Object.keys(widthSet).forEach(minWidth =>
    {
        css += mediaRule(minWidth, widthSet[minWidth]) + '\n\n';
    });

    return css;
}