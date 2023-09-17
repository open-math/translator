import katex from "katex";

import { InlinerFactory } from "bitran";

import IMath from "./inliner";
import { InlinerViewFactory } from "core/viewFactory";
import { VMath } from "content/block/math/view";

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
        let math = new VMath;
            math.html = katex.renderToString(product.content, { displayMode: false, strict: false, macros: require('../../block/math/macros')});

        return math;
    }

    getRender(view: VMath): Promise<string>
    {
        return this.renderTemplate('imath', view);
    }
}