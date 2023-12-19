import { ObjBlockFactory } from "bitran";
import Secondary from "./block";
import { BlockViewFactory } from "../../../core/viewFactory";
import { VSecondary } from "./view";
export declare class FSecondary extends ObjBlockFactory<Secondary> {
    objType: string;
    parseObj(obj: any): Promise<Secondary>;
}
export declare class VFSecondary extends BlockViewFactory<VSecondary, Secondary> {
    setupBlockView(block: Secondary): Promise<VSecondary>;
    getRender(view: VSecondary): Promise<string>;
}
