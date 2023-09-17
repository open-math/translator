import { BlockFactory } from "bitran";

import Include from "./block";
import { StringViewFactory } from "core/viewFactory";
import Helper from "core/Helper";

export class FInclude extends BlockFactory<Include>
{
    canParse(strBlock: string): boolean
    {
        return strBlock.startsWith('<~ ');
    }

    async parse(strBlock: string): Promise<Include>
    {
        let rawId = strBlock.slice(3).trim();

        let include = new Include;
            include.id = rawId;

        return include;
    }
}

export class VFInclude extends StringViewFactory<Include>
{
    async setupView(product: Include)
    {
        let unique = await Helper.getFrom(this.renderer).getUnique(product.id);

        if (!unique)
            throw new Error(`Can't find unique with id '${product.id}'!`);

        return this.renderer.renderBlocks([unique]);
    }
}