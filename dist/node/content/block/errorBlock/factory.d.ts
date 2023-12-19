import { ErrorBlock } from "bitran";
import { BlockViewFactory } from "../../../core/viewFactory";
import { VErrorBlock } from "./view";
export declare class VFErrorBlock extends BlockViewFactory<VErrorBlock, ErrorBlock> {
    setupBlockView(block: ErrorBlock): Promise<VErrorBlock>;
    getRender(view: VErrorBlock): Promise<any>;
}
