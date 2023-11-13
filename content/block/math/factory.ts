import katex from "katex";
import { BlockFactory } from "bitran";

import macros from "./macros";

import Math from "./block";
import { BlockViewFactory } from "core/viewFactory";
import { VMath } from "./view";
import Helper from "core/Helper";

export class FMath extends BlockFactory<Math>
{
    isObj: boolean;

    canParse(strBlock: string): boolean
    {
        if (strBlock.startsWith('@math'))
        {
            this.isObj = true;
            return true;
        }

        return /^\$\$[\s\S]+?\$\$$/gm.test(strBlock);
    }

    async parse(strBlock: string): Promise<Math>
    {
        let math = new Math;
            math.content = this.isObj ? strBlock.split('\n').slice(1).join('\n') : strBlock.slice(2, -2).trim();

        return math;
    }
}

export class VFMath extends BlockViewFactory<VMath, Math>
{
    async setupBlockView(block: Math)
    {
        let helper = Helper.getFrom(this.renderer);
        let math = new VMath;

        try
        {
            math.html = katex.renderToString(block.content, { displayMode: true, strict: false, macros: {...macros, ...helper.getMathMacros()} });
        }
        catch (e)
        {
            e.texString = block.content;
            throw e;
        }

        return math;
    }

    async getRender(view: VMath)
    {
        return this.renderBlockView(view);
    }
}