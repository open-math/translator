import { Paragraph } from "bitran";

import { BlockViewFactory } from "core/viewFactory";
import { VParagraph } from "./view";

export class VFParagraph extends BlockViewFactory<VParagraph, Paragraph>
{
    async setupBlockView(block: Paragraph): Promise<VParagraph>
    {
        let view = new VParagraph;
            view.content = await this.renderer.renderInliners(block.content);
        
        return view;
    }

    async getRender(view: VParagraph): Promise<string>
    {
        return this.renderBlockView(view);
    }
}