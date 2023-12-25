import Location from "core/location";
import { FigureContent } from "../block";
import { FigureType } from "../global";
import Helper from "core/Helper";
import { VFigureContent } from "../view";
import { locationFromSrc } from "../util";

export class VideoFigureContent extends FigureContent
{
    type =  FigureType.Video;
    src:    Location;
    invert: string;

    static async setupContent(raw: any, context: Location, helper: Helper): Promise<VideoFigureContent>
    {
        try
        {
            if (!raw.src)
                throw new Error(`Missing 'src' property!`);
            
            let videoLocation = locationFromSrc(raw.src, context);

            let hasVideo = await helper.hasAsset(videoLocation);
            if (!hasVideo)
                throw new Error(`Missing video ${videoLocation}!`);

            let video = new VideoFigureContent;
                video.src = videoLocation;
                
            if (typeof raw.invert === 'string')
                video.invert = raw.invert;

            return video;
        }
        catch (e)
        {
            let message = 'Unknown error when parsing video!';

            if (e.message)
                message = e.message;

            console.error('Video error!');
            console.error(raw);
            throw new Error(message);
        }
    }
}

export class VideoVFigureContent extends VFigureContent
{
    type =  FigureType.Video;
    src:        string;
    invert?:    string;

    static async setupContent(content: VideoFigureContent, helper: Helper): Promise<VideoVFigureContent>
    {
        try
        {
            let view = new VideoVFigureContent;
                view.src = await helper.getAssetSrc(content.src);
                view.invert = content.invert;

            return view;
        }
        catch (e)
        {
            let message = 'Unknown error when rendering video!';

            if (e.message)
                message = e.message;

            console.error('Video error!');
            console.error(content);
            throw new Error(message);
        }
    }
}