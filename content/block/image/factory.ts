import { ObjBlockFactory } from "bitran";
import { v4 as uuidv4 } from 'uuid';

import Image from "./block";
import Location, { LocationType } from "core/location";
import { getHelper, getLocation } from "core/parser";
import { BlockViewFactory } from "core/viewFactory";
import { VImage } from "./view";

export class FImage extends ObjBlockFactory<Image>
{
    objType = 'image';

    async parseObj(obj: any): Promise<Image>
    {
        let helper = getHelper(this.parser);

        if (!obj.src)
            throw new Error(`Missing 'src' property in image!`);

        let imgLocation = this.locationFromSrc(obj.src);

        if (!(await helper.hasImage(imgLocation)))
            throw new Error(`Missing image '${imgLocation}'!`);

        let size = await helper.getImageSize(imgLocation);

        let image = new Image;
            image.src = imgLocation;
            image.width = size.width;
            image.height = size.height;

        image.invertible = obj.invertible;

        this.setRenderWidth(image, obj);
        
        if (obj.caption)
            image.caption = await this.parser.parseInliners(obj.caption);

        return image;
    }

    setRenderWidth(image: Image, obj: any)
    {
        if (!obj.width)
            return null;

        image.widthId = uuidv4();
        image.renderWidth = obj.width;
    }

    locationFromSrc(rawSrc: string)
    {
        if (!rawSrc)
            throw new Error(`Image 'src' property is not set!`);

        let parserLocation = getLocation(this.parser);
        let imgLocation = new Location;
        let srcParts = rawSrc.split('|');
        
        switch (srcParts.length)
        {
            // Image is located in current topic
            case 1:
                imgLocation.type = LocationType.Topic;
                imgLocation.path = parserLocation.path;
                imgLocation.target = srcParts[0];
                break;
            
            case 2:
                throw new Error(`Invalid image 'src' property: '${rawSrc}'`);
            
            // Image is located somewhere else
            case 3:
                imgLocation.type =      srcParts[0].slice(1) as LocationType;
                imgLocation.path =      srcParts[1];
                imgLocation.target =    srcParts[2];
                break;
        }

        // TODO: Allow external resources for "src"?

        return imgLocation;
    }
}

export class VFImage extends BlockViewFactory<VImage, Image>
{
    async setupBlockView(block: Image)
    {
        let view = new VImage;
            view.src = await this.renderer.helper.getImageSrc(block.src);
            view.width = block.width;
            view.height = block.height;
            view.invertible = block.invertible;
            
            if (block.widthId)
            {
                view.widthId = block.widthId;
                view.widthCss = this.getWidthCss(block.widthId, block.renderWidth);
            }

        if (block.caption)
            view.caption = await this.renderer.renderInliners(block.caption);

        return view;
    }

    async getRender(view: VImage)
    {
        return this.renderBlockView(view);
    }

    getWidthCss(widthId, renderWidth)
    {
        let css = '';

        let maxWidthCss = (maxWidth) =>
        {
            //return `img[data-width-id="${widthId}"] { max-width: min(${maxWidth}, 100%) !important }`;
            return `img[data-width-id="${widthId}"] { width: ${maxWidth}; }`;
        }

        if (typeof renderWidth === 'string')
            css = maxWidthCss(renderWidth);
        else
        {
            Object.keys(renderWidth).forEach(bp =>
            {
                switch (bp)
                {
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