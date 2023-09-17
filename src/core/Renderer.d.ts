import { Block, Inliner, Product } from "bitran";
import { ViewFactory } from "./viewFactory";
import Location from "./location";
import Helper from "./Helper";
export default class Renderer {
    location: Location;
    helper: Helper;
    onRenderError: (product: Product, error: Error) => void;
    constructor(location: Location, helper: Helper);
    blockFactories: {
        [type: string]: {
            new (renderer: Renderer): ViewFactory<any, Block>;
        };
    };
    inlinerFactories: {
        [type: string]: {
            new (renderer: Renderer): ViewFactory<any, Inliner>;
        };
    };
    renderBlocks(blocks: Block[]): Promise<string>;
    renderBlock(block: Block): Promise<string>;
    renderInliners(inliners: Inliner[]): Promise<string>;
}
export declare class RenderExtra {
    static afterStyle(text: string, quoteTracker: QuoteTracker): string;
}
export declare class QuoteTracker {
    open: boolean;
}
