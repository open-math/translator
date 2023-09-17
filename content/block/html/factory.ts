import { BlockFactory, BlockMeta } from "bitran";

import Html from "./block";
import { StringViewFactory } from "core/viewFactory";

export class FHtml extends BlockFactory<Html>
{
    canParse(strBlock: string): boolean
    {
        return strBlock.startsWith('<') && strBlock.endsWith('>');
    }
    
    async parse(strBlock: string, meta: BlockMeta): Promise<Html>
    {
        let id = -1;

        let html = new Html;
            html.inliners = {};
            html.content = strBlock.replace(/(>)([^<]*)(<)/gm, (match, start, content, end) =>
            {
                if (content.trim() === '')
                    return start + end;

                id++;

                html.inliners[id] = content;
                return start + `{{{${id}}}}` + end;
            });

        for (let i = 0; i < Object.keys(html.inliners).length; i++)
            html.inliners[i] = await this.parser.parseInliners(html.inliners[i] as any as string);

        return html;
    }
}

export class VFHtml extends StringViewFactory<Html>
{
    async setupView(product: Html): Promise<string>
    {
        let content = product.content;

        for (let i = 0; i < Object.keys(product.inliners).length; i++)
        {
            content = content.replace(`{{{${i}}}}`, await this.renderer.renderInliners(product.inliners[i]));
        }
        
        return content;
    }
}