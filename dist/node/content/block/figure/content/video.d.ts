import Location from "../../../../core/location";
import { FigureContent } from "../block";
import { FigureType } from "../global";
import Helper from "../../../../core/Helper";
import { VFigureContent } from "../view";
export declare class VideoFigureContent extends FigureContent {
    type: FigureType;
    src: Location;
    invert: string;
    static setupContent(raw: any, context: Location, helper: Helper): Promise<VideoFigureContent>;
}
export declare class VideoVFigureContent extends VFigureContent {
    type: FigureType;
    src: string;
    invert?: string;
    static setupContent(content: VideoFigureContent, helper: Helper): Promise<VideoVFigureContent>;
}
