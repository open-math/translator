import { BlockMeta, ObjBlockFactory } from "bitran";
import Array from "./block";
import { BlockViewFactory } from "../../../core/viewFactory";
import { VArray } from "./view";
export declare class FArray extends ObjBlockFactory<Array> {
    objType: string;
    parseObj(obj: any, meta: BlockMeta): Promise<Array>;
}
export declare class VFArray extends BlockViewFactory<VArray, Array> {
    setupBlockView(block: Array): Promise<VArray>;
    getRender(view: VArray): Promise<string>;
}
