import { Block, Inliner, Product } from "bitran";
import Renderer from "./Renderer";
import BlockView from "./block/BlockView";
export declare abstract class ViewFactory<TProductView, TProduct extends Product> {
    abstract setupView(product: TProduct): Promise<TProductView>;
    abstract getRender(view: TProductView): Promise<string>;
    renderer: Renderer;
    constructor(renderer: Renderer);
    render(product: TProduct): Promise<string>;
    renderTemplate(type: string, locals: object): any;
}
export declare abstract class StringViewFactory<TProduct extends Product> extends ViewFactory<string, TProduct> {
    getRender(view: string): Promise<string>;
}
export declare abstract class BlockViewFactory<TBlockView extends BlockView, TBlock extends Block> extends ViewFactory<TBlockView, TBlock> {
    abstract setupBlockView(block: TBlock): Promise<TBlockView>;
    setupView(block: TBlock): Promise<TBlockView>;
    renderBlockView(view: BlockView): any;
}
export declare abstract class InlinerViewFactory<TInlinerView, TInliner extends Inliner> extends ViewFactory<TInlinerView, TInliner> {
}
