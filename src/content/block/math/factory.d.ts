import { BlockFactory } from "bitran";
import Math from "./block";
import { BlockViewFactory } from "../../../core/viewFactory";
import { VMath } from "./view";
export declare class FMath extends BlockFactory<Math> {
    isObj: boolean;
    canParse(strBlock: string): boolean;
    parse(strBlock: string): Promise<Math>;
}
export declare class VFMath extends BlockViewFactory<VMath, Math> {
    setupBlockView(block: Math): Promise<VMath>;
    getRender(view: VMath): Promise<any>;
}
