import { ObjBlockFactory } from "bitran";
import { Figure } from "./block";
import { BlockViewFactory } from "../../../core/viewFactory";
import { VFigure } from "./view";
export declare class FImage extends ObjBlockFactory<Figure> {
    objType: string;
    parseObj(obj: any): Promise<Figure>;
}
export declare class FVideo extends ObjBlockFactory<Figure> {
    objType: string;
    parseObj(obj: any): Promise<Figure>;
}
export declare class VFFigure extends BlockViewFactory<VFigure, Figure> {
    setupBlockView(block: Figure): Promise<VFigure>;
    getRender(view: VFigure): Promise<any>;
}
