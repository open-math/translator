import Helper from "core/Helper";
import { FigureContent } from "../block";
import Location from "core/location";
import { VFigureContent } from "../view";
import { FigureType } from "../global";
import { Size, locationFromSrc } from "../util";

export class ImageFigureContent extends FigureContent
{
    type =      FigureType.Image;
    src:        Location;
    size:       Size;
    invert:     string;

    static async setupContent(raw: any, context: Location, helper: Helper): Promise<ImageFigureContent>
    {
        try
        {
            if (!raw.src)
                throw new Error(`Missing 'src' property!`);

            let imgLocation = locationFromSrc(raw.src, context);

            let hasImage = await helper.hasAsset(imgLocation);
            if (!hasImage)
                throw new Error(`Missing image ${imgLocation}!`);

            let size = await helper.getImageSize(imgLocation);
            if (!size)
                throw new Error(`Can't determine size of image ${imgLocation}!`);

            let image = new ImageFigureContent;
                image.src =         imgLocation;
                image.size =        new Size(size.width, size.height);
            
            if (typeof raw.invert === 'string')
                image.invert = raw.invert;

            return image;
        }
        catch (e)
        {
            let message = 'Unknown error when parsing image!';

            if (e.message)
                message = e.message;

            console.error('Image error!');
            console.error(raw);
            throw new Error(message);
        }
    }
}

export class ImageVFigureContent extends VFigureContent
{
    type =      FigureType.Image;
    src:        string;
    size:       Size;
    invert?:    string;

    static async setupContent(content: ImageFigureContent, context: Location, helper: Helper): Promise<ImageVFigureContent>
    {
        try
        {
            let view = new ImageVFigureContent;
                view.src =          await helper.getAssetSrc(content.src);
                view.size =         content.size;
                view.invert =       content.invert;

            return view;
        }
        catch (e)
        {
            let message = 'Unknown error when rendering image!';

            if (e.message)
                message = e.message;

            console.error('Image error!');
            console.error(content);
            throw new Error(message);
        }
    }
}