import { BlockFactory, BlockMeta } from "bitran";

import { BlockViewFactory } from "core/viewFactory";

import Heading from "./block";
import { VHeading } from "./view";

export class FHeading extends BlockFactory<Heading>
{
    canParse(strBlock: string)
    {
        return /^(#+) (.+)/.test(strBlock);
    }

    async parse(strBlock: string, meta: BlockMeta): Promise<Heading>
    {
        let match = strBlock.match(/^(#+) (.+)/);

        let heading = new Heading;
            heading.level = match[1].length;
            heading.title = match[2];

        return heading;
    }
}

export class VFHeading extends BlockViewFactory<VHeading, Heading>
{
    async setupBlockView(block: Heading)
    {
        let view = new VHeading;
            view.level = block.level;
            view.title = block.title;
        
        return view;
    }

    async getRender(view: VHeading)
    {
        return this.renderBlockView(view);
    }
}