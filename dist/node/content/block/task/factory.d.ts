import { BlockMeta, ObjBlockFactory } from "bitran";
import { Task, TaskBase } from "./block";
import { BlockViewFactory } from "../../../core/viewFactory";
import { VTask } from "./view";
export declare class FTask extends ObjBlockFactory<Task> {
    objType: string;
    parseObj(obj: any, meta: BlockMeta): Promise<Task>;
    parseTaskBase(task: TaskBase, obj: any): Promise<void>;
}
export declare class VFTask extends BlockViewFactory<VTask, Task> {
    setupBlockView(block: Task): Promise<VTask>;
    getRender(view: VTask): Promise<string>;
    renderTaskBase(view: VTask, block: TaskBase): Promise<void>;
}
