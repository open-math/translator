import { BlockFactory, BlockMeta } from "bitran";
import Spoiler from "./block";
import { StringViewFactory } from "../../../core/viewFactory";
export declare class FSpoiler extends BlockFactory<Spoiler> {
    canParse(strBlock: string): boolean;
    parse(strBlock: string, meta: BlockMeta): Promise<Spoiler>;
}
export declare class VFSpoiler extends StringViewFactory<Spoiler> {
    setupView(product: Spoiler): Promise<string>;
}
