import { ErrorBlock } from "bitran";

import { BlockViewFactory } from "core/viewFactory";
import { VErrorBlock } from "./view";

export class VFErrorBlock extends BlockViewFactory<VErrorBlock, ErrorBlock>
{
    async setupBlockView(block: ErrorBlock)
    {
        let view = new VErrorBlock;
            view.error = block.error;
            view.code = block.code;

        return view;
    }

    async getRender(view: VErrorBlock)
    {
        return this.renderBlockView(view);
    }
}