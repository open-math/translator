import { ObjBlockFactory } from "bitran";
import Todo from "./block";
import { BlockViewFactory } from "../../../core/viewFactory";
import { VTodo } from "./view";
export declare class FTodo extends ObjBlockFactory<Todo> {
    objType: string;
    parseObj(obj: any): Promise<Todo>;
}
export declare class VFTodo extends BlockViewFactory<VTodo, Todo> {
    setupBlockView(block: Todo): Promise<VTodo>;
    getRender(view: VTodo): Promise<any>;
}
