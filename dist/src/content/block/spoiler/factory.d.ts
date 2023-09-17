import { BlockFactory, BlockMeta } from "bitran";
import Spoiler from "./block";
export declare class FSpoiler extends BlockFactory<Spoiler> {
    canParse(strBlock: string): boolean;
    parse(strBlock: string, meta: BlockMeta): Promise<Spoiler>;
}
