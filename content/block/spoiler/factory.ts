import { BlockFactory, BlockMeta } from "bitran";

import Spoiler from "./block";
import { StringViewFactory } from "core/viewFactory";
import Helper from "core/Helper";

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

export class VFSpoiler extends StringViewFactory<Spoiler>
{
    async setupView(product: Spoiler)
    {
        if (!Helper.getFrom(this.renderer).isEditor()) return '';

        let content = await this.renderer.renderBlocks(product.content);

        return `<div class="spoilerPreview"><div class="id">${product['id']}</div>${content}</div>`;
    }
}