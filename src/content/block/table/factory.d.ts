import { BlockMeta, ObjBlockFactory } from "bitran";
import Table from "./block";
import { BlockViewFactory } from "../../../core/viewFactory";
import { VTable } from "./view";
export declare class FTable extends ObjBlockFactory<Table> {
    objType: string;
    parseObj(obj: any, meta: BlockMeta): Promise<Table>;
}
export declare class VFTable extends BlockViewFactory<VTable, Table> {
    setupBlockView(block: Table): Promise<VTable>;
    getRender(view: VTable): Promise<string>;
}
