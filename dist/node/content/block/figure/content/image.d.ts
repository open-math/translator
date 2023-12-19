import Helper from "../../../../core/Helper";
import { FigureContent } from "../block";
import Location from "../../../../core/location";
import { VFigureContent } from "../view";
import { FigureType } from "../global";
import { Size } from "../util";
export declare class ImageFigureContent extends FigureContent {
    type: FigureType;
    src: Location;
    size: Size;
    invertible: boolean;
    static setupContent(raw: any, context: Location, helper: Helper): Promise<ImageFigureContent>;
}
export declare class ImageVFigureContent extends VFigureContent {
    type: FigureType;
    src: string;
    size: Size;
    invertible: boolean;
    static setupContent(content: ImageFigureContent, context: Location, helper: Helper): Promise<ImageVFigureContent>;
}
