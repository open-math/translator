import { BlockFactory, BlockMeta, ObjBlockFactory, Paragraph } from "bitran";
import List from "./block";
import { BlockViewFactory } from "core/viewFactory";
import { VList } from "./view";

export class FList extends BlockFactory<List>
{
    canParse(strBlock: string)
    {
        return (this.isUl(strBlock) || this.isOl(strBlock)) !== null
    }

    isUl(str: string)
    {
        return str.startsWith('* ');
    }

    isOl(str: string)
    {
        let match = str.match(/^(\d+). /);

        if (match)
            return match[1];

        return null;
    }
    
    //

    async parse(strBlock: string, meta: BlockMeta)
    {
        let list = new List;
            list.listType = this.isUl(strBlock) ? 'ul' : 'ol';
            list.items = [];

        if (list.listType === 'ol')
            list.olStart = +this.isOl(strBlock);

        let lines = strBlock.split('\n').map(line => line.trim());

        for (let i = 0; i < lines.length; i++)
        {
            let line = lines[i];
            let start = list.listType === 'ul' ? 2 : this.isOl(line).length + 2;
            let inliners = await this.parser.parseInliners(line.slice(start));
            let paragraph = new Paragraph;
                paragraph.content = inliners;

            list.items.push([paragraph]);
        }

        return list;
    }
}

export class FBlockList extends ObjBlockFactory<List>
{
    objType = 'list';

    async parseObj(obj: any, meta: BlockMeta)
    {
        let list = new List;
        list.listType = ['ul', 'ol'].includes(obj.listType) ? obj.listType : 'ul';

        if (list.listType === 'ol')
        {
            let start = Math.floor(obj.start);
                start = isNaN(start) ? 1 : start;

            list.olStart = start;
        }

        if (!Array.isArray(obj.items) || obj.items.length === 0)
            return null;

        list.items = await Promise.all(obj.items.map(async item => await this.parser.parseBlocks(item)));

        return list;
    }
}

export class VFList extends BlockViewFactory<VList, List>
{
    async setupBlockView(block: List): Promise<VList>
    {
        let view = new VList;
        view.listType = block.listType;
        view.olStart = block.olStart;
        view.items = [];

        for (let i = 0; i < block.items.length; i++)
            view.items.push(await this.renderer.renderBlocks(block.items[i]));

        return view;
    }

    async getRender(view: VList): Promise<string>
    {
        return this.renderBlockView(view);
    }
}