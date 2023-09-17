import { BlockFactory, BlockMeta } from "bitran";
import { BlockViewFactory } from "../../../core/viewFactory";
import Heading from "./block";
import { VHeading } from "./view";
export declare class FHeading extends BlockFactory<Heading> {
    canParse(strBlock: string): boolean;
    parse(strBlock: string, meta: BlockMeta): Promise<Heading>;
}
export declare class VFHeading extends BlockViewFactory<VHeading, Heading> {
    setupBlockView(block: Heading): Promise<VHeading>;
    getRender(view: VHeading): Promise<any>;
}
