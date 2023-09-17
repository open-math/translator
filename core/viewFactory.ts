import { Block, Inliner, Product } from "bitran";

import Renderer from "core/Renderer";
import BlockView from "core/block/BlockView";
import { IHasAttributes } from "core/block/IHasAttributes";
import { renderTemplate } from "content/global/layout/template";
import Helper from "./Helper";

export abstract class ViewFactory<TProductView, TProduct extends Product>
{
    abstract setupView(product: TProduct): Promise<TProductView>;
    abstract getRender(view: TProductView): Promise<string>;

    renderer: Renderer;

    constructor(renderer: Renderer)
    {
        this.renderer = renderer;
    }

    async render(product: TProduct): Promise<string>
    {
        let view  = await this.setupView(product);
        return await this.getRender(view);
    }

    renderTemplate(type: string, locals: object)
    {
        let helper = Helper.getFrom(this.renderer);
        return renderTemplate(type, {...{ i18n: helper.i18n }, ...locals});
    }
}

export abstract class StringViewFactory<TProduct extends Product> extends ViewFactory<string, TProduct>
{
    async getRender(view: string)
    {
        return view;
    }
}

export abstract class BlockViewFactory<TBlockView extends BlockView, TBlock extends Block> extends ViewFactory<TBlockView, TBlock>
{
    abstract setupBlockView(block: TBlock): Promise<TBlockView>;

    async setupView(block: TBlock): Promise<TBlockView>
    {
        let view = await this.setupBlockView(block);
            view.type =     block.type;
            view.id =       (<IHasAttributes>block).id;
            view.classes =  (<IHasAttributes>block).classes;

        return view;
    }

    renderBlockView(view: BlockView)
    {
        return this.renderTemplate(view.type, view);
    }
}

export abstract class InlinerViewFactory<TInlinerView, TInliner extends Inliner> extends ViewFactory<TInlinerView, TInliner>
{}