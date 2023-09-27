import { ObjBlockFactory } from "bitran";
import Image from "./block";
import Location from "../../../core/location";
import { BlockViewFactory } from "../../../core/viewFactory";
import { VImage } from "./view";
export declare class FImage extends ObjBlockFactory<Image> {
    objType: string;
    parseObj(obj: any): Promise<Image>;
    setRenderWidth(image: Image, obj: any): any;
    locationFromSrc(rawSrc: string): Location;
}
export declare class VFImage extends BlockViewFactory<VImage, Image> {
    setupBlockView(block: Image): Promise<VImage>;
    getRender(view: VImage): Promise<any>;
    getWidthCss(widthId: any, renderWidth: any): string;
}
