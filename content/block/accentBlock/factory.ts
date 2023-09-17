import { Block, BlockMeta, ObjBlockFactory } from "bitran";

import AccentBlock, { TExpandContent } from "./block";
import { BlockViewFactory } from "core/viewFactory";
import { VAccentBlock } from "./view";
import Helper from "core/Helper";

//
// Block Factory
//

export abstract class FAccentBlock<TObj extends object = any> extends ObjBlockFactory<AccentBlock, TObj>
{
    async parseObj(obj: any, meta: BlockMeta): Promise<AccentBlock>
    {
        let block = new AccentBlock;
            block.type =    this.getBlockType();
            block.main =    await this.getMain(obj);
            block.expand =  await this.getExpand(obj);

        if (obj.title)
            block.title = obj.title;
        
        block.showTitle = obj.showTitle;
        block.showInToc = obj.showInToc;

        return block;
    }

    //

    getMainAliases():   string[] { return []; }
    getExpandAliases(): string[] { return []; }

    async getMain(obj: any): Promise<Block[]>
    {
        let mainAliases = [...['main'], ...this.getMainAliases()];
        let mainContent = this.getAliasedProperty(mainAliases, obj);

        if (!mainContent)
            return null;

        return this.parser.parseBlocks(mainContent);
    }

    async getExpand(obj: any): Promise<TExpandContent>
    {
        let expandAliases = [...['expand'], ...this.getExpandAliases()];
        let expandContent = this.getAliasedProperty(expandAliases, obj) as TExpandContent;

        if (!expandContent)
            return null;
        
        if (typeof expandContent === 'object')
        {
            let toReturn = {...expandContent};
            let keys = Object.keys(toReturn);

            for (let i = 0; i < keys.length; i++)
            {
                let key = keys[i];
                toReturn[key] = await this.parser.parseBlocks(toReturn[key]);
            }

            return toReturn;
        }
        else return this.parser.parseBlocks(expandContent);
    }

    //

    protected getBlockType()
    {
        return this.objType;
    }

    private getAliasedProperty(aliases: string[], obj: object)
    {
        for (let i = 0; i < aliases.length; i++)
        {
            let alias = aliases[i];

            if (alias in obj)
                return obj[alias];
        }

        return null;
    }
}

//
// View Factory
//

export class VFAccentBlock extends BlockViewFactory<VAccentBlock, AccentBlock>
{
    async setupBlockView(block: AccentBlock): Promise<VAccentBlock>
    {
        let view = new VAccentBlock;
            view.title =        block.title;
            view.showTitle =    block.showTitle ?? !!block.title;

            view.main =         await this.renderer.renderBlocks(block.main);

        if (block.expand)
        {
            let expand = block.expand;
            let helper = Helper.getFrom(this.renderer);

            view.expand = {};

            if (Array.isArray(expand))
                expand = { [helper.i18n(`accentBlock.${block.type}.expand`)]: expand };
            
            for (let i = 0; i < Object.keys(expand).length; i++)
            {
                let key = Object.keys(expand)[i];
                view.expand[key] = await this.renderer.renderBlocks(expand[key]);
            }
        }

        return view;
    }

    async getRender(view: VAccentBlock): Promise<string>
    {
        return this.renderTemplate('accentBlock', view);
    }
}

//
// Important
//

export class FImportant extends FAccentBlock
{
    objType = 'important';
    getMainAliases() { return ['content']; }
}

//
// Example
//

export class FExample extends FAccentBlock
{
    objType = 'example';
    getMainAliases() { return ['task']; }
    getExpandAliases() { return ['solution']; }
}

//
// Definition
//

export class FDefinition extends FAccentBlock
{
    objType = 'definition';
    getMainAliases() { return ['content']; }
}

//
// Theorem
//

export class FThreorem extends FAccentBlock
{
    objType = 'theorem';
    getMainAliases() { return ['statement']; }
    getExpandAliases() { return ['proof']; }
}