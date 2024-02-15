import katex from "katex";
import { v4 as uuid4 } from "uuid";
import { BlockFactory } from "bitran";

import Mermaid from "./block";
import { StringViewFactory } from "core/viewFactory";

export class FMermaid extends BlockFactory<Mermaid>
{
    canParse(strBlock: string): boolean
    {
        return strBlock.startsWith('@mermaid');
    }

    async parse(strBlock: string): Promise<Mermaid>
    {
        strBlock = strBlock.replace(/^@mermaid$/gm, '');

        strBlock = strBlock.replace(/\$\$(.+?)\$\$/gm, (match, math) => katex.renderToString('\\displaystyle ' + math, { displayMode: false }));
        strBlock = strBlock.replace(/\$(.+?)\$/gm, (match, imath) => katex.renderToString(imath, { displayMode: false }));

        let mermaid = new Mermaid;
            mermaid.content = strBlock;
            mermaid.uid = uuid4();

        return mermaid;
    }
}

export class VFMermaid extends StringViewFactory<Mermaid>
{
    async setupView(product: Mermaid): Promise<string>
    {
        return this.renderTemplate('mermaid', product);
    }
}