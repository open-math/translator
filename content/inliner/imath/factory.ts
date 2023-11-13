import katex from "katex";

import { InlinerFactory } from "bitran";

import IMath from "./inliner";
import { InlinerViewFactory } from "core/viewFactory";
import { VMath } from "content/block/math/view";
import Helper from "core/Helper";

export class FIMath extends InlinerFactory<IMath>
{
    regexp = /(?<!\\)\$(.+?)(?<!\\)\$/gm;

    async parse(match: RegExpExecArray): Promise<IMath>
    {
        let imath = new IMath;
            imath.content = match[1];

        return imath;
    }
}

export class VFIMath extends InlinerViewFactory<VMath, IMath>
{
    async setupView(product: IMath)
    {
        let helper = Helper.getFrom(this.renderer);

        let math = new VMath;
            math.html = katex.renderToString(product.content, { displayMode: false, strict: false, macros: {...require('../../block/math/macros'), ...helper.getMathMacros()}});

        return math;
    }

    getRender(view: VMath): Promise<string>
    {
        return this.renderTemplate('imath', view);
    }
}