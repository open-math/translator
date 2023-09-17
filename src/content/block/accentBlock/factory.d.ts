import { Block, BlockMeta, ObjBlockFactory } from "bitran";
import AccentBlock, { TExpandContent } from "./block";
import { BlockViewFactory } from "../../../core/viewFactory";
import { VAccentBlock } from "./view";
export declare abstract class FAccentBlock<TObj extends object = any> extends ObjBlockFactory<AccentBlock, TObj> {
    parseObj(obj: any, meta: BlockMeta): Promise<AccentBlock>;
    getMainAliases(): string[];
    getExpandAliases(): string[];
    getMain(obj: any): Promise<Block[]>;
    getExpand(obj: any): Promise<TExpandContent>;
    protected getBlockType(): string;
    private getAliasedProperty;
}
export declare class VFAccentBlock extends BlockViewFactory<VAccentBlock, AccentBlock> {
    setupBlockView(block: AccentBlock): Promise<VAccentBlock>;
    getRender(view: VAccentBlock): Promise<string>;
}
export declare class FImportant extends FAccentBlock {
    objType: string;
    getMainAliases(): string[];
}
export declare class FExample extends FAccentBlock {
    objType: string;
    getMainAliases(): string[];
    getExpandAliases(): string[];
}
export declare class FDefinition extends FAccentBlock {
    objType: string;
    getMainAliases(): string[];
}
export declare class FThreorem extends FAccentBlock {
    objType: string;
    getMainAliases(): string[];
    getExpandAliases(): string[];
}
