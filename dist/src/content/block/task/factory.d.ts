import { BlockMeta, ObjBlockFactory } from "bitran";
import Task from "./block";
import { BlockViewFactory } from "../../../core/viewFactory";
import { VTask } from "./view";
export declare class FTask extends ObjBlockFactory<Task> {
    objType: string;
    parseObj(obj: any, meta: BlockMeta): Promise<Task>;
}
export declare class VFTask extends BlockViewFactory<VTask, Task> {
    setupBlockView(block: Task): Promise<VTask>;
    getRender(view: VTask): Promise<string>;
}
