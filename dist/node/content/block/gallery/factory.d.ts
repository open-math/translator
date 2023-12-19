import { ObjBlockFactory } from "bitran";
import Gallery from "./block";
import { BlockViewFactory } from "../../../core/viewFactory";
import VGallery from "./view";
export declare class FGallery extends ObjBlockFactory<Gallery> {
    objType: string;
    parseObj(obj: any): Promise<Gallery>;
}
export declare class VFGallery extends BlockViewFactory<VGallery, Gallery> {
    setupBlockView(block: Gallery): Promise<VGallery>;
    getRender(view: VGallery): Promise<any>;
}
