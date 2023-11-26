import { Block, ErrorBlock, ErrorInliner, Inliner, Product, Text } from "bitran";

import { ViewFactory } from "./viewFactory";
import ErrorSwap from "./ErrorSwap";

import Location from "./location";
import Helper from "./Helper";

// Block Factories
import { VFParagraph } from "content/block/paragraph/factory";
import { VFErrorBlock } from "content/block/errorBlock/factory";
import { VFHeading } from "content/block/heading/factory";
import { VFHr } from "content/block/hr/factory";
import { VFMath } from "content/block/math/factory";
import { VFAccentBlock } from "content/block/accentBlock/factory";
import { VFInclude } from "content/block/include/factory";
import { VFList } from "content/block/list/factory";
import { VFHtml } from "content/block/html/factory";
import { VFArray } from "content/block/array/factory";
import { VFTable } from "content/block/table/factory";
import { VFTask } from "content/block/task/factory";
import { VFSpoiler } from "content/block/spoiler/factory";
import { VFTodo } from "content/block/todo/factory";
import { VFFigure } from "content/block/figure/factory";
import { VFGallery } from "content/block/gallery/factory";
import { VFSecondary } from "content/block/secondary/factory";

// Inliner Factories
import { VFText } from "content/inliner/text/factory";
import { VFIMath } from "content/inliner/imath/factory";
import { VFErrorInliner } from "content/inliner/errorInliner/factory";
import { VFLink } from "content/inliner/link/factory";

export default class Renderer
{
    location: Location;
    helper: Helper;

    onRenderError: (product: Product, error: Error) => void;

    constructor(location: Location, helper: Helper)
    {
        this.location = location;
        this.helper = helper;
    }

    blockFactories: { [type: string]: { new (renderer: Renderer): ViewFactory<any, Block> } } = 
    {
        paragraph:  VFParagraph,
        errorBlock: VFErrorBlock,
        heading:    VFHeading,
        hr:         VFHr,
        math:       VFMath,
        figure:     VFFigure,
        gallery:    VFGallery,
        list:       VFList,
        array:      VFArray,
        table:      VFTable,
        task:       VFTask,
        secondary:  VFSecondary,

        spoiler:    VFSpoiler,

        html:       VFHtml,

        include:    VFInclude,

        important:  VFAccentBlock,
        example:    VFAccentBlock,
        definition: VFAccentBlock,
        theorem:    VFAccentBlock,

        todo:       VFTodo,
    };

    inlinerFactories: { [type: string]: { new (renderer: Renderer): ViewFactory<any, Inliner> } } =
    {
        text: VFText,
        errorInliner: VFErrorInliner,
        imath: VFIMath,
        link: VFLink,
    };

    async renderBlocks(blocks: Block[]): Promise<string>
    {
        let result = '';

        for (let i = 0; i < blocks.length; i++)
            result += await this.renderBlock(blocks[i]);
        
        return result;
    }

    async renderBlock(block: Block): Promise<string>
    {
        if (block.type in this.blockFactories)
        {
            let viewFactory = new this.blockFactories[block.type](this);
            let result;

            try
            {
                result = await viewFactory.render(block);
            }
            catch (e)
            {
                if (this.onRenderError)
                    this.onRenderError(block, e);

                let errorBlock = new ErrorBlock;
                    errorBlock.error = e;
                    errorBlock.code = JSON.stringify(block, null, 4);

                let swapResult = ErrorSwap.trySwap(errorBlock, viewFactory);

                result = await this.renderBlock(swapResult ?? errorBlock);
            }

            return result;
        }

        return '';
    }

    async renderInliners(inliners: Inliner[])
    {
        let quoteTracker = new QuoteTracker;
        
        let result = '';

        for (let i = 0; i < inliners.length; i++)
        {
            let inliner = inliners[i];
            if (inliner.type in this.inlinerFactories)
            {
                let viewFactory = new this.inlinerFactories[inliner.type](this);

                try
                {
                    if (inliner.type === 'text')
                        (<Text>inliner).content = RenderExtra.afterStyle((<Text>inliner).content, quoteTracker);

                    result += await viewFactory.render(inliner);
                }
                catch(e)
                {
                    if (this.onRenderError)
                        this.onRenderError(inliner, e);

                    let errorInliner = new ErrorInliner;
                        errorInliner.error = e;

                    let swapResult = ErrorSwap.trySwap(errorInliner, viewFactory);
                    
                    result += await this.renderInliners([(swapResult ?? errorInliner)]);
                }
            }
            else result += inliner;
        }

        return result;
    }
}

export class RenderExtra
{
    static afterStyle(text: string, quoteTracker: QuoteTracker)
    {
        text = text.replace(/\*\*(.+?)\*\*/gm, `<strong>$1</strong>`);
        text = text.replace(/\*(.+?)\*/gm, `<em>$1</em>`);

        text = text.replace(/ -- /gm, ' — ');

        {
            //let quoteOpen = true;
            text = text.replace(/"/gm, () => (quoteTracker.open = !quoteTracker.open) ? '»' : '«');
        }

        return text;
    }
}

export class QuoteTracker
{
    open = true;
}