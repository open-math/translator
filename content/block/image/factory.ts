import { ObjBlockFactory } from "bitran";

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
        let image = new Image;
            image.src = this.locationFromSrc(obj.src);

        let helper = getHelper(this.parser);

        let size = await helper.getImageSize(await helper.getParserFileSrc(image.src));

        image.width = size.width;
        image.height = size.height;

        image.maxWidth = obj.maxWidth;

        image.invertible = obj.invertible;
        
        if (obj.caption)
            image.caption = await this.parser.parseInliners(obj.caption);

        return image;
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
                imgLocation.type =      srcParts[0] as LocationType;
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
            view.src = await this.renderer.helper.getRenderFileSrc(block.src);
            view.width = block.width;
            view.height = block.height;
            view.maxWidth = block.maxWidth;
            view.invertible = block.invertible;

        if (block.caption)
            view.caption = await this.renderer.renderInliners(block.caption);

        return view;
    }

    async getRender(view: VImage)
    {
        return this.renderBlockView(view);
    }
}