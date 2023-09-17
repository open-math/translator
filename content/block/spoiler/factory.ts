import { BlockFactory, BlockMeta } from "bitran";

import Spoiler from "./block";
import { StringViewFactory } from "core/viewFactory";

export class FSpoiler extends BlockFactory<Spoiler>
{
    canParse(strBlock: string)
    {
        return strBlock.startsWith('@spoiler');
    }

    async parse(strBlock: string, meta: BlockMeta)
    {
        if (!meta || !meta.id)
            throw new Error(`Spoiler must have an 'id' property!`);

        strBlock = strBlock.replace(/^@spoiler$/gm, '');

        let spoiler = new Spoiler;
            spoiler.content = await this.parser.parseBlocks(strBlock);

        return spoiler;
    }
}