import { BlockFactory, BlockMeta } from "bitran";
import Html from "./block";
import { StringViewFactory } from "../../../core/viewFactory";
export declare class FHtml extends BlockFactory<Html> {
    canParse(strBlock: string): boolean;
    parse(strBlock: string, meta: BlockMeta): Promise<Html>;
}
export declare class VFHtml extends StringViewFactory<Html> {
    setupView(product: Html): Promise<string>;
}
