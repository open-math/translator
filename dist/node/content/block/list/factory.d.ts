import { BlockFactory, BlockMeta, ObjBlockFactory } from "bitran";
import List from "./block";
import { BlockViewFactory } from "../../../core/viewFactory";
import { VList } from "./view";
export declare class FList extends BlockFactory<List> {
    canParse(strBlock: string): boolean;
    isUl(str: string): boolean;
    getOlStart(str: string): number;
    parse(strBlock: string, meta: BlockMeta): Promise<List>;
}
export declare class FBlockList extends ObjBlockFactory<List> {
    objType: string;
    parseObj(obj: any, meta: BlockMeta): Promise<List>;
}
export declare class VFList extends BlockViewFactory<VList, List> {
    setupBlockView(block: List): Promise<VList>;
    getRender(view: VList): Promise<string>;
}
